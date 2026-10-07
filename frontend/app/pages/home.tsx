import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Список новостей" },
    { name: "description", content: "Список новостей с платформы HackerNews!" },
  ];
}

export default function Home() {
  return <></>;
}
