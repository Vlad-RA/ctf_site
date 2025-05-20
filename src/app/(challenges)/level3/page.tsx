
"use client";

import type React from 'react';
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FlagModal from "@/components/ctf/FlagModal";
// import HintSystem from "@/components/ctf/HintSystem"; // Removed
import LevelHeader from "@/components/ctf/LevelHeader";
import { Globe, Search } from 'lucide-react';
import Image from 'next/image'; // Image will be removed

const Page = () => {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const answerRef = useRef<HTMLInputElement>(null);

  const correctAnswer = "(92E0:D09:556?0:?D:56)";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (answer.trim() === correctAnswer) {
      setIsFlagModalOpen(true);
    } else {
      setError("Incorrect answer."); // Simplified error
    }
  };
  
  const osintQuestion = "This challenge involves a bit of Open Source Intelligence (OSINT). You're looking for a specific cryptic value. It's often associated with deep space observations and has a peculiar format including colons, question marks, and hexadecimal characters. What is this value?";

  // const challengeDescription = "This is an OSINT (Open Source Intelligence) challenge. The user needs to find an answer to a question using external resources. The question is: '" + osintQuestion + "'"; // Removed
  // const playerProgress = () => `Attempted answer: ${answer}`; // Removed

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <LevelHeader level={3} title="" icon={Globe} /> {/* Title removed */}
      <div className="flex-grow flex items-center justify-center">
        <Card className="w-full max-w-lg shadow-2xl animate-slide-in bg-card border-border">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-primary"></CardTitle> {/* Title content removed */}
            <CardDescription className="text-center text-muted-foreground pt-2">
              {/* Description content removed */}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted rounded-lg shadow-inner">
              {/* "Your Mission" text removed for minimalism */}
              <p className="text-md text-foreground">
                {osintQuestion}
              </p>
              {/* Image removed for minimalism 
              <Image 
                src="https://placehold.co/600x300.png" 
                alt="Abstract representation of data or space" 
                width={600} 
                height={300} 
                className="mt-4 rounded-md shadow-md object-cover w-full"
                data-ai-hint="galaxy space"
              />
              */}
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
                  placeholder="Enter the cryptic value"
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
            {/* Hint removed */}
          </CardFooter>
        </Card>
      </div>
      <FlagModal
        isOpen={isFlagModalOpen}
        onClose={() => setIsFlagModalOpen(false)}
        flag={`flag{${correctAnswer}}`}
        nextLevelUrl="/level4"
      />
      {/* <HintSystem challengeDescription={challengeDescription} level={3} playerProgressProvider={playerProgress} /> Removed */}
    </div>
  );
};

export default Page;
