import { useState } from "react";
import { StickyNote, Plus, Edit2, Trash2, Check, X, Clock, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fmtDateTime } from "@/lib/dsim/format";
import type { InvestigationNote } from "@/lib/dsim/types";
import { toast } from "sonner";

interface InvestigationNotesViewProps {
  caseId: string;
  notes?: InvestigationNote[];
  onAddNote: (content: string) => void;
  onUpdateNote: (noteId: string, content: string) => void;
  onDeleteNote: (noteId: string) => void;
}

export function InvestigationNotesView({
  caseId,
  notes = [],
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}: InvestigationNotesViewProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleSaveNew = () => {
    if (!newContent.trim()) {
      toast.error("Please enter note content");
      return;
    }
    onAddNote(newContent.trim());
    setNewContent("");
    setIsAdding(false);
    toast.success("Investigation note recorded in case record.");
  };

  const handleStartEdit = (note: InvestigationNote) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const handleSaveEdit = (noteId: string) => {
    if (!editContent.trim()) return;
    onUpdateNote(noteId, editContent.trim());
    setEditingId(null);
    setEditContent("");
    toast.success("Note updated");
  };

  return (
    <div className="surface overflow-hidden p-5 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
              <StickyNote className="size-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-foreground">Ongoing Investigation Notes</h3>
              <p className="text-xs text-muted-foreground">
                Investigator impressions, field observations, and interview logs separate from formal transcripts and synopsis.
              </p>
            </div>
          </div>
        </div>

        {!isAdding && (
          <Button
            size="sm"
            onClick={() => setIsAdding(true)}
            className="gap-1.5 text-xs bg-primary hover:bg-primary/90 shadow-sm self-start sm:self-auto"
          >
            <Plus className="size-3.5" /> Add Note
          </Button>
        )}
      </div>

      {/* Add New Note Box */}
      {isAdding && (
        <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-xs text-foreground flex items-center gap-1.5">
              <StickyNote className="size-3.5 text-primary" /> New Investigator Note
            </span>
            <span className="text-[0.68rem] text-muted-foreground">Logged with timestamp</span>
          </div>

          <Textarea
            rows={3}
            placeholder="Record real-time inquiry observation, witness behavior, cross-verification findings..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="text-xs bg-card"
            autoFocus
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsAdding(false);
                setNewContent("");
              }}
              className="text-xs h-8"
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveNew} className="text-xs h-8 gap-1.5 bg-primary">
              <Check className="size-3.5" /> Save Note
            </Button>
          </div>
        </div>
      )}

      {/* Notes Stream */}
      {notes.length === 0 && !isAdding ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center bg-muted/20">
          <StickyNote className="size-8 mx-auto text-muted-foreground" />
          <p className="text-xs font-semibold text-foreground mt-2">No investigation notes recorded yet</p>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
            Committee members can document confidential observations, witness lead pointers, and deliberation notes here.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="mt-3 text-xs"
          >
            + Add First Note
          </Button>
        </div>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-xl border border-border bg-card/70 p-4 transition-all hover:border-border/90 hover:bg-card space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid size-6 place-items-center rounded-full bg-secondary text-foreground text-xs font-semibold">
                    <User className="size-3" />
                  </span>
                  <span className="font-semibold text-xs text-foreground">{note.author}</span>
                  <span className="text-[0.68rem] text-muted-foreground font-mono">
                    {fmtDateTime(note.timestamp)}
                  </span>
                  {note.updatedAt && (
                    <span className="text-[0.65rem] text-muted-foreground italic">(edited)</span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 text-muted-foreground hover:text-foreground"
                    onClick={() => handleStartEdit(note)}
                    aria-label="Edit note"
                  >
                    <Edit2 className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      onDeleteNote(note.id);
                      toast.success("Note removed");
                    }}
                    aria-label="Delete note"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>

              {editingId === note.id ? (
                <div className="space-y-2 pt-1">
                  <Textarea
                    rows={3}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="text-xs bg-background"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingId(null)}
                      className="text-xs h-7"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSaveEdit(note.id)}
                      className="text-xs h-7 bg-primary"
                    >
                      Update Note
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-foreground/90 leading-relaxed font-sans whitespace-pre-wrap pl-8">
                  {note.content}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
