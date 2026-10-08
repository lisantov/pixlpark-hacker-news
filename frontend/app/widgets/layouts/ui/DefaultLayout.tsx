import { Outlet } from "react-router";
import { Footer } from "~/widgets/footer";
import { Header } from "~/widgets/header";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <main className="relative px-20 py-12 flex flex-col gap-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
