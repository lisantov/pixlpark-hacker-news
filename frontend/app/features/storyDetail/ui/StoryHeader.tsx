import type { Story } from "~/entities/story";
import { formatDate } from "~/shared/lib";
import { getIconPath } from "~/shared/lib/assets";
import { Link } from "~/shared/ui/link";

interface StoryHeaderProps {
  story: Story;
}

export default function StoryHeader({ story }: StoryHeaderProps) {
  const publishedAt = new Date(story.time * 1000);
  const hasSource = story.url?.startsWith("http");

  const titleClassName =
    "text-3xl font-bold leading-tight text-gray-900 transition-colors duration-200";

  return (
    <article className="w-full flex flex-col gap-4 bg-white rounded-2xl border border-gray-100 p-6">
      {hasSource ? (
        <Link href={story.url} className="group w-fit">
          <h1 className={`${titleClassName} group-hover:text-orange-600`}>
            {story.title}
          </h1>
        </Link>
      ) : (
        <h1 className={titleClassName}>{story.title}</h1>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
        <span className="font-medium text-gray-700">{story.by}</span>

        <span aria-hidden className="text-gray-300">
          •
        </span>

        <time dateTime={publishedAt.toISOString()}>
          {formatDate(publishedAt)}
        </time>

        <span aria-hidden className="text-gray-300">
          •
        </span>

        <span className="flex items-center gap-1.5">
          <img
            className="w-4 opacity-40"
            src={getIconPath("comments")}
            alt="Иконка комментариев"
          />
          {(story.kids ?? []).length}
        </span>
      </div>
    </article>
  );
}
