import { useCommentsGroup } from "~/entities/comment/queries";

interface StoryCommentList {
  ids?: number[];
}

export default function StoryCommentList({ ids = [] }: StoryCommentList) {
  const { data, isLoading, error } = useCommentsGroup(ids);

  return (
    <div className="flex flex-col gap-2">
      <p>
        {(data ?? []).map((c) => (
          <p>{c.text}</p>
        ))}
      </p>
    </div>
  );
}
