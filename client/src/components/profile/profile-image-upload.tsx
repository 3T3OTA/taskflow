import React from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { Upload } from "lucide-react";

interface ProfileImageUploadProps {
  onImageSelected: (imageUrl: string | null) => void;
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ 
  onImageSelected
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
        onOpen(); 
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleConfirmUpload = () => {
    onImageSelected(previewImage);
    onOpenChange();
  };
  

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center">
        <Button 
          size="sm" 
          variant="flat" 
          color="primary"
          startContent={<Upload />}
          onPress={handleUploadClick}
        >
          Upload
        </Button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Preview Profile Image
              </ModalHeader>
              <ModalBody>
                {previewImage && (
                  <div className="flex justify-center">
                    <img 
                      src={previewImage} 
                      alt="Profile preview" 
                      className="max-w-full max-h-[300px] rounded-medium object-cover"
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleConfirmUpload}>
                  Use This Photo
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};