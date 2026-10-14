import { useState, useEffect } from "react";
import { Sparkles, Check, RotateCw, Copy, ShieldAlert, Edit3, Save, X, CheckCircle2, ShieldCheck, AlertTriangle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SAMPLE_SYNOPSIS } from "@/lib/dsim/mock-data";
import { useDsim } from "@/lib/dsim/store";
import type { AISynopsis } from "@/lib/dsim/types";
import { toast } from "sonner";

interface SynopsisEditorProps {
  initialSynopsis?: string | undefined;
  aiSynopsis?: AISynopsis | undefined;
  isGenerating?: boolean | undefined;
  onSaveSynopsis: (synopsis: string) => void;
  caseId?: string | undefined;
  caseName?: string | undefined;
  studentName?: string | undefined;
}

export function SynopsisEditor({
  initialSynopsis,
  aiSynopsis,
  isGenerating = false,
  onSaveSynopsis,
  caseId,
  caseName,
  studentName,
}: SynopsisEditorProps) {
  const { verifySynopsis, currentUser } = useDsim();
  const [content, setContent] = useState(initialSynopsis || "");
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatingLocal, setGeneratingLocal] = useState(isGenerating);
  const [generationStep, setGenerationStep] = useState(0);
  const [hasFailed, setHasFailed] = useState(false);
  const [verifiedState, setVerifiedState] = useState(aiSynopsis?.reviewed || false);

  const steps = [
    "Transcribing investigation audio stream...",
    "Performing speaker diarization & role tagging...",
    "Extracting key statements & timeline inconsistencies...",
    "Formatting AI-assisted investigation synopsis draft...",
  ];

  useEffect(() => {
    if (initialSynopsis) {
      setContent(initialSynopsis);
    }
  }, [initialSynopsis]);

  useEffect(() => {
    if (aiSynopsis?.reviewed) {
      setVerifiedState(true);
    }
  }, [aiSynopsis]);

  useEffect(() => {
    if (!isGenerating && !generatingLocal) {
      return;
    }

    setHasFailed(false);
    setGenerationStep(0);
    const interval = setInterval(() => {
      setGenerationStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setGeneratingLocal(false);
          if (!content) {
            setContent(SAMPLE_SYNOPSIS);
            onSaveSynopsis(SAMPLE_SYNOPSIS);
          }
          toast.success("AI Investigation Synopsis generated. Review and verification required.");
          return prev;
        }
        return prev + 1;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [isGenerating, generatingLocal]);

  const handleRegenerate = () => {
    setHasFailed(false);
    setGeneratingLocal(true);
  };

  const handleSimulateFailure = () => {
    setHasFailed(true);
    setGeneratingLocal(false);
    toast.error("AI processing encountered audio clarity limitations.");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Synopsis copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSaveSynopsis(content);
    setIsEditing(false);
    toast.success("Investigation synopsis updated.");
  };

  const handleVerify = () => {
    if (caseId) {
      verifySynopsis(caseId);
    }
    setVerifiedState(true);
    toast.success("Synopsis officially marked as Reviewed & Verified by Committee.");
  };

  if (generatingLocal) {
    return (
      <div className="surface p-6">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="relative mb-5">
            <div className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary animate-pulse">
              <Sparkles className="size-7 animate-spin" style={{ animationDuration: "3s" }} />
            </div>
          </div>
          <h4 className="text-base font-semibold text-foreground">Processing Hearing Audio (Assistive AI)</h4>
          <p className="mt-1 font-mono text-xs text-primary transition-all duration-300">
            {steps[generationStep]}
          </p>

          <div className="mt-6 flex w-full max-w-xs gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i <= generationStep ? "bg-primary" : "bg-secondary"
                }`}
              />
            ))}
          </div>

          <p className="mt-4 text-[0.7rem] text-muted-foreground">
            Assistive draft generation only. Human verification mandatory.
          </p>
        </div>
      </div>
    );
  }

  if (hasFailed) {
    return (
      <div className="surface p-6 space-y-4">
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center space-y-3">
          <AlertTriangle className="size-8 mx-auto text-destructive" />
          <h4 className="text-base font-semibold text-foreground">AI Processing Could Not Be Completed</h4>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Automated speech synthesis or transcript parsing encountered low-confidence audio segments. The investigation must not be delayed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <Button size="sm" onClick={handleRegenerate} className="text-xs gap-1.5">
              <RotateCw className="size-3.5" /> Retry AI Processing
            </Button>
            <Button size="sm" variant="outline" onClick={() => { setHasFailed(false); setIsEditing(true); }} className="text-xs gap-1.5">
              <Edit3 className="size-3.5" /> Draft Synopsis Manually
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setHasFailed(false)} className="text-xs">
              Continue Investigation
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="surface overflow-hidden p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold">AI-Assisted Investigation Synopsis</h3>
            <span className="inline-flex items-center gap-1 rounded-md bg-indigo-500/10 px-2 py-0.5 text-[0.68rem] font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <Sparkles className="size-3" /> Assistive Draft
            </span>
            {verifiedState ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[0.68rem] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="size-3" /> Reviewed & Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[0.68rem] font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <ShieldAlert className="size-3" /> Verification Required
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            AI-assisted synopsis. Committee review and verification required before formal finding adoption.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {content && (
            <>
              {!verifiedState && (
                <Button
                  size="sm"
                  onClick={handleVerify}
                  className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
                >
                  <ShieldCheck className="size-3.5" /> Mark as Reviewed & Verified
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-1.5 text-xs h-8"
              >
                {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerate}
                className="gap-1.5 text-xs h-8"
              >
                <RotateCw className="size-3.5" /> Regenerate
              </Button>
            </>
          )}

          {!isEditing ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="gap-1.5 text-xs h-8"
            >
              <Edit3 className="size-3.5" /> Edit Synopsis
            </Button>
          ) : (
            <div className="flex gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
                className="gap-1 text-xs h-8"
              >
                <X className="size-3.5" /> Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="gap-1.5 text-xs bg-primary h-8"
              >
                <Save className="size-3.5" /> Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* AI Recommendation & Human Oversight Disclaimer Banner (Requirements 14, 15) */}
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3.5 text-xs text-amber-800 dark:text-amber-300 space-y-1.5">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldAlert className="size-4 text-amber-600 shrink-0" />
          <span>AI-assisted synopsis</span>
        </div>
        <p className="text-[0.72rem] text-muted-foreground leading-relaxed pl-6">
          AI-generated content must be reviewed and verified by the Committee before use in the case record. The AI synopsis synthesizes verified transcripts, evidence metadata, investigation notes, and relevant witness accounts without determining guilt or disciplinary punishment.
        </p>

        <div className="flex flex-wrap items-center gap-2 pl-6 pt-1 text-[0.68rem] text-muted-foreground">
          <span className="font-semibold text-foreground">Synthesis Inputs:</span>
          <span className="rounded bg-secondary px-2 py-0.5">🎙 Audio Transcript</span>
          <span className="rounded bg-secondary px-2 py-0.5">📁 Evidence Metadata</span>
          <span className="rounded bg-secondary px-2 py-0.5">📝 Investigation Notes</span>
          <span className="rounded bg-secondary px-2 py-0.5">👥 Witness Statements</span>
        </div>
      </div>

      {/* Editor / Viewer Body */}
      <div className="mt-2">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="font-sans text-xs sm:text-sm leading-relaxed"
              placeholder="Enter official investigation synopsis..."
            />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Committee member direct edit</span>
              <span>{content.length} characters</span>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-border/80 bg-background/50 p-4 sm:p-5">
            {content ? (
              <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-foreground font-sans">
                {content}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-muted-foreground">
                <Sparkles className="size-6 mx-auto mb-2 opacity-40 text-primary" />
                No synopsis generated yet. Start an investigation recording or draft an initial summary.
                <div className="mt-3 flex items-center justify-center gap-2">
                  <Button size="sm" variant="outline" onClick={handleRegenerate} className="text-xs">
                    Generate Sample Synopsis
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)} className="text-xs">
                    Draft Manually
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
