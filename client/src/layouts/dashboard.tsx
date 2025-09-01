import NavbarDashboard from "@/components/dashboard/navbar";
import Footer from "@/components/dashboard/footer";
import Sidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
  isCreateOpen,
  setIsCreateOpen,
  onBoardCreated
}: {
  children: React.ReactNode;
  isCreateOpen?: boolean;
  setIsCreateOpen?: (open: boolean) => void;
  onBoardCreated?: () => void;
}) {
  return (
    <div className="relative flex flex-col min-h-screen bg-default-50">
      <NavbarDashboard isCreateOpen={isCreateOpen} setIsCreateOpen={setIsCreateOpen} onBoardCreated={onBoardCreated} />
        <div className="flex flex-1 min-h-0">
            <Sidebar />
            <div className="flex-1 overflow-y-auto bg-default-50 min-h-screen">
            {children}
            </div>
      </div>
      <Footer />
    </div>
  );
}
