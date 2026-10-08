export const STORY_QUERY_KEYS = {
  all: ["story"] as const,
  new: () => [...STORY_QUERY_KEYS.all, "new"] as const,
  top: () => [...STORY_QUERY_KEYS.all, "top"] as const,
  best: () => [...STORY_QUERY_KEYS.all, "best"] as const,
  detail: (id: number) => [...STORY_QUERY_KEYS.all, "detail", id] as const,
};
