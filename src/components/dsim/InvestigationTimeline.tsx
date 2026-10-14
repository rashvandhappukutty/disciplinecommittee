import { useState } from "react";
import {
  Clock,
  Mic,
  Camera,
  Video,
  UserPlus,
  Sparkles,
  Gavel,
  StickyNote,
  Plus,
  ShieldCheck,
  Check,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fmtDateTime } from "@/lib/dsim/format";
import type { TimelineEvent } from "@/lib/dsim/types";
import { toast } from "sonner";

interface InvestigationTimelineProps {
  timeline: TimelineEvent[];
  onAddNote?: (note: string) => void;
  caseId: string;
}

export function InvestigationTimeline({
  timeline,
  onAddNote,
  caseId,
}: InvestigationTimelineProps) {
  const [showAddNote, setShowAddNote] = useState(false);
  const [noteText, setNoteText] = useState("");

  const sortedTimeline = [...timeline].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  const getEventIcon = (kind: TimelineEvent["kind"]) => {
    switch (kind) {
      case "start":
        return <Clock className="size-3.5 text-blue-500" />;
      case "audio":
        return <Mic className="size-3.5 text-indigo-500" />;
      case "transcript":
        return <MessageSquare className="size-3.5 text-indigo-500" />;
      case "photo":
        return <Camera className="size-3.5 text-emerald-500" />;
      case "video":
        return <Video className="size-3.5 text-rose-500" />;
      case "person":
        return <UserPlus className="size-3.5 text-amber-500" />;
      case "synopsis":
        return <Sparkles className="size-3.5 text-purple-500" />;
      case "decision":
        return <Gavel className="size-3.5 text-red-500" />;
      case "created":
        return <ShieldCheck className="size-3.5 text-slate-500" />;
      case "note":
      default:
        return <StickyNote className="size-3.5 text-teal-500" />;
    }
  };

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onAddNote?.(noteText.trim());
    setNoteText("");
    setShowAddNote(false);
    toast.success("Investigation note recorded in timeline");
  };

  return (
    <div className="surface p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h3 className="text-base font-semibold">Investigation Chronology</h3>
          <p className="text-xs text-muted-foreground">
            Chronological record of proceedings, statements, and evidence intake.
          </p>
        </div>

        {onAddNote && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddNote((v) => !v)}
            className="text-xs gap-1.5"
          >
            <Plus className="size-3.5" /> Add Note
          </Button>
        )}
      </div>

      {showAddNote && (
        <form onSubmit={handleSubmitNote} className="my-4 flex gap-2 rounded-lg border border-border bg-card p-3">
          <Input
            placeholder="Record quick observation or investigator note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="text-xs"
            autoFocus
          />
          <Button type="submit" size="sm" className="text-xs gap-1">
            <Check className="size-3.5" /> Save
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowAddNote(false)}
            className="text-xs"
          >
            Cancel
          </Button>
        </form>
      )}

      <div className="mt-5 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-border space-y-6">
        {sortedTimeline.length === 0 ? (
          <div className="py-4 text-xs text-muted-foreground">No events recorded yet.</div>
        ) : (
          sortedTimeline.map((item) => (
            <div key={item.id} className="relative group">
              {/* Event node */}
              <div className="absolute -left-6 top-0.5 grid size-5 place-items-center rounded-full bg-card border border-border shadow-xs">
                {getEventIcon(item.kind)}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-foreground">{item.event}</span>
                  <span className="font-mono text-[0.65rem] text-muted-foreground">
                    {fmtDateTime(item.timestamp)}
                  </span>
                  {item.evidenceRef && (
                    <span className="rounded bg-secondary px-1.5 py-0.2 font-mono text-[0.62rem] text-primary">
                      {item.evidenceRef}
                    </span>
                  )}
                </div>

                {item.description && (
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
