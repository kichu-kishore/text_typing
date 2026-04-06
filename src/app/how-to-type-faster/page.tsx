"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HowToTypeFaster() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <div className="max-w-4xl w-full">
        <div className="mb-8 flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">How to Type Faster</h1>
        </div>
        <div className="prose prose-blue max-w-none">
          <h2>Master the Basics</h2>
          <p>Start by learning the home row and ensuring you are using the correct fingers for each key. Speed will naturally follow accuracy, so focus on not looking at the keyboard!</p>
        </div>
      </div>
    </div>
  );
}
