import { useState } from "react";
import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { Protected } from "@/components/dsim/Protected";
import { useDsim } from "@/lib/dsim/store";
import { fmtDate, fmtDateTime } from "@/lib/dsim/format";
import { ComplaintStatusBadge } from "./student.dashboard";
import {
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  Tag,
  ShieldCheck,
  ShieldAlert,
  Send,
  Upload,
  FileImage,
  Film,
  FileAudio,
  File,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  Lock,
  ArrowRight,
  FolderPlus,
  User,
  Users,
  Eye,
  AlertTriangle,
  History,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConfirmDialog } from "@/components/dsim/common";
import { REJECTION_REASONS, INFO_REQUEST_TYPES, type RejectionReasonType, type InfoRequestType } from "@/lib/dsim/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/complaints/$complaintId")({
  head: () => ({
    meta: [
      { title: "Review Complaint — DSIM" },
      { name: "description", content: "Discipline Committee Head complaint assessment and case conversion." },
      { property: "og:title", content: "Review Complaint — DSIM" },
      { property: "og:description", content: "Discipline Committee Head complaint assessment and case conversion." },
    ],
  }),
  component: ComplaintReviewRoute,
});

function ComplaintReviewRoute() {
  return (
    <Protected>
      <ComplaintReviewPage />
    </Protected>
  );
}

function ComplaintReviewPage() {
  const { complaintId } = useParams({ from: "/complaints/$complaintId" });
  const {
    getComplaint,
    acceptComplaint,
    rejectComplaint,
    requestComplaintInfo,
    convertComplaintToCase,
  } = useDsim();
  const navigate = useNavigate();

  const complaint = getComplaint(complaintId);

  // Modal dialog states
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState<RejectionReasonType>("Insufficient Information");
  const [customReason, setCustomReason] = useState("");
  const [rejectionRemarks, setRejectionRemarks] = useState("");
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [requestType, setRequestType] = useState<InfoRequestType>("Clarification");
  const [infoQuestion, setInfoQuestion] = useState("");
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [convertRemarks, setConvertRemarks] = useState("");

  if (!complaint) {
    return (
      <div className="py-16 text-center">
        <AlertCircle className="mx-auto size-10 text-muted-foreground mb-3" />
        <h2 className="text-lg font-bold text-foreground">Complaint Not Found</h2>
        <p className="mt-1 text-xs text-muted-foreground">The complaint ID ({complaintId}) could not be located in records.</p>
        <Button onClick={() => navigate({ to: "/complaints" })} className="mt-4 text-xs">
          Return to Incoming Complaints
        </Button>
      </div>
    );
  }

  const primaryPerson = complaint.personsInvolved.find((p) => p.isPrimary) || complaint.personsInvolved[0];

  const handleAccept = () => {
    acceptComplaint(complaint.id);
    toast.success("Complaint Accepted", {
      description: `Complaint ${complaint.id} accepted for disciplinary proceedings.`,
    });
    setShowAcceptModal(false);
  };

  const handleReject = () => {
    const finalReason = selectedReason === "Other" ? (customReason.trim() || "Other") : selectedReason;
    if (selectedReason === "Other" && !customReason.trim()) {
      toast.error("Please specify the custom rejection explanation.");
      return;
    }
    rejectComplaint(complaint.id, finalReason, rejectionRemarks.trim() || undefined);
    setShowRejectModal(false);
  };

  const handleRequestInfo = () => {
    if (!infoQuestion.trim()) {
      toast.error("Please enter the specific inquiry or clarification requested.");
      return;
    }
    requestComplaintInfo(complaint.id, infoQuestion.trim(), requestType);
    setShowRequestInfoModal(false);
    setInfoQuestion("");
  };

  const handleConvert = () => {
    const newCase = convertComplaintToCase(complaint.id, convertRemarks.trim() || undefined);
    setShowConvertModal(false);
    if (newCase) {
      navigate({ to: "/cases/$caseId", params: { caseId: newCase.id } });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <Link
            to="/complaints"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-1.5"
          >
            <ChevronLeft className="size-3.5" /> Back to Incoming Complaints
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono">
              {complaint.id}
            </h1>
            <ComplaintStatusBadge status={complaint.status} />
            <span
              className={cn(
                "rounded px-2 py-0.5 text-[0.68rem] font-bold uppercase",
                complaint.urgency === "immediate_safety"
                  ? "bg-destructive/15 text-destructive"
                  : complaint.urgency === "urgent"
                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                  : "bg-secondary text-secondary-foreground",
              )}
            >
              {complaint.urgency.replace(/_/g, " ")}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {complaint.title}
          </p>
        </div>

        {/* Action Controls for Committee Head */}
        <div className="flex flex-wrap items-center gap-2">
          {complaint.convertedCaseId ? (
            <Link to="/cases/$caseId" params={{ caseId: complaint.convertedCaseId }}>
              <Button className="text-xs bg-purple-600 hover:bg-purple-700 text-white gap-2 font-semibold shadow-sm">
                <FolderPlus className="size-4" /> View Converted Case ({complaint.convertedCaseId})
              </Button>
            </Link>
          ) : (
            <>
              {complaint.status !== "Rejected" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRequestInfoModal(true)}
                    className="text-xs gap-1.5"
                  >
                    <MessageSquare className="size-3.5" /> Request Info
                  </Button>

                  {complaint.status !== "Accepted" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAcceptModal(true)}
                      className="text-xs gap-1.5 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                    >
                      <CheckCircle2 className="size-3.5" /> Accept Complaint
                    </Button>
                  )}

                  <Button
                    size="sm"
                    onClick={() => setShowConvertModal(true)}
                    className="text-xs bg-primary hover:bg-primary/90 gap-1.5 font-semibold shadow-sm"
                  >
                    <FolderPlus className="size-3.5" /> Convert to Disciplinary Case
                  </Button>
                </>
              )}

              {complaint.status !== "Rejected" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRejectModal(true)}
                  className="text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <XCircle className="size-3.5 mr-1" /> Reject
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Incident details, Persons Reported, Witnesses, Evidence */}
        <div className="lg:col-span-2 space-y-6">
          {/* Incident Description Card */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Reported Incident Details
              </span>
              <span className="rounded bg-secondary px-2 py-0.5 text-[0.7rem] font-medium text-secondary-foreground">
                {complaint.category}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-muted-foreground block text-[0.7rem]">Date of Incident:</span>
                <span className="font-semibold text-foreground">{complaint.incidentDate}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[0.7rem]">Approximate Time:</span>
                <span className="font-semibold text-foreground">{complaint.incidentTime || "Not specified"}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[0.7rem]">Campus Location:</span>
                <span className="font-semibold text-foreground">{complaint.location}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-muted-foreground block text-[0.7rem] mb-1.5 font-medium">Full Statement:</span>
              <div className="rounded-lg bg-muted/20 border border-border/80 p-4 text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                {complaint.description}
              </div>
            </div>
          </div>

          {/* Persons Involved / Reported (Neutral Terminology) */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Persons Reported / Involved ({complaint.personsInvolved.length})
                </span>
              </div>
              <span className="text-[0.68rem] text-muted-foreground">
                Neutral pre-investigation classification
              </span>
            </div>

            <div className="space-y-3">
              {complaint.personsInvolved.map((p, idx) => (
                <div
                  key={p.id}
                  className={cn(
                    "rounded-xl border p-4 text-xs space-y-2 bg-card",
                    p.isPrimary ? "border-primary/40 ring-1 ring-primary/20" : "border-border",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground text-sm">
                        {p.unknownDetails ? "Unidentified Person" : p.name}
                      </span>
                      <span className="rounded bg-secondary px-2 py-0.5 text-[0.68rem] font-semibold text-secondary-foreground">
                        {p.relationship}
                      </span>
                    </div>
                    {p.isPrimary && (
                      <span className="rounded-full bg-primary/10 text-primary font-bold text-[0.65rem] px-2 py-0.5 uppercase">
                        Primary Person Reported
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-muted-foreground text-[0.72rem] pt-1">
                    {p.rollNumber && <div>Roll Number: <span className="font-mono text-foreground">{p.rollNumber}</span></div>}
                    {p.department && <div>Department: <span className="text-foreground">{p.department}</span></div>}
                  </div>

                  {p.details && (
                    <div className="rounded bg-muted/30 p-2.5 text-[0.72rem] text-muted-foreground border border-border/60 mt-1">
                      <span className="font-semibold text-foreground">Details / Description:</span> {p.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Witnesses Card */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Eye className="size-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Witness Information
                </span>
              </div>
              <span className="text-[0.68rem] text-muted-foreground">
                Reported presence: {complaint.hasWitnesses}
              </span>
            </div>

            {complaint.witnesses.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">No specific witness names provided by complainant.</p>
            ) : (
              <div className="space-y-2">
                {complaint.witnesses.map((w, idx) => (
                  <div key={w.id} className="rounded-lg border border-border p-3 text-xs bg-muted/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">{w.name}</span>
                      {w.relationship && <span className="text-[0.68rem] text-muted-foreground">{w.relationship}</span>}
                    </div>
                    {w.rollNumber && <div className="text-[0.7rem] text-muted-foreground font-mono">Roll: {w.rollNumber} · {w.department}</div>}
                    {w.contactInfo && <div className="text-[0.7rem] text-primary">Contact: {w.contactInfo}</div>}
                    {w.description && <p className="text-[0.72rem] text-muted-foreground pt-1">{w.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Evidence Card */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                Submitted Supporting Evidence ({complaint.evidence.length})
              </span>
              <span className="text-[0.68rem] text-emerald-500 font-medium flex items-center gap-1">
                <ShieldCheck className="size-3.5" /> Vault Verified
              </span>
            </div>

            {complaint.evidence.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">No evidence attachments included in initial report.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {complaint.evidence.map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-lg border border-border bg-muted/20 p-3.5 flex flex-col justify-between gap-2 text-xs"
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-card text-primary ring-1 ring-border">
                        {ev.fileType.startsWith("image/") ? (
                          <FileImage className="size-4" />
                        ) : ev.fileType.startsWith("video/") ? (
                          <Film className="size-4" />
                        ) : ev.fileType.startsWith("audio/") ? (
                          <FileAudio className="size-4" />
                        ) : (
                          <File className="size-4" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-foreground truncate">{ev.fileName}</div>
                        <div className="text-[0.68rem] text-muted-foreground font-mono">{ev.fileSize}</div>
                      </div>
                    </div>
                    {ev.description && (
                      <p className="text-[0.7rem] text-muted-foreground bg-card/60 p-2 rounded border border-border/50">
                        "{ev.description}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Complainant info, Privacy tier, Timeline, Info Requests */}
        <div className="space-y-6">
          {/* Complainant Particulars */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <User className="size-4 text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Complainant Information
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-muted-foreground block text-[0.7rem]">Student Name:</span>
                <span className="font-bold text-foreground text-sm">{complaint.studentName}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[0.7rem]">Roll Number:</span>
                <span className="font-mono font-semibold text-foreground">{complaint.studentRoll}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[0.7rem]">Department:</span>
                <span className="text-foreground">{complaint.studentDepartment}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[0.7rem]">Academic Year / Year:</span>
                <span className="text-foreground">{complaint.academicYear} · {complaint.yearOfStudy}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[0.7rem]">Institutional Email:</span>
                <span className="text-foreground truncate block">{complaint.studentEmail}</span>
              </div>
            </div>

            <div className="border-t border-border pt-3 space-y-1 text-xs">
              <span className="text-muted-foreground block text-[0.7rem]">Confidentiality Request:</span>
              <span className="rounded bg-primary/10 text-primary px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider block text-center">
                {complaint.privacyPreference.replace(/_/g, " ")}
              </span>
            </div>
          </div>

          {/* Info Requests History */}
          {(complaint.infoRequests || []).length > 0 && (
            <div className="rounded-xl border border-amber-500/30 bg-card p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <MessageSquare className="size-3.5" />
                Information Requests
              </h3>
              <div className="space-y-3">
                {complaint.infoRequests?.map((req) => (
                  <div key={req.id} className="rounded-lg border border-border p-3 text-xs space-y-2 bg-muted/20">
                    <div>
                      <span className="text-[0.68rem] text-muted-foreground font-mono block">
                        Sent on {fmtDateTime(req.requestedAt)} by {req.requestedBy}:
                      </span>
                      <p className="font-medium text-foreground mt-0.5">"{req.question}"</p>
                    </div>
                    {req.response ? (
                      <div className="border-t border-border/60 pt-2 text-xs">
                        <span className="text-[0.68rem] text-emerald-600 dark:text-emerald-400 font-semibold block">
                          Student Replied ({fmtDateTime(req.respondedAt || "")}):
                        </span>
                        <p className="text-foreground bg-card p-2 rounded border border-border/60 mt-0.5">
                          {req.response}
                        </p>
                      </div>
                    ) : (
                      <div className="text-[0.68rem] text-amber-600 dark:text-amber-400 italic">
                        ● Awaiting student response...
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submission Timeline */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <History className="size-4 text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Submission Lifecycle
              </h3>
            </div>

            <div className="relative pl-5 space-y-4 text-xs before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
              {complaint.timeline.map((ev) => (
                <div key={ev.id} className="relative">
                  <div className="absolute -left-[17px] top-1 size-2 rounded-full bg-primary ring-4 ring-background" />
                  <div className="font-semibold text-foreground">{ev.event}</div>
                  {ev.description && <p className="text-[0.72rem] text-muted-foreground mt-0.5">{ev.description}</p>}
                  <div className="text-[0.65rem] text-muted-foreground/70 font-mono mt-0.5">
                    {fmtDateTime(ev.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Accept Complaint Modal */}
      <ConfirmDialog
        open={showAcceptModal}
        onOpenChange={setShowAcceptModal}
        title={`Accept Complaint ${complaint.id}?`}
        description="Accepting indicates that the complaint has been preliminarily verified and is queued for formal disciplinary action or case conversion."
        confirmLabel="Accept Complaint"
        onConfirm={handleAccept}
      />

      {/* Reject Complaint Modal (Requires Structured Reason & Remarks) */}
      <ConfirmDialog
        open={showRejectModal}
        onOpenChange={setShowRejectModal}
        title={`Reject / Close Complaint ${complaint.id}?`}
        description="Provide a formal reason for closing or rejecting this complaint. This reason will be communicated to the student."
        confirmLabel="Confirm Rejection"
        onConfirm={handleReject}
      >
        <div className="space-y-3 my-2 text-xs">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Rejection Ground / Category <span className="text-destructive">*</span></Label>
            <Select value={selectedReason} onValueChange={(v) => setSelectedReason(v as RejectionReasonType)}>
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Select formal reason" />
              </SelectTrigger>
              <SelectContent>
                {REJECTION_REASONS.map((r) => (
                  <SelectItem key={r} value={r} className="text-xs">
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedReason === "Other" && (
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Custom Explanation <span className="text-destructive">*</span></Label>
              <Input
                placeholder="Specify exact institutional grounds..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="text-xs"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Committee Remarks & Guidance</Label>
            <Textarea
              placeholder="Additional guidance, referral info, or formal remarks to complainant..."
              value={rejectionRemarks}
              onChange={(e) => setRejectionRemarks(e.target.value)}
              rows={3}
              className="text-xs"
            />
          </div>
        </div>
      </ConfirmDialog>

      {/* Request Info Modal */}
      <ConfirmDialog
        open={showRequestInfoModal}
        onOpenChange={setShowRequestInfoModal}
        title="Request Additional Information from Student"
        description="Specify what supplementary details, witnesses, or evidence are needed from the complainant."
        confirmLabel="Send Request to Student"
        onConfirm={handleRequestInfo}
      >
        <div className="space-y-3 my-2 text-xs">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Information Category <span className="text-destructive">*</span></Label>
            <Select value={requestType} onValueChange={(v) => setRequestType(v as InfoRequestType)}>
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Select inquiry category" />
              </SelectTrigger>
              <SelectContent>
                {INFO_REQUEST_TYPES.map((t) => (
                  <SelectItem key={t} value={t} className="text-xs">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Specific Inquiry / Question <span className="text-destructive">*</span></Label>
            <Textarea
              placeholder="e.g. Please specify the exact laboratory bench number and any faculty present in the room."
              value={infoQuestion}
              onChange={(e) => setInfoQuestion(e.target.value)}
              rows={4}
              className="text-xs"
            />
          </div>
        </div>
      </ConfirmDialog>

      {/* Convert to Case Modal */}
      <ConfirmDialog
        open={showConvertModal}
        onOpenChange={setShowConvertModal}
        title={`Convert ${complaint.id} to Formal Disciplinary Case?`}
        description="This will automatically initialize a new DSIM case, transfer all attached evidence, statements, and reported subjects, and initiate the formal investigation workspace."
        confirmLabel="Convert & Open Investigation"
        onConfirm={handleConvert}
      >
        <div className="my-2 space-y-2 text-xs">
          <div className="rounded-lg bg-muted/40 border border-border p-3 space-y-1.5 font-mono text-[0.72rem]">
            <div className="flex justify-between">
              <span className="text-muted-foreground font-sans">Source Complaint:</span>
              <span className="font-bold text-foreground">{complaint.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground font-sans">Primary Subject:</span>
              <span className="text-foreground">{primaryPerson?.name || "Person Reported"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground font-sans">Evidence Items to Transfer:</span>
              <span className="text-primary font-bold">{complaint.evidence.length} files</span>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-semibold">Case Conversion Remarks (Optional)</Label>
            <Input
              placeholder="e.g. Expedited due to academic integrity violation severity..."
              value={convertRemarks}
              onChange={(e) => setConvertRemarks(e.target.value)}
              className="text-xs"
            />
          </div>
        </div>
      </ConfirmDialog>
    </div>
  );
}
