import { Difficulty, Theme, Story, Professional } from "@/components/TestSelector";
import { 
  getTypingText, 
  getThemedText, 
  getCodingText, 
  getStoryText,
  getNumericText,
  getProfessionalText,
  contentData 
} from "./content";

const trickySpellingWords = [
  "accommodate", "acknowledge", "acquaintance", "apparent", "bureau", "calendar",
  "Caribbean", "colleague", "conscious", "definitely", "embarrass", "environment",
  "exaggerate", "existence", "guarantee", "harass", "independent", "judgment",
  "maintenance", "maneuver", "millennium", "necessary", "occasion", "occurred",
  "persistence", "possession", "privilege", "recommend", "referred", "separate",
  "supersede", "threshold", "unnecessary", "withhold", "questionnaire", "liaison",
];

export function generateText(
  difficulty: Difficulty,
  theme: Theme,
  mode: string,
  duration: number,
  story?: Story,
  professional?: Professional
): string {
  const wordCounts: Record<number, number> = {
    15: 25,
    30: 50,
    60: 80,
    120: 150,
    300: 300,
    600: 500,
  };

  const count = wordCounts[duration] || 50;

  if (mode === "tricky-spelling") {
    const shuffled = [...trickySpellingWords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 25).join(" ");
  }

  if (mode === "numeric") {
    return getNumericText(count);
  }

  if (mode === "story" && story) {
    return getStoryText(story, count);
  }

  if (mode === "professional" && professional) {
    if (professional === "coding") {
      return getCodingText(8);
    }
    return getProfessionalText(professional, 10).join(" ");
  }

  if (theme !== "mixed") {
    return getThemedText(theme, count);
  }

  return getTypingText(difficulty, count);
}
