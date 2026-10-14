import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  Download,
  ShieldCheck,
  Music,
  Clock,
  User,
  Users,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { fmtDateTime } from "@/lib/dsim/format";
import { evLabel } from "@/lib/dsim/store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Evidence } from "@/lib/dsim/types";

interface AudioEvidencePlayerProps {
  evidence: Evidence | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewTranscript?: ((evidenceId: string) => void) | undefined;
  onGenerateTranscript?: ((evidenceId: string) => void) | undefined;
  onAuditDownload?: ((evidence: Evidence) => void) | undefined;
}

export function AudioEvidencePlayer({
  evidence,
  open,
  onOpenChange,
  onViewTranscript,
  onGenerateTranscript,
  onAuditDownload,
}: AudioEvidencePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [durationSec, setDurationSec] = useState(evidence?.durationSec || 120);
  const [volume, setVolume] = useState(85);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioElemRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (evidence) {
      setDurationSec(evidence.durationSec || 120);
      setCurrentTimeSec(0);
      setIsPlaying(false);
      setPlaybackRate(1);
    }
  }, [evidence]);

  useEffect(() => {
    return () => {
      if (audioElemRef.current) {
        audioElemRef.current.pause();
        audioElemRef.current = null;
      }
    };
  }, []);

  if (!evidence) return null;

  const togglePlay = () => {
    if (evidence.url) {
      if (!audioElemRef.current) {
        const a = new Audio(evidence.url);
        audioElemRef.current = a;
        a.volume = volume / 100;
        a.playbackRate = playbackRate;
        a.ontimeupdate = () => setCurrentTimeSec(Math.floor(a.currentTime));
        a.onloadedmetadata = () => setDurationSec(Math.floor(a.duration));
        a.onended = () => {
          setIsPlaying(false);
          setCurrentTimeSec(0);
        };
      }
      if (isPlaying) {
        audioElemRef.current.pause();
        setIsPlaying(false);
      } else {
        audioElemRef.current.playbackRate = playbackRate;
        audioElemRef.current.play().catch((err) => console.warn(err));
        setIsPlaying(true);
      }
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleSeek = (newSec: number) => {
    setCurrentTimeSec(newSec);
    if (audioElemRef.current) {
      audioElemRef.current.currentTime = newSec;
    }
  };

  const handleVolume = (vol: number) => {
    setVolume(vol);
    if (audioElemRef.current) {
      audioElemRef.current.volume = vol / 100;
    }
  };

  const handleSpeed = (speed: number) => {
    setPlaybackRate(speed);
    if (audioElemRef.current) {
      audioElemRef.current.playbackRate = speed;
    }
  };

  const handleDownload = () => {
    if (evidence.url) {
      const a = document.createElement("a");
      a.href = evidence.url;
      a.download = evidence.fileName || `Investigation-Audio-${evidence.id}.webm`;
      a.click();
    }
    onAuditDownload?.(evidence);
    toast.success(`Downloaded authorized audio evidence: ${evidence.fileName || evidence.id}`);
  };

  const formatTime = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }
    return `${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.68rem] text-muted-foreground uppercase tracking-wider">
              {evLabel(evidence.number)} · AUDIO EVIDENCE
            </span>
            {evidence.status === "Verified" ? (
              <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[0.68rem] font-semibold text-emerald-600 border border-emerald-500/20">
                <CheckCircle2 className="size-3" /> Chain-of-Custody Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-[0.68rem] font-semibold text-amber-600 border border-amber-500/20">
                Under Review
              </span>
            )}
          </div>
          <DialogTitle className="text-base font-bold flex items-center gap-2">
            <Music className="size-4 text-primary" />
            {evidence.description || "Investigation Audio Recording"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Confidential Investigation Hearing Audio Dossier
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs">
          {/* Metadata Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 rounded-xl border border-border bg-muted/20 p-3.5">
            <div>
              <span className="text-[0.68rem] text-muted-foreground">Evidence ID:</span>
              <div className="font-mono font-bold text-foreground truncate">{evidence.id}</div>
            </div>
            <div>
              <span className="text-[0.68rem] text-muted-foreground">Case ID:</span>
              <div className="font-mono font-semibold text-foreground truncate">{evidence.caseId}</div>
            </div>
            <div>
              <span className="text-[0.68rem] text-muted-foreground">Recorded By:</span>
              <div className="font-medium text-foreground truncate">{evidence.recordedBy || evidence.capturedBy || "Dr. S. Ramanathan"}</div>
            </div>
            <div>
              <span className="text-[0.68rem] text-muted-foreground">Recorded At:</span>
              <div className="font-medium text-foreground truncate">{fmtDateTime(evidence.recordedAt || evidence.timestamp)}</div>
            </div>
          </div>

          {/* Participants */}
          {evidence.participants && evidence.participants.length > 0 && (
            <div className="rounded-lg border border-border/70 bg-card p-2.5 space-y-1">
              <span className="text-[0.68rem] font-semibold text-muted-foreground flex items-center gap-1">
                <Users className="size-3 text-primary" /> Identified Recording Participants:
              </span>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {evidence.participants.map((p, idx) => (
                  <span key={idx} className="rounded bg-secondary px-2 py-0.5 font-mono text-[0.68rem] text-foreground border border-border/50">
                    {p.name} ({p.role})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Audio Player */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-3 shadow-inner">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                size="icon"
                variant="outline"
                className="size-11 rounded-full shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground shadow-sm"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause audio evidence" : "Play audio evidence"}
              >
                {isPlaying ? <Pause className="size-5" /> : <Play className="size-5 ml-0.5" />}
              </Button>

              <div className="flex-1 w-full space-y-1">
                <Slider
                  value={[currentTimeSec]}
                  max={durationSec}
                  step={1}
                  onValueChange={(val) => handleSeek(val[0] ?? 0)}
                  className="w-full"
                  aria-label="Audio scrubber slider"
                />
                <div className="flex justify-between font-mono text-[0.68rem] text-muted-foreground">
                  <span>{formatTime(currentTimeSec)}</span>
                  <span>{formatTime(durationSec)}</span>
                </div>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <Volume2 className="size-4 text-muted-foreground" aria-hidden="true" />
                <Slider
                  value={[volume]}
                  max={100}
                  step={5}
                  onValueChange={(val) => handleVolume(val[0] ?? 80)}
                  className="w-16"
                  aria-label="Playback volume"
                />
              </div>
            </div>

            {/* Playback speed controls */}
            <div className="flex items-center justify-between border-t border-border/50 pt-2 text-xs">
              <span className="text-muted-foreground text-[0.7rem]">Playback Speed:</span>
              <div className="flex items-center gap-1">
                {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => handleSpeed(spd)}
                    className={cn(
                      "rounded px-2 py-0.5 font-mono text-[0.7rem] transition-colors cursor-pointer",
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

          {/* Security & Audit Notice */}
          <div className="flex items-start gap-2 rounded-lg border border-border/70 bg-muted/30 p-2.5 text-[0.7rem] text-muted-foreground">
            <ShieldCheck className="size-4 shrink-0 text-primary mt-0.5" />
            <div>
              <strong>Chain of Custody & Audit Protection:</strong> All playback and export actions on this audio track are timestamped and permanently logged in the DSIM Audit History.
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="text-xs h-8 gap-1.5"
          >
            <Download className="size-3.5" /> Download Audio Track
          </Button>

          <div className="flex items-center gap-2">
            {evidence.transcriptStatus === "Completed" || evidence.transcriptStatus === "Verified" ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  onViewTranscript?.(evidence.id);
                }}
                className="text-xs h-8 gap-1.5 text-primary border-primary/30"
              >
                <MessageSquare className="size-3.5" /> View Transcript →
              </Button>
            ) : onGenerateTranscript ? (
              <Button
                size="sm"
                onClick={() => {
                  onOpenChange(false);
                  onGenerateTranscript(evidence.id);
                }}
                className="text-xs h-8 gap-1.5 bg-primary"
              >
                <Sparkles className="size-3.5" /> Generate Transcript
              </Button>
            ) : null}

            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-xs h-8"
            >
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
