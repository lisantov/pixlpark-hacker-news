import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useStoryById } from "~/entities/story";
import { COMMENT_QUERY_KEYS } from "~/entities/comment/queries";
import { StoryCommentList, StoryHeader } from "~/features/storyDetail";
import { Link } from "~/shared/ui";
import { Button } from "~/shared/ui/button";
import { Loader } from "~/shared/ui/loader";

export default function Home() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useStoryById(+id);

  const refresh = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEYS.all });
  };

  return (
    <section className="flex-1 flex flex-col items-start gap-4">
      <Link href="/">
        <Button variant="primary">Назад к списку</Button>
      </Link>
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <Loader />
        </div>
      )}
      {data && !isLoading && (
        <>
          <StoryHeader story={data} />
          <div className="flex items-center">
            <Button variant="secondary" onClick={refresh}>
              Обновить список
            </Button>
          </div>
          <StoryCommentList ids={data.kids} />
        </>
      )}
    </section>
  );
}
