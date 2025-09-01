import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, addToast, Image } from "@heroui/react";
import { updateBoard, deleteBoard } from "@/services/api";
import { useNavigate } from "react-router-dom";

interface EditBoardModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  board: any;
  onBoardUpdated?: (updated: any) => void;
}

const EditBoardModal: React.FC<EditBoardModalProps> = ({ isOpen, onOpenChange, board, onBoardUpdated }) => {
  const [title, setTitle] = useState(board?.title || "");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(board?.image || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTitle(board?.title || "");
      setPreview(board?.image || null);
      setImage(null);
    }
  }, [isOpen, board?.title, board?.image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!title) {
      addToast({ title: "Please enter a board title.", color: "warning" });
      return;
    }
    setLoading(true);
    try {
      const updated = await updateBoard(board.id, title, image);
      addToast({ title: "Board updated successfully!", color: "success" });
      if (onBoardUpdated) {
        onBoardUpdated({ ...board, ...updated });
      }
      onOpenChange(false);
    } catch (err) {
      addToast({ title: "Failed to update board.", color: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this board? This action cannot be undone.")) return;
    setLoading(true);
    try {
      await deleteBoard(board.id);
      addToast({ title: "Board deleted successfully!", color: "success" });
      onOpenChange(false);
      navigate("/dashboard");
    } catch (err) {
      addToast({ title: "Failed to delete board.", color: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" placement="center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Board</ModalHeader>
            <ModalBody className="flex flex-col gap-4">
              <Input
                label="Title"
                placeholder="Enter board title"
                variant="bordered"
                value={title}
                onChange={e => setTitle(e.target.value)}
                isRequired
              />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-default-700">Board Image</label>
                {preview && (
                  <Image src={preview} alt="Board preview" className="w-full max-h-40 object-cover rounded-xl border border-default-200" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={handleDelete} isLoading={loading}>
                Delete
              </Button>
              <Button color="primary" variant="flat" onPress={handleSave} isLoading={loading}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditBoardModal;
