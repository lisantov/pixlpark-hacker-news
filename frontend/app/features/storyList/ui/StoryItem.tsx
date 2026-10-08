import type { Story } from "~/entities/story";

interface StoryItemProps {
  story: Story;
}

export default function StoryItem({ story }: StoryItemProps) {
  return (
    <article className="w-full p-4 flex flex-col gap-6 bg-gray-50 rounded-2xl">
      <div className="flex-1 flex justify-between items-start">
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-xl">{story.title}</h2>
          <p className="text-md opacity-70">{story.by}</p>
        </div>
        <p className="text-md opacity-70">
          {new Date(story.time * 1000).toLocaleString()}
        </p>
      </div>
      <div className="flex-1 flex justify-between gap-2 items-end">
        <div className="flex items-center gap-4">
          <p className="text-xs opacity-70">Рейтинг: {story.score}</p>
          <p className="text-xs opacity-70">
            Комментариев: {story.kids ? story.kids.length : 0}
          </p>
        </div>
        <button className="flex-1 w-full max-w-2xs h-12 rounded-xl">
          Подробнее
        </button>
      </div>
    </article>
  );
}
