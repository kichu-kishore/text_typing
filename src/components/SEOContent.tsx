import { Card } from "@/components/ui/card";
import { 
  Keyboard, 
  Zap, 
  Target, 
  Trophy, 
  Clock, 
  Users,
  CheckCircle2,
  TrendingUp,
  Shield,
  Sparkles
} from "lucide-react";

export default function SEOContent() {
  return (
    <div className="w-full">
      <section className="w-full max-w-6xl mx-auto px-8 py-16 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold" data-testid="text-seo-title">
            The Ultimate Online Typing Speed Test & Training Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Improve your <strong>typing speed test</strong> performance and accuracy with our 
            comprehensive suite of tools. Whether you're looking for a quick <strong>typing speed test 1 minute</strong> practice, 
            a full <strong>typing speed test for 5 minutes</strong>, or a specialized <strong>typing speed test numeric</strong> challenge, 
            our <strong>free online</strong> platform provides real-time WPM tracking and detailed analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Real-Time Speed Tracking</h3>
            <p className="text-muted-foreground">
              Watch your Words Per Minute (WPM) update live as you type. Our accurate 
              measurement system uses industry-standard calculations trusted by employers 
              and educational institutions worldwide.
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Precision Accuracy Analysis</h3>
            <p className="text-muted-foreground">
              Get instant feedback on every keystroke. Visual highlighting shows correct 
              and incorrect characters, helping you identify and improve weak areas in 
              your typing technique.
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Professional Certificates</h3>
            <p className="text-muted-foreground">
              Earn printable typing certificates after completing our 5-minute certification 
              test. Perfect for job applications, resumes, and professional portfolios to 
              showcase your skills.
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              Why Typing Speed Matters in Today's Digital World
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                In our increasingly digital workplace, typing proficiency has become an essential 
                skill. Whether you're a student, professional, writer, programmer, or data entry 
                specialist, faster typing directly translates to increased productivity and efficiency.
              </p>
              <p>
                Studies show that improving your typing speed from 40 WPM to 60 WPM can save you 
                over 20 hours per month on keyboard-related tasks. This time savings compounds 
                significantly over your career, making a regular <strong>typing speed test</strong> practice one of the highest-return 
                investments in personal development.
              </p>
              <p>
                Our free typing test platform helps you benchmark your current speed, practice with 
                engaging exercises, and track your improvement over time. Start your journey to 
                faster, more accurate typing today.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">150M+</div>
              <div className="text-sm text-muted-foreground">Tests Taken</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">6</div>
              <div className="text-sm text-muted-foreground">Test Durations</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">4</div>
              <div className="text-sm text-muted-foreground">Fun Games</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">12+</div>
              <div className="text-sm text-muted-foreground">Practice Lessons</div>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center">
            Comprehensive Typing Test Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Multiple Test Durations</h4>
                <p className="text-sm text-muted-foreground">
                  Choose from 30-second quick tests to 10-minute endurance challenges. 
                  Our <strong>typing speed test 1 minute</strong> option is perfect for quick practice, while longer tests like the <strong>typing speed test 5 minutes</strong>
                  provide more accurate speed assessments.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Adjustable Difficulty Levels</h4>
                <p className="text-sm text-muted-foreground">
                  Easy mode uses common words, Medium includes varied vocabulary, and 
                  Hard challenges you with complex terminology. Progress through levels 
                  as your skills improve.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Themed Text Categories</h4>
                <p className="text-sm text-muted-foreground">
                  Practice with content that interests you: Pop Culture, Sports, Nature, 
                  Technology, Travel, and more. Engaging content makes practice enjoyable 
                  and improves retention.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Professional Industry Tests</h4>
                <p className="text-sm text-muted-foreground">
                  Specialized tests for Legal, Medical, Business, and Coding professionals. 
                  Practice with terminology specific to your field for real-world typing improvement.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Story Typing Mode</h4>
                <p className="text-sm text-muted-foreground">
                  Type through classic stories like Aesop's Fables and The Wizard of Oz. 
                  Story mode combines reading enjoyment with typing practice for a unique 
                  learning experience.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Blind Typing Challenge</h4>
                <p className="text-sm text-muted-foreground">
                  Test your touch typing skills without visual feedback. This advanced mode 
                  is perfect for developing true keyboard mastery where you type by feel alone.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center">
            How to Improve Your Typing Speed: Expert Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto font-bold">1</div>
              <h4 className="font-semibold">Master Home Row</h4>
              <p className="text-sm text-muted-foreground">
                Keep fingers on ASDF JKL; keys. This foundation is essential for touch typing.
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto font-bold">2</div>
              <h4 className="font-semibold">Prioritize Accuracy</h4>
              <p className="text-sm text-muted-foreground">
                Speed follows accuracy. Focus on typing correctly first, then gradually increase pace.
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto font-bold">3</div>
              <h4 className="font-semibold">Practice Daily</h4>
              <p className="text-sm text-muted-foreground">
                15-30 minutes of consistent daily practice yields better results than sporadic sessions.
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto font-bold">4</div>
              <h4 className="font-semibold">Don't Look Down</h4>
              <p className="text-sm text-muted-foreground">
                Train yourself to keep eyes on screen. Use our Blind Mode to develop muscle memory.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 space-y-4">
            <Shield className="w-8 h-8 text-primary" />
            <h3 className="text-lg font-semibold">100% Privacy Protected</h3>
            <p className="text-sm text-muted-foreground">
              All tests run locally in your browser. We never collect, store, or share any 
              personal data or typing statistics. Your practice sessions remain completely private.
            </p>
          </Card>
          <Card className="p-6 space-y-4">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h3 className="text-lg font-semibold">Track Your Progress</h3>
            <p className="text-sm text-muted-foreground">
              Compare your results across sessions to see improvement. Our detailed statistics 
              show WPM, accuracy, errors, and time helping you identify areas for growth.
            </p>
          </Card>
          <Card className="p-6 space-y-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h3 className="text-lg font-semibold">Completely Free</h3>
            <p className="text-sm text-muted-foreground">
              Access all features without any cost. No registration required, no premium tiers, 
              no ads interrupting your practice. Just pure, focused typing improvement.
            </p>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">
            Typing Speed Benchmarks: Where Do You Stand?
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Category</th>
                  <th className="text-left p-4 font-semibold">WPM Range</th>
                  <th className="text-left p-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="p-4">Beginner</td>
                  <td className="p-4">0-30 WPM</td>
                  <td className="p-4">Learning to type, using hunt-and-peck method</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Average</td>
                  <td className="p-4">30-45 WPM</td>
                  <td className="p-4">Typical speed for casual computer users</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Intermediate</td>
                  <td className="p-4">45-60 WPM</td>
                  <td className="p-4">Comfortable for most office work requirements</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Proficient</td>
                  <td className="p-4">60-80 WPM</td>
                  <td className="p-4">Efficient typing suitable for writing-intensive jobs</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Advanced</td>
                  <td className="p-4">80-100 WPM</td>
                  <td className="p-4">Professional-level speed for transcription and data entry</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Expert</td>
                  <td className="p-4">100+ WPM</td>
                  <td className="p-4">Top-tier typists, competitive speed typists</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center space-y-4 py-8">
          <h2 className="text-2xl font-bold">Ready to Improve Your Typing Skills?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're preparing for a job that requires fast typing, looking to boost your 
            productivity, or simply want to communicate more efficiently online, our free typing 
            test platform has everything you need. Start your first test now and see where you stand!
          </p>
        </div>
      </section>
    </div>
  );
}
