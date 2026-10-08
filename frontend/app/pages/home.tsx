import type { Route } from "./+types/home";
import { StoryList } from "~/features/storyList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Список новостей" },
    { name: "description", content: "Список новостей с платформы HackerNews!" },
  ];
}

export default function Home() {
  return <StoryList />;
}
