import { useState, useMemo, useRef } from "react";
import {
  FileText,
  Copy,
  Download,
  RefreshCw,
  Search,
  Shield,
  Check,
  MessageSquare,
  Play,
  Pause,
  AlertTriangle,
  Edit2,
  CheckCircle2,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Volume2,
  Flag,
  RotateCcw,
  Tag,
  Clock,
  Eye,
  Sliders,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { TranscriptEntry, TranscriptStatus } from "@/lib/dsim/types";

interface TranscriptViewerProps {
  transcript?: TranscriptEntry[] | undefined;
  caseId: string;
  caseName?: string | undefined;
  studentName?: string | undefined;
  audioEvidenceId?: string | undefined;
  audioUrl?: string | undefined;
  transcriptStatus?: TranscriptStatus | undefined;
  onRegenerateTranscript?: (() => void) | undefined;
  onUpdateEntry?: ((entryId: string, patch: Partial<TranscriptEntry>) => void) | undefined;
  onVerifyTranscript?: (() => void) | undefined;
  onGenerateAiSynopsis?: (() => void) | undefined;
  onSeekAudio?: ((seconds: number) => void) | undefined;
}

export function TranscriptViewer({
  transcript = [],
  caseId,
  caseName,
  studentName,
  audioEvidenceId,
  audioUrl,
  transcriptStatus = "Completed",
  onRegenerateTranscript,
  onUpdateEntry,
  onVerifyTranscript,
  onGenerateAiSynopsis,
  onSeekAudio,
}: TranscriptViewerProps) {
  // Search state (Requirement 11)
  const [search, setSearch] = useState("");
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  // Clipboard & UI states
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showOriginalComparison, setShowOriginalComparison] = useState(false);

  // Edit Segment Modal (Requirement 12)
  const [editingEntry, setEditingEntry] = useState<TranscriptEntry | null>(null);
  const [editDraftText, setEditDraftText] = useState("");
  const [editDraftNotes, setEditDraftNotes] = useState("");
  const [editDraftFlagged, setEditDraftFlagged] = useState(false);

  // Integrated Audio Player State (Requirement 10)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [audioDurationSec, setAudioDurationSec] = useState(300);
  const [volume, setVolume] = useState(85);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Compute matched items for search navigation
  const searchMatches = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    const matches: { entryId: string; index: number }[] = [];
    transcript.forEach((entry, idx) => {
      const combined = `${entry.text} ${entry.speaker} ${entry.speakerName || ""} ${entry.timestamp}`.toLowerCase();
      if (combined.includes(q)) {
        matches.push({ entryId: entry.id, index: idx });
      }
    });
    return matches;
  }, [transcript, search]);

  const handleNextMatch = () => {
    if (searchMatches.length === 0) return;
    const nextIdx = (currentMatchIndex + 1) % searchMatches.length;
    setCurrentMatchIndex(nextIdx);
    const targetMatch = searchMatches[nextIdx];
    if (targetMatch) {
      document.getElementById(`segment-${targetMatch.entryId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handlePrevMatch = () => {
    if (searchMatches.length === 0) return;
    const prevIdx = (currentMatchIndex - 1 + searchMatches.length) % searchMatches.length;
    setCurrentMatchIndex(prevIdx);
    const targetMatch = searchMatches[prevIdx];
    if (targetMatch) {
      document.getElementById(`segment-${targetMatch.entryId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Synchronized Audio Player controls (Requirement 10)
  const jumpToTimestamp = (seconds: number) => {
    setCurrentTimeSec(seconds);
    onSeekAudio?.(seconds);
    if (audioElementRef.current) {
      audioElementRef.current.currentTime = seconds;
      if (!isPlaying) {
        audioElementRef.current.playbackRate = playbackRate;
        audioElementRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
    toast.info(`Audio player synchronized to ${formatTime(seconds)}`);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (audioElementRef.current) {
      audioElementRef.current.playbackRate = speed;
    }
  };

  const toggleAudio = () => {
    if (!audioUrl) {
      // Mock playback timeline simulation if no direct blob attached
      setIsPlaying((prev) => !prev);
      return;
    }
    if (!audioElementRef.current) {
      const audio = new Audio(audioUrl);
      audioElementRef.current = audio;
      audio.volume = volume / 100;
      audio.playbackRate = playbackRate;
      audio.ontimeupdate = () => {
        setCurrentTimeSec(Math.floor(audio.currentTime));
      };
      audio.onloadedmetadata = () => {
        setAudioDurationSec(Math.floor(audio.duration));
      };
      audio.onended = () => {
        setIsPlaying(false);
        setCurrentTimeSec(0);
      };
    }

    if (isPlaying) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElementRef.current.playbackRate = playbackRate;
      audioElementRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Editing dialog handlers (Requirement 12)
  const openEditModal = (entry: TranscriptEntry) => {
    setEditingEntry(entry);
    setEditDraftText(entry.text);
    setEditDraftNotes(entry.notes || "");
    setEditDraftFlagged(entry.flaggedUnclear || false);
  };

  const handleSaveEdit = () => {
    if (!editingEntry) return;
    if (!editDraftText.trim()) {
      toast.error("Transcript text cannot be empty.");
      return;
    }

    onUpdateEntry?.(editingEntry.id, {
      text: editDraftText.trim(),
      notes: editDraftNotes.trim() || undefined,
      flaggedUnclear: editDraftFlagged,
      isEdited: true,
      originalText: editingEntry.originalText || editingEntry.text,
      reviewed: true,
    });

    setEditingEntry(null);
    toast.success("Transcript statement updated and marked as reviewed.");
  };

  const handleCopy = () => {
    const text = transcript
      .map(
        (t) =>
          `[${t.timestamp}] ${t.speakerName ? `${t.speakerName} (${t.speaker})` : t.speaker}:\n"${t.text}"` +
          (t.notes ? `\n[Reviewer Note: ${t.notes}]` : "")
      )
      .join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Transcript copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = `================================================================================
DSIM OFFICIAL INVESTIGATION AUDIO TRANSCRIPT
Case Reference: ${caseId} — ${caseName || "Disciplinary Hearing"}
Subject: ${studentName || "Accused Student"}
Connected Evidence: ${audioEvidenceId || "Primary Investigation Recording"}
Generated: ${new Date().toLocaleString()}
Verification Status: ${transcriptStatus}
Classification: CONFIDENTIAL / DISCIPLINE COMMITTEE RECORD ONLY
================================================================================

${transcript
  .map(
    (t) =>
      `[${t.timestamp}] ${t.speakerName ? `${t.speakerName} (${t.speaker})` : t.speaker}${t.confidence ? ` [Confidence: ${Math.round(t.confidence * 100)}%]` : ""}:
${t.text}${t.isEdited ? `\n(Original AI Draft: "${t.originalText}")` : ""}${t.notes ? `\n(Committee Note: ${t.notes})` : ""}`
  )
  .join("\n\n")}

================================================================================
END OF RECORDED TRANSCRIPT
Human verification by Discipline Committee required before disciplinary sanction.
================================================================================`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Transcript-${caseId}-${Date.now()}.txt`;
    a.click();
    toast.success(`Downloaded transcript for ${caseId}`);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      onRegenerateTranscript?.();
      toast.success("Transcript re-indexed and aligned with voice recording audio tracks.");
    }, 1500);
  };

  // Highlighting helper for search
  const renderHighlightedText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-amber-300 dark:bg-amber-500/40 text-foreground px-0.5 rounded font-medium">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="surface overflow-hidden p-5 sm:p-6 space-y-5" role="region" aria-label="Investigation Voice Transcript">
      {/* Top Header & Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-indigo-500/10 text-indigo-600">
              <MessageSquare className="size-4" aria-hidden="true" />
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-foreground">Speech-to-Text Voice Transcript</h3>
                <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[0.68rem] font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  AI-generated transcript. Review for accuracy.
                </span>
                {transcriptStatus === "Verified" ? (
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[0.68rem] font-semibold text-emerald-600 border border-emerald-500/20">
                    <CheckCircle2 className="size-3" /> Committee Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-[0.68rem] font-semibold text-amber-600 border border-amber-500/20">
                    <AlertTriangle className="size-3" /> Under Review
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Connected Audio Evidence:{" "}
                <strong className="text-foreground font-mono">
                  {audioEvidenceId || "Case Recording (AUD-Primary)"}
                </strong>
                {" · "}AI-generated transcript. Review for accuracy before official verification.
              </p>
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {onVerifyTranscript && transcriptStatus !== "Verified" && (
            <Button
              size="sm"
              onClick={onVerifyTranscript}
              disabled={transcript.length === 0}
              className="text-xs gap-1.5 h-8 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
            >
              <CheckCircle2 className="size-3.5" /> Verify Transcript
            </Button>
          )}

          {onGenerateAiSynopsis && (
            <Button
              size="sm"
              variant="outline"
              onClick={onGenerateAiSynopsis}
              disabled={transcript.length === 0}
              className="text-xs gap-1.5 h-8 border-primary/30 text-primary hover:bg-primary/10"
            >
              <Sparkles className="size-3.5" /> Generate AI Synopsis →
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={transcript.length === 0}
            className="text-xs gap-1.5 h-8"
            aria-label="Copy entire transcript to clipboard"
          >
            {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={transcript.length === 0}
            className="text-xs gap-1.5 h-8"
            aria-label="Download official transcript text file"
          >
            <Download className="size-3.5" /> Export
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="text-xs gap-1.5 h-8 text-primary"
            aria-label="Re-align transcript with audio tracks"
          >
            <RefreshCw className={cn("size-3.5", isRegenerating && "animate-spin")} />
            {isRegenerating ? "Re-aligning..." : "Re-align"}
          </Button>
        </div>
      </div>

      {/* SYNCHRONIZED AUDIO CONTROLS BAR (Requirement 10) */}
      <div className="rounded-xl border border-border bg-card/80 p-3 sm:p-4 space-y-2">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              size="icon"
              variant="outline"
              className="size-9 rounded-full shrink-0"
              onClick={toggleAudio}
              aria-label={isPlaying ? "Pause synchronized audio" : "Play synchronized audio"}
            >
              {isPlaying ? <Pause className="size-4 text-signal" /> : <Play className="size-4 ml-0.5 text-primary" />}
            </Button>
            <div className="text-xs font-mono tabular-nums text-foreground">
              {formatTime(currentTimeSec)} / {formatTime(audioDurationSec)}
            </div>
          </div>

          <div className="flex-1 w-full space-y-1">
            <Slider
              value={[currentTimeSec]}
              max={audioDurationSec}
              step={1}
              onValueChange={(val) => jumpToTimestamp(val[0] ?? 0)}
              className="w-full"
              aria-label="Audio scrubber slider"
            />
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Volume2 className="size-3.5 text-muted-foreground" aria-hidden="true" />
            <Slider
              value={[volume]}
              max={100}
              step={5}
              onValueChange={(val) => {
                setVolume(val[0] ?? 80);
                if (audioElementRef.current) audioElementRef.current.volume = (val[0] ?? 80) / 100;
              }}
              className="w-16"
              aria-label="Playback volume"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between border-t border-border/50 pt-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="size-3 text-primary" />
            <span className="text-[0.7rem]">Click any statement timestamp to seek audio</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[0.68rem]">Speed:</span>
            {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => handleSpeedChange(spd)}
                className={cn(
                  "rounded px-1.5 py-0.5 font-mono text-[0.68rem] transition-colors cursor-pointer",
                  playbackRate === spd
                    ? "bg-primary text-primary-foreground font-bold"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accuracy & Human Oversight Notice (Requirement 12, 31) */}
      <div className="rounded-lg border border-border bg-muted/20 px-3.5 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Shield className="size-4 text-primary shrink-0" />
          <span>
            <strong>AI-Assisted Investigation Transcript:</strong> Generated from voice recording. Statements must be verified and edited by Discipline Committee officers before disciplinary determinations.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setShowOriginalComparison((v) => !v)}
            className="text-[0.72rem] text-primary hover:underline flex items-center gap-1 font-medium cursor-pointer"
          >
            <Eye className="size-3" /> {showOriginalComparison ? "Hide AI Drafts" : "Compare Original AI"}
          </button>
          <span className="font-mono text-[0.7rem] text-muted-foreground">
            Model: Mock STT 48kHz
          </span>
        </div>
      </div>

      {/* TRANSCRIPT SEARCH BAR (Requirement 11) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" aria-hidden="true" />
          <Input
            placeholder="Search keywords, admissions, inconsistencies, speakers..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentMatchIndex(0);
            }}
            className="h-8.5 pl-8 text-xs bg-card"
            aria-label="Search transcript"
          />
        </div>

        {/* Search match navigation HUD */}
        {search.trim() && (
          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-muted-foreground">
              {searchMatches.length} {searchMatches.length === 1 ? "match" : "matches"} found
            </span>
            {searchMatches.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="font-mono text-[0.7rem] text-muted-foreground">
                  ({currentMatchIndex + 1}/{searchMatches.length})
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  className="size-6 text-xs"
                  onClick={handlePrevMatch}
                  aria-label="Previous match"
                >
                  <ChevronUp className="size-3" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="size-6 text-xs"
                  onClick={handleNextMatch}
                  aria-label="Next match"
                >
                  <ChevronDown className="size-3" />
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground font-mono self-end sm:self-auto">
          {transcript.length} {transcript.length === 1 ? "statement" : "statements"}
        </div>
      </div>

      {/* TRANSCRIPT STATEMENTS STREAM (Requirements 9, 10, 12, 13) */}
      {transcript.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center space-y-2 bg-muted/10">
          <FileText className="size-8 mx-auto text-muted-foreground" />
          <p className="text-xs font-semibold text-foreground">No transcript entries available</p>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Save a voice recording from the Investigation studio and click "Generate Transcript" to produce a verbatim dialogue record.
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
          {transcript.map((item, idx) => {
            const isInvestigator = item.speaker === "Investigator" || item.speaker.includes("Committee");
            const isStudent = item.speaker === "Student";
            const isLowConfidence = (item.confidence !== undefined && item.confidence < 0.8) || item.flaggedUnclear;
            const timeOffset = item.timeOffsetSec ?? idx * 15;

            return (
              <div
                key={item.id}
                id={`segment-${item.id}`}
                className={cn(
                  "rounded-xl border p-4 transition-all space-y-2 relative group",
                  isInvestigator
                    ? "border-primary/20 bg-primary/5 ml-0 mr-4 sm:mr-10"
                    : isStudent
                    ? "border-signal/20 bg-signal/5 ml-4 sm:ml-10 mr-0"
                    : "border-border bg-card/70 ml-2 sm:ml-6 mr-2",
                  isLowConfidence && "ring-1 ring-amber-500/40 border-amber-500/30"
                )}
              >
                {/* Segment Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "grid size-6 place-items-center rounded-full text-xs font-bold shrink-0",
                        isInvestigator
                          ? "bg-primary text-primary-foreground"
                          : isStudent
                          ? "bg-signal text-white"
                          : "bg-secondary text-foreground"
                      )}
                    >
                      {item.speaker[0]}
                    </span>

                    <span className="font-semibold text-xs text-foreground">
                      {item.speakerName || item.speaker}
                    </span>

                    <span className="text-[0.65rem] text-muted-foreground px-1.5 py-0.5 rounded bg-secondary font-mono">
                      {item.speaker}
                    </span>

                    {/* Timestamp seek button (Requirement 10) */}
                    <button
                      type="button"
                      onClick={() => jumpToTimestamp(timeOffset)}
                      className="inline-flex items-center gap-1 font-mono text-[0.7rem] text-primary hover:underline hover:bg-primary/10 px-1.5 py-0.5 rounded transition-colors cursor-pointer"
                      title="Seek audio to this timestamp"
                      aria-label={`Jump audio to ${item.timestamp}`}
                    >
                      <Play className="size-2.5 fill-current" />
                      {item.timestamp}
                    </button>

                    {item.isEdited && (
                      <span className="text-[0.65rem] font-medium text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        Edited & Reviewed
                      </span>
                    )}
                  </div>

                  {/* Actions for this segment */}
                  <div className="flex items-center gap-2">
                    {/* Low Confidence Badge (Requirement 13) */}
                    {isLowConfidence && (
                      <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 px-2 py-0.5 text-[0.65rem] font-semibold text-amber-600 border border-amber-500/30">
                        <AlertTriangle className="size-3" /> ⚠ Low Confidence Audio
                      </span>
                    )}

                    {onUpdateEntry && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(item)}
                        className="h-6 text-[0.7rem] gap-1 px-2 text-muted-foreground hover:text-foreground"
                        aria-label="Edit transcript statement"
                      >
                        <Edit2 className="size-3" /> Edit
                      </Button>
                    )}
                  </div>
                </div>

                {/* Spoken Text (with search highlighting) */}
                <p className="text-xs text-foreground leading-relaxed pl-8 font-sans">
                  "{renderHighlightedText(item.text, search)}"
                </p>

                {/* Original AI vs Edited comparison view (Requirement 12) */}
                {showOriginalComparison && item.isEdited && item.originalText && (
                  <div className="ml-8 mt-1.5 rounded-lg border border-dashed border-border/80 bg-muted/30 p-2 text-[0.7rem] text-muted-foreground">
                    <span className="font-semibold text-foreground">Original AI Draft: </span>
                    "{item.originalText}"
                  </div>
                )}

                {/* Reviewer Note (Requirement 12) */}
                {item.notes && (
                  <div className="ml-8 mt-1 rounded bg-secondary/50 px-2.5 py-1 text-[0.7rem] text-muted-foreground border-l-2 border-primary">
                    <strong className="text-foreground">Committee Note: </strong> {item.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* EDIT TRANSCRIPT SEGMENT MODAL (Requirement 12) */}
      <Dialog open={!!editingEntry} onOpenChange={(open) => !open && setEditingEntry(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Edit2 className="size-4 text-primary" /> Review & Edit Transcript Statement
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Correct transcription errors, add committee notes, or flag unclear speech segments. The original AI transcript remains preserved in the audit trail.
            </DialogDescription>
          </DialogHeader>

          {editingEntry && (
            <div className="space-y-4 py-2 text-xs">
              <div className="rounded-lg bg-muted/30 p-2.5 border border-border/70 space-y-1">
                <div className="flex items-center justify-between text-muted-foreground text-[0.7rem]">
                  <span>
                    Speaker: <strong className="text-foreground">{editingEntry.speakerName || editingEntry.speaker}</strong>
                  </span>
                  <span>Timestamp: <strong className="text-foreground font-mono">{editingEntry.timestamp}</strong></span>
                </div>
                {editingEntry.originalText && editingEntry.isEdited && (
                  <div className="text-[0.68rem] text-muted-foreground border-t border-border/50 pt-1 mt-1">
                    Original Draft: "{editingEntry.originalText}"
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground text-xs">Statement Text</label>
                <Textarea
                  value={editDraftText}
                  onChange={(e) => setEditDraftText(e.target.value)}
                  rows={4}
                  className="text-xs bg-background"
                  placeholder="Accurate spoken statement..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground text-xs">Internal Committee Note (Optional)</label>
                <Input
                  value={editDraftNotes}
                  onChange={(e) => setEditDraftNotes(e.target.value)}
                  className="text-xs bg-background h-8"
                  placeholder="e.g. Verified against audio at 00:01:24; student hesitation noted."
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-2.5 bg-card">
                <div className="space-y-0.5">
                  <div className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                    <Flag className="size-3 text-amber-500" /> Flag Section as Unclear
                  </div>
                  <div className="text-[0.68rem] text-muted-foreground">
                    Marks audio segment as low-confidence or requiring further hearing clarification.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={editDraftFlagged}
                  onChange={(e) => setEditDraftFlagged(e.target.checked)}
                  className="size-4 rounded border-border text-primary cursor-pointer"
                  aria-label="Flag section as unclear audio"
                />
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between sm:justify-between items-center pt-2">
            <Button variant="outline" size="sm" onClick={() => setEditingEntry(null)} className="text-xs h-8">
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveEdit} className="text-xs h-8 bg-primary gap-1">
              <Check className="size-3.5" /> Save Correction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
