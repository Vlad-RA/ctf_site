
"use client";

import type React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  // AlertDialogTitle, // Removed
  // AlertDialogDescription, // Removed
} from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button"; // Not used directly
import { useRouter } from "next/navigation";
// import { CheckCircle } from 'lucide-react'; // Removed

interface FlagModalProps {
  isOpen: boolean;
  onClose: () => void;
  flag: string;
  nextLevelUrl: string | null; // Null for the last level
  title?: string; // Make title optional as it might not be used
}

const FlagModal: React.FC<FlagModalProps> = ({
  isOpen,
  onClose,
  flag,
  nextLevelUrl,
  title, // Title is passed but not rendered in header
}) => {
  const router = useRouter();

  const handleProceed = () => {
    onClose();
    if (nextLevelUrl) {
      router.push(nextLevelUrl);
    } else {
      router.push('/congratulations');
    }
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-card border-border shadow-xl animate-slide-in">
        <AlertDialogHeader>
          {/* Title and Description removed to be minimal */}
        </AlertDialogHeader>
        <div className="my-6 p-4 bg-muted rounded-lg text-center">
          <p className="font-mono text-xl text-accent-foreground bg-accent py-3 px-2 rounded select-all break-all shadow-inner">
            {flag}
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleProceed}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-3"
            aria-label="Proceed" // Changed from "Proceed to next level"
          >
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FlagModal;

