"use client";

import TypingGames from "@/components/TypingGames";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GamesPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center py-12">
      <div className="max-w-6xl w-full px-4 mb-8 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/")}
          data-testid="button-back-games"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold">Typing Games</h1>
      </div>
      <TypingGames onBack={() => router.push("/")} />
    </div>
  );
}
