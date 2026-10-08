import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { STORY_QUERY_KEYS } from "./story.keys";
import { storyService } from "../api";

const PAGE_SIZE = 10;
const createInfiniteQuery = (ids: number[], idsQuerySuccess: boolean) =>
  useInfiniteQuery({
    queryKey: STORY_QUERY_KEYS.newInfinite(),
    queryFn: async ({ pageParam }) => {
      const sliceIds = ids.slice(pageParam, pageParam + PAGE_SIZE);
      return Promise.all(sliceIds.map((id) => storyService.storyById(id)));
    },
    initialPageParam: 0,
    getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
      const next = lastPageParam + PAGE_SIZE;
      return next < ids.length ? next : undefined;
    },
    enabled: idsQuerySuccess && ids.length > 0,
    staleTime: 60_000,
  });

export const getNewStories = () => {
  const idsQuery = useQuery({
    queryKey: STORY_QUERY_KEYS.new(),
    queryFn: storyService.newStories,
    staleTime: 60_000,
  });

  const ids = idsQuery.data ?? [];

  const newStoriesQuery = createInfiniteQuery(ids, idsQuery.isSuccess);

  return {
    idsQuery,
    newStoriesQuery,
    news: newStoriesQuery.data?.pages.flat() ?? [],
  };
};

export const getTopStories = () => {
  const idsQuery = useQuery({
    queryKey: STORY_QUERY_KEYS.top(),
    queryFn: storyService.topStories,
    staleTime: 60_000,
  });

  const ids = idsQuery.data ?? [];

  const topStoriesQuery = createInfiniteQuery(ids, idsQuery.isSuccess);

  return {
    idsQuery,
    topStoriesQuery,
    news: topStoriesQuery.data?.pages.flat() ?? [],
  };
};

export const getBestStories = () => {
  const idsQuery = useQuery({
    queryKey: STORY_QUERY_KEYS.best(),
    queryFn: storyService.bestStories,
    staleTime: 60_000,
  });

  const ids = idsQuery.data ?? [];

  const bestStoriesQuery = createInfiniteQuery(ids, idsQuery.isSuccess);

  return {
    idsQuery,
    bestStoriesQuery,
    news: bestStoriesQuery.data?.pages.flat() ?? [],
  };
};

export const getStoryById = (id: number) =>
  useQuery({
    queryKey: STORY_QUERY_KEYS.best(),
    queryFn: () => storyService.storyById(id),
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
