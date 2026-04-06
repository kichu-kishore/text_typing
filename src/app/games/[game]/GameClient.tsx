"use client";

import TypingGames from "@/components/TypingGames";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function GameClient() {
  const router = useRouter();
  const params = useParams();
  const game = params.game as any;

  return (
    <div className="flex flex-col items-center py-12">
      <div className="max-w-6xl w-full px-4 mb-8 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/games")}
          data-testid="button-back-game-detail"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold">
          {game ? game.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "Loading..."}
        </h1>
      </div>
      <TypingGames game={game} onBack={() => router.push("/games")} />
    </div>
  );
}
