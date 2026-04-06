"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TestStats } from "./TypingArea";
import { TestConfig } from "./TestSelector";
import { Trophy, Target, AlertCircle, Clock, TrendingUp } from "lucide-react";
import ShareDialog from "./ShareDialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ResultsScreenProps {
  stats: TestStats;
  config: TestConfig;
  onRetry: () => void;
  onNewTest: () => void;
  onViewCertificate?: () => void;
}

export default function ResultsScreen({
  stats,
  config,
  onRetry,
  onNewTest,
  onViewCertificate,
}: ResultsScreenProps) {
  const canGetCertificate = config.mode === "certificate" && config.duration === 300;

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <Trophy className="w-16 h-16 mx-auto text-primary" data-testid="icon-trophy" />
        <h2 className="text-4xl font-bold" data-testid="text-results-title">
          Test Complete!
        </h2>
        <div>
          <div className="text-6xl font-bold text-primary" data-testid="text-final-wpm">
            {stats.wpm}
          </div>
          <div className="text-lg text-muted-foreground">Words Per Minute</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center space-y-2">
          <Target className="w-8 h-8 mx-auto text-muted-foreground" />
          <div className="text-3xl font-bold" data-testid="text-stat-accuracy">
            {stats.accuracy}%
          </div>
          <div className="text-sm text-muted-foreground">Accuracy</div>
        </Card>

        <Card className="p-6 text-center space-y-2">
          <AlertCircle className="w-8 h-8 mx-auto text-muted-foreground" />
          <div className="text-3xl font-bold" data-testid="text-stat-errors">
            {stats.errors}
          </div>
          <div className="text-sm text-muted-foreground">Errors</div>
        </Card>

        <Card className="p-6 text-center space-y-2">
          <Clock className="w-8 h-8 mx-auto text-muted-foreground" />
          <div className="text-3xl font-bold" data-testid="text-stat-time">
            {Math.round(stats.timeElapsed)}s
          </div>
          <div className="text-sm text-muted-foreground">Time</div>
        </Card>

        <Card className="p-6 text-center space-y-2">
          <Trophy className="w-8 h-8 mx-auto text-muted-foreground" />
          <div className="text-3xl font-bold" data-testid="text-stat-chars">
            {stats.correctChars}/{stats.totalChars}
          </div>
          <div className="text-sm text-muted-foreground">Correct Chars</div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold" data-testid="text-wpm-chart-title">
            WPM Progress
          </h3>
        </div>
        <div className="h-64 w-full" data-testid="chart-wpm-progress">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.wpmHistory}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="time" 
                label={{ value: 'Seconds', position: 'insideBottomRight', offset: -5 }} 
              />
              <YAxis 
                label={{ value: 'WPM', angle: -90, position: 'insideLeft' }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="wpm"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4" data-testid="text-performance-title">
          Performance Analysis
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Test Duration:</span>
            <span className="font-medium" data-testid="text-config-duration">
              {config.duration >= 60 
                ? `${config.duration / 60} minute${config.duration / 60 > 1 ? "s" : ""}`
                : `${config.duration} seconds`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Difficulty:</span>
            <span className="font-medium capitalize" data-testid="text-config-difficulty">
              {config.difficulty}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Mode:</span>
            <span className="font-medium capitalize" data-testid="text-config-mode">
              {config.mode.replace("-", " ")}
            </span>
          </div>
          {stats.accuracy >= 95 && (
            <div className="mt-4 p-3 bg-primary/10 rounded-md text-center text-primary font-medium">
              Excellent accuracy! Keep up the great work!
            </div>
          )}
        </div>
      </Card>

      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={onRetry} size="lg" data-testid="button-retry">
          Retry Same Test
        </Button>
        <Button onClick={onNewTest} variant="outline" size="lg" data-testid="button-new-test">
          New Test
        </Button>
        <ShareDialog stats={stats} />
        {canGetCertificate && onViewCertificate && (
          <Button
            onClick={onViewCertificate}
            variant="default"
            size="lg"
            data-testid="button-certificate"
          >
            View Certificate
          </Button>
        )}
      </div>
    </div>
  );
}
