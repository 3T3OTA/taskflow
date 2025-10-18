import DashboardLayout from "@/layouts/dashboard";
import { useParams } from "react-router-dom";
import { getBoardById, getBoards } from "@/services/api";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@heroui/react";
import { Settings } from "lucide-react";
import List from "@/components/dashboard/list";
import EditBoardModal from "@/components/dashboard/editboardmodal";
import NotAuthorized from "@/components/dashboard/notauthorized";
import { SEO } from "@/components/SEO";

export default function BoardPage() {
  const { id } = useParams();
  const [board, setBoard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchBoard = useCallback(async () => {
    setLoading(true);
    setError(null);
    if (id) {
      try {
        const fetchedBoard = await getBoardById(id);
        setBoard(fetchedBoard);
      } catch (err: any) {
        setError(err?.message || "Something went wrong");
      }
    }
    setLoading(false);
  }, [id]);

  const fetchBoards = useCallback(async () => {
    try {
      await getBoards();
    } catch (error) {
    }
  }, []);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  return (
    <DashboardLayout
      isCreateOpen={isCreateOpen}
      setIsCreateOpen={setIsCreateOpen}
      onBoardCreated={() => {
        fetchBoards();
        fetchBoard();
      }}
    >
      <SEO
        title={board?.title || 'Board'}
        description={`Manage tasks in ${board?.title || 'your board'}`}
        keywords={['kanban board', 'task management', board?.title]}
        noindex={true}
      />
      <div className="p-8 select-none" style={{ userSelect: "none", WebkitUserSelect: "none", MozUserSelect: "none", msUserSelect: "none" }}>
        {loading ? (
          <div className="flex flex-row gap-4 overflow-x-auto p-2">
            <div className="w-72 min-w-[280px] shadow-xl bg-default-100 flex-shrink-0 rounded-xl animate-pulse ">
              <div className="p-3 flex justify-between items-center">
                <div className="h-5 w-20 bg-default-300 rounded" />
                <div className="flex gap-2">
                  <div className="h-6 w-6 bg-default-200 rounded" />
                  <div className="h-6 w-6 bg-default-200 rounded" />
                </div>
              </div>
              <div className="px-2 pb-2 pt-2 flex flex-col gap-2">
                <div className="h-10 w-full bg-default-200 rounded-xl mb-2" />
                <div className="h-10 w-full bg-default-200 rounded-xl mb-2" />
              </div>
              <div className="px-2 pb-2 pt-1">
                <div className="h-9 w-full bg-default-200 rounded-xl" />
              </div>
            </div>
          </div>
        ) : error ? (
          <NotAuthorized message={error} />
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4">
              <h1 className="text-2xl font-bold">
                Board  - #{board.title}
              </h1>
              <Button isIconOnly size="sm" aria-label="Edit Board" onPress={() => setEditOpen(true)}><Settings size={20} /></Button>
            </div>
            <EditBoardModal
              isOpen={editOpen}
              onOpenChange={setEditOpen}
              board={board}
              onBoardUpdated={updated => setBoard(updated)}
            />
            <div className="text-default-500">Board Details.</div>
            <div className="mt-6">
              <List boardData={board} />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
