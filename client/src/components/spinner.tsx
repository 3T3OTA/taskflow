import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface SpinnerComponentProps {
  fullScreen?: boolean;
}

export default function SpinnerComponent({
  fullScreen = true,
}: SpinnerComponentProps) {
  const [showLoader, setShowLoader] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div 
      className={clsx(
        "flex items-center justify-center transition-opacity duration-300",
        fullScreen ? "h-screen" : "h-full min-h-[200px]",
        showLoader ? "opacity-100" : "opacity-0"
      )}
    >
      <Spinner variant="wave" size="lg" className="text-primary" />
    </div>
  );
}