import { useCommentsGroup } from "~/entities/comment/queries";
import StoryCommentItem from "./StoryCommentItem";
import StoryCommentItemSkeleton from "./StoryCommentItemSkeleton";

interface StoryCommentListProps {
  ids?: number[];
  layer?: number;
}

export default function StoryCommentList({
  ids = [],
  layer = 0,
}: StoryCommentListProps) {
  const { data, isLoading, isError } = useCommentsGroup(ids);
  const comments = (data ?? []).filter((c) => !c.dead && !c.deleted);

  if (isLoading)
    return (
      <div className="w-full flex flex-col gap-2">
        {Array.from({ length: ids.length }).map(() => (
          <StoryCommentItemSkeleton />
        ))}
      </div>
    );

  if (isError)
    return <p className="text-gray-500">Не удалось загрузить комментарии</p>;

  if (comments.length === 0)
    return <p className="text-gray-500">Комментариев нету</p>;

  return (
    <div className="flex gap-2">
      {layer > 0 && (
        <div className="h-full w-0.5 bg-orange-600 rounded-xl ml-2"></div>
      )}
      <div className="flex-1 flex flex-col gap-2">
        {comments.map((c, i) => (
          <StoryCommentItem key={c.id} comment={c} index={i} layer={layer} />
        ))}
      </div>
    </div>
  );
}
