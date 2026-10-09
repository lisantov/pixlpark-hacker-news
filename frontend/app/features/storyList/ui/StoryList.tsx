import { getNewStories, type Story } from "~/entities/story";
import StoryItemSkeleton from "./StoryItemSkeleton";
import StoryItem from "./StoryItem";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Loader } from "~/shared/ui";
import { Button } from "~/shared/ui/button";

export default function StoryList() {
  const { newStoriesQuery, news, newPostsCount, applyNewPosts } =
    getNewStories();
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = newStoriesQuery;

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
      <div className="fixed left-0 right-0 flex items-center justify-center">
        {newPostsCount > 0 && (
          <Button onClick={handleNewPostsClick}>
            Показать новые посты (+{newPostsCount})
          </Button>
        )}
      </div>
      {!news.length
        ? Array.from({ length: 10 }, (_, i) => <StoryItemSkeleton key={i} />)
        : news.map((s, i) => <StoryItem key={s.id} story={s} />)}
      <div ref={ref} className="h-px"></div>
      {isFetchingNextPage && <Loader />}
    </>
  );
}
