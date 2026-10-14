import { useState } from "react";
import { UserCheck, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CaseRecord } from "@/lib/dsim/types";
import { toast } from "sonner";

interface MarkReturnedModalProps {
  caseRecord: CaseRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (caseId: string, notes: string) => void;
}

export function MarkReturnedModal({
  caseRecord,
  open,
  onOpenChange,
  onConfirm,
}: MarkReturnedModalProps) {
  const [clearanceNotes, setClearanceNotes] = useState("");
  const [returnDate, setReturnDate] = useState(new Date().toISOString().slice(0, 10));

  if (!caseRecord) return null;

  const handleConfirm = () => {
    onConfirm(caseRecord.id, clearanceNotes);
    onOpenChange(false);
    toast.success(`Marked ${caseRecord.accusedStudent} as returned from suspension.`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <UserCheck className="size-4" />
            </span>
            <div>
              <DialogTitle>Mark Student as Returned</DialogTitle>
              <DialogDescription>
                Reinstate student to active status after suspension term completion.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs space-y-1">
            <div className="font-semibold text-foreground">{caseRecord.accusedStudent}</div>
            <div className="text-muted-foreground">
              {caseRecord.department} · {caseRecord.rollNumber}
            </div>
            <div className="text-muted-foreground">
              Case: <span className="font-mono">{caseRecord.id}</span> — {caseRecord.caseName}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ret-date" className="text-xs">Actual Return Date</Label>
            <Input
              id="ret-date"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ret-notes" className="text-xs">Clearance & Readmission Notes</Label>
            <Textarea
              id="ret-notes"
              placeholder="E.g., Parent undertaking received, student acknowledged committee guidelines..."
              value={clearanceNotes}
              onChange={(e) => setClearanceNotes(e.target.value)}
              rows={3}
              className="text-xs"
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleConfirm} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5">
            <CheckCircle2 className="size-3.5" /> Confirm Readmission
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
