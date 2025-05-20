
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
import { AlertTriangle, Bomb, Check } from 'lucide-react';

const CURRENT_LEVEL = 4;

const Page = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const flag = "flag{YezHapTGTouUAxjmBeTWovGMYCwndUjcaNCS}"; // This is still the OLD flag
  const newQuestion = "Какое известное музыкальное мероприятие, проходящее ежегодно в Европе, в 1990-х годах носило неофициальное прозвище \"Buffer Overflow\" (BOF), из-за количества одновременно вещающих пиратских радиостанций в эфире рядом с местом проведения?";

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const maxLevelReachedString = localStorage.getItem('prtclMaxLevelReached');
      const maxLevelReached = maxLevelReachedString ? parseInt(maxLevelReachedString, 10) : 1;

      if (CURRENT_LEVEL > maxLevelReached) {
        router.replace(`/level${maxLevelReached}`);
      }
    }
  }, [router]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setError(""); 

    if (value.length > 500 && !isOverflowed) {
      setIsOverflowed(true); 
      setTimeout(() => {
        setIsFlagModalOpen(true); 
      }, 500);
    }
  };
  
  useEffect(() => {
    if (isOverflowed) {
      document.body.classList.add('overflow-simulation-active');
      return () => document.body.classList.remove('overflow-simulation-active');
    }
  }, [isOverflowed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual answer checking for the trivia question.
    // For now, the flag is triggered by the handleChange (overflow) logic.
    // This submit function needs to be updated once the correct trivia answer and new flag are known.
    // Example: if (inputValue.toLowerCase() === "actual_answer_to_trivia") { setIsFlagModalOpen(true); // and use new flag }
    setError("Данный ответ не подходит. Возможно, есть другой способ получить флаг на этом уровне?"); 
  };


  return (
    <div className={`container mx-auto px-4 py-8 min-h-screen flex flex-col transition-opacity duration-500 ${isOverflowed ? 'opacity-20 filter blur-sm' : ''}`}>
      <style jsx global>{`
        .overflow-simulation-active {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
          transform: translate3d(0, 0, 0);
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
      <LevelHeader level={4} title="" icon={Bomb} />
      <div className={`flex-grow flex items-center justify-center transition-all duration-500 ease-in-out ${isOverflowed ? 'scale-90' : 'scale-100'}`}>
        <Card className="w-full max-w-md shadow-2xl animate-slide-in bg-card border-border">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-primary"></CardTitle> 
            <CardDescription className="text-center text-muted-foreground pt-2">
              {newQuestion}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="answerInput" className="text-lg text-foreground">Answer</Label>
                <Input
                  id="answerInput"
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleChange}
                  placeholder="Enter Your Answer"
                  className="text-lg p-3 bg-input border-border focus:ring-accent"
                  aria-label="Answer"
                  disabled={isOverflowed}
                />
              </div>
              {error && <p className="text-destructive text-center font-medium animate-subtle-pulse">{error}</p>}
              {isOverflowed && (
                 <div className="p-4 bg-destructive/20 border border-destructive rounded-md text-center">
                    <AlertTriangle className="h-10 w-10 text-destructive mx-auto mb-2 animate-ping" />
                    <p className="text-destructive font-bold text-lg">SYSTEM STABILITY CRITICAL!</p>
                    <p className="text-destructive/80 text-sm">Excessive data input detected.</p>
                 </div>
              )}
              {!isOverflowed && (
                <Button type="submit" className="w-full text-lg py-3 bg-primary hover:bg-primary/90 text-primary-foreground" aria-label="Submit Answer">
                  <Check className="mr-2 h-5 w-5" /> Submit Answer
                </Button>
              )}
            </form>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>
      <FlagModal
        isOpen={isFlagModalOpen}
        onClose={() => setIsFlagModalOpen(false)}
        flag={flag} 
        nextLevelUrl="/level5"
      />
    </div>
  );
};

export default Page;
