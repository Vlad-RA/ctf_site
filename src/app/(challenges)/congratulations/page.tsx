
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react'; // PartyPopper, Award, LevelHeader removed
// import LevelHeader from '@/components/ctf/LevelHeader'; // Removed
// import Image from 'next/image'; // Removed

export default function CongratulationsPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center text-center">
       {/* <LevelHeader level={7} title="" icon={Award} /> Removed */}
      
      <main className="flex-grow flex flex-col items-center justify-center animate-slide-in">
        {/* PartyPopper icon removed */}
        {/* h2 title removed */}
        {/* p description removed */}
        {/* Image removed */}
        <Link href="/level1" passHref>
          <Button
            size="lg"
            className="px-8 py-6 text-lg font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transform transition-transform hover:scale-105 shadow-lg"
            aria-label="Play Again"
          >
            <RotateCcw className="mr-3 h-6 w-6" /> Play Again
          </Button>
        </Link>
      </main>
    </div>
  );
}
