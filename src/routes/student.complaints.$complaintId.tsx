import { useState } from "react";
import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { StudentProtected } from "@/components/dsim/StudentProtected";
import { UnauthorizedPage } from "@/components/dsim/UnauthorizedPage";
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
  AlertCircle,
  HelpCircle,
  MessageSquare,
  Lock,
  Download,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { ComplaintEvidence, ComplaintStatus } from "@/lib/dsim/types";

export const Route = createFileRoute("/student/complaints/$complaintId")({
  head: () => ({
    meta: [
      { title: "Complaint Details — DSIM Student Portal" },
      { name: "description", content: "Track your complaint status and view authorized committee updates." },
      { property: "og:title", content: "Complaint Details — DSIM" },
      { property: "og:description", content: "Track your complaint status and view authorized committee updates." },
    ],
  }),
  component: StudentComplaintDetailRoute,
});

function StudentComplaintDetailRoute() {
  return (
    <StudentProtected>
      <StudentComplaintDetailPage />
    </StudentProtected>
  );
}

const LIFECYCLE_STEPS: { key: string; label: string; match: (s: ComplaintStatus) => "done" | "active" | "todo" }[] = [
  {
    key: "submitted",
    label: "Submitted",
    match: (s) => (s !== "Rejected" ? "done" : "done"),
  },
  {
    key: "review",
    label: "Under Review",
    match: (s) => {
      if (s === "Submitted") return "todo";
      if (s === "Under Review" || s === "Additional Information Requested") return "active";
      if (s === "Rejected") return "done";
      return "done";
    },
  },
  {
    key: "accepted",
    label: "Accepted",
    match: (s) => {
      if (s === "Submitted" || s === "Under Review" || s === "Additional Information Requested") return "todo";
      if (s === "Accepted") return "active";
      if (s === "Rejected") return "todo";
      return "done";
    },
  },
  {
    key: "investigation",
    label: "Investigation",
    match: (s) => {
      if (s === "Investigation in Progress" || s === "Converted to Case") return "active";
      if (s === "Decision Made" || s === "Resolved" || s === "Closed") return "done";
      return "todo";
    },
  },
  {
    key: "decision",
    label: "Decision",
    match: (s) => {
      if (s === "Decision Made") return "active";
      if (s === "Resolved" || s === "Closed") return "done";
      return "todo";
    },
  },
  {
    key: "resolved",
    label: "Resolved",
    match: (s) => {
      if (s === "Resolved" || s === "Closed") return "done";
      return "todo";
    },
  },
];

function StudentComplaintDetailPage() {
  const { complaintId } = useParams({ from: "/student/complaints/$complaintId" });
  const { getComplaint, studentProfile, currentUser, respondComplaintInfo } = useDsim();
  const navigate = useNavigate();

  const complaint = getComplaint(complaintId);

  // Additional Information form state
  const [responseText, setResponseText] = useState("");
  const [responseFiles, setResponseFiles] = useState<ComplaintEvidence[]>([]);
  const [isSubmittingResponse, setIsSubmittingResponse] = useState(false);

  if (!complaint) {
    return (
      <div className="py-16 text-center">
        <AlertCircle className="mx-auto size-10 text-muted-foreground mb-3" />
        <h2 className="text-lg font-bold text-foreground">Complaint Not Found</h2>
        <p className="mt-1 text-xs text-muted-foreground">The requested complaint ID ({complaintId}) could not be found.</p>
        <Button onClick={() => navigate({ to: "/student/dashboard" })} className="mt-4 text-xs">
          Return to Dashboard
        </Button>
      </div>
    );
  }

  // Strict student data-ownership verification (Requirement 17)
  const studentOwnerId = currentUser?.studentId || studentProfile.rollNumber;
  const isOwner =
    complaint.studentId === studentOwnerId ||
    complaint.studentRoll === studentOwnerId ||
    (currentUser?.email && complaint.studentEmail === currentUser.email) ||
    complaint.studentRoll === studentProfile.rollNumber;

  if (!isOwner) {
    return (
      <UnauthorizedPage
        portal="student"
        customMessage="You do not have authorization to view this complaint dossier. Access is strictly confined to the originating student."
      />
    );
  }

  // Find active / pending info requests
  const pendingInfoRequest = (complaint.infoRequests || []).find((r) => !r.response);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const item: ComplaintEvidence = {
          id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          fileName: file.name,
          fileType: file.type || "application/octet-stream",
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          url: reader.result as string,
          description: "Attached in response to committee info request",
          uploadedAt: new Date().toISOString(),
        };
        setResponseFiles((prev) => [...prev, item]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleSendResponse = (requestId: string) => {
    if (!responseText.trim()) {
      toast.error("Please provide a response before submitting.");
      return;
    }

    setIsSubmittingResponse(true);
    setTimeout(() => {
      respondComplaintInfo(complaint.id, requestId, responseText.trim(), responseFiles);
      setIsSubmittingResponse(false);
      setResponseText("");
      setResponseFiles([]);
      toast.success("Response submitted successfully.");
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Back Button & Top Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <Link
            to="/student/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-1.5"
          >
            <ChevronLeft className="size-3.5" /> Back to My Complaints
          </Link>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-mono">
              {complaint.id}
            </h1>
            <ComplaintStatusBadge status={complaint.status} />
          </div>
          <p className="mt-1 text-xs text-muted-foreground font-sans">
            {complaint.title}
          </p>
        </div>

        <div className="text-left sm:text-right text-xs text-muted-foreground">
          <div>Submitted: <span className="text-foreground font-medium">{fmtDate(complaint.submittedAt)}</span></div>
          <div>Last Updated: <span className="text-foreground font-medium">{fmtDate(complaint.updatedAt)}</span></div>
        </div>
      </div>

      {/* Rejection Outcome Banner (Requirement 7) */}
      {complaint.status === "Rejected" && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 space-y-3 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-destructive shrink-0 mt-0.5" />
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-sm font-bold text-destructive">
                  Complaint Review Outcome: Closed / Not Accepted
                </h3>
                <span className="text-[0.7rem] font-mono text-muted-foreground">
                  Reviewed: {complaint.rejectedAt ? fmtDate(complaint.rejectedAt) : fmtDate(complaint.updatedAt)}
                </span>
              </div>
              <div className="text-xs text-foreground">
                <span className="font-semibold text-muted-foreground">Grounds for Closure: </span>
                <span className="font-semibold text-destructive">
                  {complaint.rejectionReason || "No formal investigation initiated"}
                </span>
              </div>
              {complaint.rejectionRemarks && (
                <div className="text-xs text-muted-foreground bg-card/60 p-3 rounded-lg border border-border/70 mt-2">
                  <span className="font-semibold text-foreground block mb-1">Committee Remarks & Guidance:</span>
                  {complaint.rejectionRemarks}
                </div>
              )}
              <div className="text-[0.7rem] text-muted-foreground flex items-center gap-2 pt-1">
                <span>Reviewed By: <strong className="text-foreground">{complaint.reviewerRole || "Discipline Committee Board"}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 36.15 Complaint Status Lifecycle Tracker */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-foreground uppercase tracking-wider">Complaint Progress</span>
          <span className="text-[0.7rem] text-muted-foreground">Real-time status updates</span>
        </div>

        {/* Lifecycle Stepper */}
        <div className="overflow-x-auto pb-2">
          <div className="flex items-center justify-between min-w-[550px] px-2">
            {LIFECYCLE_STEPS.map((st, idx) => {
              const state = st.match(complaint.status);
              return (
                <div key={st.key} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-full text-xs font-bold transition-all",
                        state === "done"
                          ? "bg-emerald-500 text-white shadow-sm"
                          : state === "active"
                          ? "border-2 border-primary bg-primary/10 text-primary animate-pulse"
                          : "border border-border bg-muted text-muted-foreground/60",
                      )}
                    >
                      {state === "done" ? <CheckCircle2 className="size-4" /> : state === "active" ? "●" : "○"}
                    </span>
                    <span
                      className={cn(
                        "text-[0.68rem] whitespace-nowrap font-medium",
                        state === "active"
                          ? "text-primary font-bold"
                          : state === "done"
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground",
                      )}
                    >
                      {st.label}
                    </span>
                  </div>
                  {idx < LIFECYCLE_STEPS.length - 1 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1 mx-2 transition-colors",
                        state === "done" ? "bg-emerald-500" : "bg-border",
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Controlled Additional Information Request Box (Requirement 8) */}
      {pendingInfoRequest && (
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-5 space-y-4 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldAlert className="size-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                  The Discipline Committee Requires Additional Information
                </h3>
                {pendingInfoRequest.requestType && (
                  <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[0.65rem] font-semibold text-amber-800 dark:text-amber-300">
                    {pendingInfoRequest.requestType}
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                "{pendingInfoRequest.question}"
              </p>
              <div className="text-[0.68rem] text-muted-foreground font-mono">
                Requested on {fmtDateTime(pendingInfoRequest.requestedAt)} by {pendingInfoRequest.requestedBy}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2 bg-card p-4 rounded-lg border border-border">
            <Label className="text-xs font-semibold text-foreground">
              Your Response / Clarification
            </Label>
            <Textarea
              placeholder="Provide the requested details or answers here..."
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              rows={4}
              className="text-xs bg-background"
            />

            {/* Optional Attachments */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  id="respFileInput"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="respFileInput"
                  className="inline-flex items-center gap-1.5 text-xs text-primary border border-primary/30 rounded-md px-2.5 py-1.5 hover:bg-primary/5 cursor-pointer font-medium"
                >
                  <Upload className="size-3.5" /> Attach Supplementary File
                </label>
                {responseFiles.length > 0 && (
                  <span className="text-[0.7rem] text-muted-foreground font-mono">
                    {responseFiles.length} file(s) attached
                  </span>
                )}
              </div>

              <Button
                onClick={() => handleSendResponse(pendingInfoRequest.id)}
                disabled={isSubmittingResponse || !responseText.trim()}
                className="text-xs bg-primary hover:bg-primary/90 gap-1.5 font-semibold"
              >
                {isSubmittingResponse ? "Transmitting..." : "Submit Additional Information"}
                <Send className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Incident description & Submitted Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Incident Description */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Reported Incident Particulars
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-muted-foreground block text-[0.7rem]">Category:</span>
                <span className="font-semibold text-foreground">{complaint.category}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[0.7rem]">Incident Date:</span>
                <span className="font-semibold text-foreground">{complaint.incidentDate} {complaint.incidentTime}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[0.7rem]">Location:</span>
                <span className="font-semibold text-foreground">{complaint.location}</span>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <span className="text-muted-foreground block text-[0.7rem] mb-1.5">Detailed Description:</span>
              <p className="text-xs leading-relaxed text-foreground whitespace-pre-wrap bg-muted/20 p-3 rounded-lg border border-border/60">
                {complaint.description}
              </p>
            </div>
          </div>

          {/* Persons Involved & Witnesses Reported */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Persons & Witnesses Reported
            </h3>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-semibold text-foreground block mb-2">Subject(s) of Complaint:</span>
                <div className="space-y-2">
                  {complaint.personsInvolved.map((p, idx) => (
                    <div key={p.id} className="rounded-lg border border-border/70 p-3 bg-muted/10 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">
                          {p.unknownDetails ? "Unidentified Person" : p.name}
                        </span>
                        <span className="text-[0.68rem] bg-secondary px-2 py-0.5 rounded text-secondary-foreground font-medium">
                          {p.relationship}
                        </span>
                      </div>
                      {p.rollNumber && (
                        <div className="text-[0.7rem] text-muted-foreground font-mono mt-0.5">
                          Roll Number: {p.rollNumber} · {p.department}
                        </div>
                      )}
                      {p.details && (
                        <p className="text-[0.72rem] text-muted-foreground mt-1 bg-background p-2 rounded border border-border/50">
                          {p.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {complaint.witnesses.length > 0 && (
                <div className="border-t border-border pt-3">
                  <span className="text-xs font-semibold text-foreground block mb-2">Witnesses Identified:</span>
                  <div className="space-y-2">
                    {complaint.witnesses.map((w) => (
                      <div key={w.id} className="rounded-lg border border-border/70 p-2.5 bg-muted/10 text-xs">
                        <div className="font-semibold text-foreground">{w.name} {w.relationship && `(${w.relationship})`}</div>
                        {w.description && <div className="text-[0.7rem] text-muted-foreground mt-0.5">{w.description}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submitted Evidence Vault */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Submitted Supporting Evidence ({complaint.evidence.length})
            </h3>

            {complaint.evidence.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">No evidence files were attached to this complaint.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {complaint.evidence.map((ev, idx) => (
                  <div
                    key={ev.id}
                    className="rounded-lg border border-border bg-muted/20 p-3 flex flex-col justify-between gap-2 text-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="grid size-8 shrink-0 place-items-center rounded bg-card text-primary ring-1 ring-border">
                        {ev.fileType.startsWith("image/") ? <FileImage className="size-4" /> : <File className="size-4" />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-foreground truncate">{ev.fileName}</div>
                        <div className="text-[0.68rem] text-muted-foreground font-mono">{ev.fileSize}</div>
                      </div>
                    </div>
                    {ev.description && (
                      <div className="text-[0.7rem] text-muted-foreground italic line-clamp-2">
                        "{ev.description}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 span): Authorized Updates & Confidentiality Status */}
        <div className="space-y-6">
          {/* Authorized Updates Timeline */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <MessageSquare className="size-3.5 text-primary" />
              Authorized Updates
            </h3>

            <div className="space-y-3">
              {(complaint.authorizedUpdates || []).map((update, idx) => (
                <div key={idx} className="rounded-lg border border-border/80 bg-muted/30 p-3 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[0.68rem] font-semibold text-primary">
                    <CheckCircle2 className="size-3" /> Update #{idx + 1}
                  </div>
                  <p className="text-foreground leading-relaxed">{update}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Handling Info */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Privacy & Safeguards
            </h3>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-muted-foreground block text-[0.7rem]">Confidentiality Tier:</span>
                <span className="font-semibold text-foreground capitalize">
                  {complaint.privacyPreference.replace(/_/g, " ")}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[0.7rem]">Assessed Urgency:</span>
                <span className="font-semibold text-foreground capitalize">
                  {complaint.urgency.replace(/_/g, " ")}
                </span>
              </div>
            </div>
            <div className="rounded bg-muted/40 p-2.5 text-[0.7rem] text-muted-foreground">
              <Lock className="size-3 inline-block mr-1 text-emerald-500" />
              Internal deliberations and investigator notes are confidential to the committee.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
