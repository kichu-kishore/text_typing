"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TestStats } from "./TypingArea";
import { Award, Download, Printer } from "lucide-react";

interface CertificateProps {
  stats: TestStats;
  onClose: () => void;
}

export default function Certificate({ stats, onClose }: CertificateProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    console.log("Download certificate triggered");
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-8">
      <Card className="p-12 border-4 border-primary/20" data-testid="card-certificate">
        <div className="text-center space-y-6">
          <Award className="w-20 h-20 mx-auto text-primary" />
          <h1 className="text-4xl font-bold" data-testid="text-certificate-title">
            Typing Wand Certificate
          </h1>
          <div className="text-lg text-muted-foreground">
            This is to certify that
          </div>
          <div className="text-3xl font-semibold" data-testid="text-certificate-name">
            [Your Name]
          </div>
          <div className="text-lg text-muted-foreground">
            has successfully completed a 5-minute typing test with the following results:
          </div>
          
          <div className="grid grid-cols-2 gap-6 py-8">
            <div>
              <div className="text-4xl font-bold text-primary" data-testid="text-cert-wpm">
                {stats.wpm}
              </div>
              <div className="text-sm text-muted-foreground">Words Per Minute</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary" data-testid="text-cert-accuracy">
                {stats.accuracy}%
              </div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>

          <div className="border-t pt-6 space-y-2">
            <div className="text-sm text-muted-foreground" data-testid="text-cert-date">
              Issued on {currentDate}
            </div>
            <div className="text-xs text-muted-foreground">
              Certificate ID: TT-{Date.now().toString(36).toUpperCase()}
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={handlePrint} size="lg" data-testid="button-print">
          <Printer className="w-4 h-4 mr-2" />
          Print Certificate
        </Button>
        <Button onClick={handleDownload} variant="outline" size="lg" data-testid="button-download">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button onClick={onClose} variant="ghost" size="lg" data-testid="button-close">
          Close
        </Button>
      </div>
    </div>
  );
}
