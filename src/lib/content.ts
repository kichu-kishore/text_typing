import contentData from "../data/content.json";

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomItems<T>(array: T[], count: number): T[] {
  return shuffle(array).slice(0, count);
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getTypingText(difficulty: "easy" | "medium" | "hard", wordCount: number = 50): string {
  const texts = contentData.typingTexts[difficulty];
  const shuffledTexts = shuffle(texts);
  let result = "";
  let currentWordCount = 0;
  
  for (const text of shuffledTexts) {
    if (currentWordCount >= wordCount) break;
    result += (result ? " " : "") + text;
    currentWordCount += text.split(" ").length;
  }
  
  const words = result.split(" ").slice(0, wordCount);
  return words.join(" ");
}

export function getThemedText(theme: string, wordCount: number = 50): string {
  const themeKey = theme as keyof typeof contentData.themes;
  const texts = contentData.themes[themeKey] || contentData.themes.technology;
  const shuffledTexts = shuffle(texts);
  let result = "";
  let currentWordCount = 0;
  
  for (const text of shuffledTexts) {
    if (currentWordCount >= wordCount) break;
    result += (result ? " " : "") + text;
    currentWordCount += text.split(" ").length;
  }
  
  const words = result.split(" ").slice(0, wordCount);
  return words.join(" ");
}

export function getCodingText(lineCount: number = 5): string {
  const lines = getRandomItems(contentData.coding, lineCount);
  return lines.join("\n");
}

export function getStoryText(genre: string, wordCount: number = 50): string {
  const genreKey = genre as keyof typeof contentData.stories;
  const texts = contentData.stories[genreKey] || contentData.stories.adventure;
  const shuffledTexts = shuffle(texts);
  let result = "";
  let currentWordCount = 0;
  
  for (const text of shuffledTexts) {
    if (currentWordCount >= wordCount) break;
    result += (result ? " " : "") + text;
    currentWordCount += text.split(" ").length;
  }
  
  const words = result.split(" ").slice(0, wordCount);
  return words.join(" ");
}

export function getWordRainWords(count: number = 20): string[] {
  return getRandomItems(contentData.games.wordRain, count);
}

export function getSpeedChallengeTexts(count: number = 5): string[] {
  return getRandomItems(contentData.games.speedChallenge, count);
}

export function getNumberRushItems(count: number = 20): string[] {
  return getRandomItems(contentData.games.numberRush, count);
}

export function getQuoteRaceQuotes(count: number = 5): string[] {
  return getRandomItems(contentData.games.quoteRace, count);
}

export function getNumericText(count: number = 50): string {
  const items = getRandomItems(contentData.games.numberRush, count);
  return items.join(" ");
}

export function getPracticeText(type: string): string {
  if (type === "professional") {
    const categories = Object.keys(contentData.practice.professional);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)] as any;
    const texts = (contentData.practice.professional as any)[randomCategory];
    return getRandomItem(shuffle(texts));
  }
  const practiceKey = type as keyof typeof contentData.practice;
  const data = contentData.practice[practiceKey];
  const texts = Array.isArray(data) ? data : contentData.practice.homeRow;
  return getRandomItem(shuffle(texts));
}

export function getPracticeTexts(type: string, count: number = 3): string[] {
  if (type === "professional") {
    const categories = Object.keys(contentData.practice.professional);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)] as any;
    const texts = (contentData.practice.professional as any)[randomCategory];
    return getRandomItems(texts, count);
  }
  const practiceKey = type as keyof typeof contentData.practice;
  const data = contentData.practice[practiceKey];
  const texts = Array.isArray(data) ? data : contentData.practice.homeRow;
  return getRandomItems(texts, count);
}

export function getCommonWords(count: number = 20): string[] {
  return getRandomItems(contentData.practice.commonWords, count);
}

export function getRandomCharacters(count: number = 20): string[] {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(chars[Math.floor(Math.random() * chars.length)]);
  }
  return result;
}

export function getProfessionalText(category: "data-entry" | "medical" | "legal" | "business", count: number = 3): string[] {
  const texts = (contentData as any).practice?.professional?.[category] || [];
  return getRandomItems(texts, Math.min(count, texts.length));
}

export { contentData };
