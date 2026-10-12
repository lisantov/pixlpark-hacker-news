import type { StoryFeedType } from "~/entities/story";

const FEED_TYPES: { value: StoryFeedType; label: string }[] = [
  { value: "new", label: "Новые" },
  { value: "top", label: "Топ" },
  { value: "best", label: "Лучшие" },
];

interface FeedTypeSelectProps {
  value: StoryFeedType;
  onChange: (type: StoryFeedType) => void;
}

export default function FeedTypeSelect({
  value,
  onChange,
}: FeedTypeSelectProps) {
  return (
    <select
      aria-label="Вид новостей"
      value={value}
      onChange={(e) => onChange(e.target.value as StoryFeedType)}
      className="px-4 py-3 rounded-lg border border-orange-300 bg-transparent text-sm font-medium text-orange-600 cursor-pointer outline-none transition-colors duration-200 hover:border-orange-400 hover:bg-orange-50 focus:border-orange-500"
    >
      {FEED_TYPES.map((type) => (
        <option key={type.value} value={type.value}>
          {type.label}
        </option>
      ))}
    </select>
  );
}
