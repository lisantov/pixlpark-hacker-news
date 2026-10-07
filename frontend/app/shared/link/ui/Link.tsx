import type { ReactNode } from "react";
import { NavLink } from "react-router";

interface LinkProps {
  href: string;
  children: ReactNode;
}

export default function Link({ href, children }: LinkProps) {
  if (href.startsWith("http"))
    return (
      <a
        className="text-gray-600 underline active:opacity-50 hover:opacity-70 transition-opacity duration-250"
        href={href}
      >
        {children}
      </a>
    );

  return <NavLink to={href}>{children}</NavLink>;
}
