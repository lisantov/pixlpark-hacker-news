import type { Story } from "~/entities/story";
import { dateToTimeAgo } from "~/shared/lib";
import { getIconPath } from "~/shared/lib/assets";
import { Button } from "~/shared/ui/button";

interface StoryItemProps {
  story: Story;
}

export default function StoryItem({ story }: StoryItemProps) {
  const commentsCount = story.kids?.length ?? 0;

  return (
    <article className="group w-full p-5 flex flex-col gap-4 bg-white rounded-2xl border border-gray-100 transition-all duration-200 ease-out hover:border-orange-200 hover:shadow-lg hover:shadow-orange-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 flex flex-col gap-1.5">
          <h2 className="text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-orange-600">
            {story.title}
          </h2>
          <div className="text-sm text-gray-500">
            <p>
              {story.by} <span className="text-gray-300">•</span>{" "}
              {dateToTimeAgo(new Date(story.time * 1000))}
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold">
          <span>&#9650;</span>
          {story.score}
        </span>
      </div>

      <div className="flex items-end justify-between gap-3">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <img
              className="w-5 opacity-40"
              src={getIconPath("comments")}
              alt="Иконка комментариев"
            />
            {commentsCount}
          </span>
        </div>

        <Button variant="outline">Подробнее</Button>
      </div>
    </article>
  );
}
