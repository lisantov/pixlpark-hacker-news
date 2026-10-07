import { http } from "~/shared/api";
import type { GetStories, Story } from "./types";

export const storyService = {
  newStories: () => http.get<GetStories>("newstories"),
  topStories: () => http.get<GetStories>("topstories"),
  bestStories: () => http.get<GetStories>("beststories"),
  storyById: (id: string) => http.get<Story>(`item/${id}`),
};
