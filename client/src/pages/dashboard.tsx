import React, { useState, useCallback } from "react";
import DashboardLayout from "@/layouts/dashboard";
import BoardsCards from "@/components/dashboard/boardscards";
import { getBoards } from "@/services/api";
import { SquareLibrary } from "lucide-react";
import { Button } from "@heroui/react";

export default function DashboardPage() {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchBoards = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getBoards();
      setBoards(data);
    } catch (error) {
      console.error("Error fetching boards:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  return (
    <DashboardLayout
      isCreateOpen={isCreateOpen}
      setIsCreateOpen={setIsCreateOpen}
      onBoardCreated={fetchBoards}
    >
      <div className="flex items-center space-x-2 px-4 mt-4 mb-5">
        <SquareLibrary />
        <h2 className="text-lg font-semibold">My Boards</h2>
        <Button className="ml-auto" color="primary" variant="solid" onClick={() => setIsCreateOpen(true)}>
          + New Board
        </Button>
      </div>
      <BoardsCards boards={boards} isLoading={isLoading} />
    </DashboardLayout>
  );
}
