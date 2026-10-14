import { useState, useEffect } from "react";
import { Gavel, Calendar, AlertCircle, CheckCircle2, ShieldCheck, Clock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { differenceInDays, parseISO, format, isValid } from "date-fns";
import type { ActionType, CaseRecord, CaseStatus } from "@/lib/dsim/types";
import { toast } from "sonner";

interface DisciplinaryDecisionSectionProps {
  caseRecord: CaseRecord;
  onSaveDecision: (decision: {
    disciplinaryAction: ActionType;
    actionReason?: string;
    actionNotes?: string;
    suspensionStartDate?: string;
    returnDate?: string;
    status: CaseStatus;
  }) => void;
}

export function DisciplinaryDecisionSection({
  caseRecord,
  onSaveDecision,
}: DisciplinaryDecisionSectionProps) {
  const [action, setAction] = useState<ActionType>(
    caseRecord.disciplinaryAction || "Suspension",
  );
  const [startDate, setStartDate] = useState(
    caseRecord.suspensionStartDate || new Date().toISOString().slice(0, 10),
  );
  const [returnDate, setReturnDate] = useState(
    caseRecord.returnDate ||
      new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  );
  const [reason, setReason] = useState(caseRecord.actionReason || "");
  const [notes, setNotes] = useState(caseRecord.actionNotes || "");

  useEffect(() => {
    if (caseRecord.disciplinaryAction) setAction(caseRecord.disciplinaryAction);
    if (caseRecord.suspensionStartDate) setStartDate(caseRecord.suspensionStartDate);
    if (caseRecord.returnDate) setReturnDate(caseRecord.returnDate);
    if (caseRecord.actionReason) setReason(caseRecord.actionReason);
    if (caseRecord.actionNotes) setNotes(caseRecord.actionNotes);
  }, [caseRecord]);

  // Calculate dynamic suspension duration
  const getDurationDays = () => {
    try {
      if (!startDate || !returnDate) return 0;
      const start = parseISO(startDate);
      const end = parseISO(returnDate);
      if (isValid(start) && isValid(end)) {
        const diff = differenceInDays(end, start);
        return Math.max(0, diff);
      }
    } catch {
      return 0;
    }
    return 0;
  };

  const durationDays = getDurationDays();

  const handleSave = () => {
    let nextStatus: CaseStatus = caseRecord.status;
    if (action === "Suspension") {
      nextStatus = "Suspended";
    } else if (action === "Warning" || action === "No Action") {
      nextStatus = "Closed";
    } else {
      nextStatus = "Decision Pending";
    }

    onSaveDecision({
      disciplinaryAction: action,
      actionReason: reason,
      actionNotes: notes,
      status: nextStatus,
      ...(action === "Suspension" && startDate ? { suspensionStartDate: startDate } : {}),
      ...(action === "Suspension" && returnDate ? { returnDate } : {}),
    });

    toast.success(`Disciplinary decision recorded: ${action}`);
  };

  return (
    <div className="surface overflow-hidden p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold">Disciplinary Action & Sanction</h3>
            <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[0.68rem] font-semibold text-primary">
              Official Finding
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Formally record the Committee Head's verdict and enforce suspension or warning terms.
          </p>
        </div>

        <Button onClick={handleSave} size="sm" className="gap-1.5 text-xs bg-primary hover:bg-primary/90">
          <Save className="size-3.5" /> Save Decision
        </Button>
      </div>

      <div className="mt-5 space-y-6">
        {/* Action Type Selection */}
        <div>
          <Label className="text-xs font-semibold">Sanction Category</Label>
          <RadioGroup
            value={action}
            onValueChange={(v) => setAction(v as ActionType)}
            className="mt-2.5 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {[
              { id: "Suspension", label: "Suspension", desc: "Temporary bar from college" },
              { id: "Warning", label: "Official Warning", desc: "Written reprimand on file" },
              { id: "No Action", label: "Exonerated / No Action", desc: "Cleared of allegations" },
              { id: "Other", label: "Other Penalty", desc: "Community service / fine" },
            ].map((opt) => (
              <label
                key={opt.id}
                htmlFor={opt.id}
                className={`relative flex cursor-pointer flex-col rounded-xl border p-3.5 transition-all ${
                  action === opt.id
                    ? "border-primary bg-primary/5 shadow-xs"
                    : "border-border hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-foreground">{opt.label}</span>
                  <RadioGroupItem value={opt.id} id={opt.id} />
                </div>
                <span className="mt-1 text-[0.68rem] text-muted-foreground">{opt.desc}</span>
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Suspension Parameters */}
        {action === "Suspension" && (
          <div className="space-y-4 rounded-xl border border-signal/20 bg-signal/5 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-lg bg-signal/15 text-signal">
                  <Calendar className="size-4" />
                </span>
                <span className="font-semibold text-xs text-signal">
                  Suspension Term Configuration
                </span>
              </div>

              {durationDays > 0 && (
                <span className="rounded-full bg-signal/15 px-3 py-1 font-mono text-xs font-bold text-signal">
                  {durationDays} Days Duration
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="susp-start" className="text-xs">
                  Suspension Effective Start Date
                </Label>
                <Input
                  id="susp-start"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-card text-xs font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="susp-return" className="text-xs">
                  Expected Return Date
                </Label>
                <Input
                  id="susp-return"
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="bg-card text-xs font-mono"
                />
              </div>
            </div>

            <div className="rounded-lg bg-card/80 p-3 border border-border/60 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="size-3.5 text-primary" />
                <span>
                  Automatic reminders will be scheduled for{" "}
                  <strong className="text-foreground font-mono">
                    {returnDate ? format(parseISO(returnDate), "dd MMM yyyy") : "N/A"}
                  </strong>{" "}
                  (3 days prior, 1 day prior, and day of return).
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Reason for Sanction */}
        <div className="space-y-1.5">
          <Label htmlFor="dec-reason" className="text-xs font-semibold">
            Official Reason & Committee Findings
          </Label>
          <Input
            id="dec-reason"
            placeholder="E.g., Unauthorized equipment tampering in laboratory without supervisor consent."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="text-xs"
          />
        </div>

        {/* Additional Notes */}
        <div className="space-y-1.5">
          <Label htmlFor="dec-notes" className="text-xs font-semibold">
            Conditions for Return / Rehabilitation Notes
          </Label>
          <Textarea
            id="dec-notes"
            placeholder="E.g., Submission of safety clearance acknowledgment, parent meeting required prior to campus readmission."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="text-xs"
          />
        </div>
      </div>
    </div>
  );
}
