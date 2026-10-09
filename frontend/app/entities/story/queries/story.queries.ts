import { useEffect, useRef, useState } from "react";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { STORY_QUERY_KEYS } from "./story.keys";
import { storyService } from "../api";
import type { Story } from "../model";

const PAGE_SIZE = 10;
const REFETCH_INTERVAL = 60_000;

// Общая логика для пагинации + рефетче новых постов
const useStoryFeed = (
  idsKey: readonly unknown[],
  infiniteKey: readonly unknown[],
  fetchIds: () => Promise<number[]>,
) => {
  const queryClient = useQueryClient();
  // Подтягиваются ли сейчас новые посты
  const [isApplying, setIsApplying] = useState(false);

  // ID отрендеренных постов на странице (те по которым уже были запрошены детали)
  const renderedIdsRef = useRef<number[]>([]);

  const idsQuery = useQuery({
    queryKey: idsKey,
    queryFn: fetchIds,
    refetchInterval: REFETCH_INTERVAL,
    staleTime: REFETCH_INTERVAL,
  });

  const latestIds = idsQuery.data ?? [];

  // Самые первые айдишники сохраняем в рендеренные
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
      return Promise.all(pageIds.map((id) => storyService.storyById(id)));
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

  // Проверка во избежании тригерра новых постов в первый раз
  if (topRenderedId !== undefined && latestIds.length > 0) {
    const firstOldIndex = latestIds.indexOf(topRenderedId);
    if (firstOldIndex > 0) newPostsCount = firstOldIndex;
    else if (firstOldIndex === -1) newPostsCount = latestIds.length;
  }

  // Запрос только новых постов
  const applyNewPosts = async () => {
    if (newPostsCount <= 0 || isApplying) return;

    setIsApplying(true);
    try {
      const newIdsToFetch = latestIds.slice(0, newPostsCount);

      const newStories = await Promise.all(
        newIdsToFetch.map((id) => storyService.storyById(id)),
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
    applyNewPosts,
    isApplying,
  };
};

export const getNewStories = () => {
  const {
    idsQuery,
    storiesQuery,
    news,
    newPostsCount,
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
    applyNewPosts,
    isApplying,
  };
};

export const getTopStories = () => {
  const {
    idsQuery,
    storiesQuery,
    news,
    newPostsCount,
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
    applyNewPosts,
    isApplying,
  };
};

export const getBestStories = () => {
  const {
    idsQuery,
    storiesQuery,
    news,
    newPostsCount,
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
    applyNewPosts,
    isApplying,
  };
};

export const getStoryById = (id: number) =>
  useQuery({
    queryKey: STORY_QUERY_KEYS.detail(id),
    queryFn: () => storyService.storyById(id),
    staleTime: REFETCH_INTERVAL,
    refetchOnWindowFocus: true,
  });
