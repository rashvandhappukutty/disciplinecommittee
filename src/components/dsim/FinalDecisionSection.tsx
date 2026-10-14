import { useState, useEffect } from "react";
import { Gavel, Calendar, ShieldCheck, CheckCircle2, AlertCircle, Clock, Save, FileCheck, Award, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { differenceInDays, parseISO, format, isValid } from "date-fns";
import type { ActionType, CaseRecord, CaseStatus } from "@/lib/dsim/types";
import { toast } from "sonner";

interface FinalDecisionSectionProps {
  caseRecord: CaseRecord;
  onSaveDecision: (decision: {
    disciplinaryAction: ActionType;
    actionReason?: string;
    actionNotes?: string;
    committeeRemarks?: string;
    finalDecisionNotes?: string;
    decisionDate?: string;
    suspensionStartDate?: string;
    returnDate?: string;
    status: CaseStatus;
  }) => void;
}

export function FinalDecisionSection({
  caseRecord,
  onSaveDecision,
}: FinalDecisionSectionProps) {
  const [action, setAction] = useState<ActionType>(
    caseRecord.disciplinaryAction || "Suspension"
  );
  const [decisionDate, setDecisionDate] = useState(
    caseRecord.decisionDate || new Date().toISOString().slice(0, 10)
  );
  const [startDate, setStartDate] = useState(
    caseRecord.suspensionStartDate || new Date().toISOString().slice(0, 10)
  );
  const [returnDate, setReturnDate] = useState(
    caseRecord.returnDate ||
      new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  );
  const [reason, setReason] = useState(caseRecord.actionReason || "");
  const [committeeRemarks, setCommitteeRemarks] = useState(caseRecord.committeeRemarks || "");
  const [finalDecisionNotes, setFinalDecisionNotes] = useState(caseRecord.finalDecisionNotes || "");

  useEffect(() => {
    if (caseRecord.disciplinaryAction) setAction(caseRecord.disciplinaryAction);
    if (caseRecord.decisionDate) setDecisionDate(caseRecord.decisionDate);
    if (caseRecord.suspensionStartDate) setStartDate(caseRecord.suspensionStartDate);
    if (caseRecord.returnDate) setReturnDate(caseRecord.returnDate);
    if (caseRecord.actionReason) setReason(caseRecord.actionReason);
    if (caseRecord.committeeRemarks) setCommitteeRemarks(caseRecord.committeeRemarks);
    if (caseRecord.finalDecisionNotes) setFinalDecisionNotes(caseRecord.finalDecisionNotes);
  }, [caseRecord]);

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
    if (caseRecord.status !== "Closed") {
      if (action === "Suspension") {
        nextStatus = "Suspended";
      } else if (action === "Warning" || action === "No Action") {
        nextStatus = "Decision Pending";
      }
    }

    onSaveDecision({
      disciplinaryAction: action,
      decisionDate,
      actionReason: reason,
      committeeRemarks,
      finalDecisionNotes,
      status: nextStatus,
      ...(action === "Suspension" && startDate ? { suspensionStartDate: startDate } : {}),
      ...(action === "Suspension" && returnDate ? { returnDate } : {}),
    });

    toast.success(`Official Final Disciplinary Decision saved: ${action}`);
  };

  return (
    <div className="surface overflow-hidden p-5 sm:p-6 space-y-6">
      {/* Official Finding Header Banner */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Gavel className="size-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-foreground">Official Final Disciplinary Decision</h3>
              <p className="text-xs text-muted-foreground">
                Authoritative ruling of the College Discipline Committee. Distinguished from notes & temporary drafts.
              </p>
            </div>
          </div>
        </div>

        <Button onClick={handleSave} size="sm" className="gap-1.5 text-xs bg-primary hover:bg-primary/90 shadow-sm self-start sm:self-auto">
          <Save className="size-3.5" /> Save Official Decision
        </Button>
      </div>

      {/* AI Governance & Human Oversight Banner (Requirements 12, 14) */}
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3.5 text-xs text-amber-800 dark:text-amber-300 space-y-1">
        <div className="flex items-center gap-2 font-semibold">
          <AlertTriangle className="size-4 text-amber-600 shrink-0" />
          <span>Human Authority & Decision Governance</span>
        </div>
        <p className="text-[0.72rem] text-muted-foreground leading-relaxed pl-6">
          AI systems are assistive only. Disciplinary responsibility, sanctions, suspensions, expulsions, or case closures must be manually determined, approved, and enacted exclusively by authorized Discipline Committee members.
        </p>
      </div>

      {/* Distinction Badge Strip */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 text-xs">
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 flex items-start gap-2">
          <ShieldCheck className="size-4 text-primary shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-foreground block">Binding Disciplinary Verdict</span>
            <span className="text-muted-foreground text-[0.68rem]">Official outcome recorded in institutional registry</span>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card/60 p-3 flex items-start gap-2">
          <FileCheck className="size-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-foreground block">Committee Consensus</span>
            <span className="text-muted-foreground text-[0.68rem]">Reviewed against institutional disciplinary code</span>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card/60 p-3 flex items-start gap-2">
          <Clock className="size-4 text-signal shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-foreground block">Enforcement Schedule</span>
            <span className="text-muted-foreground text-[0.68rem]">Automatic reminders & readmission checks linked</span>
          </div>
        </div>
      </div>

      {/* Decision Type Selection */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold">1. Decision Type (Sanction Category)</Label>
        <RadioGroup
          value={action}
          onValueChange={(v) => setAction(v as ActionType)}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {[
            { id: "Suspension", label: "Suspension", desc: "Formal term of academic suspension", icon: AlertTriangle, color: "text-red-500" },
            { id: "Warning", label: "Official Warning", desc: "Formal written reprimand on dossier", icon: AlertCircle, color: "text-amber-500" },
            { id: "No Action", label: "No Action / Exonerated", desc: "Cleared of violation charges", icon: CheckCircle2, color: "text-emerald-500" },
            { id: "Other", label: "Other Sanction", desc: "Community service / lab restriction", icon: Award, color: "text-indigo-500" },
          ].map((opt) => (
            <label
              key={opt.id}
              htmlFor={opt.id}
              className={`relative flex cursor-pointer flex-col rounded-xl border p-3.5 transition-all ${
                action === opt.id
                  ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary/30"
                  : "border-border hover:bg-muted/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground flex items-center gap-1.5">
                  <opt.icon className={`size-3.5 ${opt.color}`} />
                  {opt.label}
                </span>
                <RadioGroupItem value={opt.id} id={opt.id} />
              </div>
              <span className="mt-1 text-[0.68rem] text-muted-foreground">{opt.desc}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Date & Timeline Settings */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="dec-date" className="text-xs font-semibold">
            Decision Pronouncement Date
          </Label>
          <Input
            id="dec-date"
            type="date"
            value={decisionDate}
            onChange={(e) => setDecisionDate(e.target.value)}
            className="text-xs font-mono h-9 bg-card"
          />
        </div>

        {action === "Suspension" && (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="susp-start" className="text-xs font-semibold">
                Suspension Start Date
              </Label>
              <Input
                id="susp-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="text-xs font-mono h-9 bg-card"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="susp-return" className="text-xs font-semibold">
                  Scheduled Return Date
                </Label>
                {durationDays > 0 && (
                  <span className="font-mono text-[0.68rem] font-bold text-signal">
                    {durationDays} Days Term
                  </span>
                )}
              </div>
              <Input
                id="susp-return"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="text-xs font-mono h-9 bg-card"
              />
            </div>
          </>
        )}
      </div>

      {/* Core Fields: Decision Reason, Committee Remarks, Final Notes */}
      <div className="space-y-4">
        {/* Decision Reason */}
        <div className="space-y-1.5">
          <Label htmlFor="dec-reason" className="text-xs font-semibold">
            2. Decision Reason & Specific Findings <span className="text-destructive">*</span>
          </Label>
          <Input
            id="dec-reason"
            placeholder="E.g., Unauthorized access to Laboratory B-204 and careless handling resulting in equipment damage."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="text-xs h-9"
          />
          <span className="text-[0.68rem] text-muted-foreground">
            Clear statement of proven facts and violations established during investigation.
          </span>
        </div>

        {/* Committee Remarks */}
        <div className="space-y-1.5">
          <Label htmlFor="comm-remarks" className="text-xs font-semibold">
            3. Discipline Committee Remarks & Deliberation Notes
          </Label>
          <Textarea
            id="comm-remarks"
            placeholder="E.g., Committee noted first-time infraction, student's cooperation during inquiry, and prompt admission of responsibility..."
            value={committeeRemarks}
            onChange={(e) => setCommitteeRemarks(e.target.value)}
            rows={3}
            className="text-xs leading-relaxed"
          />
        </div>

        {/* Final Decision Notes & Terms of Reinstatement */}
        <div className="space-y-1.5">
          <Label htmlFor="final-notes" className="text-xs font-semibold">
            4. Final Decision Notes & Readmission Prerequisites
          </Label>
          <Textarea
            id="final-notes"
            placeholder="E.g., Parent acknowledgment undertaking signed; equipment repair reimbursement deposited; counseling session scheduled upon return."
            value={finalDecisionNotes}
            onChange={(e) => setFinalDecisionNotes(e.target.value)}
            rows={3}
            className="text-xs leading-relaxed"
          />
        </div>

        {/* Section 20: Disciplinary Board Member Participation & Voting Panel */}
        <div className="rounded-xl border border-border bg-card/70 p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border pb-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <ShieldCheck className="size-4 text-primary" /> Disciplinary Board Member Deliberation & Voting
              </div>
              <p className="text-[0.7rem] text-muted-foreground">
                Formal participation of Disciplinary Board Members in judicial decision-making.
              </p>
            </div>
            {/* Case Assignment Badge & Action */}
            <div className="flex items-center gap-2">
              <span className="text-[0.68rem] px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium">
                {caseRecord.assignedBoardMember ? `Assigned: ${caseRecord.assignedBoardMember}` : "Assigned: Disciplinary Board Member"}
              </span>
            </div>
          </div>

          {/* Existing Votes Ledger */}
          <div className="space-y-2">
            <span className="text-[0.68rem] font-bold text-muted-foreground uppercase tracking-wider">
              Recorded Board Member Votes ({caseRecord.boardVotes?.length || 0})
            </span>
            {caseRecord.boardVotes && caseRecord.boardVotes.length > 0 ? (
              <div className="space-y-2">
                {caseRecord.boardVotes.map((v) => (
                  <div key={v.id} className="rounded-lg border border-border/80 bg-background p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{v.voter}</span>
                        <span className={`px-2 py-0.5 rounded text-[0.65rem] font-bold ${
                          v.vote === "Agree"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                            : v.vote === "Disagree"
                            ? "bg-red-500/15 text-red-700 dark:text-red-300"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {v.vote}
                        </span>
                      </div>
                      {v.remarks && <p className="text-muted-foreground text-[0.7rem] italic">"{v.remarks}"</p>}
                    </div>
                    <span className="text-[0.65rem] text-muted-foreground font-mono self-end sm:self-auto">
                      {v.timestamp.slice(0, 10)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border/80 p-3 text-center text-xs text-muted-foreground">
                No formal board member votes recorded yet for this case docket.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
