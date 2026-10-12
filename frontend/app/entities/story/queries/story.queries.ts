import { useRef, useState } from "react";
import {
  queryOptions,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { STORY_QUERY_KEYS } from "./story.keys";
import { storyService } from "../api";
import type { Story } from "../model";
import { REFETCH_INTERVAL, PAGE_SIZE } from "~/shared/lib";

export const storyQueryOptions = (id: number) =>
  queryOptions({
    queryKey: STORY_QUERY_KEYS.detail(id),
    queryFn: () => storyService.storyById(id),
    staleTime: REFETCH_INTERVAL,
    refetchOnWindowFocus: true,
  });

export type StoryFeedType = "new" | "top" | "best";

interface StoryFeedConfig {
  idsKey: () => readonly unknown[];
  infiniteKey: () => readonly unknown[];
  fetchIds: () => Promise<number[]>;
}

const STORY_FEEDS: Record<StoryFeedType, StoryFeedConfig> = {
  new: {
    idsKey: STORY_QUERY_KEYS.new,
    infiniteKey: STORY_QUERY_KEYS.newInfinite,
    fetchIds: storyService.newStories,
  },
  top: {
    idsKey: STORY_QUERY_KEYS.top,
    infiniteKey: STORY_QUERY_KEYS.topInfinite,
    fetchIds: storyService.topStories,
  },
  best: {
    idsKey: STORY_QUERY_KEYS.best,
    infiniteKey: STORY_QUERY_KEYS.bestInfinite,
    fetchIds: storyService.bestStories,
  },
};

// Общая логика для пагинации + рефетче новых постов
const useStoryFeed = (
  idsKey: readonly unknown[],
  infiniteKey: readonly unknown[],
  fetchIds: () => Promise<number[]>,
) => {
  const queryClient = useQueryClient();

  // Детали поста грузим через общий query-кэш (ключ detail(id)), чтобы страница новости получала их без повторного запроса
  const fetchStory = (id: number) => queryClient.query(storyQueryOptions(id));

  // Подтягиваются ли сейчас новые посты
  const [isApplying, setIsApplying] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ID отрендеренных постов на странице (те по которым уже были запрошены детали)
  const renderedIdsRef = useRef<number[]>([]);

  const idsQuery = useQuery({
    queryKey: idsKey,
    queryFn: fetchIds,
    refetchInterval: REFETCH_INTERVAL,
    staleTime: REFETCH_INTERVAL,
  });

  const latestIds = idsQuery.data ?? [];

  // Самые первый ответ по айдишникам сохраняем в рендеренные
  if (
    idsQuery.isSuccess &&
    renderedIdsRef.current.length === 0 &&
    latestIds.length > 0
  )
    renderedIdsRef.current = latestIds;

  // Query для подтягивания деталей по постам
  const storiesQuery = useInfiniteQuery({
    queryKey: infiniteKey,
    queryFn: ({ pageParam = 0 }) => {
      const currentIds = renderedIdsRef.current;
      const pageIds = currentIds.slice(pageParam, pageParam + PAGE_SIZE);
      return Promise.all(pageIds.map((id) => fetchStory(id)));
    },
    initialPageParam: 0,
    getNextPageParam: (_lastPage, allPages) => {
      const loadedCount = allPages.flat().length;
      return loadedCount < renderedIdsRef.current.length
        ? loadedCount
        : undefined;
    },
    enabled: idsQuery.isSuccess && latestIds.length > 0,
  });

  const news = storiesQuery.data?.pages.flat() ?? [];

  // ID самого верхнего поста
  const topRenderedId = renderedIdsRef.current[0];
  let newPostsCount = 0;

  // Проверка во избежании тригерра уведомлений о новых постах в первый раз
  if (topRenderedId !== undefined && latestIds.length > 0) {
    const firstOldIndex = latestIds.indexOf(topRenderedId);
    if (firstOldIndex > 0) newPostsCount = firstOldIndex;
    else if (firstOldIndex === -1) newPostsCount = latestIds.length;
  }

  // Ручное обновление: повторный запрос айдишников и автоматическая дозагрузка новых постов
  const refresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      const result = await idsQuery.refetch();
      const freshIds = result.data ?? latestIds;

      const topRenderedId = renderedIdsRef.current[0];

      if (topRenderedId === undefined) {
        if (freshIds.length > 0) renderedIdsRef.current = freshIds;
        return;
      }

      const firstOldIndex = freshIds.indexOf(topRenderedId);
      const newCount =
        firstOldIndex > 0
          ? firstOldIndex
          : firstOldIndex === -1
            ? freshIds.length
            : 0;

      if (newCount > 0) {
        const newIdsToFetch = freshIds.slice(0, newCount);

        const newStories = await Promise.all(
          newIdsToFetch.map((id) => fetchStory(id)),
        );

        // Подкидываем в query-память с постами новые посты в самое начало
        queryClient.setQueryData(
          infiniteKey,
          (oldData: { pages: Story[][]; pageParams: number[] } | undefined) => {
            if (!oldData || oldData.pages.length === 0) return oldData;

            const updatedPages = [...newStories, ...oldData.pages];

            return {
              ...oldData,
              pages: updatedPages,
            };
          },
        );

        renderedIdsRef.current = freshIds;
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  // Запрос только новых постов
  const applyNewPosts = async () => {
    if (newPostsCount <= 0 || isApplying) return;

    setIsApplying(true);
    try {
      const newIdsToFetch = latestIds.slice(0, newPostsCount);

      const newStories = await Promise.all(
        newIdsToFetch.map((id) => fetchStory(id)),
      );

      // Подкидываем в query-память с постами новые посты в самое начало
      queryClient.setQueryData(
        infiniteKey,
        (oldData: { pages: Story[][]; pageParams: number[] } | undefined) => {
          if (!oldData || oldData.pages.length === 0) return oldData;

          const updatedPages = [...newStories, ...oldData.pages];

          return {
            ...oldData,
            pages: updatedPages,
          };
        },
      );

      renderedIdsRef.current = latestIds;
    } finally {
      setIsApplying(false);
    }
  };

  return {
    idsQuery,
    storiesQuery,
    news,
    newPostsCount,
    refresh,
    isRefreshing,
    applyNewPosts,
    isApplying,
  };
};

export const useStoriesByType = (type: StoryFeedType) => {
  const { idsKey, infiniteKey, fetchIds } = STORY_FEEDS[type];
  return useStoryFeed(idsKey(), infiniteKey(), fetchIds);
};

export const useNewStories = () => {
  const {
    idsQuery,
    storiesQuery,
    news,
    newPostsCount,
    refresh,
    isRefreshing,
    applyNewPosts,
    isApplying,
  } = useStoryFeed(
    STORY_QUERY_KEYS.new(),
    STORY_QUERY_KEYS.newInfinite(),
    storyService.newStories,
  );

  return {
    idsQuery,
    newStoriesQuery: storiesQuery,
    news,
    newPostsCount,
    refresh,
    isRefreshing,
    applyNewPosts,
    isApplying,
  };
};

export const useTopStories = () => {
  const {
    idsQuery,
    storiesQuery,
    news,
    newPostsCount,
    refresh,
    isRefreshing,
    applyNewPosts,
    isApplying,
  } = useStoryFeed(
    STORY_QUERY_KEYS.top(),
    STORY_QUERY_KEYS.topInfinite(),
    storyService.topStories,
  );

  return {
    idsQuery,
    topStoriesQuery: storiesQuery,
    news,
    newPostsCount,
    refresh,
    isRefreshing,
    applyNewPosts,
    isApplying,
  };
};

export const useBestStories = () => {
  const {
    idsQuery,
    storiesQuery,
    news,
    newPostsCount,
    refresh,
    isRefreshing,
    applyNewPosts,
    isApplying,
  } = useStoryFeed(
    STORY_QUERY_KEYS.best(),
    STORY_QUERY_KEYS.bestInfinite(),
    storyService.bestStories,
  );

  return {
    idsQuery,
    bestStoriesQuery: storiesQuery,
    news,
    newPostsCount,
    refresh,
    isRefreshing,
    applyNewPosts,
    isApplying,
  };
};

export const useStoryById = (id: number) => useQuery(storyQueryOptions(id));
