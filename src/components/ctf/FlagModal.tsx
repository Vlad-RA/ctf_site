
"use client";

import type React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface FlagModalProps {
  isOpen: boolean;
  onClose: () => void;
  flag: string;
  nextLevelUrl: string | null;
  title?: string;
}

const TOTAL_LEVELS = 6; // Define the total number of levels

const FlagModal: React.FC<FlagModalProps> = ({
  isOpen,
  onClose,
  flag,
  nextLevelUrl,
  title,
}) => {
  const router = useRouter();

  const handleProceed = () => {
    onClose();

    let levelToMarkAsReachable;
    if (nextLevelUrl === '/congratulations') {
      levelToMarkAsReachable = TOTAL_LEVELS + 1; // Special value for congratulations page
    } else if (nextLevelUrl) {
      const match = nextLevelUrl.match(/\/level(\d+)/);
      if (match && match[1]) {
        levelToMarkAsReachable = parseInt(match[1], 10);
      }
    }

    if (levelToMarkAsReachable && typeof window !== 'undefined') { // Ensure localStorage is available
      const currentMaxStoredLevel = parseInt(localStorage.getItem('prtclMaxLevelReached') || '1', 10);
      if (levelToMarkAsReachable > currentMaxStoredLevel) {
        localStorage.setItem('prtclMaxLevelReached', levelToMarkAsReachable.toString());
      }
    }

    if (nextLevelUrl) {
      router.push(nextLevelUrl);
    } else {
      // Fallback if nextLevelUrl is null, though typically it should be /congratulations for the last level
      router.push('/congratulations');
    }
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-card border-border shadow-xl animate-slide-in">
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only">Challenge Complete</AlertDialogTitle>
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
            aria-label="Proceed"
          >
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FlagModal;
