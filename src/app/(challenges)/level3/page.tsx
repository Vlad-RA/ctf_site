
"use client";

import type React from 'react';
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FlagModal from "@/components/ctf/FlagModal";
import LevelHeader from "@/components/ctf/LevelHeader";
import { Globe, Search } from 'lucide-react';

const CURRENT_LEVEL = 3;

const Page = () => {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const answerRef = useRef<HTMLInputElement>(null);

  const correctAnswer = "hunter2";
  const osintQuestion = "<Cthon98>: hey, if you type in your pw, it will show as stars";

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const maxLevelReachedString = localStorage.getItem('prtclMaxLevelReached');
      const maxLevelReached = maxLevelReachedString ? parseInt(maxLevelReachedString, 10) : 1;

      if (CURRENT_LEVEL > maxLevelReached) {
        router.replace(`/level${maxLevelReached}`);
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (answer.trim() === correctAnswer) {
      setIsFlagModalOpen(true);
    } else {
      setError("Incorrect answer.");
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <LevelHeader level={3} title="" icon={Globe} />
      <div className="flex-grow flex items-center justify-center">
        <Card className="w-full max-w-lg shadow-2xl animate-slide-in bg-card border-border">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-primary"></CardTitle>
            <CardDescription className="text-center text-muted-foreground pt-2">
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted rounded-lg shadow-inner">
              <p className="text-md text-foreground font-mono">
                {osintQuestion}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="osintAnswer" className="text-lg text-foreground">Your Answer</Label>
                <Input
                  id="osintAnswer"
                  ref={answerRef}
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter the answer"
                  className="text-lg p-3 bg-input border-border focus:ring-accent"
                  aria-label="OSINT Answer"
                />
              </div>
              {error && <p className="text-destructive text-center font-medium animate-subtle-pulse">{error}</p>}
              <Button type="submit" className="w-full text-lg py-3 bg-primary hover:bg-primary/90 text-primary-foreground" aria-label="Submit Answer">
                <Search className="mr-2 h-5 w-5" /> Submit Answer
              </Button>
            </form>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>
      <FlagModal
        isOpen={isFlagModalOpen}
        onClose={() => setIsFlagModalOpen(false)}
        flag={`flag{${correctAnswer}}`}
        nextLevelUrl="/level4"
      />
    </div>
  );
};

export default Page;
