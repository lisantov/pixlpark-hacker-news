export const STORY_QUERY_KEYS = {
  all: ["story"] as const,
  new: () => [...STORY_QUERY_KEYS.all, "new"] as const,
  newInfinite: () => [...STORY_QUERY_KEYS.new(), "infinite"] as const,
  top: () => [...STORY_QUERY_KEYS.all, "top"] as const,
  topInfinite: () => [...STORY_QUERY_KEYS.top(), "infinite"] as const,
  best: () => [...STORY_QUERY_KEYS.all, "best"] as const,
  bestInfinite: () => [...STORY_QUERY_KEYS.best(), "infinite"] as const,
  detail: (id: number) => [...STORY_QUERY_KEYS.all, "detail", id] as const,
};
