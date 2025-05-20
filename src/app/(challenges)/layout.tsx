
import type React from 'react';

// This layout will wrap all challenge pages (level1, level2, etc.)
export default function ChallengesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow">
        {children}
      </main>
      <footer className="text-center py-4 border-t border-border text-sm text-muted-foreground">
      </footer>
    </div>
  );
}

