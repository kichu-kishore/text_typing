"use client";

import { useState } from "react";
import TestSelector, { TestConfig } from "@/components/TestSelector";
import TypingArea from "@/components/TypingArea";
import ResultsScreen from "@/components/ResultsScreen";
import Certificate from "@/components/Certificate";
import SEOContent from "@/components/SEOContent";
import { TestStats } from "@/components/TypingArea";
import { generateText } from "@/lib/textGenerator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Screen = "selector" | "typing" | "results" | "certificate";

export default function TypingTest() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("selector");
  const [config, setConfig] = useState<TestConfig>({
    duration: 60,
    difficulty: "medium",
    theme: "mixed",
    mode: "standard",
  });
  const [testText, setTestText] = useState("");
  const [stats, setStats] = useState<TestStats | null>(null);

  const handleConfigChange = (updates: Partial<TestConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const handleStartTest = () => {
    const text = generateText(
      config.difficulty,
      config.theme,
      config.mode,
      config.duration,
      config.story,
      config.professional
    );
    setTestText(text);
    setScreen("typing");
  };

  const handleTestComplete = (testStats: TestStats) => {
    setStats(testStats);
    setScreen("results");
  };

  const handleRetry = () => {
    setScreen("typing");
  };

  const handleNewTest = () => {
    setScreen("selector");
  };

  const handleViewCertificate = () => {
    setScreen("certificate");
  };

  const handleCloseCertificate = () => {
    setScreen("results");
  };

  const renderContent = () => {
    switch (screen) {
      case "selector":
        return (
          <>
            <TestSelector
              config={config}
              onChange={handleConfigChange}
              onStart={handleStartTest}
            />
            <SEOContent />
          </>
        );
      case "typing":
        return (
          <TypingArea
            text={testText}
            config={config}
            onComplete={handleTestComplete}
          />
        );
      case "results":
        return stats ? (
          <ResultsScreen
            stats={stats}
            config={config}
            onRetry={handleRetry}
            onNewTest={handleNewTest}
            onViewCertificate={
              config.mode === "certificate" ? handleViewCertificate : undefined
            }
          />
        ) : null;
      case "certificate":
        return stats ? (
          <Certificate stats={stats} onClose={handleCloseCertificate} />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center py-12">
      <div className="max-w-6xl w-full px-4 mb-8 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/")}
          data-testid="button-back-typing-test"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold">Typing Test</h1>
      </div>
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {renderContent()}
      </div>
    </div>
  );
}
