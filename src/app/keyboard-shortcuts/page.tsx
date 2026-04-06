"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Keyboard } from "lucide-react";
import { useRouter } from "next/navigation";

export default function KeyboardShortcuts() {
  const router = useRouter();

  const shortcuts = [
    { keys: ["Ctrl", "C"], action: "Copy", desc: "Copies the selected text or item." },
    { keys: ["Ctrl", "X"], action: "Cut", desc: "Cuts the selected text or item." },
    { keys: ["Ctrl", "V"], action: "Paste", desc: "Pastes the copied or cut item." },
    { keys: ["Ctrl", "Z"], action: "Undo", desc: "Undoes the last action performed." },
    { keys: ["Ctrl", "Y"], action: "Redo", desc: "Redoes the last undone action." },
    { keys: ["Ctrl", "A"], action: "Select All", desc: "Selects all text or items in the active window." },
    { keys: ["Ctrl", "F"], action: "Find", desc: "Opens a search box to find text in the document." },
    { keys: ["Ctrl", "S"], action: "Save", desc: "Saves the current document or file." },
    { keys: ["Ctrl", "P"], action: "Print", desc: "Opens the print dialog." },
    { keys: ["Ctrl", "Arrow Left/Right"], action: "Jump Word", desc: "Moves the cursor to the beginning of the previous/next word." },
    { keys: ["Ctrl", "Backspace"], action: "Delete Word", desc: "Deletes the entire word behind the cursor." },
    { keys: ["Alt", "Tab"], action: "Switch Apps", desc: "Switches between open applications." },
  ];

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <div className="max-w-4xl w-full">
        <div className="mb-8 flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")} aria-label="Go back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Keyboard className="w-6 h-6 text-primary ml-2" />
          <h1 className="text-2xl font-bold tracking-tight">Basic Keyboard Shortcuts</h1>
        </div>
        
        <div className="prose prose-blue max-w-none text-muted-foreground mb-8">
          <p>Mastering these basic keyboard shortcuts is the quickest way to improve your productivity and type faster. Avoid reaching for the mouse when your hands are already on the keyboard!</p>
        </div>

        <div className="rounded-md border bg-card overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground border-b">
              <tr>
                <th className="px-6 py-4 font-semibold w-1/3">Shortcut</th>
                <th className="px-6 py-4 font-semibold w-1/4">Action</th>
                <th className="px-6 py-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {shortcuts.map((shortcut, idx) => (
                <tr key={idx} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-1 items-center">
                      {shortcut.keys.map((key, kIdx) => (
                        <span key={kIdx} className="flex items-center">
                          <kbd className="inline-flex items-center justify-center rounded-md border bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                            {key}
                          </kbd>
                          {kIdx < shortcut.keys.length - 1 && <span className="mx-1 text-muted-foreground">+</span>}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">
                    {shortcut.action}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {shortcut.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 p-6 bg-muted/30 rounded-lg border text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Pro Tip:</strong> Mac users should substitute <kbd className="rounded-md border bg-background px-1.5 py-0.5 text-xs font-medium shadow-sm mx-1">Cmd (⌘)</kbd> for <kbd className="rounded-md border bg-background px-1.5 py-0.5 text-xs font-medium shadow-sm mx-1">Ctrl</kbd> and <kbd className="rounded-md border bg-background px-1.5 py-0.5 text-xs font-medium shadow-sm mx-1">Option (⌥)</kbd> for <kbd className="rounded-md border bg-background px-1.5 py-0.5 text-xs font-medium shadow-sm mx-1">Alt</kbd>.
          </p>
        </div>
      </div>
    </div>
  );
}
