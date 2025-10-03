"use client";

import type React from "react";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function ResumeForm() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      setOutput(data.result || "⚠️ Error");
    } catch {
      setOutput("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl space-y-6">
        <Card className="border-border shadow-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl sm:text-3xl font-semibold text-center text-foreground">
              AI Resume Builder
            </CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Created by: Kent Francis E. Kalaw
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Transform your work experience/skills into polished resume text
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="resume-input"
                  className="text-sm font-medium text-foreground"
                >
                  Enter Your Work Experience or Skills
                </Label>
                <Textarea
                  id="resume-input"
                  rows={8}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. Worked as a cashier, handled customer payments, stocked shelves..."
                  className="resize-none min-h-[160px] sm:min-h-[200px]"
                />
              </div>

              <Button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-full h-11"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  "Generate Resume Text"
                )}
              </Button>
            </form>

            {output && (
              <div className="space-y-3 pt-2">
                <div className="h-px bg-border" />
                <div className="space-y-2">
                  <h2 className="text-base font-semibold text-foreground">
                    Polished Output
                  </h2>
                  <div className="rounded-lg border border-border bg-muted/50 p-4">
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                      {output}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
