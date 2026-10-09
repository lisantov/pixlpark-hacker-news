import type { ReactNode } from "react";
import { getIconPath } from "~/shared/lib/assets";
import { Link } from "~/shared/ui";

export default function Header(): ReactNode {
  return (
    <header className="w-full flex justify-center items-center px-20 py-4 sticky top-0 bg-white shadow-lg z-100">
      <Link href="/">
        <h1 className="text-3xl text-black flex items-center gap-4 font-medium">
          <img
            className="w-12 aspect-square"
            src={getIconPath("logo")}
            alt="Логотип Hacker News"
          />
          Hacker news
        </h1>
      </Link>
    </header>
  );
}
