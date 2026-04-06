"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Gamepad2, BookOpen, HelpCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  const features = [
    {
      icon: Zap,
      title: "Typing Test",
      description: "Test your typing speed with multiple durations and difficulty levels",
      route: "/typing-test",
      testid: "button-typing-test-home",
    },
    {
      icon: Gamepad2,
      title: "Games",
      description: "Play fun typing games to improve your skills",
      route: "/games",
      testid: "button-games-home",
    },
    {
      icon: BookOpen,
      title: "Practice",
      description: "Structured practice lessons for all levels",
      route: "/practice",
      testid: "button-practice-home",
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Find answers to common typing questions",
      route: "/faq",
      testid: "button-faq-home",
    },
  ];

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Typing Wand</h1>
          <p className="text-xl text-muted-foreground">
            Master your keyboard with our complete <strong>free online typing speed test</strong>. 
            Track your <strong>typing speed test score</strong> (WPM), improve accuracy, and practice with specialized modes like 
            <strong> typing test numbers</strong> and the classic <strong>typing speed test for 5 minutes</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(feature.route)}
                data-testid={feature.testid}
              >
                <div className="flex flex-col h-full space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold">{feature.title}</h2>
                  </div>
                  <p className="text-muted-foreground flex-1">
                    {feature.description}
                  </p>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(feature.route);
                    }}
                    data-testid={`link-${feature.title.toLowerCase()}`}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="bg-muted p-8 rounded-lg space-y-4 text-center">
          <h2 className="text-2xl font-bold">Why Take a Typing Speed Test?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Typing is an essential skill in today's digital world. Whether you're a student, professional, or casual user, taking a regular <strong>typing speed test in English</strong> can significantly boost your productivity. Challenge yourself with a <strong>typing speed test numbers only</strong> mode to build precision, or try quick 1-minute bursts to enhance your reflexes.
          </p>
        </div>
      </div>
    </div>
  );
}
