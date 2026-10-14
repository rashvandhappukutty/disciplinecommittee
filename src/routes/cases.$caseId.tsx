import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Protected } from "@/components/dsim/Protected";
import { PageHeader, PersonCard, EmptyState, SecureTag, ConfirmDialog } from "@/components/dsim/common";
import { StatusBadge } from "@/components/dsim/StatusBadge";
import { useDsim } from "@/lib/dsim/store";
import { fmtDate, fmtDateTime } from "@/lib/dsim/format";
import { EvidenceGallery } from "@/components/dsim/EvidenceGallery";
import { SynopsisEditor } from "@/components/dsim/SynopsisEditor";
import { FinalDecisionSection } from "@/components/dsim/FinalDecisionSection";
import { TranscriptViewer } from "@/components/dsim/TranscriptViewer";
import { AuditLogView } from "@/components/dsim/AuditLogView";
import { InvestigationNotesView } from "@/components/dsim/InvestigationNotesView";
import { InvestigationTimeline } from "@/components/dsim/InvestigationTimeline";
import { AddPersonModal } from "@/components/dsim/AddPersonModal";
import { EditCaseModal } from "@/components/dsim/EditCaseModal";
import { ExportCaseModal } from "@/components/dsim/ExportCaseModal";
import { CloseCaseModal } from "@/components/dsim/CloseCaseModal";
import { MarkReturnedModal } from "@/components/dsim/MarkReturnedModal";
import { RescheduleModal } from "@/components/dsim/RescheduleModal";
import {
  FolderX,
  Radar,
  Edit3,
  Download,
  Trash2,
  Calendar,
  Clock,
  UserPlus,
  ShieldCheck,
  FileBox,
  Layers,
  Sparkles,
  Gavel,
  ArrowLeft,
  Lock,
  MessageSquare,
  StickyNote,
  History,
  Users,
  AlertTriangle,
  UserCheck,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import type { ActionType, CaseRecord, CaseStatus, Person } from "@/lib/dsim/types";

export const Route = createFileRoute("/cases/$caseId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.caseId} — Case Details — DSIM` },
      { name: "description", content: "Confidential case workspace and evidence dossier." },
      { property: "og:title", content: `${params.caseId} — Case Details — DSIM` },
      { property: "og:description", content: "Confidential case workspace and evidence dossier." },
    ],
  }),
  component: CaseDetail,
});

function CaseDetail() {
  const { caseId } = Route.useParams();
  const navigate = useNavigate();
  const {
    getCase,
    updateCase,
    deleteCase,
    closeCase,
    changeCaseStatus,
    addEvidence,
    updateEvidence,
    removeEvidence,
    addTimeline,
    addInvestigationNote,
    updateInvestigationNote,
    deleteInvestigationNote,
    setTranscript,
    updateTranscriptEntry,
    verifyTranscript,
    pushNotification,
  } = useDsim();
  const caseRecord = getCase(caseId);

  // Tab state (35.17)
  const [activeTab, setActiveTab] = useState("overview");

  // Modals
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [statusConfirmTarget, setStatusConfirmTarget] = useState<CaseStatus | null>(null);

  if (!caseRecord) {
    return (
      <Protected>
        <EmptyState
          icon={FolderX}
          title="Case file not found"
          description="The requested disciplinary case record does not exist or has been removed."
          action={
            <Button asChild size="sm">
              <Link to="/cases">Return to Cases</Link>
            </Button>
          }
        />
      </Protected>
    );
  }

  const handleAddPerson = (p: Omit<Person, "id">) => {
    const newPerson: Person = { ...p, id: Math.random().toString(36).slice(2, 9) };
    updateCase(caseId, {
      involvedPersons: [...caseRecord.involvedPersons, newPerson],
    });
    addTimeline(caseId, {
      event: "Additional person added",
      kind: "person",
      description: `${p.name} added as ${p.role} (${p.department})`,
    });
    toast.success(`Added ${p.name} to involved persons`);
  };

  const handleRemovePerson = (id: string) => {
    const person = caseRecord.involvedPersons.find((p) => p.id === id);
    updateCase(caseId, {
      involvedPersons: caseRecord.involvedPersons.filter((p) => p.id !== id),
    });
    if (person) {
      addTimeline(caseId, {
        event: "Involved person removed",
        kind: "person",
        description: `${person.name} removed from case roster`,
      });
    }
    toast.success("Person removed from case");
  };

  const handleSaveDecision = (decision: {
    disciplinaryAction: ActionType;
    actionReason?: string;
    actionNotes?: string;
    committeeRemarks?: string;
    finalDecisionNotes?: string;
    decisionDate?: string;
    suspensionStartDate?: string;
    returnDate?: string;
    status: CaseStatus;
  }) => {
    updateCase(caseId, decision);
    addTimeline(caseId, {
      event: `Disciplinary Decision: ${decision.disciplinaryAction}`,
      kind: "decision",
      description: decision.actionReason || "Sanction recorded by Committee Head.",
    });
    if (decision.disciplinaryAction === "Suspension" && decision.returnDate) {
      pushNotification({
        type: "return",
        message: `${caseRecord.accusedStudent} suspension scheduled until ${decision.returnDate}.`,
        caseId: caseId,
      });
    }
  };

  const handleCloseCase = (closure: {
    finalDecision: "No Further Action" | "Warning Issued" | "Suspension Completed" | "Other";
    finalRemarks: string;
    outcome: string;
  }) => {
    closeCase(caseId, closure);
  };

  const handleMarkReturned = (caseId: string, notes: string) => {
    updateCase(caseId, {
      status: "Returned",
      returned: true,
      actualReturnDate: new Date().toISOString().slice(0, 10),
      actualReturnTime: new Date().toLocaleTimeString(),
      returnRemarks: notes,
    });
    addTimeline(caseId, {
      event: "Student reinstated / returned",
      kind: "return",
      description: notes || "Suspension period completed. Student readmitted to campus.",
    });
    toast.success(`${caseRecord.accusedStudent} marked as returned and readmitted.`);
  };

  const handleReschedule = (caseId: string, newDate: string, reason: string) => {
    const oldDate = caseRecord.returnDate;
    updateCase(caseId, { returnDate: newDate });
    addTimeline(caseId, {
      event: `Return date adjusted to ${newDate}`,
      kind: "decision",
      description: `Return date changed from ${oldDate || "N/A"} to ${newDate}. Reason: ${reason}`,
    });
    pushNotification({
      type: "return",
      message: `${caseRecord.accusedStudent} return rescheduled to ${newDate}.`,
      caseId,
    });
    toast.success(`Return date rescheduled to ${newDate}`);
  };

  const handleDeleteCase = () => {
    deleteCase(caseId);
    toast.success(`Case ${caseId} deleted permanently.`);
    navigate({ to: "/cases" });
  };

  const handleStatusTransition = (targetStatus: CaseStatus) => {
    // 35.18 status validation logic
    if (targetStatus === "Returned" && !caseRecord.returnDate && !caseRecord.suspensionStartDate) {
      toast.error("Cannot mark Returned: No suspension term configured on this case.");
      return;
    }
    if (targetStatus === "Closed") {
      setShowCloseModal(true);
      return;
    }
    changeCaseStatus(caseId, targetStatus);
    toast.success(`Case status changed to ${targetStatus}`);
  };

  return (
    <Protected>
      <div className="space-y-6">
        {/* Top navigational bar & Security classification */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground gap-1.5 self-start">
            <Link to="/cases">
              <ArrowLeft className="size-3.5" /> All Disciplinary Cases
            </Link>
          </Button>

          {/* 35.19 Data Protection UX Banners */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-600 text-[0.68rem] font-medium">
              <ShieldAlert className="size-3" /> Confidential Investigation Record
            </span>
            <SecureTag>Restricted Access · Authorized Personnel Only</SecureTag>
          </div>
        </div>

        {/* Case Header Dossier Card */}
        <div className="surface p-6 space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-sm font-bold text-foreground bg-secondary px-2.5 py-0.5 rounded-md">
                  {caseRecord.id}
                </span>
                {caseRecord.sourceComplaintId && (
                  <Link
                    to="/complaints/$complaintId"
                    params={{ complaintId: caseRecord.sourceComplaintId }}
                    className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 px-2 py-0.5 rounded-md transition-colors"
                  >
                    <FolderOpen className="size-3" /> Source Complaint: {caseRecord.sourceComplaintId}
                  </Link>
                )}
                <StatusBadge status={caseRecord.status} />
                <span className="text-xs text-muted-foreground">
                  Created {fmtDate(caseRecord.createdAt)} · Updated {fmtDateTime(caseRecord.updatedAt)}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {caseRecord.caseName}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
                {caseRecord.description}
              </p>
            </div>

            {/* Header Action Buttons (including 35.1 Close Case) */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Button asChild size="sm" className="gap-1.5 text-xs bg-primary hover:bg-primary/90 shadow-sm">
                <Link to="/cases/$caseId/investigation" params={{ caseId }}>
                  <Radar className="size-3.5" /> Open Investigation
                </Link>
              </Button>

              {caseRecord.status !== "Closed" ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCloseModal(true)}
                  className="gap-1.5 text-xs border-emerald-500/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/10"
                >
                  <Lock className="size-3.5" /> Close Case
                </Button>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/15 text-emerald-600 text-xs font-semibold">
                  <CheckCircle2 className="size-3.5" /> Case Closed
                </span>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEditModal(true)}
                className="gap-1.5 text-xs"
              >
                <Edit3 className="size-3.5" /> Edit
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExportModal(true)}
                className="gap-1.5 text-xs"
              >
                <Download className="size-3.5" /> Export Report
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteConfirm(true)}
                className="text-xs text-destructive hover:bg-destructive/10"
                aria-label="Delete case"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 gap-3 border-t border-border pt-4 sm:grid-cols-3 lg:grid-cols-6 text-xs">
            <div>
              <span className="text-muted-foreground block text-[0.68rem] uppercase font-mono">Main Accused</span>
              <span className="font-semibold text-foreground truncate block">{caseRecord.accusedStudent}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[0.68rem] uppercase font-mono">Roll Number</span>
              <span className="font-mono text-foreground font-medium block">{caseRecord.rollNumber}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[0.68rem] uppercase font-mono">Department</span>
              <span className="text-foreground font-medium truncate block">{caseRecord.department}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[0.68rem] uppercase font-mono">Academic Year</span>
              <span className="text-foreground font-medium block">{caseRecord.academicYear} ({caseRecord.yearOfStudy})</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[0.68rem] uppercase font-mono">Evidence Vault</span>
              <span className="font-mono text-foreground font-semibold block">{caseRecord.evidence.length} items</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[0.68rem] uppercase font-mono">Sanction Status</span>
              <span className="font-semibold text-primary block">{caseRecord.disciplinaryAction || "Pending Verdict"}</span>
            </div>
          </div>

          {/* 35.18 Status Transition Lifecycle Stepper */}
          <div className="rounded-xl border border-border/80 bg-muted/20 p-3 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground text-[0.68rem] uppercase tracking-wider font-mono">
                Lifecycle Stage
              </span>
              <span className="text-[0.68rem] text-muted-foreground">Click step to transition</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {[
                { status: "Draft" as CaseStatus, label: "1. Draft" },
                { status: "Under Investigation" as CaseStatus, label: "2. Investigation" },
                { status: "Decision Pending" as CaseStatus, label: "3. Decision Pending" },
                { status: "Suspended" as CaseStatus, label: "4. Suspended / Active" },
                { status: "Returned" as CaseStatus, label: "5. Returned" },
                { status: "Closed" as CaseStatus, label: "6. Closed" },
              ].map((step, idx) => {
                const isCurrent = caseRecord.status === step.status;
                return (
                  <button
                    key={step.status}
                    type="button"
                    onClick={() => handleStatusTransition(step.status)}
                    className={`px-2.5 py-1 rounded-md text-[0.7rem] font-medium transition-all flex items-center gap-1 cursor-pointer ${
                      isCurrent
                        ? "bg-primary text-primary-foreground font-bold shadow-xs ring-2 ring-primary/30"
                        : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {isCurrent && <CheckCircle2 className="size-3" />}
                    {step.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 35.17 CASE DETAIL TABS (11 Comprehensive Tabs) */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="overflow-x-auto pb-1">
            <TabsList className="flex w-max min-w-full justify-start sm:w-auto h-auto p-1 bg-muted/60">
              <TabsTrigger value="overview" className="text-xs gap-1.5 py-2">
                <Layers className="size-3.5" /> Overview
              </TabsTrigger>
              <TabsTrigger value="people" className="text-xs gap-1.5 py-2">
                <Users className="size-3.5" /> People ({caseRecord.involvedPersons.length + 1})
              </TabsTrigger>
              <TabsTrigger value="evidence" className="text-xs gap-1.5 py-2">
                <FileBox className="size-3.5" /> Evidence ({caseRecord.evidence.length})
              </TabsTrigger>
              <TabsTrigger value="transcript" className="text-xs gap-1.5 py-2">
                <MessageSquare className="size-3.5" /> Transcript ({caseRecord.transcript?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="synopsis" className="text-xs gap-1.5 py-2">
                <Sparkles className="size-3.5" /> AI Synopsis
              </TabsTrigger>
              <TabsTrigger value="notes" className="text-xs gap-1.5 py-2">
                <StickyNote className="size-3.5" /> Notes ({caseRecord.investigationNotes?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="decision" className="text-xs gap-1.5 py-2">
                <Gavel className="size-3.5" /> Final Decision
              </TabsTrigger>
              <TabsTrigger value="suspension" className="text-xs gap-1.5 py-2">
                <Calendar className="size-3.5" /> Suspension & Return
              </TabsTrigger>
              <TabsTrigger value="timeline" className="text-xs gap-1.5 py-2">
                <Clock className="size-3.5" /> Timeline ({caseRecord.timeline.length})
              </TabsTrigger>
              <TabsTrigger value="audit" className="text-xs gap-1.5 py-2">
                <History className="size-3.5" /> Audit History ({caseRecord.auditLog?.length || 0})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: OVERVIEW */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Synopsis & Decision Highlights */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Synopsis preview */}
              <div className="surface p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    <h4 className="font-semibold text-sm">Investigation AI Synopsis</h4>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("synopsis")}
                    className="text-xs text-primary h-7"
                  >
                    Open Editor →
                  </Button>
                </div>
                <p className="line-clamp-4 text-xs text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-lg border border-border/50">
                  {caseRecord.synopsis || "No AI synopsis generated yet. Open the Investigation workspace to record statements and synthesize facts."}
                </p>
              </div>

              {/* Sanction preview */}
              <div className="surface p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gavel className="size-4 text-signal" />
                    <h4 className="font-semibold text-sm">Official Disciplinary Verdict</h4>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("decision")}
                    className="text-xs text-primary h-7"
                  >
                    Manage Ruling →
                  </Button>
                </div>
                <div className="rounded-lg bg-muted/20 p-3 border border-border/50 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Action Type:</span>
                    <strong className="font-semibold text-foreground">{caseRecord.disciplinaryAction || "None recorded"}</strong>
                  </div>
                  {caseRecord.returnDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expected Return Date:</span>
                      <strong className="font-mono text-foreground">{caseRecord.returnDate}</strong>
                    </div>
                  )}
                  {caseRecord.actionReason && (
                    <div className="pt-1 text-muted-foreground">
                      <span className="font-medium text-foreground">Findings: </span>
                      {caseRecord.actionReason}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Evidence Preview Strip */}
            <div className="surface p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <FileBox className="size-4 text-primary" /> Key Evidence Exhibits ({caseRecord.evidence.length})
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab("evidence")}
                  className="text-xs text-primary h-7"
                >
                  View Full Gallery →
                </Button>
              </div>

              {caseRecord.evidence.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">No evidence exhibits attached yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {caseRecord.evidence.slice(0, 4).map((e) => (
                    <div key={e.id} className="rounded-lg border border-border/70 p-3 bg-card/60 text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-bold">{e.id}</span>
                        <span className="text-[0.65rem] uppercase text-muted-foreground">{e.type}</span>
                      </div>
                      <p className="text-muted-foreground line-clamp-1">{e.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* TAB 2: PEOPLE INVOLVED */}
          <TabsContent value="people" className="space-y-4">
            <div className="surface p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-base font-semibold">People Involved & Witnesses</h3>
                  <p className="text-xs text-muted-foreground">
                    Main accused student, reporting invigilators, eyewitnesses, and accomplices.
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddPerson(true)}
                  className="text-xs gap-1.5"
                >
                  <UserPlus className="size-3.5" /> + Add Person
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <PersonCard
                  main
                  person={{
                    id: "accused-main",
                    name: caseRecord.accusedStudent,
                    role: `${caseRecord.yearOfStudy} (Main Accused)`,
                    department: caseRecord.department,
                    rollNumber: caseRecord.rollNumber,
                  }}
                />

                {caseRecord.involvedPersons.map((p) => (
                  <PersonCard
                    key={p.id}
                    person={p}
                    onRemove={() => handleRemovePerson(p.id)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: EVIDENCE GALLERY & SUPPORTING DOCUMENTS */}
          <TabsContent value="evidence" className="space-y-4">
            <EvidenceGallery
              caseId={caseId}
              evidence={caseRecord.evidence}
              onAddEvidence={(e) => {
                const newEv = addEvidence(caseId, e);
                addTimeline(caseId, {
                  event: `${e.type.toUpperCase()} evidence added`,
                  kind: e.type === "photo" ? "photo" : e.type === "video" ? "video" : "note",
                  evidenceRef: `Evidence #${String(newEv.number).padStart(2, "0")}`,
                  description: e.description,
                });
              }}
              onUpdateEvidence={(evId, patch, custodyAction) => {
                updateEvidence(caseId, evId, patch, custodyAction);
              }}
              onRemoveEvidence={(evId) => removeEvidence(caseId, evId)}
            />
          </TabsContent>

          {/* TAB 4: VOICE TRANSCRIPT */}
          <TabsContent value="transcript" className="space-y-4">
            <TranscriptViewer
              transcript={caseRecord.transcript ?? []}
              caseId={caseId}
              caseName={caseRecord.caseName}
              studentName={caseRecord.accusedStudent}
              audioEvidenceId={caseRecord.transcriptAudioEvidenceId}
              transcriptStatus={caseRecord.transcriptStatus || (caseRecord.transcript && caseRecord.transcript.length > 0 ? "Completed" : "Not Generated")}
              onRegenerateTranscript={() => {
                if (caseRecord.transcript) {
                  setTranscript(caseId, [...caseRecord.transcript]);
                }
              }}
              onUpdateEntry={(entryId, patch) => updateTranscriptEntry(caseId, entryId, patch)}
              onVerifyTranscript={() => verifyTranscript(caseId)}
              onGenerateAiSynopsis={() => setActiveTab("synopsis")}
            />
          </TabsContent>

          {/* TAB 5: AI SYNOPSIS */}
          <TabsContent value="synopsis" className="space-y-4">
            <SynopsisEditor
              initialSynopsis={caseRecord.synopsis ?? ""}
              onSaveSynopsis={(syn) => {
                updateCase(caseId, { synopsis: syn });
                addTimeline(caseId, {
                  event: "Synopsis verified and updated",
                  kind: "synopsis",
                });
              }}
              caseName={caseRecord.caseName}
              studentName={caseRecord.accusedStudent}
            />
          </TabsContent>

          {/* TAB 6: ONGOING INVESTIGATION NOTES */}
          <TabsContent value="notes" className="space-y-4">
            <InvestigationNotesView
              caseId={caseId}
              notes={caseRecord.investigationNotes ?? []}
              onAddNote={(content) => addInvestigationNote(caseId, content)}
              onUpdateNote={(noteId, content) => updateInvestigationNote(caseId, noteId, content)}
              onDeleteNote={(noteId) => deleteInvestigationNote(caseId, noteId)}
            />
          </TabsContent>

          {/* TAB 7: FINAL DECISION */}
          <TabsContent value="decision" className="space-y-4">
            <FinalDecisionSection
              caseRecord={caseRecord}
              onSaveDecision={handleSaveDecision}
            />
          </TabsContent>

          {/* TAB 8: SUSPENSION & RETURN MANAGEMENT */}
          <TabsContent value="suspension" className="space-y-4">
            <div className="surface p-6 space-y-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-base font-bold text-foreground">Suspension & Readmission Management</h3>
                  <p className="text-xs text-muted-foreground">
                    Monitor suspension parameters, reschedule return dates, and confirm student readmission.
                  </p>
                </div>

                <div className="flex gap-2">
                  {caseRecord.returnDate && caseRecord.status !== "Returned" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowRescheduleModal(true)}
                        className="text-xs"
                      >
                        Reschedule Return
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setShowReturnModal(true)}
                        className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
                      >
                        <UserCheck className="size-3.5" /> Mark Returned
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {caseRecord.disciplinaryAction === "Suspension" ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="rounded-xl border border-border bg-card p-4 space-y-1">
                    <span className="text-muted-foreground uppercase text-[0.68rem] font-mono">Suspension Start Date</span>
                    <span className="font-mono text-sm font-bold text-foreground block">
                      {caseRecord.suspensionStartDate || "Not Set"}
                    </span>
                  </div>

                  <div className="rounded-xl border border-signal/30 bg-signal/5 p-4 space-y-1">
                    <span className="text-signal uppercase text-[0.68rem] font-mono font-bold">Scheduled Return Date</span>
                    <span className="font-mono text-sm font-bold text-foreground block">
                      {caseRecord.returnDate || "Not Set"}
                    </span>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-4 space-y-1">
                    <span className="text-muted-foreground uppercase text-[0.68rem] font-mono">Readmission Status</span>
                    <span className="font-semibold text-sm block">
                      {caseRecord.status === "Returned" || caseRecord.returned ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="size-4" /> Returned & Cleared
                        </span>
                      ) : (
                        <span className="text-amber-600">Awaiting Return Date</span>
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground bg-muted/20">
                  No active suspension assigned to this case. Manage rulings in the Final Decision tab.
                </div>
              )}
            </div>
          </TabsContent>

          {/* TAB 9: CHRONOLOGICAL TIMELINE */}
          <TabsContent value="timeline" className="space-y-4">
            <InvestigationTimeline
              caseId={caseId}
              timeline={caseRecord.timeline}
              onAddNote={(note) => {
                addTimeline(caseId, {
                  event: "Investigator note recorded",
                  kind: "note",
                  description: note,
                });
              }}
            />
          </TabsContent>

          {/* TAB 10: CASE AUDIT LOG */}
          <TabsContent value="audit" className="space-y-4">
            <AuditLogView auditLog={caseRecord.auditLog} caseId={caseId} />
          </TabsContent>
        </Tabs>

        {/* Modals & Dialogs */}
        <AddPersonModal
          open={showAddPerson}
          onOpenChange={setShowAddPerson}
          onAdd={handleAddPerson}
        />

        <EditCaseModal
          caseRecord={caseRecord}
          open={showEditModal}
          onOpenChange={setShowEditModal}
          onSave={(patch) => {
            updateCase(caseId, patch);
            addTimeline(caseId, {
              event: "Case details modified",
              kind: "note",
              description: "Particulars updated by Committee Head.",
            });
          }}
        />

        <ExportCaseModal
          caseRecord={caseRecord}
          open={showExportModal}
          onOpenChange={setShowExportModal}
        />

        {/* 35.1 Case Closure Modal */}
        <CloseCaseModal
          caseRecord={caseRecord}
          open={showCloseModal}
          onOpenChange={setShowCloseModal}
          onCloseCase={handleCloseCase}
        />

        {/* 35.13 Mark Returned Modal */}
        <MarkReturnedModal
          caseRecord={caseRecord}
          open={showReturnModal}
          onOpenChange={setShowReturnModal}
          onConfirm={handleMarkReturned}
        />

        {/* 35.14 Reschedule Modal */}
        <RescheduleModal
          caseRecord={caseRecord}
          open={showRescheduleModal}
          onOpenChange={setShowRescheduleModal}
          onReschedule={handleReschedule}
        />

        <ConfirmDialog
          open={showDeleteConfirm}
          onOpenChange={setShowDeleteConfirm}
          title={`Delete Case ${caseRecord.id}?`}
          description="Are you sure you want to permanently delete this disciplinary case, all audio recordings, and attached evidence records? This action is irreversible."
          destructive
          confirmLabel="Permanently Delete"
          onConfirm={handleDeleteCase}
        />
      </div>
    </Protected>
  );
}
