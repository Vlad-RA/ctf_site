
"use client";

import type React from 'react';
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FlagModal from "@/components/ctf/FlagModal";
import LevelHeader from "@/components/ctf/LevelHeader";
import { LogIn, FileCode } from 'lucide-react';

const Page = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // Developer note: The credentials below are intentionally in HTML comments on the page for the CTF challenge.
    // Actual credentials to check against:
    // login: admin
    // password: pa$$w0rd
    if (username === "admin" && password === "pa$$w0rd") {
      setIsFlagModalOpen(true);
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      {/* These HTML comments are part of the challenge, findable in browser's "View Source" or "Inspect Element" */}
      <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `
        <!-- login: admin -->
        <!-- password: pa$$w0rd -->
      ` }} />
      
      <LevelHeader level={1} title="" icon={FileCode} />
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
                <Label htmlFor="username" className="text-lg text-foreground">Username</Label>
                <Input
                  id="username"
                  ref={usernameRef}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="text-lg p-3 bg-input border-border focus:ring-accent"
                  aria-label="Username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-lg text-foreground">Password</Label>
                <Input
                  id="password"
                  ref={passwordRef}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="text-lg p-3 bg-input border-border focus:ring-accent"
                  aria-label="Password"
                />
              </div>
              {error && <p className="text-destructive text-center font-medium animate-subtle-pulse">{error}</p>}
              <Button type="submit" className="w-full text-lg py-3 bg-primary hover:bg-primary/90 text-primary-foreground" aria-label="Login">
                <LogIn className="mr-2 h-5 w-5" /> Access
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
        flag="flag{adminpa$$w0rd}"
        nextLevelUrl="/level2"
      />
    </div>
  );
};

export default Page;
