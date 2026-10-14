import { useState } from "react";
import { CheckCircle2, ShieldCheck, AlertCircle, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { CaseRecord } from "@/lib/dsim/types";
import { toast } from "sonner";

interface CloseCaseModalProps {
  caseRecord: CaseRecord;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseCase: (closure: {
    finalDecision: "No Further Action" | "Warning Issued" | "Suspension Completed" | "Other";
    finalRemarks: string;
    outcome: string;
  }) => void;
}

export function CloseCaseModal({
  caseRecord,
  open,
  onOpenChange,
  onCloseCase,
}: CloseCaseModalProps) {
  const [finalDecision, setFinalDecision] = useState<
    "No Further Action" | "Warning Issued" | "Suspension Completed" | "Other"
  >(
    caseRecord.disciplinaryAction === "Suspension"
      ? "Suspension Completed"
      : caseRecord.disciplinaryAction === "Warning"
      ? "Warning Issued"
      : "No Further Action"
  );
  const [decisionDate, setDecisionDate] = useState(new Date().toISOString().slice(0, 10));
  const [outcome, setOutcome] = useState(
    caseRecord.actionReason || "Disciplinary procedure concluded with committee concurrence."
  );
  const [finalRemarks, setFinalRemarks] = useState(
    caseRecord.committeeRemarks ||
      "All statements recorded, evidence preserved in secure archive, and disciplinary sanctions executed in full compliance with college regulations."
  );
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) {
      toast.error("Please confirm the completion statement before closing the case.");
      return;
    }
    if (!finalRemarks.trim()) {
      toast.error("Final remarks are required for official case closure.");
      return;
    }

    onCloseCase({
      finalDecision,
      finalRemarks,
      outcome,
    });
    toast.success(`Case ${caseRecord.id} has been closed successfully.`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <Lock className="size-5" />
            </span>
            <div>
              <DialogTitle className="text-base font-bold">Close Disciplinary Case</DialogTitle>
              <DialogDescription className="text-xs">
                Permanently archive {caseRecord.id} ({caseRecord.caseName}) with official committee closure findings.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Quick Case Banner */}
          <div className="rounded-lg bg-muted/40 p-3 border border-border/70 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Main Accused:</span>
              <span className="font-semibold text-foreground">{caseRecord.accusedStudent} ({caseRecord.rollNumber})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Department:</span>
              <span>{caseRecord.department} · {caseRecord.academicYear}</span>
            </div>
          </div>

          {/* Final Decision Selector */}
          <div className="space-y-1.5">
            <Label htmlFor="final-decision" className="text-xs font-semibold">
              Final Disciplinary Decision <span className="text-destructive">*</span>
            </Label>
            <Select
              value={finalDecision}
              onValueChange={(val) =>
                setFinalDecision(
                  val as "No Further Action" | "Warning Issued" | "Suspension Completed" | "Other"
                )
              }
            >
              <SelectTrigger id="final-decision" className="text-xs h-9">
                <SelectValue placeholder="Select final verdict" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No Further Action" className="text-xs">No Further Action</SelectItem>
                <SelectItem value="Warning Issued" className="text-xs">Warning Issued</SelectItem>
                <SelectItem value="Suspension Completed" className="text-xs">Suspension Completed</SelectItem>
                <SelectItem value="Other" className="text-xs">Other Sanction Concluded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Decision Date */}
          <div className="space-y-1.5">
            <Label htmlFor="decision-date" className="text-xs font-semibold">
              Closure & Decision Date
            </Label>
            <Input
              id="decision-date"
              type="date"
              value={decisionDate}
              onChange={(e) => setDecisionDate(e.target.value)}
              className="text-xs font-mono h-9"
            />
          </div>

          {/* Summary Outcome */}
          <div className="space-y-1.5">
            <Label htmlFor="closure-outcome" className="text-xs font-semibold">
              Official Outcome Summary
            </Label>
            <Input
              id="closure-outcome"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              placeholder="E.g. Restitution paid; Undertaking signed; Suspension satisfied."
              className="text-xs h-9"
            />
          </div>

          {/* Final Remarks */}
          <div className="space-y-1.5">
            <Label htmlFor="final-remarks" className="text-xs font-semibold">
              Final Committee Remarks & Closing Notes <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="final-remarks"
              rows={4}
              value={finalRemarks}
              onChange={(e) => setFinalRemarks(e.target.value)}
              placeholder="Enter comprehensive closing remarks, compliance verification, and archive justification..."
              className="text-xs leading-relaxed"
            />
          </div>

          {/* Section 23: Institutional Closure Checklist */}
          <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-2">
            <div className="text-[0.72rem] font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-primary" /> Case Closure Mandatory Verification Checklist
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 text-muted-foreground text-[0.72rem] cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-border size-3.5 text-primary" />
                <span>Investigation inquiry completed</span>
              </label>
              <label className="flex items-center gap-2 text-muted-foreground text-[0.72rem] cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-border size-3.5 text-primary" />
                <span>Evidence dossier reviewed & preserved</span>
              </label>
              <label className="flex items-center gap-2 text-muted-foreground text-[0.72rem] cursor-pointer">
                <input type="checkbox" defaultChecked={caseRecord.transcriptStatus === "Verified"} className="rounded border-border size-3.5 text-primary" />
                <span>Hearing transcripts verified</span>
              </label>
              <label className="flex items-center gap-2 text-muted-foreground text-[0.72rem] cursor-pointer">
                <input type="checkbox" defaultChecked={!!caseRecord.aiSynopsis?.verifiedBy} className="rounded border-border size-3.5 text-primary" />
                <span>AI synopsis reviewed by committee</span>
              </label>
              <label className="flex items-center gap-2 text-muted-foreground text-[0.72rem] cursor-pointer">
                <input type="checkbox" defaultChecked={!!caseRecord.disciplinaryAction} className="rounded border-border size-3.5 text-primary" />
                <span>Disciplinary decision finalized</span>
              </label>
              <label className="flex items-center gap-2 text-muted-foreground text-[0.72rem] cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-border size-3.5 text-primary" />
                <span>Student notified of decision</span>
              </label>
              <label className="flex items-center gap-2 text-muted-foreground text-[0.72rem] cursor-pointer">
                <input type="checkbox" defaultChecked={caseRecord.returned || !caseRecord.returnDate} className="rounded border-border size-3.5 text-primary" />
                <span>Suspension/return handled if applicable</span>
              </label>
              <label className="flex items-center gap-2 text-muted-foreground text-[0.72rem] cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-border size-3.5 text-primary" />
                <span>Formal case documents generated</span>
              </label>
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <div className="rounded-lg border border-border bg-card p-3 flex items-start space-x-2.5">
            <Checkbox
              id="confirm-closure"
              checked={confirmed}
              onCheckedChange={(c) => setConfirmed(!!c)}
              className="mt-0.5"
            />
            <label
              htmlFor="confirm-closure"
              className="text-xs text-foreground cursor-pointer select-none leading-tight"
            >
              <strong>I confirm</strong> as authorized Discipline Committee Head that the above verification checklist has been satisfied, all records are sealed, and the case is ready for permanent closure.
            </label>
          </div>

          <DialogFooter className="flex justify-between sm:justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={!confirmed}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="size-3.5" /> Close Case
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
