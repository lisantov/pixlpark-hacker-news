import type { ReactNode } from "react";
import { Footer } from "~/widgets/footer";
import { Header } from "~/widgets/header";

interface DefaultLayoutProps {
  children?: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <main className="relative px-20 py-12 flex flex-col gap-8">
        {children}
      </main>
      <Footer />
    </>
  );
}