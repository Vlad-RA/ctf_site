
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
import { KeyRound, Inspect } from 'lucide-react';

const CURRENT_LEVEL = 2;

const Page = () => {
  const router = useRouter();
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState("");
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const accessKeyRef = useRef<HTMLInputElement>(null);

  const correctAccessKey = "accesskey-94831";

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const maxLevelReachedString = localStorage.getItem('prtclMaxLevelReached');
      const maxLevelReached = maxLevelReachedString ? parseInt(maxLevelReachedString, 10) : 1;

      if (CURRENT_LEVEL > maxLevelReached) {
        router.replace(`/level${maxLevelReached}`);
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (accessKey === correctAccessKey) {
      setIsFlagModalOpen(true);
    } else {
      setError("Incorrect access key.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <LevelHeader level={2} title="" icon={Inspect} />
      <div className="accesskey-94831 w-0 h-0 overflow-hidden" aria-hidden="true"></div>
      
      <div className="flex-grow flex items-center justify-center">
        <Card className="w-full max-w-md shadow-2xl animate-slide-in bg-card border-border">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-primary"></CardTitle>
            <CardDescription className="text-center text-muted-foreground pt-2">
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="accessKey" className="text-lg text-foreground">Enter Access Key</Label>
                <Input
                  id="accessKey"
                  ref={accessKeyRef}
                  type="text"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  placeholder="e.g., format-12345"
                  className="text-lg p-3 bg-input border-border focus:ring-accent"
                  aria-label="Access Key"
                />
              </div>
              {error && <p className="text-destructive text-center font-medium animate-subtle-pulse">{error}</p>}
              <Button type="submit" className="w-full text-lg py-3 bg-primary hover:bg-primary/90 text-primary-foreground" aria-label="Submit Access Key">
                <KeyRound className="mr-2 h-5 w-5" /> Submit Key
              </Button>
            </form>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>
      <FlagModal
        isOpen={isFlagModalOpen}
        onClose={() => setIsFlagModalOpen(false)}
        flag="flag{accesskey-94831}"
        nextLevelUrl="/level3"
      />
    </div>
  );
};

export default Page;
