
"use client";

import type React from 'react';
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FlagModal from "@/components/ctf/FlagModal";
// import HintSystem from "@/components/ctf/HintSystem"; // Removed
import LevelHeader from "@/components/ctf/LevelHeader";
import { AlertTriangle, Bomb } from 'lucide-react';

const Page = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const flag = "flag{YezHapTGTouUAxjmBeTWovGMYCwndUjcaNCS}";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 500 && !isOverflowed) {
      setIsOverflowed(true);
      setTimeout(() => {
        setIsFlagModalOpen(true);
      }, 500);
    } else if (value.length <= 500 && isOverflowed) {
      // setIsOverflowed(false); // Challenge implies one-way overflow
    }
  };
  
  useEffect(() => {
    if (isOverflowed) {
      document.body.classList.add('overflow-simulation-active');
      return () => document.body.classList.remove('overflow-simulation-active');
    }
  }, [isOverflowed]);

  // const challengeDescription = "This challenge simulates a buffer overflow..."; // Removed
  // const playerProgress = () => `Current input length: ${inputValue.length}`; // Removed

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
      <LevelHeader level={4} title="" icon={Bomb} /> {/* Title removed */}
      <div className={`flex-grow flex items-center justify-center transition-all duration-500 ease-in-out ${isOverflowed ? 'scale-90' : 'scale-100'}`}>
        <Card className="w-full max-w-md shadow-2xl animate-slide-in bg-card border-border">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-primary"></CardTitle> {/* Title content removed */}
            <CardDescription className="text-center text-muted-foreground pt-2">
              {/* Description content removed */}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bufferInput" className="text-lg text-foreground">Enter Value</Label>
                <Input
                  id="bufferInput"
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleChange}
                  placeholder="Try entering a lot of text..."
                  className="text-lg p-3 bg-input border-border focus:ring-accent"
                  aria-label="Value for buffer overflow simulation"
                  disabled={isOverflowed}
                />
                <p className="text-sm text-muted-foreground">
                  Characters: {inputValue.length} / 500
                </p>
              </div>
              {isOverflowed && (
                 <div className="p-4 bg-destructive/20 border border-destructive rounded-md text-center">
                    <AlertTriangle className="h-10 w-10 text-destructive mx-auto mb-2 animate-ping" />
                    <p className="text-destructive font-bold text-lg">SYSTEM STABILITY CRITICAL!</p>
                    <p className="text-destructive/80 text-sm">Excessive data input detected.</p>
                 </div>
              )}
              {!isOverflowed && (
                <Button onClick={() => inputRef.current?.focus()} className="w-full text-lg py-3 bg-primary hover:bg-primary/90 text-primary-foreground" aria-label="Focus input">
                  Prepare Input
                </Button>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {/* Hint removed */}
          </CardFooter>
        </Card>
      </div>
      <FlagModal
        isOpen={isFlagModalOpen}
        onClose={() => setIsFlagModalOpen(false)}
        flag={flag}
        nextLevelUrl="/level5"
        // title="Error: Buffer Overflow!" // Title removed from props
      />
      {/* <HintSystem challengeDescription={challengeDescription} level={4} playerProgressProvider={playerProgress} /> Removed */}
    </div>
  );
};

export default Page;
