import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      {}
      <main className="dark:bg-primary-100/10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
