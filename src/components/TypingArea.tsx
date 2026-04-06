"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TestConfig } from "./TestSelector";

interface TypingAreaProps {
  text: string;
  config: TestConfig;
  onComplete: (stats: TestStats) => void;
}

export interface WpmHistoryPoint {
  time: number;
  wpm: number;
}

export interface TestStats {
  wpm: number;
  accuracy: number;
  errors: number;
  timeElapsed: number;
  correctChars: number;
  totalChars: number;
  wpmHistory: WpmHistoryPoint[];
}

export default function TypingArea({ text, config, onComplete }: TypingAreaProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(config.duration);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wpmHistory, setWpmHistory] = useState<WpmHistoryPoint[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (startTime && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          const elapsed = config.duration - (prev - 1);
          setWpmHistory((history) => [
            ...history,
            { time: elapsed, wpm: wpm }
          ]);
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, timeLeft]);

  useEffect(() => {
    if (startTime) {
      const elapsedMinutes = (Date.now() - startTime) / 1000 / 60;
      const wordsTyped = typedText.length / 5;
      const currentWpm = Math.round(wordsTyped / elapsedMinutes) || 0;
      setWpm(currentWpm);

      const totalTyped = typedText.length;
      const correctChars = totalTyped - errors.size;
      const currentAccuracy = totalTyped > 0 
        ? Math.round((correctChars / totalTyped) * 100) 
        : 100;
      setAccuracy(currentAccuracy);
    }
  }, [typedText, startTime, errors]);

  const handleComplete = () => {
    const elapsedSeconds = config.duration - timeLeft;
    const elapsedMinutes = elapsedSeconds / 60;
    const wordsTyped = typedText.length / 5;
    const finalWpm = Math.round(wordsTyped / elapsedMinutes) || 0;
    
    const correctChars = typedText.length - errors.size;
    const finalAccuracy = typedText.length > 0 
      ? Math.round((correctChars / typedText.length) * 100) 
      : 100;

    onComplete({
      wpm: finalWpm,
      accuracy: finalAccuracy,
      errors: errors.size,
      timeElapsed: elapsedSeconds,
      correctChars,
      totalChars: typedText.length,
      wpmHistory,
    });
  };

  const handleKeyPress = (char: string) => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (currentIndex >= text.length) {
      handleComplete();
      return;
    }

    const newTypedText = typedText + char;
    setTypedText(newTypedText);

    if (char !== text[currentIndex]) {
      setErrors((prev) => new Set([...Array.from(prev), currentIndex]));
    }

    setCurrentIndex((prev) => prev + 1);

    if (currentIndex + 1 >= text.length) {
      setTimeout(handleComplete, 100);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 0) {
      const newChar = value[value.length - 1];
      handleKeyPress(newChar);
    }
    e.target.value = "";
  };

  const progress = (currentIndex / text.length) * 100;
  const isBlindMode = config.mode === "blind";

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="w-full max-w-4xl mx-auto p-8 space-y-8 cursor-text"
      onClick={handleContainerClick}
    >
      <div className="flex items-center justify-center gap-12">
        <div className="text-center">
          <div className="text-3xl font-bold" data-testid="text-timer">
            {formatTime(timeLeft)}
          </div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Time Left
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold" data-testid="text-wpm">
            {wpm}
          </div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            WPM
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold" data-testid="text-accuracy">
            {accuracy}%
          </div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Accuracy
          </div>
        </div>
      </div>

      <Card className="p-12">
        {config.mode === "professional" && config.professional === "coding" && (
          <Badge className="mb-4" data-testid="badge-mode">
            Coding Mode
          </Badge>
        )}
        {config.mode === "story" && config.story && (
          <Badge className="mb-4" data-testid="badge-story">
            {config.story.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
          </Badge>
        )}
        <div 
          className={`text-2xl leading-relaxed tracking-wide ${
            config.professional === "coding" ? "font-mono" : ""
          }`}
          data-testid="text-typing-area"
        >
          {!isBlindMode ? (
            text.split("").map((char, index) => {
              let className = "text-muted-foreground";
              
              if (index < currentIndex) {
                if (errors.has(index)) {
                  className = "bg-destructive/20 text-destructive";
                } else {
                  className = "text-foreground/60";
                }
              } else if (index === currentIndex) {
                className = "border-b-2 border-primary text-foreground animate-pulse";
              }

              return (
                <span key={index} className={className}>
                  {char}
                </span>
              );
            })
          ) : (
            <div className="space-y-2">
              <div className="h-8 bg-muted/50 rounded" />
              <div className="text-center text-sm text-muted-foreground">
                Type without seeing the text (Cursor position: {currentIndex})
              </div>
            </div>
          )}
        </div>
        <input
          ref={inputRef}
          type="text"
          onChange={handleInputChange}
          className="sr-only"
          autoComplete="off"
          autoFocus
          data-testid="input-typing"
        />
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        Click anywhere and start typing. Focus on accuracy first, speed comes later.
      </div>

      <Progress value={progress} data-testid="progress-test" />
    </div>
  );
}
