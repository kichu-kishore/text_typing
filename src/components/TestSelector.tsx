import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export type Duration = 30 | 60 | 120 | 180 | 300 | 600;
export type Difficulty = "easy" | "medium" | "hard";
export type Theme =
  | "pop-culture"
  | "sport"
  | "nature"
  | "technology"
  | "traveling"
  | "mixed";
export type Story =
  | "aesops-fables"
  | "baseball-rules"
  | "space-cowboys"
  | "tigers"
  | "wizard-of-oz"
  | "zebra"
  | "enchanted-typewriter";
export type Professional = "legal" | "medical" | "business" | "coding" | "data-entry";
export type TestMode =
  | "standard"
  | "blind"
  | "tricky-spelling"
  | "benchmark"
  | "certificate"
  | "story"
  | "professional"
  | "numeric";

export interface TestConfig {
  duration: Duration;
  difficulty: Difficulty;
  theme: Theme;
  mode: TestMode;
  story?: Story;
  professional?: Professional;
}

interface TestSelectorProps {
  config: TestConfig;
  onChange: (config: Partial<TestConfig>) => void;
  onStart: () => void;
}

export default function TestSelector({
  config,
  onChange,
  onStart,
}: TestSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-center mb-2" data-testid="text-title">
            Check your typing skills in a minute
          </h2>
          <p className="text-center text-muted-foreground" data-testid="text-subtitle">
            Type away to join 150+ million test takers!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium" data-testid="label-duration">
              Test Duration
            </label>
            <Select
              value={config.duration.toString()}
              onValueChange={(value) =>
                onChange({ duration: parseInt(value) as Duration })
              }
            >
              <SelectTrigger data-testid="select-duration">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 Seconds</SelectItem>
                <SelectItem value="60">1 Minute</SelectItem>
                <SelectItem value="120">2 Minutes</SelectItem>
                <SelectItem value="180">3 Minutes</SelectItem>
                <SelectItem value="300">5 Minutes</SelectItem>
                <SelectItem value="600">10 Minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" data-testid="label-difficulty">
              Difficulty
            </label>
            <Select
              value={config.difficulty}
              onValueChange={(value) =>
                onChange({ difficulty: value as Difficulty })
              }
            >
              <SelectTrigger data-testid="select-difficulty">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy Text</SelectItem>
                <SelectItem value="medium">Medium Text</SelectItem>
                <SelectItem value="hard">Hard Text</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" data-testid="label-mode">
              Test Mode
            </label>
            <Select
              value={config.mode}
              onValueChange={(value) => onChange({ mode: value as TestMode })}
            >
              <SelectTrigger data-testid="select-mode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="blind">Blind Typing</SelectItem>
                <SelectItem value="tricky-spelling">Tricky Spelling</SelectItem>
                <SelectItem value="benchmark">Benchmark (2 min)</SelectItem>
                <SelectItem value="certificate">Certificate (5 min)</SelectItem>
                <SelectItem value="story">Story Typing</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="numeric">Numeric (10-Key)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {config.mode === "story" && (
          <div className="space-y-2">
            <label className="text-sm font-medium" data-testid="label-story">
              Choose a Story
            </label>
            <Select
              value={config.story}
              onValueChange={(value) => onChange({ story: value as Story })}
            >
              <SelectTrigger data-testid="select-story">
                <SelectValue placeholder="Select a story" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aesops-fables">Aesop's Fables</SelectItem>
                <SelectItem value="baseball-rules">Rules of Baseball</SelectItem>
                <SelectItem value="space-cowboys">Space Cowboys</SelectItem>
                <SelectItem value="tigers">Tigers in the Wild</SelectItem>
                <SelectItem value="wizard-of-oz">
                  The Wonderful Wizard of Oz
                </SelectItem>
                <SelectItem value="zebra">Zebra - Africa's Striped Horse</SelectItem>
                <SelectItem value="enchanted-typewriter">
                  The Enchanted Typewriter
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {config.mode === "professional" && (
          <div className="space-y-2">
            <label className="text-sm font-medium" data-testid="label-professional">
              Professional Field
            </label>
            <Select
              value={config.professional}
              onValueChange={(value) =>
                onChange({ professional: value as Professional })
              }
            >
              <SelectTrigger data-testid="select-professional">
                <SelectValue placeholder="Select a field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="coding">Coding</SelectItem>
                <SelectItem value="data-entry">Data Entry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {config.mode !== "standard" && (
          <div className="space-y-2">
            <label className="text-sm font-medium" data-testid="label-theme">
              Theme
            </label>
            <Select
              value={config.theme}
              onValueChange={(value) => onChange({ theme: value as Theme })}
            >
              <SelectTrigger data-testid="select-theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pop-culture">Pop Culture</SelectItem>
                <SelectItem value="sport">Sport</SelectItem>
                <SelectItem value="nature">Nature</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="traveling">Traveling</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            className="h-12 px-8 text-lg"
            onClick={onStart}
            data-testid="button-start-test"
          >
            Start Test
          </Button>
        </div>
      </div>
    </div>
  );
}
