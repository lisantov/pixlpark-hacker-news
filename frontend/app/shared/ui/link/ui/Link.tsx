import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface LinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

const externalLinkClassName =
  "text-gray-600 underline active:opacity-50 hover:opacity-70 transition-opacity duration-250";

export default function Link({ href, className, children }: LinkProps) {
  if (href.startsWith("http"))
    return (
      <a className={`${externalLinkClassName} ${className}`} href={href}>
        {children}
      </a>
    );

  return (
    <NavLink className={className} to={href}>
      {children}
    </NavLink>
  );
}
