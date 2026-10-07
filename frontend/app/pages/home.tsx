import { storyService } from "~/entities/story/api/story.service";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Список новостей" },
    { name: "description", content: "Список новостей с платформы HackerNews!" },
  ];
}

export async function clientLoader() {
  const stories = await storyService.newStories();
  return stories;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      {loaderData.map((s) => (
        <p>{s}</p>
      ))}
    </>
  );
}
