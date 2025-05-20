
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PartyPopper, RotateCcw, Award } from 'lucide-react';
import LevelHeader from '@/components/ctf/LevelHeader';
import Image from 'next/image';

export default function CongratulationsPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center text-center">
       <LevelHeader level={7} title="All Challenges Completed!" icon={Award} />
      
      <main className="flex-grow flex flex-col items-center justify-center animate-slide-in">
        <PartyPopper className="w-24 h-24 text-accent mb-8 animate-bounce" />
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-primary">
          Congratulations!
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-xl">
          You've successfully navigated all the challenges!
        </p>
        <Image 
            src="https://placehold.co/400x300.png" 
            alt="Celebratory image" 
            width={400} 
            height={300}
            className="rounded-lg shadow-xl mb-10 object-cover"
            data-ai-hint="trophy success"
        />
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
