
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-slate-900 text-foreground">
      <header className="text-center mb-12 animate-slide-in" style={{animationDelay: '0.1s'}}>
         <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary mx-auto mb-6">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="3.5" fill="hsl(var(--accent))" stroke="hsl(var(--primary))" strokeWidth="1"/>
        </svg>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight
                       bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-accent">
          WebWiz CTF
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Embark on a series of interactive web challenges designed to test your skills in security, OSINT, and browser tool mastery.
        </p>
      </header>

      <main className="animate-slide-in" style={{animationDelay: '0.3s'}}>
        <Link href="/level1" passHref>
          <Button
            size="lg"
            className="px-10 py-7 text-xl font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transform transition-transform hover:scale-105 shadow-lg"
            aria-label="Start Challenges"
          >
            Start Challenges
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </Link>
      </main>

      <section className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl text-center animate-slide-in" style={{animationDelay: '0.5s'}}>
        <div className="p-6 bg-card rounded-xl shadow-md border border-border/50">
          <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-primary-foreground">Diverse Challenges</h3>
          <p className="text-muted-foreground text-sm">From source code sleuthing to OSINT mysteries, tackle a variety of web-based puzzles.</p>
        </div>
        <div className="p-6 bg-card rounded-xl shadow-md border border-border/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-primary mx-auto mb-4 lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
          <h3 className="text-xl font-semibold mb-2 text-primary-foreground">AI-Powered Hints</h3>
          <p className="text-muted-foreground text-sm">Stuck? Get contextual hints from our AI assistant to guide you through.</p>
        </div>
        <div className="p-6 bg-card rounded-xl shadow-md border border-border/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-primary mx-auto mb-4 lucide lucide-smartphone"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
          <h3 className="text-xl font-semibold mb-2 text-primary-foreground">Mobile Friendly</h3>
          <p className="text-muted-foreground text-sm">Solve challenges on the go. Fully compatible with mobile browsers.</p>
        </div>
      </section>

      <footer className="mt-16 text-center text-sm text-muted-foreground animate-slide-in" style={{animationDelay: '0.7s'}}>
        <p>&copy; {new Date().getFullYear()} WebWiz CTF. All rights reserved.</p>
        <p>Designed by Firebase Studio.</p>
      </footer>
    </div>
  );
}
