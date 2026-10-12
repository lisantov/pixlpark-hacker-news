import { useStoriesByType, type StoryFeedType } from "~/entities/story";
import StoryItemSkeleton from "./StoryItemSkeleton";
import StoryItem from "./StoryItem";
import { useInView } from "react-intersection-observer";
import { useEffect, type ReactNode } from "react";
import { Loader } from "~/shared/ui/loader";
import { Button } from "~/shared/ui/button";
import { PAGE_SIZE } from "~/shared/lib/constants";

interface StoryListProps {
  type?: StoryFeedType;
  toolbar?: ReactNode;
}

export default function StoryList({ type = "new", toolbar }: StoryListProps) {
  const {
    storiesQuery,
    news,
    newPostsCount,
    refresh,
    isRefreshing,
    applyNewPosts,
    isApplying,
  } = useStoriesByType(type);
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = storiesQuery;

  const { ref, inView } = useInView({ threshold: 0.1, rootMargin: "200px" });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleNewPostsClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    applyNewPosts();
  };

  return (
    <>
      {isApplying && <Loader />}
      <div className="flex items-center gap-4">
        {toolbar}
        <Button
          className="ml-auto"
          onClick={refresh}
          variant="primary"
          disabled={isRefreshing}
        >
          {isRefreshing ? "Обновляем..." : "Обновить"}
        </Button>
      </div>
      {!news.length
        ? Array.from({ length: 10 }, (_, i) => <StoryItemSkeleton key={i} />)
        : news.map((s, i) => (
            <StoryItem key={s.id} story={s} index={i % PAGE_SIZE} />
          ))}
      <div ref={ref} className="h-px"></div>
      {isFetchingNextPage && <Loader />}
      <div className="fixed bottom-12 left-0 right-0 flex items-center px-20 justify-center animate-pulse">
        {newPostsCount > 0 && !isRefreshing && (
          <Button
            onClick={handleNewPostsClick}
            className="shadow-[0_0_48px] shadow-orange-400"
          >
            Показать новые посты (+{newPostsCount})
          </Button>
        )}
      </div>
    </>
  );
}
