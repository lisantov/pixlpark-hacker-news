import { useParams } from "react-router-dom";
import { useStoryById } from "~/entities/story";
import { StoryCommentList, StoryHeader } from "~/features/storyDetail";
import { Link } from "~/shared/ui";
import { Button } from "~/shared/ui/button";
import { Loader } from "~/shared/ui/loader";

export default function Home() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useStoryById(+id);

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
          <StoryCommentList ids={data.kids} />
        </>
      )}
    </section>
  );
}
