"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TypingSpeedGuide() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <div className="max-w-4xl w-full">
        <div className="mb-8 flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Typing Speed Guide</h1>
        </div>
        <div className="prose prose-blue max-w-none">
          <h2>Understanding WPM</h2>
          <p>Words Per Minute (WPM) is the standard measurement for typing speed. An average adult types around 40 WPM, while professionals often exceed 70 WPM.</p>
        </div>
      </div>
    </div>
  );
}
