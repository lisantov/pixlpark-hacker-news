import { getNewStories, type Story } from "~/entities/story";
import StoryItemSkeleton from "./StoryItemSkeleton";
import { useEffect, useState } from "react";
import StoryItem from "./StoryItem";

export default function StoryList() {
  const { data, isLoading, error } = getNewStories();

  return (
    <section className="flex flex-col gap-4">
      {!data
        ? Array.from({ length: 10 }, (_, i) => <StoryItemSkeleton />)
        : data.map((s) => <StoryItem story={s} />)}
    </section>
  );
}
