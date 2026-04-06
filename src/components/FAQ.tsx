import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I start a typing test?",
        a: "Simply select your preferred test duration (30 seconds to 10 minutes), choose a difficulty level (Easy, Medium, or Hard), and click the 'Start Test' button. The test begins as soon as you start typing.",
      },
      {
        q: "What is WPM and how is it calculated?",
        a: "WPM stands for Words Per Minute. It measures your typing speed by counting the total number of characters typed, dividing by 5 (the average word length), and then calculating the rate per minute. This is the standard method used worldwide.",
      },
      {
        q: "How is typing accuracy calculated?",
        a: "Accuracy is calculated by dividing the number of correctly typed characters by the total characters typed, then multiplying by 100 to get a percentage. A score of 95% or higher is considered excellent.",
      },
      {
        q: "Can I practice without a time limit?",
        a: "Yes! Our Practice Sessions allow you to focus on specific skills like home row keys, punctuation, or coding syntax without the pressure of a countdown timer.",
      },
    ],
  },
  {
    category: "Test Modes",
    questions: [
      {
        q: "What is Blind Typing mode?",
        a: "Blind Typing mode hides the text you're typing, forcing you to rely entirely on muscle memory. This advanced mode helps develop touch typing skills where you don't need to look at the keyboard or screen.",
      },
      {
        q: "What is the Benchmark test?",
        a: "The Benchmark test is a standardized 2-minute typing assessment that provides a reliable measure of your typing proficiency. It uses consistent text difficulty to ensure fair comparisons over time.",
      },
      {
        q: "How do I get a typing certificate?",
        a: "Select the 'Certificate' mode which requires a 5-minute test. Upon completion, you'll receive a printable certificate showing your WPM and accuracy. This certificate is suitable for sharing on LinkedIn or with employers.",
      },
      {
        q: "What are the Professional typing tests?",
        a: "Professional tests include specialized vocabulary for Legal, Medical, Business, and Coding fields. These help professionals practice with terminology they encounter in their daily work.",
      },
    ],
  },
  {
    category: "Typing Games",
    questions: [
      {
        q: "What typing games are available?",
        a: "We offer four engaging games: Word Rain (type falling words), Speed Challenge (30-second word sprint), Number Rush (type 1-100 quickly), and Quote Race (type famous quotes accurately).",
      },
      {
        q: "Do games help improve typing speed?",
        a: "Absolutely! Games make practice enjoyable and help build muscle memory through repetition. The competitive element motivates you to improve while having fun.",
      },
      {
        q: "Are game scores saved?",
        a: "Currently, scores are tracked during your session. We recommend noting your high scores to track improvement over time.",
      },
    ],
  },
  {
    category: "Practice Sessions",
    questions: [
      {
        q: "How are practice lessons organized?",
        a: "Lessons are divided into three difficulty levels: Easy (home row, simple words), Medium (numbers, punctuation, capitals), and Hard (special characters, coding, advanced speed). Complete lessons sequentially to unlock new ones.",
      },
      {
        q: "What typing skills can I practice?",
        a: "You can practice home row keys, left and right hand coordination, number typing, capital letters, punctuation marks, special characters, coding syntax, speed building, and accuracy improvement.",
      },
      {
        q: "How long does each practice lesson take?",
        a: "Each lesson takes about 1-3 minutes to complete. The focus is on quality over quantity, ensuring you master each skill before moving on.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        q: "Does the app work on mobile devices?",
        a: "While the app is accessible on mobile devices, we recommend using a desktop or laptop with a physical keyboard for the best typing experience and accurate speed measurements.",
      },
      {
        q: "Is my data stored or shared?",
        a: "No. All typing tests run entirely in your browser. We don't collect, store, or share any personal data or typing statistics. Your privacy is fully protected.",
      },
      {
        q: "Why isn't my typing being registered?",
        a: "Make sure you've clicked on the typing area to focus it. If issues persist, try refreshing the page. The input field must be active for keystrokes to register.",
      },
      {
        q: "Can I use this for employment testing?",
        a: "Yes! Our typing tests use industry-standard WPM calculation methods. The Certificate mode provides a professional document suitable for job applications.",
      },
    ],
  },
  {
    category: "Tips & Improvement",
    questions: [
      {
        q: "How can I improve my typing speed?",
        a: "Practice regularly with our lessons, focus on accuracy before speed, use proper finger placement on the home row (ASDF JKL;), and gradually challenge yourself with harder texts. Consistency is key.",
      },
      {
        q: "What is a good typing speed?",
        a: "Average typing speed is around 40 WPM. 50-60 WPM is considered good, 70-80 WPM is proficient, and 90+ WPM is excellent. Professional typists often exceed 100 WPM.",
      },
      {
        q: "Should I focus on speed or accuracy?",
        a: "Always prioritize accuracy first. A high accuracy rate (95%+) at a moderate speed is better than fast typing with many errors. Speed naturally improves as accuracy becomes consistent.",
      },
      {
        q: "How often should I practice?",
        a: "We recommend 15-30 minutes of daily practice for optimal improvement. Regular short sessions are more effective than occasional long ones.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <HelpCircle className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold" data-testid="text-faq-title">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about Typing Wand, games, and practice features.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="p-6">
            <h3 className="text-lg font-semibold mb-4" data-testid={`text-faq-category-${sectionIndex}`}>
              {section.category}
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {section.questions.map((faq, index) => (
                <AccordionItem key={index} value={`${sectionIndex}-${index}`}>
                  <AccordionTrigger 
                    className="text-left"
                    data-testid={`button-faq-${sectionIndex}-${index}`}
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        ))}
      </div>
    </div>
  );
}
