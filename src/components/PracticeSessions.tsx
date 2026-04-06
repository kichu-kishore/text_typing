"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, Circle, Lock, Star, BookOpen, Keyboard } from "lucide-react";
import { getPracticeText } from "@/lib/content";

type Difficulty = "easy" | "medium" | "hard";

interface Lesson {
  id: string;
  title: string;
  description: string;
  keys: string;
  textKey: string;
  completed: boolean;
}

interface PracticeSessionsProps {
  onBack: () => void;
}

const lessons: Record<Difficulty, Lesson[]> = {
  easy: [
    {
      id: "home-row",
      title: "Home Row",
      description: "Master the home row keys: A S D F J K L ;",
      keys: "asdfjkl;",
      textKey: "homeRow",
      completed: false,
    },
    {
      id: "simple-words",
      title: "Simple Words",
      description: "Practice common 3-4 letter words",
      keys: "Common words",
      textKey: "commonWords",
      completed: false,
    },
    {
      id: "top-row",
      title: "Top Row",
      description: "Build strength with top row keys: Q W E R T Y U I O P",
      keys: "qwertyuiop",
      textKey: "topRow",
      completed: false,
    },
    {
      id: "bottom-row",
      title: "Bottom Row",
      description: "Practice bottom row keys: Z X C V B N M",
      keys: "zxcvbnm",
      textKey: "bottomRow",
      completed: false,
    },
  ],
  medium: [
    {
      id: "numbers",
      title: "Number Row",
      description: "Practice typing numbers fluently",
      keys: "1234567890",
      textKey: "numbers",
      completed: false,
    },
    {
      id: "sentences",
      title: "Full Sentences",
      description: "Practice typing complete sentences",
      keys: "Complete sentences",
      textKey: "sentences",
      completed: false,
    },
    {
      id: "punctuation",
      title: "Punctuation",
      description: "Master common punctuation marks",
      keys: ".,!?;:'\"",
      textKey: "punctuation",
      completed: false,
    },
    {
      id: "common-words",
      title: "Common Words",
      description: "Type frequently used words quickly",
      keys: "Top 100 words",
      textKey: "commonWords",
      completed: false,
    },
  ],
  hard: [
    {
      id: "paragraphs",
      title: "Paragraphs",
      description: "Type longer passages fluently",
      keys: "Full keyboard",
      textKey: "paragraphs",
      completed: false,
    },
    {
      id: "advanced",
      title: "Advanced Text",
      description: "Challenge yourself with technical content",
      keys: "Technical text",
      textKey: "advanced",
      completed: false,
    },
    {
      id: "speed-building",
      title: "Speed Building",
      description: "Push your speed limits with pangrams",
      keys: "Full keyboard",
      textKey: "sentences",
      completed: false,
    },
    {
      id: "accuracy-focus",
      title: "Accuracy Focus",
      description: "Focus on precision with tricky text",
      keys: "Difficult words",
      textKey: "advanced",
      completed: false,
    },
  ],
};

export default function PracticeSessions({ onBack }: PracticeSessionsProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("easy");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const handleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => new Set([...Array.from(prev), lessonId]));
    setSelectedLesson(null);
  };

  if (selectedLesson) {
    return (
      <LessonPractice
        lesson={selectedLesson}
        onBack={() => setSelectedLesson(null)}
        onComplete={() => handleLessonComplete(selectedLesson.id)}
      />
    );
  }

  const currentLessons = lessons[selectedDifficulty];
  const completedCount = currentLessons.filter((l) => completedLessons.has(l.id)).length;
  const progressPercent = (completedCount / currentLessons.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-practice-back">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-practice-title">Practice Sessions</h1>
          <p className="text-muted-foreground">Improve your typing skills step by step</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
          <Button
            key={diff}
            variant={selectedDifficulty === diff ? "default" : "outline"}
            onClick={() => setSelectedDifficulty(diff)}
            className="capitalize"
            data-testid={`button-difficulty-${diff}`}
          >
            {diff === "easy" && <Star className="w-4 h-4 mr-2" />}
            {diff === "medium" && <BookOpen className="w-4 h-4 mr-2" />}
            {diff === "hard" && <Keyboard className="w-4 h-4 mr-2" />}
            {diff}
          </Button>
        ))}
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-muted-foreground">
            {completedCount}/{currentLessons.length} completed
          </span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </Card>

      <div className="space-y-4">
        {currentLessons.map((lesson, index) => {
          const isCompleted = completedLessons.has(lesson.id);
          const isLocked = index > 0 && !completedLessons.has(currentLessons[index - 1].id);

          return (
            <Card
              key={lesson.id}
              className={`p-4 ${isLocked ? "opacity-50" : "cursor-pointer hover-elevate"}`}
              onClick={() => !isLocked && setSelectedLesson(lesson)}
              data-testid={`card-lesson-${lesson.id}`}
            >
              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : isLocked ? (
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{lesson.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {lesson.keys}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{lesson.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

interface LessonPracticeProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: () => void;
}

function LessonPractice({ lesson, onBack, onComplete }: LessonPracticeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const [practiceText, setPracticeText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const text = getPracticeText(lesson.textKey);
    setPracticeText(text);
    inputRef.current?.focus();
  }, [lesson.textKey]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (value.length > 0) {
      const newChar = value[value.length - 1];
      const newTypedText = typedText + newChar;
      setTypedText(newTypedText);

      if (newChar !== practiceText[currentIndex]) {
        setErrors((prev) => new Set([...Array.from(prev), currentIndex]));
      }

      setCurrentIndex((prev) => prev + 1);

      if (currentIndex + 1 >= practiceText.length) {
        setCompleted(true);
      }
    }
    e.target.value = "";
  };

  const accuracy = typedText.length > 0
    ? Math.round(((typedText.length - errors.size) / typedText.length) * 100)
    : 100;

  const wpm = startTime && typedText.length > 0
    ? Math.round((typedText.length / 5) / ((Date.now() - startTime) / 1000 / 60))
    : 0;

  const progress = practiceText.length > 0 ? (currentIndex / practiceText.length) * 100 : 0;

  if (completed) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 space-y-8">
        <Card className="p-12 text-center space-y-6">
          <CheckCircle2 className="w-20 h-20 mx-auto text-green-500" />
          <h2 className="text-3xl font-bold">Lesson Complete!</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="text-3xl font-bold text-primary">{wpm}</div>
              <div className="text-sm text-muted-foreground">WPM</div>
            </Card>
            <Card className="p-6">
              <div className="text-3xl font-bold text-primary">{accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </Card>
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <Button variant="outline" onClick={onBack} data-testid="button-back-to-lessons">
              Back to Lessons
            </Button>
            <Button onClick={onComplete} data-testid="button-mark-complete">
              Mark as Complete
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  if (!practiceText) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8">
        <p>Loading practice text...</p>
      </div>
    );
  }

  return (
    <div 
      className="w-full max-w-4xl mx-auto p-8 space-y-6 cursor-text"
      onClick={handleContainerClick}
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onBack(); }} data-testid="button-lesson-back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{lesson.title}</h2>
            <p className="text-sm text-muted-foreground">{lesson.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-xl font-bold" data-testid="text-lesson-wpm">{wpm}</div>
            <div className="text-xs text-muted-foreground">WPM</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold" data-testid="text-lesson-accuracy">{accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
        </div>
      </div>

      <Progress value={progress} className="h-2" />

      <Card className="p-8">
        <div className="text-2xl leading-relaxed tracking-wide font-mono" data-testid="text-lesson-content">
          {practiceText.split("").map((char, index) => {
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
          })}
        </div>
      </Card>

      <input
        ref={inputRef}
        type="text"
        onChange={handleInputChange}
        className="sr-only"
        autoComplete="off"
        autoFocus
        data-testid="input-lesson"
      />

      <div className="text-center text-sm text-muted-foreground">
        Click anywhere and start typing. Focus on accuracy first, speed comes later.
      </div>
    </div>
  );
}
