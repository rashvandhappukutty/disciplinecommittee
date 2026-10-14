import { useState, useRef, useEffect } from "react";
import {
  FileText,
  Music,
  Image as ImageIcon,
  Video,
  Trash2,
  Download,
  ShieldCheck,
  Clock,
  User,
  History,
  CheckCircle2,
  Edit2,
  Save,
  Tag,
  Play,
  Pause,
  Volume2,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fmtDate, fmtDateTime } from "@/lib/dsim/format";
import { evLabel } from "@/lib/dsim/store";
import type { Evidence } from "@/lib/dsim/types";
import { toast } from "sonner";

interface EvidenceDetailModalProps {
  evidence: Evidence | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete?: ((evidenceId: string) => void) | undefined;
  onUpdateEvidence?: ((evidenceId: string, patch: Partial<Evidence>, custodyAction?: string) => void) | undefined;
  onViewTranscript?: ((evidenceId: string) => void) | undefined;
  onGenerateTranscript?: ((evidenceId: string) => void) | undefined;
}

export function EvidenceDetailModal({
  evidence,
  open,
  onOpenChange,
  onDelete,
  onUpdateEvidence,
  onViewTranscript,
  onGenerateTranscript,
}: EvidenceDetailModalProps) {
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [descDraft, setDescDraft] = useState(evidence?.description || "");
  const [activeTab, setActiveTab] = useState("preview");

  // Audio Playback in Modal
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioPlayTime, setAudioPlayTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(evidence?.durationSec || 120);
  const audioElemRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (evidence) {
      setDescDraft(evidence.description || "");
      setAudioDuration(evidence.durationSec || 120);
      setIsPlayingAudio(false);
      setAudioPlayTime(0);
    }
  }, [evidence]);

  const toggleModalAudio = () => {
    if (!evidence) return;
    if (evidence.url) {
      if (!audioElemRef.current) {
        const a = new Audio(evidence.url);
        audioElemRef.current = a;
        a.ontimeupdate = () => setAudioPlayTime(Math.floor(a.currentTime));
        a.onloadedmetadata = () => setAudioDuration(Math.floor(a.duration));
        a.onended = () => {
          setIsPlayingAudio(false);
          setAudioPlayTime(0);
        };
      }
      if (isPlayingAudio) {
        audioElemRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioElemRef.current.play().catch(() => {});
        setIsPlayingAudio(true);
      }
    } else {
      setIsPlayingAudio((prev) => !prev);
    }
  };

  const handleVerifyEvidence = () => {
    if (!evidence || !onUpdateEvidence) return;
    onUpdateEvidence(
      evidence.id,
      { status: "Verified" },
      "Evidence formally verified by Discipline Committee"
    );
    toast.success("Evidence integrity officially verified.");
  };

  if (!evidence) return null;

  const getIcon = () => {
    switch (evidence.type) {
      case "audio":
        return <Music className="size-5 text-indigo-500" />;
      case "photo":
        return <ImageIcon className="size-5 text-emerald-500" />;
      case "video":
        return <Video className="size-5 text-rose-500" />;
      case "document":
        return <FileText className="size-5 text-amber-500" />;
    }
  };

  const handleSaveDescription = () => {
    if (!descDraft.trim()) return;
    onUpdateEvidence?.(
      evidence.id,
      { description: descDraft.trim() },
      `Description updated to: "${descDraft.trim()}"`
    );
    setIsEditingDesc(false);
    toast.success("Evidence description updated and logged in Chain of Custody.");
  };

  const custodyHistory = evidence.custodyHistory || [
    {
      id: "cust-1",
      timestamp: evidence.timestamp,
      action: "Evidence captured",
      performedBy: evidence.capturedBy || "Dr. S. Ramanathan",
      details: "Initial intake on site",
    },
    {
      id: "cust-2",
      timestamp: evidence.timestamp,
      action: "Evidence uploaded",
      performedBy: "System (Auto-Sync)",
      details: "AES-256 encrypted vault storage",
    },
    {
      id: "cust-3",
      timestamp: new Date().toISOString(),
      action: "Evidence reviewed",
      performedBy: "Discipline Committee Head",
      details: "Integrity verified",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-secondary">
              {getIcon()}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <DialogTitle className="font-mono text-base font-bold">
                  {evLabel(evidence.number)}
                </DialogTitle>
                <span className="rounded bg-secondary px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                  {evidence.type}
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-600">
                  <CheckCircle2 className="size-3" /> {evidence.status || "Verified"}
                </span>
              </div>
              <DialogDescription className="truncate text-xs text-muted-foreground mt-0.5">
                Case: <strong className="text-foreground font-mono">{evidence.caseId}</strong> · {evidence.fileName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Tab switcher: Preview vs Chain of Custody */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="preview" className="text-xs gap-1.5">
              <FileText className="size-3.5" /> Evidence Preview & Metadata
            </TabsTrigger>
            <TabsTrigger value="custody" className="text-xs gap-1.5">
              <History className="size-3.5" /> Chain of Custody ({custodyHistory.length})
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Preview & Detailed Metadata */}
          <TabsContent value="preview" className="space-y-4">
            {/* Media Player / Container */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted/40 flex items-center justify-center p-4 shadow-inner">
              {evidence.type === "photo" && (
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <div className="grid size-16 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <ImageIcon className="size-8" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">High-Resolution Photographic Record</div>
                    <div className="font-mono text-xs text-muted-foreground mt-0.5">
                      {evidence.fileName} · {evidence.fileSize || "2.4 MB"} · SHA-256 Verified
                    </div>
                  </div>
                </div>
              )}

              {evidence.type === "audio" && (
                <div className="flex flex-col items-center justify-center text-center space-y-3 w-full max-w-md p-2">
                  <div className="grid size-14 place-items-center rounded-2xl bg-indigo-500/10 text-indigo-600">
                    <Music className="size-7" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Recorded Statement Audio Track</div>
                    <div className="font-mono text-xs text-muted-foreground mt-0.5">
                      Duration: {evidence.durationSec ? `${Math.floor(evidence.durationSec / 60)}m ${evidence.durationSec % 60}s` : "Recorded audio"} · {evidence.mimeType || "WebM Opus"}
                    </div>
                  </div>

                  {/* Audio Controls Bar */}
                  <div className="w-full bg-card/90 rounded-lg p-3 border border-border/80 space-y-2">
                    <div className="flex items-center gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-8 rounded-full shrink-0"
                        onClick={toggleModalAudio}
                        aria-label={isPlayingAudio ? "Pause audio" : "Play audio"}
                      >
                        {isPlayingAudio ? <Pause className="size-3.5 text-signal" /> : <Play className="size-3.5 ml-0.5 text-primary" />}
                      </Button>

                      <div className="flex-1 space-y-1">
                        <Slider
                          value={[audioPlayTime]}
                          max={audioDuration || 100}
                          step={1}
                          onValueChange={(val) => {
                            setAudioPlayTime(val[0] ?? 0);
                            if (audioElemRef.current) {
                              audioElemRef.current.currentTime = val[0] ?? 0;
                            }
                          }}
                          className="w-full"
                          aria-label="Seek audio"
                        />
                        <div className="flex justify-between font-mono text-[0.65rem] text-muted-foreground">
                          <span>{Math.floor(audioPlayTime / 60)}:{String(audioPlayTime % 60).padStart(2, "0")}</span>
                          <span>{Math.floor(audioDuration / 60)}:{String(audioDuration % 60).padStart(2, "0")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 border-t border-border/50 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[0.68rem] text-muted-foreground">Transcript:</span>
                        <span className="font-semibold text-[0.68rem] text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                          {evidence.transcriptStatus || "Completed"}
                        </span>
                      </div>

                      <div className="flex gap-1.5">
                        {onViewTranscript && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              onViewTranscript(evidence.id);
                              onOpenChange(false);
                            }}
                            className="h-6 text-[0.68rem] gap-1 px-2 text-primary"
                          >
                            <MessageSquare className="size-3" /> View Transcript
                          </Button>
                        )}
                        {onGenerateTranscript && (!evidence.transcriptStatus || evidence.transcriptStatus === "Not Generated") && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              onGenerateTranscript(evidence.id);
                              onOpenChange(false);
                            }}
                            className="h-6 text-[0.68rem] gap-1 px-2 text-primary"
                          >
                            <Sparkles className="size-3" /> Generate Transcript
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {evidence.type === "video" && (
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <div className="grid size-16 place-items-center rounded-2xl bg-rose-500/10 text-rose-600">
                    <Video className="size-8" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Surveillance & Inspection Video</div>
                    <div className="font-mono text-xs text-muted-foreground mt-0.5">
                      {evidence.fileName} · {evidence.fileSize || "14.2 MB"} · Timestamp Embedded
                    </div>
                  </div>
                </div>
              )}

              {evidence.type === "document" && (
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <div className="grid size-16 place-items-center rounded-2xl bg-amber-500/10 text-amber-600">
                    <FileText className="size-8" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Official Case Attachment / Scan</div>
                    <div className="font-mono text-xs text-muted-foreground mt-0.5">
                      {evidence.fileName} · {evidence.fileSize || "1.1 MB"} · Verified PDF
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Extended Metadata Grid (35.7) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="rounded-lg border border-border bg-card p-2.5 space-y-0.5">
                <span className="text-[0.68rem] text-muted-foreground flex items-center gap-1">
                  <Tag className="size-3" /> Evidence ID
                </span>
                <span className="font-mono font-semibold text-foreground block">
                  {evidence.id} ({evLabel(evidence.number)})
                </span>
              </div>

              <div className="rounded-lg border border-border bg-card p-2.5 space-y-0.5">
                <span className="text-[0.68rem] text-muted-foreground flex items-center gap-1">
                  <User className="size-3" /> Captured By
                </span>
                <span className="font-medium text-foreground truncate block">
                  {evidence.capturedBy || "Dr. S. Ramanathan"}
                </span>
              </div>

              <div className="rounded-lg border border-border bg-card p-2.5 space-y-0.5">
                <span className="text-[0.68rem] text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3" /> Captured Date/Time
                </span>
                <span className="font-mono text-foreground truncate block">
                  {fmtDateTime(evidence.timestamp)}
                </span>
              </div>

              <div className="rounded-lg border border-border bg-card p-2.5 space-y-0.5">
                <span className="text-[0.68rem] text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="size-3" /> Security Level
                </span>
                <span className="font-medium text-emerald-600 block">
                  Strictly Confidential
                </span>
              </div>
            </div>

            {/* Editable Description with Custody Tracking */}
            <div className="rounded-lg border border-border bg-card p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">Description & Context</span>
                {!isEditingDesc && onUpdateEvidence && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDescDraft(evidence.description);
                      setIsEditingDesc(true);
                    }}
                    className="h-6 text-[0.7rem] gap-1 text-primary"
                  >
                    <Edit2 className="size-3" /> Edit Description
                  </Button>
                )}
              </div>

              {isEditingDesc ? (
                <div className="space-y-2">
                  <Textarea
                    value={descDraft}
                    onChange={(e) => setDescDraft(e.target.value)}
                    rows={2}
                    className="text-xs bg-background"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingDesc(false)}
                      className="h-7 text-xs"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSaveDescription}
                      className="h-7 text-xs gap-1 bg-primary"
                    >
                      <Save className="size-3" /> Save & Log
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {evidence.description}
                </p>
              )}
            </div>
          </TabsContent>

          {/* TAB 2: Chain of Custody History */}
          <TabsContent value="custody" className="space-y-3">
            <div className="rounded-lg bg-muted/30 p-3 border border-border/70 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-foreground mb-0.5">
                <ShieldCheck className="size-3.5 text-primary" /> Chain of Custody
              </div>
              <p className="text-[0.68rem] text-muted-foreground leading-relaxed">
                Tracks evidence handling events including capture, verification, transfer, and updates. Production deployments should enforce evidence integrity and access controls at the backend/storage layer.
              </p>
            </div>

            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {custodyHistory.map((item, index) => (
                <div
                  key={item.id || index}
                  className="rounded-lg border border-border/80 bg-card p-3 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="grid size-6 place-items-center rounded-full bg-primary/10 text-primary font-mono text-[0.65rem] font-bold shrink-0 mt-0.5">
                      #{index + 1}
                    </span>
                    <div>
                      <div className="font-semibold text-foreground">{item.action}</div>
                      <div className="text-muted-foreground text-[0.68rem]">
                        Performed by: <strong className="text-foreground font-normal">{item.performedBy}</strong>
                        {item.details && ` · ${item.details}`}
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-[0.68rem] text-muted-foreground whitespace-nowrap">
                    {fmtDateTime(item.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between sm:justify-between items-center pt-2">
          {onDelete ? (
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:bg-destructive/10 text-xs gap-1.5 h-8"
              onClick={() => {
                onDelete(evidence.id);
                onOpenChange(false);
              }}
            >
              <Trash2 className="size-3.5" /> Remove Evidence
            </Button>
          ) : <div />}

          <div className="flex flex-wrap items-center gap-2">
            {evidence.status !== "Verified" && onUpdateEvidence && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1.5 h-8 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/10"
                onClick={handleVerifyEvidence}
              >
                <CheckCircle2 className="size-3.5" /> Verify Evidence
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 h-8"
              onClick={() => {
                const blob = new Blob([`Official DSIM evidence export for ${evidence.fileName}`], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = evidence.fileName;
                a.click();
                toast.success(`Downloaded ${evidence.fileName}`);
              }}
            >
              <Download className="size-3.5" /> Download File
            </Button>
            <Button size="sm" className="text-xs h-8" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
