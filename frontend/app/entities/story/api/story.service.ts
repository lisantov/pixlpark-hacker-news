import { http } from "~/shared/api";
import type { GetStories } from "./types";
import type { Story } from "../model";

export const storyService = {
  newStories: () => http.get<GetStories>("newstories"),
  topStories: () => http.get<GetStories>("topstories"),
  bestStories: () => http.get<GetStories>("beststories"),
  storyById: (id: number) => http.get<Story>(`item/${id}`),
};
