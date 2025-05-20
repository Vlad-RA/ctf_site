
import type React from 'react';
import { CodeXml } from 'lucide-react'; // Using CodeXml as a general "web tech" icon

interface LevelHeaderProps {
  level: number;
  title: string;
  icon?: React.ElementType;
}

const LevelHeader: React.FC<LevelHeaderProps> = ({ level, title, icon: Icon }) => {
  return (
    <header className="py-8 px-4 sm:px-6 lg:px-8 text-center border-b border-border shadow-md animate-slide-in">
      <div className="flex items-center justify-center mb-2">
         <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary mr-3">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="3" fill="hsl(var(--accent))"/>
        </svg>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Untitled CTF
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-center">
        {Icon && <Icon className="w-7 h-7 mr-3 text-accent" />}
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
          Level {level}: <span className="text-primary">{title}</span>
        </h2>
      </div>
    </header>
  );
};

export default LevelHeader;
