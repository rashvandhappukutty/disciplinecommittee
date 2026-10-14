import { useState } from "react";
import { Calendar, Clock, RotateCcw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CaseRecord } from "@/lib/dsim/types";
import { toast } from "sonner";

interface RescheduleModalProps {
  caseRecord: CaseRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReschedule: (caseId: string, newReturnDate: string, reason: string) => void;
}

export function RescheduleModal({
  caseRecord,
  open,
  onOpenChange,
  onReschedule,
}: RescheduleModalProps) {
  const [newDate, setNewDate] = useState(
    caseRecord?.returnDate || new Date().toISOString().slice(0, 10),
  );
  const [reason, setReason] = useState("");

  if (!caseRecord) return null;

  const handleConfirm = () => {
    if (!newDate) return;
    onReschedule(caseRecord.id, newDate, reason);
    onOpenChange(false);
    toast.success(`Updated return date for ${caseRecord.accusedStudent} to ${newDate}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-secondary text-primary">
              <Calendar className="size-4" />
            </span>
            <div>
              <DialogTitle>Reschedule Return Date</DialogTitle>
              <DialogDescription>
                Modify expected return date for Case {caseRecord.id}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs space-y-1">
            <div className="font-semibold text-foreground">{caseRecord.accusedStudent}</div>
            <div className="text-muted-foreground">
              Current Return Date: <span className="font-mono">{caseRecord.returnDate || "Not set"}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="resched-date" className="text-xs">New Expected Return Date *</Label>
            <Input
              id="resched-date"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              required
              className="text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="resched-reason" className="text-xs">Reason for Extension / Adjustment</Label>
            <Textarea
              id="resched-reason"
              placeholder="E.g., Medical certificate submitted, pending committee review..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="text-xs"
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleConfirm} className="gap-1.5">
            <RotateCcw className="size-3.5" /> Save New Date
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
