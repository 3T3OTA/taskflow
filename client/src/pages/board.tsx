import DashboardLayout from "@/layouts/dashboard";
import { useParams } from "react-router-dom";
import { getBoardById } from "@/services/api";
import { useEffect, useState } from "react";
import List from "@/components/dashboard/list";
export default function BoardPage() {
  const { id } = useParams();
  const [board, setBoard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            <h1 className="text-2xl font-bold mb-4">
              Board  - #{board.title}
            </h1>
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
