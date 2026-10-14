import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { initialCases, initialNotifications, initialComplaints, initialStudentProfile, initialStudentNotifications } from "./mock-data";
import {
  MOCK_ACCOUNTS,
  ROLE_PERMISSIONS,
  DEFAULT_COMMITTEE_USER,
  DEFAULT_STUDENT_USER,
  hasPermission as checkPermission,
  isCommitteeUser,
  isStudent,
} from "./auth";
import { notificationService } from "./notificationService";
import type {
  AppNotification,
  CaseRecord,
  CaseStatus,
  ClosureInfo,
  Evidence,
  EvidenceCustodyEntry,
  InvestigationNote,
  TimelineEvent,
  TranscriptEntry,
  TranscriptStatus,
  AuditLogEntry,
  ComplaintRecord,
  ComplaintStatus,
  StudentProfile,
  StudentNotification,
  ComplaintEvidence,
  InfoRequest,
  AuthUser,
  UserRole,
  Permission,
  AISynopsis,
} from "./types";
import { toast } from "sonner";

export interface Profile {
  name: string;
  email: string;
  committee: string;
  phone: string;
  createdAt: string;
}

export interface Settings {
  returnReminders: boolean;
  investigationNotifications: boolean;
  evidenceNotifications: boolean;
  synopsisNotifications: boolean;
  autoSynopsis: boolean;
  recordingQuality: "standard" | "high";
  synopsisLength: "concise" | "detailed";
  compactTables: boolean;
  requireUserVerification: boolean;
}

interface Store {
  ready: boolean;
  
  // Auth & Roles Foundation
  currentUser: AuthUser | null;
  userRole: UserRole | null;
  isAuthenticated: boolean;
  hasPermission: (permission: Permission) => boolean;

  // Committee / Staff Auth
  authed: boolean;
  login: (roleOrEmailOrUser?: string | AuthUser) => void;
  logout: () => void;
  expireSession: () => void;

  // Student Auth
  studentAuthed: boolean;
  studentLogin: (emailOrRoll?: string) => void;
  studentLogout: () => void;
  studentProfile: StudentProfile;
  setStudentProfile: (p: StudentProfile) => void;
  updateStudentProfile: (p: Partial<StudentProfile>) => void;

  // Student Notifications
  studentNotifications: StudentNotification[];
  pushStudentNotification: (n: Omit<StudentNotification, "id" | "timestamp" | "read">) => void;
  markStudentNotificationRead: (id: string) => void;
  markAllStudentNotificationsRead: () => void;

  // Disciplinary Cases
  cases: CaseRecord[];
  getCase: (id: string) => CaseRecord | undefined;
  addCase: (c: Omit<CaseRecord, "id" | "createdAt" | "updatedAt" | "timeline" | "evidence" | "auditLog">) => CaseRecord;
  updateCase: (id: string, patch: Partial<CaseRecord>) => void;
  deleteCase: (id: string) => void;
  closeCase: (id: string, closure: Omit<ClosureInfo, "closedAt" | "closedBy">) => void;
  addEvidence: (caseId: string, e: Omit<Evidence, "id" | "number" | "caseId" | "timestamp">) => Evidence;
  updateEvidence: (caseId: string, evId: string, patch: Partial<Evidence>, custodyAction?: string) => void;
  removeEvidence: (caseId: string, evId: string) => void;
  addTimeline: (caseId: string, t: Omit<TimelineEvent, "id" | "timestamp">) => void;
  addAuditLog: (caseId: string, entry: Omit<AuditLogEntry, "id" | "timestamp" | "user">) => void;
  addInvestigationNote: (caseId: string, content: string) => InvestigationNote;
  updateInvestigationNote: (caseId: string, noteId: string, content: string) => void;
  deleteInvestigationNote: (caseId: string, noteId: string) => void;
  setTranscript: (caseId: string, entries: TranscriptEntry[], audioEvidenceId?: string, status?: TranscriptStatus) => void;
  updateTranscriptEntry: (caseId: string, entryId: string, patch: Partial<TranscriptEntry>) => void;
  verifyTranscript: (caseId: string) => void;
  setTranscriptStatus: (caseId: string, status: TranscriptStatus, evidenceId?: string) => void;
  changeCaseStatus: (caseId: string, newStatus: CaseStatus, reason?: string) => void;
  verifySynopsis: (caseId: string) => void;
  assignBoardMember: (caseId: string, memberEmail: string, memberName: string) => void;
  submitBoardVote: (caseId: string, vote: import("./types").VoteChoice, remarks?: string) => void;

  // Complaints / Student Portal
  complaints: ComplaintRecord[];
  getComplaint: (id: string) => ComplaintRecord | undefined;
  getStudentComplaints: (studentIdOrRoll?: string) => ComplaintRecord[];
  addComplaint: (c: Omit<ComplaintRecord, "id" | "submittedAt" | "updatedAt" | "status" | "timeline">) => ComplaintRecord;
  updateComplaint: (id: string, patch: Partial<ComplaintRecord>) => void;
  acceptComplaint: (id: string) => void;
  rejectComplaint: (id: string, reason: string, remarks?: string) => void;
  requestComplaintInfo: (id: string, question: string, requestType?: string) => void;
  respondComplaintInfo: (id: string, requestId: string, response: string, responseEvidence?: ComplaintEvidence[]) => void;
  convertComplaintToCase: (id: string, reason?: string) => CaseRecord | undefined;

  // Committee Head Notifications & Profile
  notifications: AppNotification[];
  pushNotification: (n: Omit<AppNotification, "id" | "timestamp" | "read">) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  profile: Profile;
  setProfile: (p: Profile) => void;
  settings: Settings;
  setSetting: <K extends keyof Settings>(k: K, v: Settings[K]) => void;
}

const Ctx = createContext<Store | null>(null);
const AUTH_KEY = "dsim-session";
const AUTH_USER_KEY = "dsim-user";
const STUDENT_AUTH_KEY = "dsim-student-session";
const STUDENT_USER_KEY = "dsim-student-user";
const SESSION_TIMESTAMP_KEY = "dsim-session-timestamp";

const uid = () => Math.random().toString(36).slice(2, 10);

export function DsimProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [studentAuthed, setStudentAuthed] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [cases, setCases] = useState<CaseRecord[]>(initialCases);
  const [complaints, setComplaints] = useState<ComplaintRecord[]>(initialComplaints);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [studentNotifications, setStudentNotifications] = useState<StudentNotification[]>(initialStudentNotifications);
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(initialStudentProfile);
  const [profile, setProfile] = useState<Profile>({
    name: "Dr. S. Ramanathan",
    email: "discipline.head@kprcas.ac.in",
    committee: "Student Discipline Committee",
    phone: "+91 98400 12345",
    createdAt: "2024-06-12T09:00:00.000Z",
  });
  const [settings, setSettings] = useState<Settings>({
    returnReminders: true,
    investigationNotifications: true,
    evidenceNotifications: true,
    synopsisNotifications: true,
    autoSynopsis: true,
    recordingQuality: "high",
    synopsisLength: "detailed",
    compactTables: false,
    requireUserVerification: true,
  });

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const isComAuthed = localStorage.getItem(AUTH_KEY) === "1";
      const isStuAuthed = localStorage.getItem(STUDENT_AUTH_KEY) === "1";

      if (isComAuthed) {
        const storedUser = localStorage.getItem(AUTH_USER_KEY);
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser) as AuthUser;
            setCurrentUser(parsed);
            setProfile((prev) => ({
              ...prev,
              name: parsed.displayName,
              email: parsed.email,
            }));
          } catch {
            setCurrentUser(DEFAULT_COMMITTEE_USER);
          }
        } else {
          setCurrentUser(DEFAULT_COMMITTEE_USER);
        }
        setAuthed(true);
      } else if (isStuAuthed) {
        const storedStu = localStorage.getItem(STUDENT_USER_KEY);
        if (storedStu) {
          try {
            setCurrentUser(JSON.parse(storedStu) as AuthUser);
          } catch {
            setCurrentUser(DEFAULT_STUDENT_USER);
          }
        } else {
          setCurrentUser(DEFAULT_STUDENT_USER);
        }
        setStudentAuthed(true);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    } finally {
      setReady(true);
    }
  }, []);

  const touch = (c: CaseRecord, patch: Partial<CaseRecord>): CaseRecord => ({
    ...c,
    ...patch,
    updatedAt: new Date().toISOString(),
  });

  const touchComplaint = (c: ComplaintRecord, patch: Partial<ComplaintRecord>): ComplaintRecord => ({
    ...c,
    ...patch,
    updatedAt: new Date().toISOString(),
  });

  const hasPermission = useCallback(
    (permission: Permission): boolean => {
      return checkPermission(currentUser, permission);
    },
    [currentUser],
  );

  const login = useCallback((roleOrEmailOrUser?: string | AuthUser) => {
    let user: AuthUser = DEFAULT_COMMITTEE_USER;
    if (roleOrEmailOrUser) {
      if (typeof roleOrEmailOrUser === "object" && roleOrEmailOrUser !== null) {
        user = roleOrEmailOrUser;
      } else if (typeof roleOrEmailOrUser === "string") {
        if (roleOrEmailOrUser in MOCK_ACCOUNTS && MOCK_ACCOUNTS[roleOrEmailOrUser]) {
          user = MOCK_ACCOUNTS[roleOrEmailOrUser]!;
        } else {
          const foundRole = Object.values(MOCK_ACCOUNTS).find(
            (u) =>
              u.role.toLowerCase() === roleOrEmailOrUser.toLowerCase() ||
              u.email.toLowerCase() === roleOrEmailOrUser.toLowerCase() ||
              u.displayName.toLowerCase() === roleOrEmailOrUser.toLowerCase()
          );
          if (foundRole) {
            user = foundRole;
          } else {
            const q = roleOrEmailOrUser.toLowerCase();
            const matched = Object.values(MOCK_ACCOUNTS).find(
              (u) =>
                (q.includes("principal") && u.role === "Principal") ||
                ((q.includes("ao") || q.includes("administrative") || q.includes("admin officer")) &&
                  u.role === "Administrative Officer") ||
                ((q.includes("board") || q.includes("member")) &&
                  u.role === "Disciplinary Board Member") ||
                ((q.includes("head") || q.includes("committee")) &&
                  u.role === "Committee Head")
            );
            if (matched) {
              user = matched;
            } else {
              const roleName: UserRole = "Committee Head";
              const dName = "Discipline Committee Head";
              const eMail = "discipline.head@kprcas.ac.in";
              user = {
                id: `usr_${Math.random().toString(36).slice(2, 7)}`,
                role: roleName,
                displayName: dName,
                email: eMail,
                department: "Student Discipline Committee",
                permissions: ROLE_PERMISSIONS[roleName],
              };
            }
          }
        }
      }
    }
    setCurrentUser(user);
    setAuthed(true);
    setStudentAuthed(false);
    try {
      localStorage.setItem(AUTH_KEY, "1");
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      localStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString());
      localStorage.removeItem(STUDENT_AUTH_KEY);
      localStorage.removeItem(STUDENT_USER_KEY);
    } catch {}
    setProfile((prev) => ({
      ...prev,
      name: user.displayName,
      email: user.email,
      committee: user.department || prev.committee,
    }));
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      localStorage.removeItem(SESSION_TIMESTAMP_KEY);
    } catch {}
    setAuthed(false);
    setCurrentUser(null);
    toast.success("Signed out successfully.");
  }, []);

  const studentLogin = useCallback((emailOrRoll?: string) => {
    const trimmed = emailOrRoll?.trim() || "";
    const user: AuthUser = {
      ...DEFAULT_STUDENT_USER,
      id: "usr_stu_001",
      role: "STUDENT",
      displayName: "Arun Kumar",
      department: "School of Computing Science",
      permissions: ROLE_PERMISSIONS["STUDENT"],
      studentId: trimmed.startsWith("KPR") || trimmed.startsWith("22") || trimmed.startsWith("23") ? trimmed : "KPR23CS001",
      email: trimmed.includes("@") ? trimmed : "arun.cs23@kprcas.ac.in",
    };
    setCurrentUser(user);
    setStudentAuthed(true);
    setAuthed(false);
    try {
      localStorage.setItem(STUDENT_AUTH_KEY, "1");
      localStorage.setItem(STUDENT_USER_KEY, JSON.stringify(user));
      localStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString());
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    } catch {}
  }, []);

  const studentLogout = useCallback(() => {
    try {
      localStorage.removeItem(STUDENT_AUTH_KEY);
      localStorage.removeItem(STUDENT_USER_KEY);
      localStorage.removeItem(SESSION_TIMESTAMP_KEY);
    } catch {}
    setStudentAuthed(false);
    setCurrentUser(null);
    toast.success("Signed out successfully.");
  }, []);

  const expireSession = useCallback(() => {
    try {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      localStorage.removeItem(STUDENT_AUTH_KEY);
      localStorage.removeItem(STUDENT_USER_KEY);
      localStorage.removeItem(SESSION_TIMESTAMP_KEY);
    } catch {}
    setAuthed(false);
    setStudentAuthed(false);
    setCurrentUser(null);
    toast.error("Your session has expired. Please sign in again.");
  }, []);

  const addTimeline = useCallback((caseId: string, t: Omit<TimelineEvent, "id" | "timestamp">) => {
    setCases((cs) =>
      cs.map((c) =>
        c.id === caseId
          ? touch(c, { timeline: [...c.timeline, { ...t, id: uid(), timestamp: new Date().toISOString() }] })
          : c,
      ),
    );
  }, []);

  const addAuditLog = useCallback(
    (caseId: string, entry: Omit<AuditLogEntry, "id" | "timestamp" | "user">) => {
      const actor = currentUser?.displayName || profile.name;
      setCases((cs) =>
        cs.map((c) =>
          c.id === caseId
            ? touch(c, {
                auditLog: [
                  ...(c.auditLog || []),
                  {
                    ...entry,
                    id: uid(),
                    timestamp: new Date().toISOString(),
                    user: actor,
                    actorId: currentUser?.id,
                    actorRole: currentUser?.role,
                  },
                ],
              })
            : c,
        ),
      );
    },
    [currentUser, profile.name],
  );

  const pushNotification = useCallback((n: Omit<AppNotification, "id" | "timestamp" | "read">) => {
    setNotifications((ns) => [{ ...n, id: uid(), timestamp: new Date().toISOString(), read: false }, ...ns]);
  }, []);

  const pushStudentNotification = useCallback((n: Omit<StudentNotification, "id" | "timestamp" | "read">) => {
    setStudentNotifications((ns) => [{ ...n, id: uid(), timestamp: new Date().toISOString(), read: false }, ...ns]);
  }, []);

  const addInvestigationNote = useCallback(
    (caseId: string, content: string) => {
      const ts = new Date().toISOString();
      const author = currentUser?.displayName || profile.name;
      const newNote: InvestigationNote = {
        id: uid(),
        timestamp: ts,
        author,
        content,
      };
      setCases((cs) =>
        cs.map((c) =>
          c.id === caseId
            ? touch(c, {
                investigationNotes: [newNote, ...(c.investigationNotes || [])],
                auditLog: [
                  ...(c.auditLog || []),
                  {
                    id: uid(),
                    timestamp: ts,
                    event: "Note added",
                    user: author,
                    description: `Investigation note added: "${content.slice(0, 50)}${content.length > 50 ? "..." : ""}"`,
                    category: "investigation",
                    actorRole: currentUser?.role,
                  },
                ],
                timeline: [
                  ...c.timeline,
                  { id: uid(), timestamp: ts, event: "Investigator note recorded", kind: "note", description: content },
                ],
              })
            : c,
        ),
      );
      return newNote;
    },
    [currentUser, profile.name],
  );

  const updateInvestigationNote = useCallback(
    (caseId: string, noteId: string, content: string) => {
      const ts = new Date().toISOString();
      const author = currentUser?.displayName || profile.name;
      setCases((cs) =>
        cs.map((c) =>
          c.id === caseId
            ? touch(c, {
                investigationNotes: (c.investigationNotes || []).map((n) =>
                  n.id === noteId ? { ...n, content, updatedAt: ts } : n,
                ),
                auditLog: [
                  ...(c.auditLog || []),
                  {
                    id: uid(),
                    timestamp: ts,
                    event: "Note edited",
                    user: author,
                    description: "Investigation note modified.",
                    category: "investigation",
                    actorRole: currentUser?.role,
                  },
                ],
              })
            : c,
        ),
      );
    },
    [currentUser, profile.name],
  );

  const deleteInvestigationNote = useCallback(
    (caseId: string, noteId: string) => {
      const ts = new Date().toISOString();
      const author = currentUser?.displayName || profile.name;
      setCases((cs) =>
        cs.map((c) =>
          c.id === caseId
            ? touch(c, {
                investigationNotes: (c.investigationNotes || []).filter((n) => n.id !== noteId),
                auditLog: [
                  ...(c.auditLog || []),
                  {
                    id: uid(),
                    timestamp: ts,
                    event: "Note deleted",
                    user: author,
                    description: "Investigation note removed.",
                    category: "investigation",
                    actorRole: currentUser?.role,
                  },
                ],
              })
            : c,
        ),
      );
    },
    [currentUser, profile.name],
  );

  const setTranscript = useCallback(
    (
      caseId: string,
      entries: TranscriptEntry[],
      audioEvidenceId?: string,
      status: TranscriptStatus = "Completed",
    ) => {
      const ts = new Date().toISOString();
      const author = currentUser?.displayName || profile.name;
      setCases((cs) =>
        cs.map((c) => {
          if (c.id !== caseId) return c;
          const targetEvidence = audioEvidenceId ? c.evidence.find((e) => e.id === audioEvidenceId) : undefined;
          const evidenceRef = targetEvidence ? `Evidence #${String(targetEvidence.number).padStart(2, "0")}` : undefined;
          return touch(c, {
            transcript: entries,
            transcriptStatus: status,
            ...(audioEvidenceId ? { transcriptAudioEvidenceId: audioEvidenceId } : {}),
            auditLog: [
              ...(c.auditLog || []),
              {
                id: uid(),
                timestamp: ts,
                event: "Transcript generated",
                user: author,
                description: `Hearing transcript with ${entries.length} statements generated${audioEvidenceId ? ` for audio evidence ${evidenceRef || audioEvidenceId}` : ""}.`,
                category: "investigation",
                actorRole: currentUser?.role,
              },
            ],
            timeline: [
              ...c.timeline,
              {
                id: uid(),
                timestamp: ts,
                event: "Transcript generated",
                kind: "transcript",
                evidenceRef,
                description: `Automated speech-to-text transcript generated (${entries.length} spoken dialogue turns).`,
              },
            ],
          });
        }),
      );
    },
    [currentUser, profile.name],
  );

  const updateTranscriptEntry = useCallback(
    (caseId: string, entryId: string, patch: Partial<TranscriptEntry>) => {
      const ts = new Date().toISOString();
      const author = currentUser?.displayName || profile.name;
      setCases((cs) =>
        cs.map((c) => {
          if (c.id !== caseId || !c.transcript) return c;
          const updatedTranscript = c.transcript.map((item) => {
            if (item.id !== entryId) return item;
            return {
              ...item,
              ...patch,
              isEdited: true,
              originalText: item.originalText ?? item.text,
              reviewedBy: author,
              reviewedAt: ts,
            };
          });
          return touch(c, {
            transcript: updatedTranscript,
            transcriptStatus: c.transcriptStatus === "Verified" ? "Verified" : "Needs Review",
            auditLog: [
              ...(c.auditLog || []),
              {
                id: uid(),
                timestamp: ts,
                event: "Transcript Reviewed/Updated",
                user: author,
                description: `Transcript statement (${entryId}) corrected/reviewed by committee.`,
                category: "investigation",
                actorRole: currentUser?.role,
              },
            ],
            timeline: [
              ...c.timeline,
              {
                id: uid(),
                timestamp: ts,
                event: "Transcript reviewed",
                kind: "transcript",
                description: `Committee review and dialogue corrections logged by ${author}.`,
              },
            ],
          });
        }),
      );
    },
    [currentUser, profile.name],
  );

  const verifyTranscript = useCallback(
    (caseId: string) => {
      const ts = new Date().toISOString();
      const verifier = currentUser?.displayName || profile.name;
      setCases((cs) =>
        cs.map((c) => {
          if (c.id !== caseId) return c;
          const verifiedEntries = (c.transcript || []).map((t) => ({
            ...t,
            reviewed: true,
            reviewedBy: t.reviewedBy || verifier,
            reviewedAt: t.reviewedAt || ts,
          }));
          return touch(c, {
            transcript: verifiedEntries,
            transcriptStatus: "Verified",
            auditLog: [
              ...(c.auditLog || []),
              {
                id: uid(),
                timestamp: ts,
                event: "Transcript Verified",
                user: verifier,
                description: "Voice-to-text transcript officially verified by Discipline Committee.",
                category: "investigation",
                actorRole: currentUser?.role,
              },
            ],
            timeline: [
              ...c.timeline,
              {
                id: uid(),
                timestamp: ts,
                event: "Transcript verified",
                kind: "transcript",
                description: `Transcript verified by ${verifier}. Evidentiary record approved.`,
              },
            ],
          });
        }),
      );
      toast.success("Transcript officially marked as Reviewed & Verified.");
    },
    [currentUser, profile.name],
  );

  const setTranscriptStatus = useCallback(
    (caseId: string, status: TranscriptStatus, evidenceId?: string) => {
      setCases((cs) =>
        cs.map((c) =>
          c.id === caseId
            ? touch(c, {
                transcriptStatus: status,
                ...(evidenceId ? { transcriptAudioEvidenceId: evidenceId } : {}),
              })
            : c,
        ),
      );
    },
    [],
  );

  const closeCase = useCallback(
    (caseId: string, closure: Omit<ClosureInfo, "closedAt" | "closedBy">) => {
      const ts = new Date().toISOString();
      const actor = currentUser?.displayName || profile.name;
      const fullClosure: ClosureInfo = {
        ...closure,
        closedAt: ts,
        closedBy: actor,
      };

      setCases((cs) =>
        cs.map((c) => {
          if (c.id !== caseId) return c;
          const audit: AuditLogEntry = {
            id: uid(),
            timestamp: ts,
            event: "Case closed",
            user: actor,
            description: `Case officially marked Closed with outcome: ${closure.outcome}. Final decision: ${closure.finalDecision}. Remarks: ${closure.finalRemarks}`,
            category: "closure",
            actorRole: currentUser?.role,
          };
          const tl: TimelineEvent = {
            id: uid(),
            timestamp: ts,
            event: `Case Closed: ${closure.finalDecision}`,
            description: closure.outcome,
            kind: "closed",
          };
          return touch(c, {
            status: "Closed",
            closureInfo: fullClosure,
            auditLog: [...(c.auditLog || []), audit],
            timeline: [...c.timeline, tl],
          });
        }),
      );

      // If source complaint exists, update it
      const cRecord = cases.find((c) => c.id === caseId);
      if (cRecord?.sourceComplaintId) {
        setComplaints((cmps) =>
          cmps.map((cmp) => {
            if (cmp.id !== cRecord.sourceComplaintId) return cmp;
            return touchComplaint(cmp, {
              status: "Closed",
              authorizedUpdates: [
                ...(cmp.authorizedUpdates || []),
                `Case ${caseId} inquiry has concluded. Official finding: ${closure.outcome}.`,
              ],
            });
          }),
        );
      }

      pushNotification({
        type: "closure",
        message: `Case ${caseId} has been closed by ${actor}. Outcome: ${closure.outcome}`,
        caseId,
      });
    },
    [cases, currentUser, profile.name, pushNotification],
  );

  const changeCaseStatus = useCallback(
    (caseId: string, newStatus: CaseStatus, reason?: string) => {
      const ts = new Date().toISOString();
      const actor = currentUser?.displayName || profile.name;
      setCases((cs) =>
        cs.map((c) => {
          if (c.id !== caseId) return c;
          return touch(c, {
            status: newStatus,
            auditLog: [
              ...(c.auditLog || []),
              {
                id: uid(),
                timestamp: ts,
                event: `Status changed to ${newStatus}`,
                user: actor,
                description: reason || `Case status updated from ${c.status} to ${newStatus}.`,
                category: "case",
                actorRole: currentUser?.role,
              },
            ],
            timeline: [
              ...c.timeline,
              {
                id: uid(),
                timestamp: ts,
                event: `Status changed to ${newStatus}`,
                kind: "decision",
                ...(reason ? { description: reason } : {}),
              },
            ],
          });
        }),
      );
    },
    [currentUser, profile.name],
  );

  const verifySynopsis = useCallback(
    (caseId: string) => {
      const ts = new Date().toISOString();
      const verifier = currentUser?.displayName || profile.name;
      setCases((cs) =>
        cs.map((c) => {
          if (c.id !== caseId) return c;
          const aiSynopsis: AISynopsis = {
            status: "Reviewed by Committee",
            content: c.synopsis || "AI synopsis verified by the committee.",
            generatedAt: c.aiSynopsis?.generatedAt || ts,
            reviewed: true,
            verifiedBy: verifier,
            verifiedAt: ts,
          };
          return touch(c, {
            aiSynopsis,
            auditLog: [
              ...(c.auditLog || []),
              {
                id: uid(),
                timestamp: ts,
                event: "Synopsis Verified",
                user: verifier,
                description: "AI-assisted synopsis reviewed and officially verified by committee.",
                category: "synopsis",
                actorRole: currentUser?.role,
              },
            ],
            timeline: [
              ...c.timeline,
              {
                id: uid(),
                timestamp: ts,
                event: "Investigation Synopsis Verified",
                kind: "synopsis",
                description: `Verified by ${verifier}`,
              },
            ],
          });
        }),
      );
      pushNotification({
        type: "synopsis",
        message: `Investigation synopsis for case ${caseId} was reviewed and verified by ${verifier}.`,
        caseId,
      });
      toast.success("AI Synopsis marked as Reviewed & Verified.");
    },
    [currentUser, profile.name, pushNotification],
  );

  const assignBoardMember = useCallback(
    (caseId: string, memberEmail: string, memberName: string) => {
      const ts = new Date().toISOString();
      const actor = currentUser?.displayName || profile.name;
      setCases((cs) =>
        cs.map((c) => {
          if (c.id !== caseId) return c;
          return touch(c, {
            assignedBoardMember: memberName,
            assignedBoardMemberEmail: memberEmail,
            assignedBy: actor,
            assignedAt: ts,
            auditLog: [
              ...(c.auditLog || []),
              {
                id: uid(),
                timestamp: ts,
                event: "Board Member Assigned",
                user: actor,
                description: `Case formally assigned to Disciplinary Board Member (${memberEmail}) by ${actor}.`,
                category: "case",
                actorRole: currentUser?.role,
              },
            ],
            timeline: [
              ...c.timeline,
              {
                id: uid(),
                timestamp: ts,
                event: "Board Member Assigned",
                kind: "note",
                description: `Assigned to Disciplinary Board Member (${memberEmail}) for hearing & findings.`,
              },
            ],
          });
        }),
      );
      pushNotification({
        type: "investigation",
        title: "New Case Assignment",
        message: `You have been assigned to review and vote on Case ${caseId}.`,
        caseId,
        recipientRole: "Disciplinary Board Member",
        recipientId: "usr_board_003",
      });
      toast.success(`Case successfully assigned to Disciplinary Board Member.`);
    },
    [currentUser, profile.name, pushNotification],
  );

  const submitBoardVote = useCallback(
    (caseId: string, vote: import("./types").VoteChoice, remarks?: string) => {
      const ts = new Date().toISOString();
      const voter = currentUser?.displayName || "Disciplinary Board Member";
      const voterEmail = currentUser?.email || "committee.member@kprcas.ac.in";
      const newVote: import("./types").BoardVote = {
        id: uid(),
        voter,
        voterEmail,
        role: "Disciplinary Board Member",
        vote,
        timestamp: ts,
        remarks,
      };
      setCases((cs) =>
        cs.map((c) => {
          if (c.id !== caseId) return c;
          const existingVotes = c.boardVotes || [];
          const filtered = existingVotes.filter((v) => v.voterEmail !== voterEmail);
          return touch(c, {
            boardVotes: [...filtered, newVote],
            auditLog: [
              ...(c.auditLog || []),
              {
                id: uid(),
                timestamp: ts,
                event: `Board Vote: ${vote}`,
                user: voter,
                description: `Disciplinary Board Member submitted vote: ${vote}. Remarks: ${remarks || "None"}`,
                category: "decision",
                actorRole: currentUser?.role,
              },
            ],
            timeline: [
              ...c.timeline,
              {
                id: uid(),
                timestamp: ts,
                event: `Board Member Vote (${vote})`,
                kind: "decision",
                description: `Vote recorded: ${vote}.${remarks ? ` Remarks: ${remarks}` : ""}`,
              },
            ],
          });
        }),
      );
      pushNotification({
        type: "decision",
        title: "Board Member Vote Submitted",
        message: `Disciplinary Board Member has voted (${vote}) on Case ${caseId}.`,
        caseId,
        recipientRole: "Committee Head",
      });
      toast.success(`Vote "${vote}" recorded successfully.`);
    },
    [currentUser, pushNotification],
  );

  const addEvidence = useCallback(
    (caseId: string, e: Omit<Evidence, "id" | "number" | "caseId" | "timestamp">): Evidence => {
      const id = uid();
      const ts = new Date().toISOString();
      const actor = currentUser?.displayName || profile.name;
      const initialCustody: EvidenceCustodyEntry[] = e.custodyHistory || [
        {
          id: uid(),
          timestamp: ts,
          action: "Captured",
          performedBy: e.capturedBy || actor,
          details: e.type === "audio" ? "Investigation audio recorded via browser studio" : "Initial evidence intake on site",
        },
        {
          id: uid(),
          timestamp: ts,
          action: "Added to Case",
          performedBy: actor,
          details: `Attached to case file ${caseId}`,
        },
      ];

      let createdEv: Evidence = {
        ...e,
        id,
        caseId,
        number: 1,
        timestamp: ts,
        status: e.status || (e.type === "audio" ? "Pending Review" : "Verified"),
        transcriptStatus: e.transcriptStatus || (e.type === "audio" ? "Not Generated" : undefined),
        mimeType: e.mimeType || (e.type === "audio" ? "audio/webm" : undefined),
        recordedAt: e.recordedAt || ts,
        recordedBy: e.recordedBy || (e.capturedBy || actor),
        custodyHistory: initialCustody,
      };

      setCases((cs) =>
        cs.map((c) => {
          if (c.id !== caseId) return c;
          const nextNumber = (c.evidence?.length || 0) + 1;
          createdEv = { ...createdEv, number: nextNumber };
          return touch(c, {
            evidence: [...(c.evidence || []), createdEv],
            auditLog: [
              ...(c.auditLog || []),
              {
                id: uid(),
                timestamp: ts,
                event: e.type === "audio" ? "Audio evidence saved" : "Evidence added",
                user: actor,
                description: `Evidence #${String(nextNumber).padStart(2, "0")} (${createdEv.fileName}) added to case record.`,
                category: "evidence",
                actorRole: currentUser?.role,
              },
            ],
            timeline: [
              ...c.timeline,
              {
                id: uid(),
                timestamp: ts,
                event: e.type === "audio" ? "Audio evidence saved" : `Evidence attached: ${createdEv.fileName}`,
                kind: createdEv.type === "photo" ? "photo" : createdEv.type === "video" ? "video" : "audio",
                evidenceRef: `Evidence #${String(nextNumber).padStart(2, "0")}`,
                description: createdEv.description,
              },
            ],
          });
        }),
      );

      pushNotification({
        type: "evidence",
        message: `New evidence "${createdEv.fileName}" attached to Case ${caseId}.`,
        caseId,
      });

      return createdEv;
    },
    [currentUser, profile.name, pushNotification],
  );

  const updateEvidence = useCallback(
    (caseId: string, evId: string, patch: Partial<Evidence>, custodyAction?: string) => {
      const ts = new Date().toISOString();
      const actor = currentUser?.displayName || profile.name;
      setCases((cs) =>
        cs.map((c) => {
          if (c.id !== caseId) return c;
          const newEvidence = c.evidence.map((ev) => {
            if (ev.id !== evId) return ev;
            const custodyEntry: EvidenceCustodyEntry | undefined = custodyAction
              ? {
                  id: uid(),
                  timestamp: ts,
                  action: custodyAction,
                  performedBy: actor,
                  ...(patch.description ? { details: "Description updated" } : {}),
                }
              : undefined;
            const updatedEv: Evidence = {
              ...ev,
              ...patch,
              ...(custodyEntry
                ? { custodyHistory: [...(ev.custodyHistory || []), custodyEntry] }
                : ev.custodyHistory !== undefined
                ? { custodyHistory: ev.custodyHistory }
                : {}),
            };
            return updatedEv;
          });
          return touch(c, {
            evidence: newEvidence,
            auditLog: [
              ...(c.auditLog || []),
              {
                id: uid(),
                timestamp: ts,
                event: "Evidence modified",
                user: actor,
                description: custodyAction || `Evidence record updated.`,
                category: "evidence",
                actorRole: currentUser?.role,
              },
            ],
          });
        }),
      );
    },
    [currentUser, profile.name],
  );

  // Complaints state & handlers
  const addComplaint = useCallback(
    (data: Omit<ComplaintRecord, "id" | "submittedAt" | "updatedAt" | "status" | "timeline">) => {
      const maxNum = Math.max(0, ...complaints.map((c) => parseInt(c.id.replace("CMP-", "") || "0", 10)));
      const id = `CMP-${String(maxNum + 1).padStart(3, "0")}`;
      const ts = new Date().toISOString();

      const newComplaint: ComplaintRecord = {
        ...data,
        id,
        submittedAt: ts,
        updatedAt: ts,
        status: "Submitted",
        timeline: [
          {
            id: uid(),
            timestamp: ts,
            event: "Complaint Submitted",
            description: `Official grievance registered by student (${data.privacyPreference} mode). Institutional officers notified.`,
          },
        ],
      };

      setComplaints((prev) => [newComplaint, ...prev]);

      // Trigger institutional notifications for Principal, AO, and Discipline Committee Head
      const { newNotifications } = notificationService.handleComplaintSubmitted(newComplaint, notifications);
      if (newNotifications.length > 0) {
        setNotifications((prev) => [...newNotifications, ...prev]);
      }

      pushStudentNotification({
        title: "Complaint Received",
        message: `Your complaint ${id} has been submitted and queued for confidential review. Authorized institutional personnel have been notified.`,
        complaintId: id,
      });

      return newComplaint;
    },
    [complaints, notifications, pushStudentNotification],
  );

  const updateComplaint = useCallback((id: string, patch: Partial<ComplaintRecord>) => {
    setComplaints((cs) => cs.map((c) => (c.id === id ? touchComplaint(c, patch) : c)));
  }, []);

  const acceptComplaint = useCallback(
    (id: string) => {
      const ts = new Date().toISOString();
      const reviewer = currentUser?.displayName || profile.name;
      setComplaints((cs) =>
        cs.map((c) => {
          if (c.id !== id) return c;
          const updates = [
            ...(c.authorizedUpdates || []),
            "Complaint has been reviewed and accepted by the Discipline Committee. Active inquiry scheduled.",
          ];
          const timeline = [
            ...c.timeline,
            {
              id: uid(),
              timestamp: ts,
              event: "Complaint Accepted for Investigation",
              description: `Reviewed and accepted by ${reviewer}.`,
            },
          ];
          return touchComplaint(c, {
            status: "Accepted",
            authorizedUpdates: updates,
            timeline,
          });
        }),
      );
      pushStudentNotification({
        title: "Complaint Accepted for Review",
        message: `Your complaint ${id} has been accepted. A formal inquiry will proceed.`,
        complaintId: id,
      });
      toast.success(`Complaint ${id} accepted for formal processing.`);
    },
    [currentUser, profile.name, pushStudentNotification],
  );

  const rejectComplaint = useCallback(
    (id: string, reason: string, remarks?: string) => {
      const ts = new Date().toISOString();
      const reviewer = currentUser?.displayName || profile.name;
      const role = currentUser?.role || "Committee Head";

      setComplaints((cs) =>
        cs.map((c) => {
          if (c.id !== id) return c;
          const updates = [
            ...(c.authorizedUpdates || []),
            `Complaint closed after preliminary review: ${reason}.${remarks ? ` ${remarks}` : ""}`,
          ];
          const timeline = [
            ...c.timeline,
            {
              id: uid(),
              timestamp: ts,
              event: "Complaint Rejected / Closed",
              description: `Reason: ${reason}. Reviewed by ${role}.`,
            },
          ];
          return touchComplaint(c, {
            status: "Rejected",
            rejectionReason: reason,
            ...(remarks ? { rejectionRemarks: remarks } : {}),
            rejectedBy: reviewer,
            rejectedAt: ts,
            reviewerRole: role,
            authorizedUpdates: updates,
            timeline,
          });
        }),
      );

      pushStudentNotification({
        title: "Your complaint has been reviewed",
        message: `Complaint ${id} was reviewed by the committee and closed: ${reason}.`,
        complaintId: id,
      });

      pushNotification({
        type: "closure",
        message: `Complaint ${id} rejected by ${reviewer}: ${reason}`,
        complaintId: id,
      });

      toast.info(`Complaint ${id} rejected: ${reason}`);
    },
    [currentUser, profile.name, pushNotification, pushStudentNotification],
  );

  const requestComplaintInfo = useCallback(
    (id: string, question: string, requestType?: string) => {
      const ts = new Date().toISOString();
      const reviewer = currentUser?.displayName || profile.name;
      const req: InfoRequest = {
        id: uid(),
        complaintId: id,
        requestedAt: ts,
        requestedBy: reviewer,
        requestType: requestType || "Clarification",
        question,
        requestText: question,
        status: "Requested",
      };
      setComplaints((cs) =>
        cs.map((c) => {
          if (c.id !== id) return c;
          const infoRequests = [...(c.infoRequests || []), req];
          const updates = [
            ...(c.authorizedUpdates || []),
            `The Discipline Committee has requested additional information (${requestType || "Clarification"}) to assist the review.`,
          ];
          const timeline = [
            ...c.timeline,
            {
              id: uid(),
              timestamp: ts,
              event: "Additional Information Requested",
              description: `Inquiry (${requestType || "Clarification"}): "${question}"`,
            },
          ];
          return touchComplaint(c, {
            status: "Additional Information Requested",
            infoRequests,
            authorizedUpdates: updates,
            timeline,
          });
        }),
      );
      pushStudentNotification({
        title: "Action Required: Additional Info Requested",
        message: `The Committee requires further details for complaint ${id}: "${question}"`,
        complaintId: id,
      });
      toast.success("Additional information request dispatched to student.");
    },
    [currentUser, profile.name, pushStudentNotification],
  );

  const respondComplaintInfo = useCallback(
    (id: string, requestId: string, response: string, responseEvidence?: ComplaintEvidence[]) => {
      const ts = new Date().toISOString();
      setComplaints((cs) =>
        cs.map((c) => {
          if (c.id !== id) return c;
          const newReqs = (c.infoRequests || []).map((req) =>
            req.id === requestId
              ? {
                  ...req,
                  response,
                  respondedAt: ts,
                  status: "Responded" as const,
                  ...(responseEvidence ? { responseEvidence } : {}),
                }
              : req,
          );
          const newEvidence = responseEvidence ? [...c.evidence, ...responseEvidence] : c.evidence;
          const updates = [
            ...(c.authorizedUpdates || []),
            "Additional information provided by student has been received.",
          ];
          const timeline = [
            ...c.timeline,
            {
              id: uid(),
              timestamp: ts,
              event: "Student Provided Information",
              description: response,
            },
          ];
          return touchComplaint(c, {
            status: "Under Review",
            infoRequests: newReqs,
            evidence: newEvidence,
            authorizedUpdates: updates,
            timeline,
          });
        }),
      );
      pushNotification({
        type: "complaint",
        message: `Student provided additional details on complaint ${id}.`,
        complaintId: id,
      });
      toast.success("Response submitted successfully.");
    },
    [pushNotification],
  );

  const convertComplaintToCase = useCallback(
    (complaintId: string, reason?: string): CaseRecord | undefined => {
      const complaint = complaints.find((c) => c.id === complaintId);
      if (!complaint) return undefined;

      const maxNum = Math.max(0, ...cases.map((c) => parseInt(c.id.replace("DSIM-", "") || "0", 10)));
      const newCaseId = `DSIM-${String(maxNum + 1).padStart(3, "0")}`;
      const ts = new Date().toISOString();
      const converter = currentUser?.displayName || profile.name;

      const primaryPerson = complaint.personsInvolved.find((p) => p.isPrimary) || complaint.personsInvolved[0];
      const otherPersons = complaint.personsInvolved.filter((p) => p !== primaryPerson);

      const convertedEvidence: Evidence[] = complaint.evidence.map((ce, idx) => ({
        id: uid(),
        number: idx + 1,
        caseId: newCaseId,
        type: ce.fileType.startsWith("image/")
          ? "photo"
          : ce.fileType.startsWith("video/")
          ? "video"
          : ce.fileType.startsWith("audio/")
          ? "audio"
          : "document",
        fileName: ce.fileName,
        fileSize: ce.fileSize,
        timestamp: ce.uploadedAt || ts,
        capturedBy: complaint.studentName,
        description: ce.description || `Submitted with complaint ${complaint.id}`,
        ...(ce.url ? { url: ce.url } : {}),
        status: "Verified",
        custodyHistory: [
          {
            id: uid(),
            timestamp: ts,
            action: "Transferred from Complaint",
            performedBy: converter,
            details: `Imported directly from student complaint ${complaint.id}`,
          },
        ],
      }));

      const newCase: CaseRecord = {
        id: newCaseId,
        caseName: complaint.title,
        description: `${complaint.description}\n\n[Location: ${complaint.location}] | [Incident Date: ${complaint.incidentDate}${complaint.incidentTime ? ` at ${complaint.incidentTime}` : ""}]\n[Confidentiality Preference: ${complaint.privacyPreference}]`,
        accusedStudent: primaryPerson?.name || "Person Reported",
        rollNumber: primaryPerson?.rollNumber || "N/A",
        department: primaryPerson?.department || complaint.studentDepartment,
        academicYear: complaint.academicYear,
        yearOfStudy: complaint.yearOfStudy,
        status: "Under Investigation",
        sourceComplaintId: complaint.id,
        involvedPersons: [
          ...(primaryPerson
            ? [
                {
                  id: uid(),
                  name: primaryPerson.name,
                  role: "Person Reported",
                  department: primaryPerson.department || complaint.studentDepartment,
                  ...(primaryPerson.rollNumber ? { rollNumber: primaryPerson.rollNumber } : {}),
                },
              ]
            : []),
          ...otherPersons.map((op) => ({
            id: uid(),
            name: op.name,
            role: "Person Involved",
            department: op.department || "Unknown",
            ...(op.rollNumber ? { rollNumber: op.rollNumber } : {}),
          })),
          ...complaint.witnesses.map((w) => ({
            id: uid(),
            name: w.name,
            role: "Witness",
            department: w.department || "Unknown",
            ...(w.rollNumber ? { rollNumber: w.rollNumber } : {}),
          })),
        ],
        evidence: convertedEvidence,
        investigationNotes: [
          {
            id: uid(),
            timestamp: ts,
            author: converter,
            content: `Case initialized from Student Complaint ${complaint.id} submitted by ${
              complaint.privacyPreference === "anonymous_to_reported"
                ? "Student (Protected Identity)"
                : complaint.studentName
            }. Initial urgency assessed as ${complaint.urgency.toUpperCase()}.${reason ? ` Conversion remarks: ${reason}` : ""}`,
          },
        ],
        auditLog: [
          {
            id: uid(),
            timestamp: ts,
            event: "Case converted from complaint",
            user: converter,
            description: `Disciplinary case created from Complaint ${complaint.id}. Originating student: ${complaint.studentRoll}`,
            category: "case",
            actorRole: currentUser?.role,
            entityType: "complaint",
            entityId: complaint.id,
          },
        ],
        timeline: [
          {
            id: uid(),
            timestamp: ts,
            event: `Case initialized from ${complaint.id}`,
            kind: "created",
            description: `Converted by ${converter}`,
          },
          {
            id: uid(),
            timestamp: ts,
            event: "Formal investigation initiated",
            kind: "start",
          },
        ],
        createdAt: ts,
        updatedAt: ts,
      };

      setCases((cs) => [newCase, ...cs]);

      setComplaints((cs) =>
        cs.map((c) => {
          if (c.id !== complaintId) return c;
          const updates = [
            ...(c.authorizedUpdates || []),
            `Complaint accepted and converted into formal inquiry case ${newCaseId}. Investigation in progress.`,
          ];
          const timeline = [
            ...c.timeline,
            {
              id: uid(),
              timestamp: ts,
              event: "Complaint converted to Case",
              description: `Formal case ${newCaseId} initialized for disciplinary proceedings.`,
            },
          ];
          return touchComplaint(c, {
            status: "Converted to Case",
            convertedCaseId: newCaseId,
            sourceCaseId: newCaseId,
            convertedAt: ts,
            convertedBy: converter,
            authorizedUpdates: updates,
            timeline,
          });
        }),
      );

      pushStudentNotification({
        title: "Complaint Converted to Formal Case",
        message: `Your complaint ${complaintId} has been converted into formal inquiry case ${newCaseId}.`,
        complaintId,
      });

      pushNotification({
        type: "investigation",
        message: `Complaint ${complaintId} converted into Case ${newCaseId}. Investigation ready.`,
        caseId: newCaseId,
      });

      toast.success(`Complaint ${complaintId} converted to Case ${newCaseId}`);
      return newCase;
    },
    [cases, complaints, currentUser, profile.name, pushNotification, pushStudentNotification],
  );

  const getStudentComplaints = useCallback(
    (studentIdOrRoll?: string) => {
      const target = studentIdOrRoll || currentUser?.studentId || studentProfile.rollNumber;
      return complaints.filter(
        (c) => c.studentId === target || c.studentRoll === target || (currentUser?.email && c.studentEmail === currentUser.email),
      );
    },
    [complaints, currentUser, studentProfile.rollNumber],
  );

  const value = useMemo<Store>(
    () => ({
      ready,
      currentUser,
      userRole: currentUser?.role || null,
      isAuthenticated: authed || studentAuthed,
      hasPermission,

      authed,
      login,
      logout,
      expireSession,

      studentAuthed,
      studentLogin,
      studentLogout,
      studentProfile,
      setStudentProfile,
      updateStudentProfile: (patch) => setStudentProfile((p) => ({ ...p, ...patch })),

      studentNotifications,
      pushStudentNotification,
      markStudentNotificationRead: (id) =>
        setStudentNotifications((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n))),
      markAllStudentNotificationsRead: () =>
        setStudentNotifications((ns) => ns.map((n) => ({ ...n, read: true }))),

      cases,
      getCase: (id) => cases.find((c) => c.id === id),
      addCase: (c) => {
        const id = `DSIM-${String(cases.length + 1).padStart(3, "0")}`;
        const ts = new Date().toISOString();
        const actor = currentUser?.displayName || profile.name;
        const newCase: CaseRecord = {
          ...c,
          id,
          timeline: [
            {
              id: uid(),
              timestamp: ts,
              event: "Case Created",
              kind: "created",
              description: `Case initiated by ${actor}`,
            },
          ],
          evidence: [],
          auditLog: [
            {
              id: uid(),
              timestamp: ts,
              event: "Case created",
              user: actor,
              description: `Initial case created: ${c.caseName}`,
              category: "case",
              actorRole: currentUser?.role,
            },
          ],
          createdAt: ts,
          updatedAt: ts,
        };
        setCases((prev) => [newCase, ...prev]);
        return newCase;
      },
      updateCase: (id, patch) => setCases((cs) => cs.map((c) => (c.id === id ? touch(c, patch) : c))),
      deleteCase: (id) => setCases((cs) => cs.filter((c) => c.id !== id)),
      closeCase,
      changeCaseStatus,
      verifySynopsis,
      assignBoardMember,
      submitBoardVote,
      addEvidence,
      updateEvidence,
      removeEvidence: (caseId, evId) => {
        const ts = new Date().toISOString();
        const actor = currentUser?.displayName || profile.name;
        setCases((cs) =>
          cs.map((x) => {
            if (x.id !== caseId) return x;
            const target = x.evidence.find((e) => e.id === evId);
            return touch(x, {
              evidence: x.evidence.filter((e) => e.id !== evId),
              auditLog: [
                ...(x.auditLog || []),
                {
                  id: uid(),
                  timestamp: ts,
                  event: "Evidence deleted",
                  user: actor,
                  description: `Evidence ${target ? `#${String(target.number).padStart(2, "0")} (${target.fileName})` : evId} removed.`,
                  category: "evidence",
                  actorRole: currentUser?.role,
                },
              ],
            });
          }),
        );
      },
      addTimeline,
      addAuditLog,
      addInvestigationNote,
      updateInvestigationNote,
      deleteInvestigationNote,
      setTranscript,
      updateTranscriptEntry,
      verifyTranscript,
      setTranscriptStatus,

      complaints,
      getComplaint: (id) => complaints.find((c) => c.id === id),
      getStudentComplaints,
      addComplaint,
      updateComplaint,
      acceptComplaint,
      rejectComplaint,
      requestComplaintInfo,
      respondComplaintInfo,
      convertComplaintToCase,

      notifications,
      pushNotification,
      markRead: (id) => {
        const ts = new Date().toISOString();
        setNotifications((ns) =>
          ns.map((n) =>
            n.id === id ? { ...n, read: true, readAt: ts, deliveryStatus: "Read" as const } : n,
          ),
        );
      },
      markAllRead: () => {
        const ts = new Date().toISOString();
        setNotifications((ns) =>
          ns.map((n) => {
            if (
              !currentUser ||
              !n.recipientRole ||
              n.recipientRole === currentUser.role ||
              n.recipientId === currentUser.id
            ) {
              return { ...n, read: true, readAt: ts, deliveryStatus: "Read" as const };
            }
            return n;
          }),
        );
      },
      profile,
      setProfile,
      settings,
      setSetting: (k, v) => setSettings((s) => ({ ...s, [k]: v })),
    }),
    [
      ready,
      currentUser,
      hasPermission,
      authed,
      login,
      logout,
      studentAuthed,
      studentLogin,
      studentLogout,
      studentProfile,
      studentNotifications,
      pushStudentNotification,
      cases,
      closeCase,
      changeCaseStatus,
      verifySynopsis,
      assignBoardMember,
      submitBoardVote,
      addEvidence,
      updateEvidence,
      addTimeline,
      addAuditLog,
      addInvestigationNote,
      updateInvestigationNote,
      deleteInvestigationNote,
      setTranscript,
      updateTranscriptEntry,
      verifyTranscript,
      setTranscriptStatus,
      complaints,
      getStudentComplaints,
      addComplaint,
      updateComplaint,
      acceptComplaint,
      rejectComplaint,
      requestComplaintInfo,
      respondComplaintInfo,
      convertComplaintToCase,
      notifications,
      pushNotification,
      profile,
      settings,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDsim() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useDsim must be used within DsimProvider");
  return s;
}

export function useAuth() {
  const {
    currentUser,
    userRole,
    isAuthenticated,
    authed,
    studentAuthed,
    login,
    logout,
    studentLogin,
    studentLogout,
    hasPermission,
  } = useDsim();

  return {
    isAuthenticated,
    user: currentUser,
    role: userRole,
    displayName: currentUser?.displayName || "",
    email: currentUser?.email || "",
    studentId: currentUser?.studentId,
    department: currentUser?.department,
    isCommittee: authed,
    isStudent: studentAuthed,
    hasPermission,
    login,
    logout,
    studentLogin,
    studentLogout,
  };
}

export const evLabel = (n: number) => `Evidence #${String(n).padStart(2, "0")}`;
