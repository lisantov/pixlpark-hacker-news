import type { Comment } from "~/entities/comment";
import { dateToTimeAgo } from "~/shared/lib";
import { Button } from "~/shared/ui/button";
import styles from "./StoryCommentItem.module.css";
import { useState } from "react";
import StoryCommentList from "./StoryCommentList";

interface StoryCommentItemProps {
  comment: Comment;
  index: number;
  layer: number;
}

export default function StoryCommentItem({
  comment,
  index,
  layer,
}: StoryCommentItemProps) {
  const nestedCount = comment.kids?.length ?? 0;
  const publishedAt = new Date(comment.time * 1000);
  const [isNestedExpanded, setIsNestedExpanded] = useState<boolean>(false);

  return (
    <>
      <article
        className={`opacity-0 w-full flex flex-col gap-3 p-5 bg-white rounded-2xl border border-gray-100 transition-colors duration-200 hover:border-orange-200 ${styles.slideUp} ${isNestedExpanded && "border-orange-500"}`}
        style={{
          animationDelay: `${50 * index}ms`,
        }}
      >
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
            <Button
              variant="ghost"
              onClick={() => setIsNestedExpanded((old) => !old)}
            >
              Показать ответы ({nestedCount})
            </Button>
          </div>
        )}
      </article>
      {isNestedExpanded && (
        <StoryCommentList ids={comment.kids} layer={layer + 1} />
      )}
    </>
  );
}
