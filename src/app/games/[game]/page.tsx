import GameClient from "./GameClient";

export async function generateStaticParams() {
  const games = ["word-rain", "speed-challenge", "number-rush", "quote-race", "scrambled-words", "key-hero"];
  return games.map((game) => ({
    game: game,
  }));
}

export default async function GamePage({ 
  params 
}: { 
  params: Promise<{ game: string }> 
}) {
  const { game } = await params;
  return <GameClient />;
}
