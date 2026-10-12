import { StoryList } from "~/features/storyList";

export default function Home() {
  return (
    <section className="flex flex-col gap-4">
      <StoryList />
    </section>
  );
}