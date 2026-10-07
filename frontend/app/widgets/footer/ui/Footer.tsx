import type { ReactNode } from "react";
import { Link } from "~/shared/ui";

export default function Footer(): ReactNode {
  return (
    <footer className="w-full grid grid-cols-3 px-20 py-8 bg-gray-50 shadow-[0_-5px_12px_#0000001D]">
      <p className="flex itemss-center gap-1 text-gray-400">
        Developed by
        <Link href="https://github.com/lisantov">@lisantov</Link>
      </p>
      <p className="text-center text-gray-400">Test task for PixlPark</p>
      <p className="text-right text-gray-400">
        <Link href="https://github.com/lisantov/pixlpark-hacker-news">
          Source Repo
        </Link>
      </p>
    </footer>
  );
}
