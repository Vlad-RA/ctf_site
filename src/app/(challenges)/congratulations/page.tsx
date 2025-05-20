
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useEffect } from 'react'; // Added useEffect
import { useRouter } from 'next/navigation'; // Added useRouter

const TOTAL_LEVELS = 6; // Assuming 6 levels before congratulations
const REQUIRED_LEVEL_TO_ACCESS = TOTAL_LEVELS + 1;

export default function CongratulationsPage() {
  const router = useRouter(); // Initialize router

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const maxLevelReachedString = localStorage.getItem('prtclMaxLevelReached');
      const maxLevelReached = maxLevelReachedString ? parseInt(maxLevelReachedString, 10) : 1;

      if (maxLevelReached < REQUIRED_LEVEL_TO_ACCESS) {
        router.replace(`/level${maxLevelReached}`);
      }
    }
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center text-center">
      <main className="flex-grow flex flex-col items-center justify-center animate-slide-in">
        <Link href="/level1" passHref>
          <Button
            size="lg"
            className="px-8 py-6 text-lg font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transform transition-transform hover:scale-105 shadow-lg"
            aria-label="Play Again"
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.setItem('prtclMaxLevelReached', '1'); // Reset progress
              }
            }}
          >
            <RotateCcw className="mr-3 h-6 w-6" /> Play Again
          </Button>
        </Link>
      </main>
    </div>
  );
}
