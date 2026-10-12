import { useCommentsGroup } from "~/entities/comment/queries";
import StoryCommentItem from "./StoryCommentItem";
import StoryCommentItemSkeleton from "./StoryCommentItemSkeleton";

interface StoryCommentListProps {
  ids?: number[];
}

export default function StoryCommentList({ ids = [] }: StoryCommentListProps) {
  const { data, isLoading, isError } = useCommentsGroup(ids);
  const comments = (data ?? []).filter((c) => !c.dead && !c.deleted);

  if (isLoading)
    return (
      <div className="w-full flex flex-col gap-2">
        {Array.from({ length: 8 }).map(() => (
          <StoryCommentItemSkeleton />
        ))}
      </div>
    );

  if (isError)
    return <p className="text-gray-500">Не удалось загрузить комментарии</p>;

  if (comments.length === 0)
    return <p className="text-gray-500">Комментариев нету</p>;

  return (
    <div className="flex flex-col gap-2">
      {comments.map((c) => (
        <StoryCommentItem key={c.id} comment={c} />
      ))}
    </div>
  );
}
