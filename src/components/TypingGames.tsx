"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Zap, Target, Timer, HelpCircle, Sparkles } from "lucide-react";
import { 
  getWordRainWords, 
  getSpeedChallengeTexts, 
  getNumberRushItems, 
  getQuoteRaceQuotes,
  getCommonWords,
  getRandomCharacters
} from "@/lib/content";

import { useRouter } from "next/navigation";

type GameType = "word-rain" | "speed-challenge" | "number-rush" | "quote-race" | "scrambled-words" | "key-hero";

interface TypingGamesProps {
  game?: GameType;
  onBack: () => void;
}

interface FallingWord {
  id: number;
  word: string;
  x: number;
  y: number;
  speed: number;
}

export default function TypingGames({ game, onBack }: TypingGamesProps) {
  const router = useRouter();
  const selectedGame = game || null;

  const games = [
    {
      id: "word-rain" as GameType,
      title: "Word Rain",
      description: "Type falling words before they reach the bottom!",
      icon: Zap,
      color: "text-blue-500",
    },
    {
      id: "speed-challenge" as GameType,
      title: "Speed Challenge",
      description: "Type as many words as you can in 30 seconds!",
      icon: Timer,
      color: "text-green-500",
    },
    {
      id: "number-rush" as GameType,
      title: "Number Rush",
      description: "Type number sequences as fast as you can!",
      icon: Target,
      color: "text-orange-500",
    },
    {
      id: "quote-race" as GameType,
      title: "Quote Race",
      description: "Race to complete famous quotes accurately!",
      icon: Trophy,
      color: "text-purple-500",
    },
    {
      id: "scrambled-words" as GameType,
      title: "Scrambled Words",
      description: "Unscramble and type words to test your recognition!",
      icon: HelpCircle,
      color: "text-red-500",
    },
    {
      id: "key-hero" as GameType,
      title: "Key Hero",
      description: "Rapid-fire character typing to boost your raw speed!",
      icon: Sparkles,
      color: "text-yellow-500",
    },
  ];

  const handleGameSelect = (gameId: GameType) => {
    router.push(`/games/${gameId}`);
  };

  if (selectedGame === "word-rain") {
    return <WordRainGame onBack={() => router.push("/games")} />;
  }
  if (selectedGame === "speed-challenge") {
    return <SpeedChallengeGame onBack={() => router.push("/games")} />;
  }
  if (selectedGame === "number-rush") {
    return <NumberRushGame onBack={() => router.push("/games")} />;
  }
  if (selectedGame === "quote-race") {
    return <QuoteRaceGame onBack={() => router.push("/games")} />;
  }
  if (selectedGame === "scrambled-words") {
    return <ScrambledWordsGame onBack={() => router.push("/games")} />;
  }
  if (selectedGame === "key-hero") {
    return <KeyHeroGame onBack={() => router.push("/games")} />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-games-back">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold" data-testid="text-games-title">Typing Games</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Card
            key={game.id}
            className="p-6 cursor-pointer hover-elevate transition-all"
            onClick={() => handleGameSelect(game.id)}
            data-testid={`card-game-${game.id}`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-md bg-muted ${game.color}`}>
                <game.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{game.title}</h3>
                <p className="text-sm text-muted-foreground">{game.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function WordRainGame({ onBack }: { onBack: () => void }) {
  const [words, setWords] = useState<FallingWord[]>([]);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [wordPool, setWordPool] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const loadWords = useCallback(() => {
    const newWords = getWordRainWords(40);
    setWordPool(newWords);
  }, []);

  const spawnWord = useCallback(() => {
    if (wordPool.length === 0) return;
    const word = wordPool[Math.floor(Math.random() * wordPool.length)];
    const newWord: FallingWord = {
      id: Date.now() + Math.random(),
      word,
      x: Math.random() * 80 + 10,
      y: 0,
      speed: 0.5 + Math.random() * 0.5,
    };
    setWords((prev) => [...prev, newWord]);
  }, [wordPool]);

  useEffect(() => {
    if (!started || gameOver) return;
    const spawnInterval = setInterval(spawnWord, 2000);
    return () => clearInterval(spawnInterval);
  }, [started, gameOver, spawnWord]);

  useEffect(() => {
    if (!started || gameOver) return;
    const moveInterval = setInterval(() => {
      setWords((prev) => {
        const updated = prev.map((w) => ({ ...w, y: w.y + w.speed }));
        const fallen = updated.filter((w) => w.y >= 100);
        if (fallen.length > 0) {
          setLives((l) => {
            const newLives = l - fallen.length;
            if (newLives <= 0) setGameOver(true);
            return Math.max(0, newLives);
          });
        }
        return updated.filter((w) => w.y < 100);
      });
    }, 50);
    return () => clearInterval(moveInterval);
  }, [started, gameOver]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInput(value);

    const matchedWord = words.find((w) => w.word.toLowerCase() === value);
    if (matchedWord) {
      setWords((prev) => prev.filter((w) => w.id !== matchedWord.id));
      setScore((s) => s + matchedWord.word.length * 10);
      setInput("");
    }
  };

  const startGame = () => {
    loadWords();
    setStarted(true);
    setScore(0);
    setLives(3);
    setWords([]);
    setGameOver(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-wordrain-back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold">Word Rain</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold" data-testid="text-wordrain-score">{score}</div>
            <div className="text-xs text-muted-foreground">Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" data-testid="text-wordrain-lives">{"♥".repeat(lives)}</div>
            <div className="text-xs text-muted-foreground">Lives</div>
          </div>
        </div>
      </div>

      <Card
        ref={gameAreaRef}
        className="relative h-96 overflow-hidden bg-gradient-to-b from-card to-muted"
      >
        {!started ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="lg" onClick={startGame} data-testid="button-start-wordrain">
              Start Game
            </Button>
          </div>
        ) : gameOver ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <Trophy className="w-16 h-16 text-primary" />
            <div className="text-2xl font-bold">Game Over!</div>
            <div className="text-lg">Final Score: {score}</div>
            <Button onClick={startGame} data-testid="button-restart-wordrain">Play Again</Button>
          </div>
        ) : (
          words.map((word) => (
            <div
              key={word.id}
              className="absolute text-lg font-medium px-3 py-1 bg-primary text-primary-foreground rounded-md"
              style={{
                left: `${word.x}%`,
                top: `${word.y}%`,
                transform: "translateX(-50%)",
              }}
            >
              {word.word}
            </div>
          ))
        )}
      </Card>

      {started && !gameOver && (
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-full p-4 text-xl text-center border rounded-md bg-background"
          placeholder="Type the falling words..."
          autoFocus
          data-testid="input-wordrain"
        />
      )}
    </div>
  );
}

function SpeedChallengeGame({ onBack }: { onBack: () => void }) {
  const [wordList, setWordList] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadWords = useCallback(() => {
    const texts = getSpeedChallengeTexts(10);
    const allWords = texts.flatMap(t => t.split(" "));
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    setWordList(shuffled);
    setCurrentWordIndex(0);
  }, []);

  useEffect(() => {
    if (!started || gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, gameOver]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (wordList[currentWordIndex] && value.toLowerCase() === wordList[currentWordIndex].toLowerCase()) {
      setScore((s) => s + 1);
      setCurrentWordIndex((i) => i + 1);
      setInput("");
    }
  };

  const startGame = () => {
    loadWords();
    setStarted(true);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const currentWord = wordList[currentWordIndex] || "";

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-speed-back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold">Speed Challenge</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold" data-testid="text-speed-time">{timeLeft}s</div>
            <div className="text-xs text-muted-foreground">Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" data-testid="text-speed-score">{score}</div>
            <div className="text-xs text-muted-foreground">Words</div>
          </div>
        </div>
      </div>

      <Card className="p-12 text-center">
        {!started ? (
          <div className="space-y-4">
            <p className="text-muted-foreground">Type as many words as you can in 30 seconds!</p>
            <Button size="lg" onClick={startGame} data-testid="button-start-speed">
              Start Challenge
            </Button>
          </div>
        ) : gameOver ? (
          <div className="space-y-4">
            <Trophy className="w-16 h-16 mx-auto text-primary" />
            <div className="text-4xl font-bold">{score} Words!</div>
            <p className="text-muted-foreground">Great job! Can you do better?</p>
            <Button onClick={startGame} data-testid="button-restart-speed">Try Again</Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-5xl font-bold" data-testid="text-current-word">{currentWord}</div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              className="w-full max-w-md mx-auto p-4 text-2xl text-center border rounded-md bg-background"
              autoFocus
              data-testid="input-speed"
            />
          </div>
        )}
      </Card>
    </div>
  );
}

function NumberRushGame({ onBack }: { onBack: () => void }) {
  const [numberSequences, setNumberSequences] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadNumbers = useCallback(() => {
    const nums = getNumberRushItems(20);
    setNumberSequences(nums);
    setCurrentIndex(0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    const currentNum = numberSequences[currentIndex];
    if (currentNum && value === currentNum) {
      if (currentIndex >= numberSequences.length - 1) {
        setEndTime(Date.now());
      } else {
        setCurrentIndex((n) => n + 1);
        setInput("");
      }
    }
  };

  const startGame = () => {
    loadNumbers();
    setStarted(true);
    setInput("");
    setStartTime(Date.now());
    setEndTime(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const elapsedTime = endTime && startTime ? ((endTime - startTime) / 1000).toFixed(1) : null;
  const progress = numberSequences.length > 0 ? (currentIndex / numberSequences.length) * 100 : 0;

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-number-back">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold">Number Rush</h2>
      </div>

      <Card className="p-12 text-center">
        {!started ? (
          <div className="space-y-4">
            <p className="text-muted-foreground">Type number sequences as fast as you can!</p>
            <Button size="lg" onClick={startGame} data-testid="button-start-number">
              Start Rush
            </Button>
          </div>
        ) : endTime ? (
          <div className="space-y-4">
            <Trophy className="w-16 h-16 mx-auto text-primary" />
            <div className="text-4xl font-bold">{elapsedTime}s</div>
            <p className="text-muted-foreground">You completed all sequences!</p>
            <Button onClick={startGame} data-testid="button-restart-number">Try Again</Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-xs text-muted-foreground mb-2">
              {currentIndex + 1} of {numberSequences.length}
            </div>
            <div className="text-6xl font-bold text-primary font-mono" data-testid="text-current-number">
              {numberSequences[currentIndex]}
            </div>
            <Progress value={progress} className="h-2" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              className="w-full max-w-xs mx-auto p-4 text-3xl text-center border rounded-md bg-background font-mono"
              autoFocus
              data-testid="input-number"
            />
          </div>
        )}
      </Card>
    </div>
  );
}

function QuoteRaceGame({ onBack }: { onBack: () => void }) {
  const [quotes, setQuotes] = useState<string[]>([]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadedQuotes = getQuoteRaceQuotes(10);
    setQuotes(loadedQuotes);
  }, []);

  const currentQuote = quotes[quoteIndex] || "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!startTime) {
      setStartTime(Date.now());
    }

    setTypedText(value);

    if (value === currentQuote) {
      setCompleted(true);
    }
  };

  const nextQuote = () => {
    const newIndex = (quoteIndex + 1) % quotes.length;
    setQuoteIndex(newIndex);
    setTypedText("");
    setStartTime(null);
    setCompleted(false);
    inputRef.current?.focus();
  };

  const wpm = completed && startTime
    ? Math.round((currentQuote.length / 5) / ((Date.now() - startTime) / 1000 / 60))
    : 0;

  if (quotes.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8">
        <p>Loading quotes...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-6">
      <div className="flex items-center gap-4 flex-wrap">
        <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-quote-back">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold">Quote Race</h2>
        <Badge className="ml-auto">{quoteIndex + 1}/{quotes.length}</Badge>
      </div>

      <Card className="p-8">
        <div className="text-xl leading-relaxed mb-6" data-testid="text-quote">
          {currentQuote.split("").map((char, i) => {
            let className = "text-muted-foreground";
            if (i < typedText.length) {
              className = typedText[i] === char
                ? "text-foreground/60"
                : "bg-destructive/20 text-destructive";
            } else if (i === typedText.length) {
              className = "border-b-2 border-primary";
            }
            return <span key={i} className={className}>{char}</span>;
          })}
        </div>

        {completed ? (
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-primary">{wpm} WPM</div>
            <Button onClick={nextQuote} data-testid="button-next-quote">Next Quote</Button>
          </div>
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={typedText}
            onChange={handleInputChange}
            className="w-full p-4 text-lg border rounded-md bg-background"
            placeholder="Start typing..."
            autoFocus
            data-testid="input-quote"
          />
        )}
      </Card>
    </div>
  );
}

function ScrambledWordsGame({ onBack }: { onBack: () => void }) {
  const [wordPool, setWordPool] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [scrambled, setScrambled] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const nextWord = useCallback((pool: string[]) => {
    if (pool.length === 0) return;
    const word = pool[Math.floor(Math.random() * pool.length)];
    const scrambledWord = word.split('').sort(() => Math.random() - 0.5).join('');
    setCurrentWord(word);
    setScrambled(scrambledWord);
    setInput("");
  }, []);

  useEffect(() => {
    if (!started || gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, gameOver]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInput(value);
    if (value === currentWord.toLowerCase()) {
      setScore((s) => s + 10);
      nextWord(wordPool);
    }
  };

  const startGame = () => {
    const pool = getCommonWords(50);
    setWordPool(pool);
    setStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    nextWord(pool);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-scrambled-back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold">Scrambled Words</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{timeLeft}s</div>
            <div className="text-xs text-muted-foreground">Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-xs text-muted-foreground">Score</div>
          </div>
        </div>
      </div>

      <Card className="p-12 text-center">
        {!started ? (
          <div className="space-y-4">
            <p className="text-muted-foreground">Unscramble the word and type it as fast as you can!</p>
            <Button size="lg" onClick={startGame}>Start Unscrambling</Button>
          </div>
        ) : gameOver ? (
          <div className="space-y-4">
            <Trophy className="w-16 h-16 mx-auto text-primary" />
            <div className="text-4xl font-bold">Final Score: {score}</div>
            <Button onClick={startGame}>Play Again</Button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-5xl font-bold tracking-widest uppercase text-primary font-mono">
              {scrambled}
            </div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              className="w-full max-w-sm mx-auto p-4 text-2xl text-center border rounded-md bg-background"
              autoFocus
              placeholder="What's the word?"
            />
          </div>
        )}
      </Card>
    </div>
  );
}

function KeyHeroGame({ onBack }: { onBack: () => void }) {
  const [currentChar, setCurrentChar] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const nextChar = useCallback(() => {
    const chars = getRandomCharacters(1);
    setCurrentChar(chars[0]);
  }, []);

  useEffect(() => {
    if (!started || gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, gameOver]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === currentChar) {
      setScore((s) => s + 1);
      nextChar();
    } else if (e.key.length === 1) {
      // Wrong key
    }
  };

  const startGame = () => {
    setStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    nextChar();
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-keyhero-back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold">Key Hero</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{timeLeft}s</div>
            <div className="text-xs text-muted-foreground">Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-xs text-muted-foreground">Char Count</div>
          </div>
        </div>
      </div>

      <Card className="p-16 text-center">
        {!started ? (
          <div className="space-y-4">
            <p className="text-muted-foreground">Press the key shown on screen as fast as possible!</p>
            <Button size="lg" onClick={startGame}>Enter Arena</Button>
          </div>
        ) : gameOver ? (
          <div className="space-y-4">
            <Zap className="w-16 h-16 mx-auto text-primary" />
            <div className="text-4xl font-bold">{score} Keys/30s</div>
            <p className="text-muted-foreground">You are a Key Hero!</p>
            <Button onClick={startGame}>Try Again</Button>
          </div>
        ) : (
          <div className="space-y-8 flex flex-col items-center">
            <div className="w-32 h-32 flex items-center justify-center text-7xl font-bold bg-primary text-primary-foreground rounded-2xl shadow-xl animate-in zoom-in duration-300">
              {currentChar}
            </div>
            <div
              tabIndex={0}
              ref={inputRef}
              onKeyDown={handleKeyDown}
              className="opacity-0 absolute pointer-events-none"
            />
            <p className="text-sm text-muted-foreground animate-pulse">Typing now...</p>
          </div>
        )}
      </Card>
    </div>
  );
}
