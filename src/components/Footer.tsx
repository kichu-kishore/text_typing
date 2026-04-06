"use client";

import { Keyboard } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")} data-testid="footer-logo">
              <Keyboard className="w-5 h-5 text-primary" />
              <span className="font-semibold">Typing Wand</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Free online typing test and training platform. Improve your typing speed and 
              accuracy with our comprehensive suite of tests, games, and practice lessons.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Typing Tests</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer transition">1 Minute Test</li>
              <li className="hover:text-foreground cursor-pointer transition">5 Minute Test</li>
              <li className="hover:text-foreground cursor-pointer transition">Benchmark Test</li>
              <li className="hover:text-foreground cursor-pointer transition">Certificate Test</li>
              <li className="hover:text-foreground cursor-pointer transition">Blind Typing</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Practice & Games</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer transition">Typing Lessons</li>
              <li className="hover:text-foreground cursor-pointer transition">Word Rain Game</li>
              <li className="hover:text-foreground cursor-pointer transition">Speed Challenge</li>
              <li className="hover:text-foreground cursor-pointer transition">Number Rush</li>
              <li className="hover:text-foreground cursor-pointer transition">Quote Race</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li 
                className="text-muted-foreground hover:text-foreground cursor-pointer transition" 
                onClick={() => navigate("/how-to-type-faster")}
                data-testid="link-how-to-type"
              >
                How to Type Faster
              </li>
              <li 
                className="text-muted-foreground hover:text-foreground cursor-pointer transition"
                onClick={() => navigate("/typing-speed-guide")}
                data-testid="link-speed-guide"
              >
                Typing Speed Guide
              </li>
              <li 
                className="text-muted-foreground hover:text-foreground cursor-pointer transition"
                onClick={() => navigate("/keyboard-shortcuts")}
                data-testid="link-shortcuts"
              >
                Keyboard Shortcuts
              </li>
              <li 
                className="text-muted-foreground hover:text-foreground cursor-pointer transition"
                onClick={() => navigate("/touch-typing-tips")}
                data-testid="link-touch-typing"
              >
                Touch Typing Tips
              </li>
              <li 
                className="text-muted-foreground hover:text-foreground cursor-pointer transition"
                onClick={() => navigate("/faq")}
                data-testid="link-faq"
              >
                FAQ
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Typing Wand. Free online typing speed test.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span 
              className="hover:text-foreground cursor-pointer transition"
              onClick={() => navigate("/about-us")}
            >
              About Us
            </span>
            <span 
              className="hover:text-foreground cursor-pointer transition"
              onClick={() => navigate("/privacy-policy")}
            >
              Privacy Policy
            </span>
            <span 
              className="hover:text-foreground cursor-pointer transition"
              onClick={() => navigate("/terms-of-service")}
            >
              Terms of Service
            </span>
            <span 
              className="hover:text-foreground cursor-pointer transition"
              onClick={() => navigate("/contact")}
            >
              Contact
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
