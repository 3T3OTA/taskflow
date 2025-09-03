import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Spotlight } from '@/components/spotlight';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="dark:bg-primary-100/10">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.18),transparent_70%),radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.12),transparent_70%)]" />
      <Spotlight />
        {children}
      </main>
      <Footer />
    </div>
  );
}
