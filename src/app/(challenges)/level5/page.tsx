
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
import { ShieldAlert, ExternalLink, Bug } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  const router = useRouter();
  const [malwareName, setMalwareName] = useState("");
  const [error, setError] = useState("");
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const malwareNameRef = useRef<HTMLInputElement>(null);

  const correctMalwareName = "Trojan.Malware.300983.susgen";
  const virusTotalLink = "https://www.virustotal.com/gui/file/e0b98009110010400100009e983200e9f/detection";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (malwareName.trim() === correctMalwareName) {
      setIsFlagModalOpen(true);
    } else {
      setError("Incorrect malware name."); // Simplified error
    }
  };

  // const challengeDescription = "The user is presented with a (simulated) VirusTotal link..."; // Removed
  // const playerProgress = () => `Attempted malware name: ${malwareName}`; // Removed

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <LevelHeader level={5} title="" icon={Bug} /> {/* Title removed */}
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
              <p className="text-lg text-foreground mb-3">
                Examine the VirusTotal report for the following (simulated) sample:
              </p>
              <Link href={virusTotalLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full text-lg py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md font-medium group" >
                View Simulated Report <ExternalLink className="ml-2 h-5 w-5 group-hover:text-accent transition-colors" />
              </Link>
               {/* Note removed 
               <p className="text-xs text-muted-foreground mt-2 text-center">
                (Note: For this challenge, you don't need to analyze a real file. The answer is based on the scenario.)
              </p>
              */}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="malwareName" className="text-lg text-foreground">Enter Malware Name</Label>
                <Input
                  id="malwareName"
                  ref={malwareNameRef}
                  type="text"
                  value={malwareName}
                  onChange={(e) => setMalwareName(e.target.value)}
                  placeholder="e.g., Trojan.Variant.123"
                  className="text-lg p-3 bg-input border-border focus:ring-accent"
                  aria-label="Malware Name"
                />
              </div>
              {error && <p className="text-destructive text-center font-medium animate-subtle-pulse">{error}</p>}
              <Button type="submit" className="w-full text-lg py-3 bg-primary hover:bg-primary/90 text-primary-foreground" aria-label="Submit Malware Name">
                <ShieldAlert className="mr-2 h-5 w-5" /> Submit Identification
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
        flag={`flag{${correctMalwareName}}`}
        nextLevelUrl="/level6"
      />
      {/* <HintSystem challengeDescription={challengeDescription} level={5} playerProgressProvider={playerProgress} /> Removed */}
    </div>
  );
};

export default Page;
