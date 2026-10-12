export const COMMENT_QUERY_KEYS = {
  all: ["comment"] as const,
  list: (id: number[]) => [...COMMENT_QUERY_KEYS.all, ...id] as const,
  detail: (id: number) => [...COMMENT_QUERY_KEYS.all, id] as const,
};
