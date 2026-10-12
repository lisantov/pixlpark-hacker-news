import { http } from "~/shared/api";
import type { Comment } from "../model";

export const commentService = {
  commentById: (id: number) => http.get<Comment>(`item/${id}`),
};
