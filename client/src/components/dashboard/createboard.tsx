import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, Input, addToast } from "@heroui/react";
import { DiamondPlus } from "lucide-react";
import { createBoard } from "@/services/api";

function CreateBoard({ isOpen, onOpenChange, onBoardCreated }: { isOpen: boolean, onOpenChange: (open: boolean) => void, onBoardCreated?: () => void }) {

    const [title, setTitle] = useState("");
    
    const handleCreateBoard = async () => {

        try {
            if (!title) {
                addToast({ title: "Please enter a title for the board.", color: "warning" });
                return;
            }
            await createBoard(title);
            addToast({ title: `Board "${title}" created successfully!`, color: "success" });
            setTitle("");
            onOpenChange(false);
            if (onBoardCreated) onBoardCreated();
        } catch (error) {
            console.error("Error creating board:", error);
            addToast({ title: "Failed to create board. Please try again.", color: "danger" });
        }
    };
  return (
    <Drawer backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        {(closeDrawer) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">Create Board</DrawerHeader>
            <DrawerBody>
              <Input
                endContent={
                  <DiamondPlus className="text-2xl text-default-400 pointer-events-none shrink-0" />
                }
                label="Title"
                placeholder="Enter the title"
                variant="bordered"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            <DrawerFooter>
              <Button color="danger" variant="flat" onPress={closeDrawer}>
                Close
              </Button>
              <Button color="primary" onPress={handleCreateBoard}>
                Create
              </Button>
            </DrawerFooter>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}

export default CreateBoard