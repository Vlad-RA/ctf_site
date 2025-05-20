
"use client";

import type React from 'react';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { generateHint, type GenerateHintInput } from "@/ai/flows/hint-generation";
import { Lightbulb, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HintSystemProps {
  challengeDescription: string;
  level: number;
  playerProgressProvider?: () => string; // Optional function to get current player progress
}

const HintSystem: React.FC<HintSystemProps> = ({
  challengeDescription,
  level,
  playerProgressProvider,
}) => {
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchHint = async () => {
    setIsLoading(true);
    setHint(null);
    try {
      const playerProgress = playerProgressProvider ? playerProgressProvider() : undefined;
      const input: GenerateHintInput = {
        challengeDescription: `Level ${level}: ${challengeDescription}`,
        playerProgress,
      };
      const result = await generateHint(input);
      setHint(result.hint);
    } catch (error) {
      console.error("Error generating hint:", error);
      toast({
        title: "Error",
        description: "Could not fetch hint. Please try again.",
        variant: "destructive",
      });
      setHint("Sorry, I couldn't generate a hint right now. Please check your connection or try again later.");
    } finally {
      setIsLoading(false);
      setIsHintModalOpen(true);
    }
  };

  return (
    <>
      <Button
        onClick={fetchHint}
        variant="outline"
        className="fixed bottom-4 right-4 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg animate-subtle-pulse z-50 rounded-full p-4 h-auto aspect-square"
        aria-label="Get a hint"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <Lightbulb className="h-6 w-6" />
        )}
      </Button>

      <Dialog open={isHintModalOpen} onOpenChange={setIsHintModalOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-primary flex items-center">
              <Lightbulb className="w-6 h-6 mr-2 text-accent" />
              Hint for Level {level}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground pt-2">
              Here's a little nudge to help you out:
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 min-h-[80px]">
            {isLoading && !hint ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            ) : (
              <p className="text-foreground whitespace-pre-wrap">{hint}</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Got it!
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HintSystem;
