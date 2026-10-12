import { useState } from "react";
import type { StoryFeedType } from "~/entities/story";
import { FeedTypeSelect, StoryList } from "~/features/storyList";

export default function Home() {
  const [type, setType] = useState<StoryFeedType>("new");

  return (
    <section className="flex flex-col gap-4">
      <StoryList
        key={type}
        type={type}
        toolbar={<FeedTypeSelect value={type} onChange={setType} />}
      />
    </section>
  );
}
