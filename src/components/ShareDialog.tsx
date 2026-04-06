import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2, Copy, Check } from "lucide-react";
import { SiX, SiFacebook, SiLinkedin, SiWhatsapp } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { TestStats } from "./TypingArea";

interface ShareDialogProps {
  stats: TestStats;
}

export default function ShareDialog({ stats }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareText = `I just scored ${stats.wpm} WPM with ${stats.accuracy}% accuracy on Typing Wand! Can you beat my score?`;
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "https://typingwand.com";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Share your results with friends",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log("Failed to copy");
    }
  };

  const shareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  const shareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const shareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    window.open(url, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" data-testid="button-share">
          <Share2 className="w-4 h-4 mr-2" />
          Share Results
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle data-testid="text-share-title">Share Your Results</DialogTitle>
          <DialogDescription>
            Challenge your friends to beat your typing score!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="p-4 bg-muted rounded-md text-center space-y-2">
            <div className="text-4xl font-bold text-primary" data-testid="text-share-wpm">
              {stats.wpm} WPM
            </div>
            <div className="text-muted-foreground" data-testid="text-share-accuracy">
              {stats.accuracy}% accuracy
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              size="icon"
              variant="outline"
              onClick={shareTwitter}
              data-testid="button-share-twitter"
            >
              <SiX className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={shareFacebook}
              data-testid="button-share-facebook"
            >
              <SiFacebook className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={shareLinkedIn}
              data-testid="button-share-linkedin"
            >
              <SiLinkedin className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={shareWhatsApp}
              data-testid="button-share-whatsapp"
            >
              <SiWhatsapp className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Input
              readOnly
              value={`${shareText} ${shareUrl}`}
              className="text-sm"
              data-testid="input-share-link"
            />
            <Button
              variant="secondary"
              onClick={handleCopyLink}
              data-testid="button-copy-link"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
