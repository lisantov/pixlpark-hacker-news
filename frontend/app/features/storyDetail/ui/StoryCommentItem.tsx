import type { Comment } from "~/entities/comment";
import { dateToTimeAgo } from "~/shared/lib";
import { Button } from "~/shared/ui/button";

interface StoryCommentItemProps {
  comment: Comment;
}

export default function StoryCommentItem({ comment }: StoryCommentItemProps) {
  const nestedCount = comment.kids?.length ?? 0;
  const publishedAt = new Date(comment.time * 1000);

  return (
    <article className="w-full flex flex-col gap-3 p-5 bg-white rounded-2xl border border-gray-100 transition-colors duration-200 hover:border-orange-200">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
        <span className="font-medium text-gray-700">{comment.by}</span>

        <span aria-hidden className="text-gray-300">
          •
        </span>

        <time dateTime={publishedAt.toISOString()}>
          {dateToTimeAgo(publishedAt)}
        </time>
      </div>

      {comment.text && (
        <div
          className="text-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: comment.text }}
        />
      )}

      {nestedCount > 0 && (
        <div>
          <Button variant="ghost">Показать ответы ({nestedCount})</Button>
        </div>
      )}
    </article>
  );
}
