import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { COMMENT_QUERY_KEYS } from "./comment.keys";
import { commentService } from "../api";
import { REFETCH_INTERVAL } from "~/shared/lib";

const commentQueryOptions = (id: number) =>
  queryOptions({
    queryKey: COMMENT_QUERY_KEYS.detail(id),
    queryFn: () => commentService.commentById(id),
    refetchInterval: REFETCH_INTERVAL,
  });

export const useCommentsGroup = (ids: number[]) =>
  useQuery({
    queryKey: COMMENT_QUERY_KEYS.list(ids),
    queryFn: () =>
      Promise.all(
        ids.map(async (id) => {
          const data = await commentService.commentById(id);
          return data;
        }),
      ),
    refetchInterval: REFETCH_INTERVAL,
  });

export const useCommentById = (id: number) => useQuery(commentQueryOptions(id));
