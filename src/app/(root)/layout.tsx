import Bottombar from "@/components/Bottombar";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-screen-2xl mx-auto h-screen overflow-hidden flex gap-10">
      <Header />
      <LeftSidebar />
      <section className="flex-1 overflow-y-auto pt-[70px]">
        {children}
      </section>
      <Bottombar />
    </main>
  );
}