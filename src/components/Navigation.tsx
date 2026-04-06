import { Button } from "@/components/ui/button";
import { Keyboard, Gamepad2, GraduationCap, HelpCircle } from "lucide-react";

type View = "home" | "test" | "games" | "practice" | "faq";

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-4 border-b flex-wrap">
      <Button
        variant={currentView === "test" ? "default" : "ghost"}
        onClick={() => onViewChange("test")}
        data-testid="nav-test"
      >
        <Keyboard className="w-4 h-4 mr-2" />
        Typing Test
      </Button>
      <Button
        variant={currentView === "games" ? "default" : "ghost"}
        onClick={() => onViewChange("games")}
        data-testid="nav-games"
      >
        <Gamepad2 className="w-4 h-4 mr-2" />
        Games
      </Button>
      <Button
        variant={currentView === "practice" ? "default" : "ghost"}
        onClick={() => onViewChange("practice")}
        data-testid="nav-practice"
      >
        <GraduationCap className="w-4 h-4 mr-2" />
        Practice
      </Button>
      <Button
        variant={currentView === "faq" ? "default" : "ghost"}
        onClick={() => onViewChange("faq")}
        data-testid="nav-faq"
      >
        <HelpCircle className="w-4 h-4 mr-2" />
        FAQ
      </Button>
    </div>
  );
}
