import { Card } from "@/components/ui/card";
import { Mail, MessageSquare, Globe } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-xl text-muted-foreground">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center space-y-4 border-primary/20 bg-primary/5">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold">Email Support</h3>
          <p className="text-sm text-muted-foreground">support@typingwand.com</p>
        </Card>

        <Card className="p-6 text-center space-y-4 border-primary/20 bg-primary/5">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold">Community</h3>
          <p className="text-sm text-muted-foreground">Join our Discord</p>
        </Card>

        <Card className="p-6 text-center space-y-4 border-primary/20 bg-primary/5">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold">Twitter</h3>
          <p className="text-sm text-muted-foreground">@TypingWand</p>
        </Card>
      </div>

      <section className="bg-muted p-8 rounded-lg space-y-4 text-center">
        <h2 className="text-2xl font-semibold">Feedback & Suggestions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto italic">
          "Your feedback helps us make Typing Wand the best typing trainer on the web. 
          We read every email and constantly update our platform based on user suggestions."
        </p>
      </section>
    </div>
  );
}
