import DashboardLayout from "@/layouts/dashboard";
import { useParams } from "react-router-dom";
import { getBoardById } from "@/services/api";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Settings } from "lucide-react";
import List from "@/components/dashboard/list";
import EditBoardModal from "@/components/dashboard/editboardmodal";

export default function BoardPage() {
  const { id } = useParams();
  const [board, setBoard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    const fetchBoard = async () => {
      setLoading(true);
      setError(null);
      if (id) {
        try {
          const fetchedBoard = await getBoardById(id);
          setBoard(fetchedBoard);
        } catch (err: any) {
          setError(err?.error || "Something went wrong");
        }
      }
      setLoading(false);
    };
    fetchBoard();
  }, [id]);

  return (
    <DashboardLayout>
      <div className="p-8">
        {loading ? (
          <div className="text-default-500">Loading...</div>
        ) : error ? (
          <div className="text-danger-500 font-bold">{error}</div>
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
