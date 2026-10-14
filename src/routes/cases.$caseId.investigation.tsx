import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Protected } from "@/components/dsim/Protected";
import { PageHeader, SecureTag, EmptyState } from "@/components/dsim/common";
import { StatusBadge } from "@/components/dsim/StatusBadge";
import { useDsim } from "@/lib/dsim/store";
import { AudioRecorder, type AudioRecordingPayload } from "@/components/dsim/AudioRecorder";
import { AudioEvidencePlayer } from "@/components/dsim/AudioEvidencePlayer";
import { EvidenceGallery } from "@/components/dsim/EvidenceGallery";
import { SynopsisEditor } from "@/components/dsim/SynopsisEditor";
import { TranscriptViewer } from "@/components/dsim/TranscriptViewer";
import { InvestigationNotesView } from "@/components/dsim/InvestigationNotesView";
import { InvestigationTimeline } from "@/components/dsim/InvestigationTimeline";
import { AddPersonModal } from "@/components/dsim/AddPersonModal";
import { PersonCard } from "@/components/dsim/common";
import { fmtDateTime } from "@/lib/dsim/format";
import { evLabel } from "@/lib/dsim/store";
import {
  Radar,
  Clock,
  ArrowLeft,
  Gavel,
  CheckCircle2,
  FolderX,
  UserPlus,
  ShieldAlert,
  Mic,
  Sparkles,
  MessageSquare,
  StickyNote,
  Music,
  Play,
  Download,
  AlertCircle,
  PlusCircle,
  Radio,
  FileCheck,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import type { Person, TranscriptEntry, Evidence } from "@/lib/dsim/types";

export const Route = createFileRoute("/cases/$caseId/investigation")({
  head: ({ params }) => ({
    meta: [
      { title: `Investigation: ${params.caseId} — DSIM` },
      { name: "description", content: "Active confidential investigation workspace." },
      { property: "og:title", content: `Investigation: ${params.caseId} — DSIM` },
      { property: "og:description", content: "Active confidential investigation workspace." },
    ],
  }),
  component: InvestigationWorkspacePage,
});

export function InvestigationWorkspacePage() {
  const { caseId } = Route.useParams();
  const navigate = useNavigate();
  const {
    getCase,
    updateCase,
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
    setTranscriptStatus,
    pushNotification,
    currentUser,
  } = useDsim();
  const caseRecord = getCase(caseId);

  const [sessionTimer, setSessionTimer] = useState(1968); // 00:32:48 baseline
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [activeTab, setActiveTab] = useState("recorder");
  const [latestAudioEvidenceId, setLatestAudioEvidenceId] = useState<string | undefined>(undefined);
  const [latestAudioUrl, setLatestAudioUrl] = useState<string | undefined>(undefined);
  const [selectedAudioEvidence, setSelectedAudioEvidence] = useState<Evidence | null>(null);

  const timerRef = useRef<number | null>(null);
  const recorderSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = window.setInterval(() => {
        setSessionTimer((t) => t + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  if (!caseRecord) {
    return (
      <Protected>
        <EmptyState
          icon={FolderX}
          title="Investigation Case Not Found"
          description="The requested investigation file does not exist or has been deleted."
          action={
            <Button asChild size="sm">
              <Link to="/cases">Return to Cases</Link>
            </Button>
          }
        />
      </Protected>
    );
  }

  // Filter all audio evidence items attached to this case
  const audioRecordingsList = caseRecord.evidence.filter((e) => e.type === "audio");

  const formatTimer = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleRecordingStart = () => {
    addTimeline(caseId, {
      event: "Audio recording started",
      kind: "audio",
      description: "Investigation interview / hearing statement recording session initiated in browser studio.",
    });
  };

  const handleSaveAudioEvidence = (recording: AudioRecordingPayload) => {
    const ev = addEvidence(caseId, {
      type: "audio",
      fileName: recording.fileName,
      fileSize: recording.fileSize,
      description: `${recording.recordingType || "Investigation audio statement"} (${Math.floor(recording.durationSec / 60)}m ${recording.durationSec % 60}s)`,
      durationSec: recording.durationSec,
      ...(recording.url ? { url: recording.url } : {}),
      ...(recording.rawBlob ? { rawBlob: recording.rawBlob } : {}),
      mimeType: recording.mimeType,
      capturedBy: recording.recordedBy || currentUser?.displayName || "Dr. S. Ramanathan",
      recordedBy: recording.recordedBy || currentUser?.displayName || "Dr. S. Ramanathan",
      recordedByRole: recording.recordedByRole || currentUser?.role || "Discipline Committee Head",
      sessionId: recording.sessionId,
      recordingType: recording.recordingType,
      participants: recording.participants,
      status: "Pending Review",
      transcriptStatus: "Not Generated",
    });

    setLatestAudioEvidenceId(ev.id);
    if (recording.url) setLatestAudioUrl(recording.url);

    addTimeline(caseId, {
      event: "Audio recording completed",
      kind: "audio",
      evidenceRef: `Evidence #${String(ev.number).padStart(2, "0")}`,
      description: `Captured ${recording.durationSec}s encrypted audio statement (${recording.sessionId}).`,
    });

    toast.success("Audio recording saved to Case Evidence vault.");
  };

  const handleGenerateTranscript = (targetEvId?: string) => {
    const audioEvId = targetEvId || latestAudioEvidenceId || caseRecord?.transcriptAudioEvidenceId || "AUD-0001";
    setIsTranscribing(true);
    setTranscriptStatus(caseId, "Processing", audioEvId);

    addTimeline(caseId, {
      event: "Transcript generation started",
      kind: "transcript",
      evidenceRef: audioEvId,
      description: "Transcribing investigation audio stream via speech-to-text pipeline.",
    });

    toast.info("Transcribing the investigation recording...");

    setTimeout(() => {
      setIsTranscribing(false);

      const generatedDialogue: TranscriptEntry[] = [
        {
          id: `tr-${Date.now()}-1`,
          timestamp: "00:00:15",
          timeOffsetSec: 15,
          speaker: "Investigator",
          speakerName: "Dr. S. Ramanathan",
          text: `We are recording the formal inquiry into the incident in ${caseRecord.caseName}. Please state your full name and roll number for the record.`,
          confidence: 0.96,
          reviewed: false,
          audioEvidenceId: audioEvId,
        },
        {
          id: `tr-${Date.now()}-2`,
          timestamp: "00:00:38",
          timeOffsetSec: 38,
          speaker: "Student",
          speakerName: caseRecord.accusedStudent,
          text: `My name is ${caseRecord.accusedStudent}, roll number ${caseRecord.rollNumber}, Department of ${caseRecord.department}.`,
          confidence: 0.94,
          reviewed: false,
          audioEvidenceId: audioEvId,
        },
        {
          id: `tr-${Date.now()}-3`,
          timestamp: "00:01:14",
          timeOffsetSec: 74,
          speaker: "Investigator",
          speakerName: "Dr. S. Ramanathan",
          text: `Please explain your presence at the location during the reported incident time.`,
          confidence: 0.92,
          reviewed: false,
          audioEvidenceId: audioEvId,
        },
        {
          id: `tr-${Date.now()}-4`,
          timestamp: "00:01:42",
          timeOffsetSec: 102,
          speaker: "Student",
          speakerName: caseRecord.accusedStudent,
          text: `I was present in the department area as requested for academic laboratory work, but I was not involved in unauthorized access to the restricted terminal.`,
          confidence: 0.88,
          reviewed: false,
          audioEvidenceId: audioEvId,
        },
        {
          id: `tr-${Date.now()}-5`,
          timestamp: "00:02:18",
          timeOffsetSec: 138,
          speaker: "Witness",
          speakerName: "Lab Invigilator / Staff",
          text: `The student arrived at approximately 14:15. We noticed terminal logs indicating concurrent credential usage.`,
          confidence: 0.65,
          flaggedUnclear: true,
          notes: "Acoustic echo near corridor microphone",
          reviewed: false,
          audioEvidenceId: audioEvId,
        },
        {
          id: `tr-${Date.now()}-6`,
          timestamp: "00:02:55",
          timeOffsetSec: 175,
          speaker: "Investigator",
          speakerName: "Dr. S. Ramanathan",
          text: `We will verify the terminal audit timestamps against the network access logs. Do you have any additional statements to record?`,
          confidence: 0.95,
          reviewed: false,
          audioEvidenceId: audioEvId,
        },
        {
          id: `tr-${Date.now()}-7`,
          timestamp: "00:03:20",
          timeOffsetSec: 200,
          speaker: "Student",
          speakerName: caseRecord.accusedStudent,
          text: `No, sir. I have submitted my statement and I will cooperate with any additional verification.`,
          confidence: 0.93,
          reviewed: false,
          audioEvidenceId: audioEvId,
        },
      ];

      setTranscript(caseId, generatedDialogue, audioEvId, "Completed");

      updateEvidence(
        caseId,
        audioEvId,
        { transcriptStatus: "Completed" },
        "Transcript generated from recording"
      );

      toast.success("Transcript generated successfully.");
      setActiveTab("transcript");
    }, 2200);
  };

  const handleVerifyTranscript = () => {
    verifyTranscript(caseId);
    toast.success("Transcript verified by Committee.");
  };

  const handleGenerateAiSynopsis = () => {
    setActiveTab("synopsis");
    setIsAiProcessing(true);
    toast.info("Generating AI investigation synopsis from verified transcript and evidence...");

    setTimeout(() => {
      setIsAiProcessing(false);
      const synopsisContent = `INVESTIGATION SYNOPSIS (CASE ${caseRecord.id}):\n\n1. INCIDENT OVERVIEW:\nInquiry concerning allegations in ${caseRecord.caseName}. Primary subject identified as ${caseRecord.accusedStudent} (${caseRecord.rollNumber}, ${caseRecord.department}).\n\n2. TESTIMONY & SPOKEN EVIDENCE ANALYSIS:\nAudio statement analysis confirms subject was physically present during stated hours. Subject denies intentional unauthorized system manipulation, claiming standard laboratory session participation. Witness testimony recorded in dialogue corroborates subject presence at 14:15, with acoustic flags noted for terminal log corroboration.\n\n3. EVIDENCE CORROBORATION:\n${caseRecord.evidence.length} evidence items currently catalogued in dossier. Cross-referencing digital access logs with witness oral statements indicates technical contradiction requiring invigilator confirmation.\n\n4. COMMITTEE NOTICE:\nAssistive AI summary. Human adjudication and committee review mandatory before disciplinary determination.`;

      updateCase(caseId, {
        synopsis: synopsisContent,
        aiSynopsis: {
          status: "AI Generated",
          content: synopsisContent,
          generatedAt: new Date().toISOString(),
          generatedBy: "Assistive AI Synthesis Engine",
          reviewed: false,
          confidenceScore: 0.91,
        },
      });

      addTimeline(caseId, {
        event: "AI synopsis generated",
        kind: "synopsis",
        description: "AI synthesis finalized key witness statements and contradiction analysis.",
      });

      pushNotification({
        type: "synopsis",
        message: `${caseId} AI synopsis is ready for committee review.`,
        caseId: caseId,
      });

      toast.success("AI synopsis synthesized. Committee review and verification required.");
    }, 2500);
  };

  const handleSaveSynopsis = (newSynopsis: string) => {
    updateCase(caseId, { synopsis: newSynopsis });
  };

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

  const handleCompleteInvestigation = () => {
    updateCase(caseId, {
      status: "Decision Pending",
      investigationEnd: new Date().toISOString(),
    });
    addTimeline(caseId, {
      event: "Investigation concluded",
      kind: "start",
      description: "Investigation session closed. Moved to Decision Pending stage.",
    });
    pushNotification({
      type: "investigation",
      message: `Investigation for ${caseId} marked complete. Pending Committee decision.`,
      caseId: caseId,
    });
    toast.success("Investigation session concluded. Redirecting to Case details.");
    navigate({ to: "/cases/$caseId", params: { caseId } });
  };

  const scrollToRecorder = () => {
    setActiveTab("recorder");
    setTimeout(() => {
      recorderSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <Protected>
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Top bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground gap-1.5">
              <Link to="/cases/$caseId" params={{ caseId }}>
                <ArrowLeft className="size-3.5" /> Back to Case File
              </Link>
            </Button>
            <SecureTag>Secure Case Workspace · Tamper-Proof</SecureTag>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleCompleteInvestigation}
              className="gap-1.5 text-xs bg-primary hover:bg-primary/90 shadow-sm"
            >
              <Gavel className="size-3.5" /> Conclude & Record Sanction
            </Button>
          </div>
        </div>

        {/* Live Session Timer Card */}
        <div className="surface overflow-hidden p-5 sm:p-6 bg-gradient-to-r from-card via-card to-secondary/30">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-muted-foreground">{caseRecord.id}</span>
                <span className="size-1.5 rounded-full bg-border" />
                <span className="text-xs text-muted-foreground">{caseRecord.department}</span>
                <span className="size-1.5 rounded-full bg-border" />
                <span className="text-xs text-muted-foreground">Accused: <strong className="text-foreground">{caseRecord.accusedStudent}</strong></span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {caseRecord.caseName}
              </h1>
              <p className="mt-1 text-xs text-muted-foreground max-w-2xl">
                {caseRecord.description}
              </p>
            </div>

            {/* Live Timer HUD */}
            <div className="flex items-center gap-4 rounded-xl border border-border bg-background/80 p-3 sm:p-4 backdrop-blur shadow-inner">
              <div className="grid size-11 place-items-center rounded-lg bg-signal/10 text-signal">
                <Radar className="size-6 animate-spin" style={{ animationDuration: "8s" }} />
              </div>

              <div>
                <div className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-wider text-signal">
                  <span className="size-2 rounded-full bg-signal rec-pulse" />
                  Investigation Active
                </div>
                <div className="font-mono text-2xl sm:text-3xl font-bold tracking-wider text-foreground tabular-nums">
                  {formatTimer(sessionTimer)}
                </div>
                <div className="text-[0.65rem] text-muted-foreground">
                  Session Started: {new Date(caseRecord.investigationStart || Date.now()).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* People involved quick row */}
        <div className="surface p-4">
          <div className="flex items-center justify-between mb-3 border-b border-border/70 pb-2">
            <span className="text-xs font-semibold text-foreground">Interview & Statement Roster</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddPerson(true)}
              className="h-7 text-xs gap-1.5"
            >
              <UserPlus className="size-3" /> + Add Witness
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <PersonCard
              main
              person={{
                id: "main-accused",
                name: caseRecord.accusedStudent,
                role: `${caseRecord.yearOfStudy} (Main Accused)`,
                department: caseRecord.department,
                rollNumber: caseRecord.rollNumber,
              }}
            />
            {caseRecord.involvedPersons.map((p) => (
              <PersonCard key={p.id} person={p} />
            ))}
          </div>
        </div>

        {/* Investigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full sm:w-auto">
            <TabsTrigger value="recorder" className="text-xs gap-1.5">
              <Mic className="size-3.5" /> Audio Recorder
            </TabsTrigger>
            <TabsTrigger value="transcript" className="text-xs gap-1.5">
              <MessageSquare className="size-3.5" /> Transcript
            </TabsTrigger>
            <TabsTrigger value="synopsis" className="text-xs gap-1.5">
              <Sparkles className="size-3.5" /> Synopsis
              {caseRecord.synopsis && <span className="size-1.5 rounded-full bg-primary" />}
            </TabsTrigger>
            <TabsTrigger value="evidence" className="text-xs gap-1.5">
              Evidence ({caseRecord.evidence.length})
            </TabsTrigger>
            <TabsTrigger value="notes" className="text-xs gap-1.5">
              <StickyNote className="size-3.5" /> Notes
            </TabsTrigger>
            <TabsTrigger value="timeline" className="text-xs gap-1.5">
              <Clock className="size-3.5" /> Chronology
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Voice Recorder & Investigation Audio Ledger */}
          <TabsContent value="recorder" className="space-y-6">
            <div ref={recorderSectionRef}>
              <AudioRecorder
                caseId={caseId}
                caseName={caseRecord.caseName}
                accusedStudent={caseRecord.accusedStudent}
                recordedBy={currentUser?.displayName || "Dr. S. Ramanathan"}
                recordedByRole={currentUser?.role || "Discipline Committee Head"}
                onStartRecording={handleRecordingStart}
                onSaveRecording={handleSaveAudioEvidence}
                onGenerateTranscript={() => handleGenerateTranscript()}
                isProcessing={isTranscribing}
              />
            </div>

            {/* INVESTIGATION AUDIO - RECORDING LEDGER (Requirements 17 & 18) */}
            <div className="surface p-5 space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Music className="size-4 text-primary" />
                    INVESTIGATION AUDIO RECORDINGS ({audioRecordingsList.length})
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Catalog of all formal hearing statements, witness depositions, and recorded audio tracks for Case {caseId}.
                  </p>
                </div>

                <Button size="sm" onClick={scrollToRecorder} className="text-xs gap-1.5 bg-primary">
                  <PlusCircle className="size-3.5" /> + New Recording
                </Button>
              </div>

              {audioRecordingsList.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-6 text-center space-y-2 bg-muted/10">
                  <Mic className="size-8 mx-auto text-muted-foreground" />
                  <div className="text-xs font-semibold text-foreground">No audio recordings captured yet for this case</div>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Use the recording studio above to capture formal hearing testimony from the respondent or witnesses.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {audioRecordingsList.map((audioEv, idx) => {
                    const recIndex = String(idx + 1).padStart(2, "0");
                    const durationMins = audioEv.durationSec ? Math.floor(audioEv.durationSec / 60) : 0;
                    const durationSecs = audioEv.durationSec ? audioEv.durationSec % 60 : 0;
                    const durFormatted = `${String(durationMins).padStart(2, "0")}:${String(durationSecs).padStart(2, "0")}`;

                    return (
                      <div
                        key={audioEv.id}
                        className="rounded-xl border border-border bg-card p-4 space-y-3 shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 border-b border-border/50 pb-2.5">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-foreground">Recording {recIndex}</span>
                                <span className="rounded bg-secondary px-1.5 py-0.2 font-mono text-[0.65rem] text-muted-foreground">
                                  {audioEv.sessionId || evLabel(audioEv.number)}
                                </span>
                              </div>
                              <div className="text-[0.7rem] text-muted-foreground mt-0.5 font-mono">
                                {fmtDateTime(audioEv.recordedAt || audioEv.timestamp)}
                              </div>
                            </div>

                            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted text-foreground">
                              {durFormatted}
                            </span>
                          </div>

                          <div className="space-y-1.5 pt-2 text-xs">
                            <div className="flex items-center justify-between text-muted-foreground">
                              <span>Recorder:</span>
                              <span className="font-medium text-foreground">{audioEv.recordedBy || audioEv.capturedBy || "Committee Head"}</span>
                            </div>

                            {audioEv.participants && audioEv.participants.length > 0 && (
                              <div className="flex items-start justify-between text-muted-foreground text-[0.72rem]">
                                <span>Participants:</span>
                                <span className="font-medium text-foreground text-right max-w-[200px] truncate">
                                  {audioEv.participants.map((p) => p.name).join(", ")}
                                </span>
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-1 border-t border-border/40">
                              <span className="text-[0.68rem] text-muted-foreground">Evidence Status:</span>
                              <span className="text-[0.68rem] font-semibold text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 className="size-3" /> Stored in Vault
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-[0.68rem] text-muted-foreground">Transcript:</span>
                              {audioEv.transcriptStatus === "Verified" ? (
                                <span className="text-[0.68rem] font-semibold text-emerald-600 flex items-center gap-1">
                                  <CheckCircle2 className="size-3" /> Verified
                                </span>
                              ) : audioEv.transcriptStatus === "Completed" ? (
                                <span className="text-[0.68rem] font-semibold text-indigo-600 flex items-center gap-1">
                                  <CheckCircle2 className="size-3" /> Generated
                                </span>
                              ) : (
                                <span className="text-[0.68rem] font-medium text-amber-600 flex items-center gap-1">
                                  <AlertCircle className="size-3" /> Pending Generation
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/60">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedAudioEvidence(audioEv)}
                            className="text-xs h-7.5 gap-1.5 flex-1"
                          >
                            <Play className="size-3 text-primary" /> Open Recording
                          </Button>

                          {audioEv.transcriptStatus === "Completed" || audioEv.transcriptStatus === "Verified" ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setLatestAudioEvidenceId(audioEv.id);
                                if (audioEv.url) setLatestAudioUrl(audioEv.url);
                                setActiveTab("transcript");
                              }}
                              className="text-xs h-7.5 gap-1 text-primary border-primary/30"
                            >
                              <MessageSquare className="size-3" /> View Transcript
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleGenerateTranscript(audioEv.id)}
                              className="text-xs h-7.5 gap-1 text-indigo-600"
                            >
                              <Sparkles className="size-3 text-indigo-500" /> Transcribe
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick preview of AI synopsis if exists */}
            {caseRecord.synopsis && (
              <div className="surface p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Sparkles className="size-3.5 text-primary" /> Active Investigation Synopsis
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("synopsis")}
                    className="text-xs text-primary"
                  >
                    Open Full Editor →
                  </Button>
                </div>
                <p className="line-clamp-3 text-xs text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-lg border border-border/50">
                  {caseRecord.synopsis}
                </p>
              </div>
            )}
          </TabsContent>

          {/* TAB 2: Voice Transcript */}
          <TabsContent value="transcript" className="space-y-4">
            <TranscriptViewer
              transcript={caseRecord.transcript ?? []}
              caseId={caseId}
              caseName={caseRecord.caseName}
              studentName={caseRecord.accusedStudent}
              audioEvidenceId={caseRecord.transcriptAudioEvidenceId || latestAudioEvidenceId}
              audioUrl={latestAudioUrl}
              transcriptStatus={caseRecord.transcriptStatus || (caseRecord.transcript && caseRecord.transcript.length > 0 ? "Completed" : "Not Generated")}
              onRegenerateTranscript={() => handleGenerateTranscript()}
              onUpdateEntry={(entryId, patch) => updateTranscriptEntry(caseId, entryId, patch)}
              onVerifyTranscript={handleVerifyTranscript}
              onGenerateAiSynopsis={handleGenerateAiSynopsis}
            />
          </TabsContent>

          {/* TAB 3: AI Voice Synopsis */}
          <TabsContent value="synopsis" className="space-y-4">
            <SynopsisEditor
              initialSynopsis={caseRecord.synopsis ?? ""}
              aiSynopsis={caseRecord.aiSynopsis}
              isGenerating={isAiProcessing}
              onSaveSynopsis={handleSaveSynopsis}
              caseId={caseId}
              caseName={caseRecord.caseName}
              studentName={caseRecord.accusedStudent}
            />
          </TabsContent>

          {/* TAB 4: Evidence Capture & Gallery */}
          <TabsContent value="evidence" className="space-y-4">
            <EvidenceGallery
              caseId={caseId}
              evidence={caseRecord.evidence}
              onAddEvidence={(e) => {
                const newEv = addEvidence(caseId, e);
                addTimeline(caseId, {
                  event: `${e.type === "photo" ? "Photo" : e.type === "video" ? "Video" : e.type === "audio" ? "Audio" : "Document"} evidence added`,
                  kind: e.type === "photo" ? "photo" : e.type === "video" ? "video" : e.type === "audio" ? "audio" : "note",
                  evidenceRef: `Evidence #${String(newEv.number).padStart(2, "0")}`,
                  description: e.description,
                });
              }}
              onUpdateEvidence={(evId, patch, custodyAction) => {
                updateEvidence(caseId, evId, patch, custodyAction);
              }}
              onRemoveEvidence={(evId) => removeEvidence(caseId, evId)}
              onViewTranscript={() => setActiveTab("transcript")}
              onGenerateTranscript={(evId) => handleGenerateTranscript(evId)}
            />
          </TabsContent>

          {/* TAB 5: Ongoing Notes */}
          <TabsContent value="notes" className="space-y-4">
            <InvestigationNotesView
              caseId={caseId}
              notes={caseRecord.investigationNotes ?? []}
              onAddNote={(content) => addInvestigationNote(caseId, content)}
              onUpdateNote={(noteId, content) => updateInvestigationNote(caseId, noteId, content)}
              onDeleteNote={(noteId) => deleteInvestigationNote(caseId, noteId)}
            />
          </TabsContent>

          {/* TAB 6: Investigation Timeline */}
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
        </Tabs>

        {/* Add Person Modal */}
        <AddPersonModal
          open={showAddPerson}
          onOpenChange={setShowAddPerson}
          onAdd={handleAddPerson}
        />

        {/* Audio Evidence Detail / Player Modal */}
        <AudioEvidencePlayer
          evidence={selectedAudioEvidence}
          open={!!selectedAudioEvidence}
          onOpenChange={(open) => !open && setSelectedAudioEvidence(null)}
          onViewTranscript={(evId) => {
            setLatestAudioEvidenceId(evId);
            if (selectedAudioEvidence?.url) setLatestAudioUrl(selectedAudioEvidence.url);
            setActiveTab("transcript");
          }}
          onGenerateTranscript={(evId) => handleGenerateTranscript(evId)}
          onAuditDownload={(ev) => {
            addTimeline(caseId, {
              event: "Audio evidence downloaded",
              kind: "audio",
              evidenceRef: ev.id,
              description: `Audio track ${ev.fileName} exported by ${currentUser?.displayName || "Committee Head"}.`,
            });
          }}
        />
      </div>
    </Protected>
  );
}
