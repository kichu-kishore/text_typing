"use client";

import { useState } from "react";
import { Moon, Sun, Keyboard, Gamepad2, GraduationCap, HelpCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Typing Test", path: "/typing-test", icon: Keyboard },
    { label: "Games", path: "/games", icon: Gamepad2 },
    { label: "Practice", path: "/practice", icon: GraduationCap },
    { label: "FAQ", path: "/faq", icon: HelpCircle },
  ];

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <header className="w-full border-b h-16 flex items-center justify-between px-6 bg-background sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => navigate("/")}
          data-testid="text-logo"
        >
          <Image 
            src="/logo.png" 
            alt="Typing Wand Logo" 
            width={32} 
            height={32} 
            className="group-hover:scale-110 transition-transform" 
          />
          <h1 className="text-xl font-bold tracking-tight">
            Typing Wand
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={pathname === item.path ? "secondary" : "ghost"}
              size="sm"
              className="gap-2"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Image src="/logo.png" alt="Typing Wand Logo" width={24} height={24} />
                  Typing Wand
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    variant={pathname === item.path ? "secondary" : "ghost"}
                    className="justify-start gap-4 h-12 text-lg"
                    onClick={() => {
                      navigate(item.path);
                      setOpen(false);
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
