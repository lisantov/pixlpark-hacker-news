import { useParams } from "react-router-dom";
import { useStoryById } from "~/entities/story";
import { StoryCommentList, StoryHeader } from "~/features/storyDetail";
import { Loader } from "~/shared/ui/loader";

export default function Home() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useStoryById(+id);

  return (
    <section className="flex-1 flex flex-col gap-4">
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
