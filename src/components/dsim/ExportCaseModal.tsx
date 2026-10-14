import { ShieldCheck, Download, Printer, FileText, CheckCircle2, Lock, Award, Calendar, User, Gavel } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fmtDate, fmtDateTime } from "@/lib/dsim/format";
import { evLabel } from "@/lib/dsim/store";
import type { CaseRecord } from "@/lib/dsim/types";
import { toast } from "sonner";

import { INSTITUTION } from "@/lib/dsim/institution";

interface ExportCaseModalProps {
  caseRecord: CaseRecord;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportCaseModal({
  caseRecord,
  open,
  onOpenChange,
}: ExportCaseModalProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const reportText = `================================================================================
KPR COLLEGE OF ARTS, SCIENCE AND RESEARCH
DISCIPLINARY & STUDENT INCIDENT MANAGEMENT SYSTEM
CONFIDENTIAL CASE REPORT
================================================================================
CASE IDENTIFIER:      ${caseRecord.id}
SOURCE COMPLAINT:     ${caseRecord.sourceComplaintId || "N/A (Direct Case Intake)"}
CASE TITLE:           ${caseRecord.caseName}
INSTITUTION:          ${INSTITUTION.name} (${INSTITUTION.shortName})
CLASSIFICATION:       CONFIDENTIAL · DISCIPLINE COMMITTEE DOSSIER
CURRENT STATUS:       ${caseRecord.status.toUpperCase()}
DATE GENERATED:       ${new Date().toLocaleString()}
REPORT HASH:          SHA256-${Math.random().toString(36).substring(2, 14).toUpperCase()}

--------------------------------------------------------------------------------
1. ACCUSED STUDENT PARTICULAR DETAILS
--------------------------------------------------------------------------------
Name:                 ${caseRecord.accusedStudent}
Roll Number:          ${caseRecord.rollNumber}
School / Department:  ${caseRecord.department}
Academic Year:        ${caseRecord.academicYear}
Year of Study:        ${caseRecord.yearOfStudy}
Intake Date:          ${fmtDate(caseRecord.createdAt)}

--------------------------------------------------------------------------------
2. INCIDENT & ALLEGATION SUMMARY
--------------------------------------------------------------------------------
${caseRecord.description}

--------------------------------------------------------------------------------
3. INVOLVED PERSONS & WITNESSES (${caseRecord.involvedPersons.length})
--------------------------------------------------------------------------------
${caseRecord.involvedPersons.length === 0 ? "No additional persons registered." : caseRecord.involvedPersons.map((p, i) => `  ${i + 1}. ${p.name} | Role: ${p.role} | Dept: ${p.department} ${p.rollNumber ? `[${p.rollNumber}]` : ""}`).join("\n")}

--------------------------------------------------------------------------------
4. INVESTIGATION SESSION PARTICULARS
--------------------------------------------------------------------------------
Investigation Commenced: ${caseRecord.investigationStart ? fmtDateTime(caseRecord.investigationStart) : "N/A"}
Investigation Concluded: ${caseRecord.investigationEnd ? fmtDateTime(caseRecord.investigationEnd) : "In Progress"}
Inquiry Room:            Discipline Committee Chamber Room 102
Presiding Authority:     Discipline Committee Head, ${INSTITUTION.shortName}

--------------------------------------------------------------------------------
5. CHRONOLOGICAL INVESTIGATION TIMELINE (${caseRecord.timeline.length} Events)
--------------------------------------------------------------------------------
${caseRecord.timeline.map((t) => `  [${fmtDateTime(t.timestamp)}] ${t.event} ${t.evidenceRef ? `(${t.evidenceRef})` : ""}: ${t.description || ""}`).join("\n")}

--------------------------------------------------------------------------------
6. EVIDENCE REPOSITORY & CHAIN-OF-CUSTODY INVENTORY (${caseRecord.evidence.length} Items)
--------------------------------------------------------------------------------
${caseRecord.evidence.length === 0 ? "No evidence exhibits recorded." : caseRecord.evidence.map((e) => `  - ${evLabel(e.number)} [${e.type.toUpperCase()}]: ${e.fileName} (${e.fileSize || "Vault Item"})
    Captured by: ${e.capturedBy || "Investigator"} on ${fmtDateTime(e.timestamp)}
    Description: ${e.description}`).join("\n")}

--------------------------------------------------------------------------------
7. RECORDED SPEECH TRANSCRIPT EXCERPT (${caseRecord.transcript?.length || 0} Dialogue Items)
--------------------------------------------------------------------------------
${!caseRecord.transcript || caseRecord.transcript.length === 0 ? "No voice recording transcript available." : caseRecord.transcript.map((tr) => `  [${tr.timestamp}] ${tr.speakerName || tr.speaker} (${tr.speaker}):\n  "${tr.text}"`).join("\n\n")}

--------------------------------------------------------------------------------
8. AI-SYNTHESIZED INVESTIGATION SYNOPSIS
--------------------------------------------------------------------------------
${caseRecord.synopsis || "No AI synopsis synthesized."}

--------------------------------------------------------------------------------
9. OFFICIAL FINAL DISCIPLINARY DECISION
--------------------------------------------------------------------------------
Sanction Ruling:     ${caseRecord.disciplinaryAction || "Pending Final Committee Hearing"}
Pronouncement Date:  ${caseRecord.decisionDate || fmtDate(caseRecord.updatedAt)}
Official Findings:   ${caseRecord.actionReason || "Under formal review."}
Committee Remarks:   ${caseRecord.committeeRemarks || "Deliberation finalized in quorum."}
Readmission Terms:   ${caseRecord.finalDecisionNotes || caseRecord.actionNotes || "Standard reinstatement criteria apply."}

--------------------------------------------------------------------------------
10. SUSPENSION ENFORCEMENT & DURATION DETAILS
--------------------------------------------------------------------------------
Effective Date:      ${caseRecord.suspensionStartDate || "N/A"}
Scheduled Return:    ${caseRecord.returnDate || "N/A"}
Campus Debarment:    Hostel & Laboratory Restrictions Active

--------------------------------------------------------------------------------
11. STUDENT READMISSION & CLEARANCE VERIFICATION
--------------------------------------------------------------------------------
Return Status:       ${caseRecord.status === "Returned" || caseRecord.returned ? "CLEARED AND REINSTATED" : "AWAITING RETURN"}
Actual Return Date:  ${caseRecord.actualReturnDate || (caseRecord.returned ? caseRecord.returnDate : "Pending")}
Readmission Notes:   ${caseRecord.returnRemarks || "Subject to final verification upon return."}

--------------------------------------------------------------------------------
12. CASE CLOSURE & ARCHIVE ATTESTATION
--------------------------------------------------------------------------------
Closure Status:      ${caseRecord.status === "Closed" ? "OFFICIALLY CLOSED AND ARCHIVED" : "ACTIVE / OPEN WORKSPACE"}
${caseRecord.closureInfo ? `Closed At:           ${fmtDateTime(caseRecord.closureInfo.closedAt)}
Closed By:           ${caseRecord.closureInfo.closedBy}
Final Resolution:    ${caseRecord.closureInfo.finalDecision}
Closure Outcome:     ${caseRecord.closureInfo.outcome}
Closing Remarks:     ${caseRecord.closureInfo.finalRemarks}` : "Case has not yet been sealed."}

================================================================================
COMMITTEE HEAD ATTESTATION & DIGITAL SEAL
Dr. S. Ramanathan
Discipline Committee Head
${INSTITUTION.name}
================================================================================
`;
    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${INSTITUTION.shortName}-DSIM-Report-${caseRecord.id}.txt`;
    a.click();
    toast.success(`Exported complete official investigation dossier for ${caseRecord.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[88vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <DialogTitle className="text-base font-bold">Export Official Case Investigation Report</DialogTitle>
                <DialogDescription className="text-xs">
                  {INSTITUTION.name} · {INSTITUTION.systemFullName}
                </DialogDescription>
              </div>
            </div>
            <div className="hidden sm:block font-mono text-[0.68rem] bg-secondary px-2.5 py-1 rounded font-bold text-foreground">
              {caseRecord.id}
            </div>
          </div>
        </DialogHeader>

        {/* Printable Preview Sheet (12 Complete Sections) */}
        <div className="rounded-xl border border-border bg-card p-6 text-xs space-y-5 shadow-sm font-sans printable-dossier">
          {/* Official Document Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-primary pb-4 gap-4">
            <div className="flex items-center gap-3">
              <img
                src={INSTITUTION.logoUrl}
                alt={INSTITUTION.name}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
              <div>
                <div className="font-mono text-[0.68rem] font-bold uppercase tracking-widest text-primary">
                  {INSTITUTION.name}
                </div>
                <div className="font-bold text-[0.7rem] text-foreground uppercase tracking-wider">
                  {INSTITUTION.systemFullName}
                </div>
                <div className="text-[0.68rem] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
                  CONFIDENTIAL CASE REPORT
                </div>
                <h2 className="text-lg font-bold text-foreground mt-1">{caseRecord.caseName}</h2>
                <div className="text-xs text-muted-foreground mt-0.5 font-mono">
                  Case ID: <span className="font-bold text-foreground">{caseRecord.id}</span>
                  {caseRecord.sourceComplaintId && (
                    <span className="ml-2">· Source Complaint: <strong className="text-foreground">{caseRecord.sourceComplaintId}</strong></span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <div className="inline-block rounded-md bg-primary/10 border border-primary/20 px-3 py-1 font-mono text-xs font-bold text-primary">
                {caseRecord.status.toUpperCase()}
              </div>
              <div className="text-[0.68rem] text-muted-foreground mt-1.5 font-mono">
                Generated: {fmtDate(new Date().toISOString())}
              </div>
            </div>
          </div>

          {/* Section 1 & 2: Accused & Incident */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="rounded-lg bg-muted/40 p-3.5 border border-border/70 space-y-1.5">
              <div className="text-[0.68rem] font-bold uppercase tracking-wider text-muted-foreground font-mono flex items-center gap-1.5">
                <User className="size-3 text-primary" /> 1. Accused Student Particulars
              </div>
              <div className="text-sm font-bold text-foreground">{caseRecord.accusedStudent}</div>
              <div className="font-mono text-xs text-muted-foreground">
                Roll No: <strong className="text-foreground">{caseRecord.rollNumber}</strong> · {caseRecord.department}
              </div>
              <div className="text-xs text-muted-foreground">
                Academic Standing: {caseRecord.academicYear} ({caseRecord.yearOfStudy})
              </div>
            </div>

            <div className="rounded-lg bg-muted/40 p-3.5 border border-border/70 space-y-1.5">
              <div className="text-[0.68rem] font-bold uppercase tracking-wider text-muted-foreground font-mono flex items-center gap-1.5">
                <FileText className="size-3 text-signal" /> 2. Incident Description
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {caseRecord.description}
              </p>
            </div>
          </div>

          {/* Section 3: Involved Persons */}
          <div>
            <div className="font-semibold text-xs text-foreground mb-1.5 font-mono">
              3. Involved Persons & Witness Roster ({caseRecord.involvedPersons.length})
            </div>
            {caseRecord.involvedPersons.length === 0 ? (
              <p className="text-muted-foreground italic text-xs">No additional witnesses registered.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {caseRecord.involvedPersons.map((p) => (
                  <div key={p.id} className="rounded border border-border/60 bg-muted/20 p-2 text-xs">
                    <span className="font-semibold text-foreground">{p.name}</span> ·{" "}
                    <span className="text-muted-foreground">{p.role}</span> ({p.department})
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 4 & 5: Investigation Details & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="rounded-lg border border-border p-3 space-y-1.5">
              <div className="font-semibold text-xs font-mono">4. Investigation Details</div>
              <div className="text-xs text-muted-foreground">
                Session Started: <span className="font-mono text-foreground">{caseRecord.investigationStart ? fmtDateTime(caseRecord.investigationStart) : "N/A"}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Session Concluded: <span className="font-mono text-foreground">{caseRecord.investigationEnd ? fmtDateTime(caseRecord.investigationEnd) : "In Progress"}</span>
              </div>
            </div>

            <div className="rounded-lg border border-border p-3 space-y-1.5">
              <div className="font-semibold text-xs font-mono">5. Chronological Timeline ({caseRecord.timeline.length})</div>
              <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                {caseRecord.timeline.slice(-4).map((t) => (
                  <div key={t.id} className="flex justify-between text-[0.68rem]">
                    <span className="text-foreground">{t.event}</span>
                    <span className="font-mono text-muted-foreground">{fmtDate(t.timestamp)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 6: Evidence Index */}
          <div>
            <div className="font-semibold text-xs text-foreground mb-1.5 font-mono">
              6. Evidence Exhibits Inventory ({caseRecord.evidence.length} items)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {caseRecord.evidence.map((e) => (
                <div key={e.id} className="rounded border border-border/70 p-2 text-xs flex justify-between items-center bg-card">
                  <div>
                    <span className="font-mono font-bold text-foreground">{evLabel(e.number)}</span> [{e.type.toUpperCase()}]
                    <div className="text-[0.68rem] text-muted-foreground truncate max-w-[200px]">{e.description}</div>
                  </div>
                  <span className="text-[0.65rem] font-mono text-muted-foreground">{e.fileSize || "Verified"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7 & 8: Transcript & AI Synopsis */}
          {caseRecord.synopsis && (
            <div>
              <div className="font-semibold text-xs text-foreground mb-1.5 font-mono">
                7 & 8. Investigation Synopsis & Key Findings
              </div>
              <p className="whitespace-pre-line text-muted-foreground bg-muted/20 p-3 rounded-lg border border-border/60 text-xs leading-relaxed">
                {caseRecord.synopsis}
              </p>
            </div>
          )}

          {/* Section 9, 10, 11: Final Decision & Suspension */}
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-2.5">
            <div className="flex items-center justify-between border-b border-primary/20 pb-2">
              <div className="font-bold text-xs text-primary font-mono flex items-center gap-1.5">
                <Gavel className="size-3.5" /> 9, 10 & 11. Final Decision & Sanction Execution
              </div>
              <span className="font-bold text-foreground">{caseRecord.disciplinaryAction || "Pending"}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Official Finding: </span>
                <span className="text-foreground font-medium">{caseRecord.actionReason || "Violation established during hearing."}</span>
              </div>
              {caseRecord.returnDate && (
                <div>
                  <span className="text-muted-foreground">Suspension Period: </span>
                  <span className="font-mono font-bold text-foreground">{caseRecord.suspensionStartDate || "—"} → {caseRecord.returnDate}</span>
                </div>
              )}
            </div>

            {caseRecord.committeeRemarks && (
              <div className="text-[0.7rem] text-muted-foreground pt-1">
                <strong>Committee Remarks: </strong> {caseRecord.committeeRemarks}
              </div>
            )}
          </div>

          {/* Section 12: Closure Information if Closed */}
          {caseRecord.closureInfo && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3.5 text-xs space-y-1">
              <div className="font-bold text-emerald-700 dark:text-emerald-300 font-mono flex items-center gap-1.5">
                <Lock className="size-3" /> 12. Case Closure & Archive Record
              </div>
              <div className="text-muted-foreground">
                Closed by: <strong className="text-foreground">{caseRecord.closureInfo.closedBy}</strong> on {fmtDateTime(caseRecord.closureInfo.closedAt)}
              </div>
              <div className="text-muted-foreground">
                Resolution: <strong className="text-foreground">{caseRecord.closureInfo.finalDecision}</strong> — {caseRecord.closureInfo.finalRemarks}
              </div>
            </div>
          )}

          {/* Official Sign-off Seal */}
          <div className="border-t border-border pt-4 flex items-center justify-between text-[0.68rem] text-muted-foreground">
            <div>
              <div className="font-semibold text-foreground">Dr. S. Ramanathan</div>
              <div>Discipline Committee Head</div>
            </div>
            <div className="text-right font-mono">
              <div className="text-emerald-600 font-bold">DIGITALLY ATTESTED · DSIM VAULT</div>
              <div>Ref: {caseRecord.id}-SECURE</div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4 flex sm:justify-between items-center">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5 text-xs">
              <Printer className="size-3.5" /> Print Report
            </Button>
            <Button size="sm" onClick={handleDownload} className="gap-1.5 text-xs bg-primary hover:bg-primary/90">
              <Download className="size-3.5" /> Export Official Report (.txt)
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
