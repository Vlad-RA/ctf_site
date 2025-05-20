
"use client";

import type React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircle } from 'lucide-react';

interface FlagModalProps {
  isOpen: boolean;
  onClose: () => void;
  flag: string;
  nextLevelUrl: string | null; // Null for the last level
  title?: string;
}

const FlagModal: React.FC<FlagModalProps> = ({
  isOpen,
  onClose,
  flag,
  nextLevelUrl,
  title = "Challenge Solved!",
}) => {
  const router = useRouter();

  const handleProceed = () => {
    onClose();
    if (nextLevelUrl) {
      router.push(nextLevelUrl);
    } else {
      // Handle case for last level, e.g., redirect to congratulations or home
      router.push('/congratulations');
    }
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-card border-border shadow-xl animate-slide-in">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center text-2xl font-bold text-primary">
            <CheckCircle className="w-8 h-8 mr-3 text-accent animate-subtle-pulse" />
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground pt-2 text-lg">
            You've successfully found the flag:
          </AlertDialogDescription>
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
            aria-label="Proceed to next level"
          >
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FlagModal;
