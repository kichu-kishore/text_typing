"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TouchTypingTips() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <div className="max-w-4xl w-full">
        <div className="mb-8 flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Touch Typing Tips</h1>
        </div>
        <div className="prose prose-blue max-w-none">
          <h2>Perfecting Your Form</h2>
          <p>Touch typing is all about muscle memory. Ensure you sit up straight, keep your wrists elevated, and return to the home row after each keystroke.</p>
        </div>
      </div>
    </div>
  );
}
