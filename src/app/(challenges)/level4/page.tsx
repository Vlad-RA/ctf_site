
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
import { AlertTriangle, Bomb, Check } from 'lucide-react'; // Added Check

const Page = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isOverflowed, setIsOverflowed] = useState(false); // This state is for the old buffer overflow logic
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [error, setError] = useState(""); // Added for new answer checking
  const inputRef = useRef<HTMLInputElement>(null);

  // This flag is for the OLD buffer overflow challenge.
  const flag = "flag{YezHapTGTouUAxjmBeTWovGMYCwndUjcaNCS}";
  const newQuestion = "Какое известное музыкальное мероприятие, проходящее ежегодно в Европе, в 1990-х годах носило неофициальное прозвище \"Buffer Overflow\" (BOF), из-за количества одновременно вещающих пиратских радиостанций в эфире рядом с местом проведения?";

  // This handleChange is tied to the OLD buffer overflow logic.
  // It will still trigger if more than 500 characters are entered.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setError(""); // Clear error on new input

    // Old buffer overflow logic - will still trigger the flag modal
    if (value.length > 500 && !isOverflowed) {
      setIsOverflowed(true); // This state causes visual changes related to overflow
      setTimeout(() => {
        setIsFlagModalOpen(true); // Shows the OLD flag
      }, 500);
    } else if (value.length <= 500 && isOverflowed) {
      // setIsOverflowed(false); // Challenge implies one-way overflow
    }
  };
  
  useEffect(() => {
    // This effect is for the OLD buffer overflow visual feedback.
    if (isOverflowed) {
      document.body.classList.add('overflow-simulation-active');
      return () => document.body.classList.remove('overflow-simulation-active');
    }
  }, [isOverflowed]);

  // Placeholder for new answer submission logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is where you'd check inputValue against the correct trivia answer
    // For now, it does nothing or could show an error if not implemented
    // Example: if (inputValue.toLowerCase() === "correct trivia answer") { setIsFlagModalOpen(true); } else { setError("Incorrect answer."); }
    
    // Since the old logic in handleChange might show the flag, this submit might be confusing
    // We need the actual answer to implement this properly.
    setError("Данный ответ не подходит."); 
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
      <LevelHeader level={4} title="" icon={Bomb} /> {/* Icon might need changing for a trivia question */}
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
                <Label htmlFor="answerInput" className="text-lg text-foreground">Your Answer</Label>
                <Input
                  id="answerInput"
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleChange} // Still uses the old handleChange for overflow
                  placeholder=""
                  className="text-lg p-3 bg-input border-border focus:ring-accent"
                  aria-label="Введи свой ответ"
                  disabled={isOverflowed} // Still disabled if overflow triggered
                />
              </div>
              {error && <p className="text-destructive text-center font-medium animate-subtle-pulse">{error}</p>}
              {isOverflowed && ( // This UI is for the OLD buffer overflow
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
        flag={flag} // This is still the OLD flag
        nextLevelUrl="/level5"
      />
    </div>
  );
};

export default Page;
