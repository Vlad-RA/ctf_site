
"use client";

import type React from 'react';
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import FlagModal from "@/components/ctf/FlagModal";
// import HintSystem from "@/components/ctf/HintSystem"; // Removed
import LevelHeader from "@/components/ctf/LevelHeader";
import { FileText, Network } from 'lucide-react';

const Page = () => {
  const router = useRouter();
  const [ipAddress, setIpAddress] = useState("");
  const [error, setError] = useState("");
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const ipAddressRef = useRef<HTMLInputElement>(null);
  const [logEntries, setLogEntries] = useState("Generating logs...");

  const correctIpAddress = "8.8.8.8";

  useEffect(() => {
    const generateRandomIp = () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    const generateRandomPath = () => {
      const paths = ["/login", "/home", "/api/data", "/assets/img.png", "/admin/panel", "/search?q=test"];
      return paths[Math.floor(Math.random() * paths.length)];
    };
    const generateRandomUser = () => {
      const users = ["user123", "test_user", "guest", "root", "service_acc"];
      return users[Math.floor(Math.random() * users.length)];
    }

    const generatedLogs = Array.from({ length: 100 }, (_, i) => {
      if (i === 73) { // Place the target log entry at a specific index
        return `8.8.8.8 - login=admin&password=pa$$w0rd - /flag_request - timestamp=${new Date().toISOString()}`;
      }
      const પાણી = i % 5 === 0 ? `login=${generateRandomUser()}&password=${Math.random().toString(36).substring(7)}` : `user=${generateRandomUser()}`;
      return `${generateRandomIp()} - ${पानी} - ${generateRandomPath()} - timestamp=${new Date(Date.now() - Math.random()*100000000).toISOString()}`;
    }).join("\n");
    setLogEntries(generatedLogs);
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (ipAddress.trim() === correctIpAddress) {
      setIsFlagModalOpen(true);
    } else {
      setError("Incorrect IP address."); // Simplified error
    }
  };

  // const challengeDescription = "The user needs to analyze a large block of simulated HTTP access logs..."; // Removed
  // const playerProgress = () => `Attempted IP address: ${ipAddress}`; // Removed

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <LevelHeader level={6} title="" icon={FileText} /> {/* Title removed */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <Card className="w-full max-w-3xl shadow-2xl animate-slide-in bg-card border-border">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-primary"></CardTitle> {/* Title content removed */}
            <CardDescription className="text-center text-muted-foreground pt-2">
              {/* Description content removed */}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-lg text-foreground mb-2 block">Simulated HTTP Access Logs:</Label>
              <ScrollArea className="h-72 w-full rounded-md border border-border bg-muted p-4 shadow-inner">
                <pre className="text-xs text-foreground whitespace-pre-wrap break-all font-mono">
                  {logEntries}
                </pre>
              </ScrollArea>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="ipAddress" className="text-lg text-foreground">Enter Suspect IP Address</Label>
                <Input
                  id="ipAddress"
                  ref={ipAddressRef}
                  type="text"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  placeholder="e.g., 192.168.1.1"
                  className="text-lg p-3 bg-input border-border focus:ring-accent font-mono"
                  aria-label="Suspect IP Address"
                />
              </div>
              {error && <p className="text-destructive text-center font-medium animate-subtle-pulse">{error}</p>}
              <Button type="submit" className="w-full text-lg py-3 bg-primary hover:bg-primary/90 text-primary-foreground" aria-label="Submit IP Address">
                <Network className="mr-2 h-5 w-5" /> Submit IP
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
        flag={`ip{${correctIpAddress}}`}
        nextLevelUrl="/congratulations"
      />
      {/* <HintSystem challengeDescription={challengeDescription} level={6} playerProgressProvider={playerProgress} /> Removed */}
    </div>
  );
};

export default Page;
