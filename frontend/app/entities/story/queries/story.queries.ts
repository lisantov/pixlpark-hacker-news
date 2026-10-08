import { useQuery, useQueryClient } from "@tanstack/react-query";
import { STORY_QUERY_KEYS } from "./story.keys";
import { storyService } from "../api";
import type { Story } from "../model";

export const getNewStories = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: STORY_QUERY_KEYS.new(),
    queryFn: async () => {
      const ids = await storyService.newStories();

      const cached = ids.map((id) =>
        queryClient.getQueryData<Story>(STORY_QUERY_KEYS.detail(id)),
      );

      const missingIds = ids.filter((_, i) => !cached[i]);
      const fetched = await Promise.all(
        missingIds.map((id) => storyService.storyById(id)),
      );

      missingIds.forEach((id, i) => {
        queryClient.setQueryData(STORY_QUERY_KEYS.detail(id), fetched[i]);
      });

      const byIdMap = new Map<number, Story>();
      cached.forEach((story) => story && byIdMap.set(story.id, story));
      fetched.forEach((story) => story && byIdMap.set(story.id, story));
      return ids.map((id) => byIdMap.get(id)!).filter(Boolean);
    },
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
};

export const getTopStories = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: STORY_QUERY_KEYS.top(),
    queryFn: async () => {
      const ids = await storyService.topStories();

      const cached = ids.map((id) =>
        queryClient.getQueryData<Story>(STORY_QUERY_KEYS.detail(id)),
      );

      const missingIds = ids.filter((_, i) => !cached[i]);
      const fetched = await Promise.all(
        missingIds.map((id) => storyService.storyById(id)),
      );

      missingIds.forEach((id, i) => {
        queryClient.setQueryData(STORY_QUERY_KEYS.detail(id), fetched[i]);
      });

      const byIdMap = new Map<number, Story>();
      cached.forEach((story) => story && byIdMap.set(story.id, story));
      fetched.forEach((story) => story && byIdMap.set(story.id, story));
      return ids.map((id) => byIdMap.get(id)!).filter(Boolean);
    },
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
};

export const getBestStories = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: STORY_QUERY_KEYS.top(),
    queryFn: async () => {
      const ids = await storyService.bestStories();

      const cached = ids.map((id) =>
        queryClient.getQueryData<Story>(STORY_QUERY_KEYS.detail(id)),
      );

      const missingIds = ids.filter((_, i) => !cached[i]);
      const fetched = await Promise.all(
        missingIds.map((id) => storyService.storyById(id)),
      );

      missingIds.forEach((id, i) => {
        queryClient.setQueryData(STORY_QUERY_KEYS.detail(id), fetched[i]);
      });

      const byIdMap = new Map<number, Story>();
      cached.forEach((story) => story && byIdMap.set(story.id, story));
      fetched.forEach((story) => story && byIdMap.set(story.id, story));
      return ids.map((id) => byIdMap.get(id)!).filter(Boolean);
    },
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
};

export const getStoryById = (id: number) =>
  useQuery({
    queryKey: STORY_QUERY_KEYS.best(),
    queryFn: () => storyService.storyById(id),
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
