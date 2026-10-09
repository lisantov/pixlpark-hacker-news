import { getNewStories, type Story } from "~/entities/story";
import StoryItemSkeleton from "./StoryItemSkeleton";
import StoryItem from "./StoryItem";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Loader } from "~/shared/ui";

export default function StoryList() {
  const { newStoriesQuery, news } = getNewStories();
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = newStoriesQuery;

  const { ref, inView } = useInView({ threshold: 0.1, rootMargin: "200px" });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {!news.length
        ? Array.from({ length: 10 }, (_, i) => <StoryItemSkeleton key={i} />)
        : news.map((s, i) => <StoryItem key={s.id} story={s} />)}
      <div ref={ref} className="h-px"></div>
      {isFetchingNextPage && <Loader />}
    </>
  );
}
