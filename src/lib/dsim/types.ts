export type CaseStatus =
  | "Draft"
  | "Under Investigation"
  | "Decision Pending"
  | "Suspended"
  | "Awaiting Return"
  | "Returned"
  | "Closed";

export const ALL_STATUSES: CaseStatus[] = [
  "Draft",
  "Under Investigation",
  "Decision Pending",
  "Suspended",
  "Awaiting Return",
  "Returned",
  "Closed",
];

export type EvidenceType = "audio" | "photo" | "video" | "document";

export interface Person {
  id: string;
  name: string;
  role: string;
  department: string;
  rollNumber?: string | undefined;
}

export interface EvidenceCustodyEntry {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  details?: string | undefined;
}

export type TranscriptStatus =
  | "Not Generated"
  | "Queued"
  | "Processing"
  | "Completed"
  | "Partially Completed"
  | "Failed"
  | "Needs Review"
  | "Verified";

export type AudioRecordingStatus =
  | "recording"
  | "paused"
  | "completed"
  | "processing"
  | "failed"
  | "archived";

export interface RecordingParticipant {
  name: string;
  role: string;
  department?: string | undefined;
  rollNumber?: string | undefined;
}

export interface AudioRecording {
  id: string;
  caseId: string;
  sessionId: string;
  recordingType: "Investigation Interview" | "Hearing Statement" | "Witness Deposition" | string;
  recordedBy: string;
  recordedByRole: string;
  participants: RecordingParticipant[];
  startedAt: string;
  endedAt?: string | undefined;
  durationSeconds: number;
  mimeType: string;
  fileSize?: string | undefined;
  url?: string | undefined;
  rawBlob?: Blob | undefined;
  evidenceId?: string | undefined;
  transcriptId?: string | undefined;
  transcriptStatus?: TranscriptStatus | undefined;
  status: AudioRecordingStatus;
  audioHash?: string | undefined;
}

export interface Evidence {
  id: string;
  number: number;
  type: EvidenceType;
  fileName: string;
  fileSize?: string | undefined;
  timestamp: string;
  capturedBy?: string | undefined;
  description: string;
  caseId: string;
  durationSec?: number | undefined;
  url?: string | undefined;
  rawBlob?: Blob | undefined;
  mimeType?: string | undefined;
  recordedAt?: string | undefined;
  recordedBy?: string | undefined;
  recordedByRole?: string | undefined;
  sessionId?: string | undefined;
  recordingType?: string | undefined;
  participants?: RecordingParticipant[] | undefined;
  audioHash?: string | undefined;
  status?: "Verified" | "Pending Review" | "Archived" | undefined;
  transcriptStatus?: TranscriptStatus | undefined;
  transcriptId?: string | undefined;
  custodyHistory?: EvidenceCustodyEntry[] | undefined;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  event: string;
  description?: string | undefined;
  kind: "start" | "audio" | "photo" | "video" | "person" | "synopsis" | "decision" | "note" | "created" | "closed" | "return" | "transcript";
  evidenceRef?: string | undefined;
}

export type UserRole =
  | "Principal"
  | "Administrative Officer"
  | "Committee Head"
  | "Disciplinary Board Member"
  | "STUDENT";

export type Permission =
  | "VIEW_COMPLAINT"
  | "REVIEW_COMPLAINT"
  | "REJECT_COMPLAINT"
  | "REQUEST_INFO"
  | "CONVERT_TO_CASE"
  | "VIEW_CASE"
  | "CREATE_CASE"
  | "ASSIGN_CASE"
  | "INVESTIGATE_CASE"
  | "CLOSE_CASE"
  | "ADD_EVIDENCE"
  | "VIEW_EVIDENCE"
  | "UPDATE_EVIDENCE"
  | "DELETE_EVIDENCE"
  | "VIEW_TRANSCRIPT"
  | "VIEW_SYNOPSIS"
  | "EDIT_SYNOPSIS"
  | "VERIFY_SYNOPSIS"
  | "ISSUE_DECISION"
  | "MANAGE_SUSPENSION"
  | "MARK_RETURNED"
  | "VIEW_AUDIT"
  | "EXPORT_CASE"
  | "MANAGE_SETTINGS"
  | "ADMIN_ACCESS"
  | "SUBMIT_COMPLAINT"
  | "VIEW_OWN_COMPLAINT"
  | "RESPOND_INFO"
  | "RECORD_INVESTIGATION_AUDIO"
  | "VIEW_AUDIO_EVIDENCE"
  | "GENERATE_TRANSCRIPT"
  | "EDIT_TRANSCRIPT"
  | "VERIFY_TRANSCRIPT"
  | "GENERATE_AI_SYNOPSIS"
  | "SUBMIT_VOTE"
  | "PARTICIPATE_HEARING"
  | "RECEIVE_NEW_COMPLAINT_ALERTS";

export type PasskeyDeviceType = "platform" | "cross-platform";

export type AuthenticatorTransport = "usb" | "nfc" | "ble" | "internal" | "hybrid";

export interface RegisteredPasskey {
  id: string; // Base64URL credential ID
  name: string; // Device friendly name e.g. "Work Laptop (Windows Hello)", "iPhone Face ID"
  publicKey: string; // Base64URL encoded public key
  counter: number;
  transports?: AuthenticatorTransport[] | undefined;
  aaguid?: string | undefined;
  createdAt: string;
  lastUsedAt?: string | undefined;
  backedUp?: boolean | undefined;
  deviceType: PasskeyDeviceType;
}

export interface TwoFactorSetupData {
  secret: string;
  qrCodeUri: string;
  manualSetupKey: string;
  recoveryCodes: string[];
  expiresAt: string;
}

export interface AuthUser {
  id: string;
  role: UserRole;
  displayName: string;
  email: string;
  studentId?: string | undefined;
  department?: string | undefined;
  permissions: Permission[];
  passkeyCount?: number | undefined;
  passkeysEnabled?: boolean | undefined;
  twoFactorEnabled?: boolean | undefined;
  twoFactorRequired?: boolean | undefined;
  authMethod?: "passkey" | "password_fallback" | "student_session" | undefined;
  sessionId?: string | undefined;
}

export type AISynopsisStatus =
  | "AI Generated"
  | "Under Review"
  | "Reviewed by Committee"
  | "Processing"
  | "Partially Processed"
  | "Completed"
  | "Failed"
  | "Requires Review";

export interface AISynopsis {
  status: AISynopsisStatus;
  content: string;
  generatedAt: string;
  generatedBy?: string | undefined;
  reviewed: boolean;
  reviewedBy?: string | undefined;
  reviewedAt?: string | undefined;
  verifiedBy?: string | undefined;
  verifiedAt?: string | undefined;
  confidenceScore?: number | undefined;
  failureReason?: string | undefined;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  event: string;
  user: string;
  description: string;
  category?: "case" | "investigation" | "evidence" | "synopsis" | "decision" | "suspension" | "closure" | "complaint" | undefined;
  actorId?: string | undefined;
  actorRole?: string | undefined;
  action?: string | undefined;
  entityType?: string | undefined;
  entityId?: string | undefined;
}

export interface TranscriptEntry {
  id: string;
  timestamp: string;
  timeOffsetSec?: number | undefined;
  endTimeSec?: number | undefined;
  speaker: "Investigator" | "Student" | "Witness" | "Invigilator" | "Committee Member" | "Speaker 1" | "Speaker 2" | "Unknown Speaker" | string;
  speakerName?: string | undefined;
  text: string;
  originalText?: string | undefined;
  isEdited?: boolean | undefined;
  notes?: string | undefined;
  flaggedUnclear?: boolean | undefined;
  confidence?: number | undefined;
  reviewed?: boolean | undefined;
  reviewedBy?: string | undefined;
  reviewedAt?: string | undefined;
  audioEvidenceId?: string | undefined;
}

export interface InvestigationNote {
  id: string;
  timestamp: string;
  author: string;
  content: string;
  updatedAt?: string | undefined;
}

export type ActionType = "No Action" | "Warning" | "Suspension" | "Other";

export interface ClosureInfo {
  closedAt: string;
  closedBy: string;
  finalDecision: "No Further Action" | "Warning Issued" | "Suspension Completed" | "Other";
  finalRemarks: string;
  outcome: string;
}

export type VoteChoice = "Agree" | "Disagree" | "Abstain";

export interface BoardVote {
  id: string;
  voter: string;
  voterEmail: string;
  role: "Disciplinary Board Member" | string;
  vote: VoteChoice;
  timestamp: string;
  remarks?: string | undefined;
}

export interface CaseClosureChecklist {
  investigationCompleted: boolean;
  evidenceReviewed: boolean;
  transcriptVerified: boolean;
  aiSynopsisReviewed: boolean;
  decisionFinalized: boolean;
  studentNotified: boolean;
  suspensionHandled: boolean;
  documentsGenerated: boolean;
}

export interface CaseRecord {
  id: string;
  caseName: string;
  description: string;
  accusedStudent: string;
  rollNumber: string;
  department: string;
  academicYear: string;
  yearOfStudy: string;
  involvedPersons: Person[];
  status: CaseStatus;
  investigationStart?: string | undefined;
  investigationEnd?: string | undefined;
  evidence: Evidence[];
  synopsis?: string | undefined;
  aiSynopsis?: AISynopsis | undefined;
  notes?: string | undefined;
  investigationNotes?: InvestigationNote[] | undefined;
  transcript?: TranscriptEntry[] | undefined;
  transcriptStatus?: TranscriptStatus | undefined;
  transcriptAudioEvidenceId?: string | undefined;
  auditLog: AuditLogEntry[];
  assignedBoardMember?: string | undefined;
  assignedBoardMemberEmail?: string | undefined;
  assignedBy?: string | undefined;
  assignedAt?: string | undefined;
  boardVotes?: BoardVote[] | undefined;
  closureChecklist?: CaseClosureChecklist | undefined;
  disciplinaryAction?: ActionType | undefined;
  actionReason?: string | undefined;
  actionNotes?: string | undefined;
  committeeRemarks?: string | undefined;
  finalDecisionNotes?: string | undefined;
  decisionDate?: string | undefined;
  suspensionStartDate?: string | undefined;
  returnDate?: string | undefined;
  returned?: boolean | undefined;
  actualReturnDate?: string | undefined;
  actualReturnTime?: string | undefined;
  returnRemarks?: string | undefined;
  closureInfo?: ClosureInfo | undefined;
  sourceComplaintId?: string | undefined;
  timeline: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export type NotificationPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";
export type NotificationDeliveryStatus = "Pending" | "Sent" | "Delivered" | "Read" | "Failed";

export interface AppNotification {
  id: string;
  recipientId?: string | undefined;
  recipientRole?: UserRole | string | undefined;
  notificationKey?: string | undefined; // De-duplication key e.g. "NEW_COMPLAINT_SUBMITTED:CMP-2026-00124:PRINCIPAL"
  type: "return" | "synopsis" | "evidence" | "investigation" | "closure" | "decision" | "complaint" | "NEW_COMPLAINT_SUBMITTED";
  title?: string | undefined;
  message: string;
  complaintId?: string | undefined;
  caseId?: string | undefined;
  category?: ComplaintCategory | string | undefined;
  priority?: NotificationPriority | undefined;
  urgency?: UrgencyLevel | undefined;
  actionUrl?: string | undefined;
  deliveryStatus?: NotificationDeliveryStatus | undefined;
  timestamp: string;
  createdAt?: string | undefined;
  read: boolean;
  readAt?: string | undefined;
}

// ==================== SECTION 36: STUDENT PORTAL & COMPLAINT TYPES ====================

export type ComplaintStatus =
  | "Submitted"
  | "Under Review"
  | "Additional Information Requested"
  | "Accepted"
  | "Rejected"
  | "Investigation in Progress"
  | "Decision Made"
  | "Resolved"
  | "Closed"
  | "Converted to Case";

export const ALL_COMPLAINT_STATUSES: ComplaintStatus[] = [
  "Submitted",
  "Under Review",
  "Additional Information Requested",
  "Accepted",
  "Rejected",
  "Investigation in Progress",
  "Decision Made",
  "Resolved",
  "Closed",
  "Converted to Case",
];

export type ComplaintCategory =
  | "Academic Misconduct"
  | "Harassment"
  | "Bullying"
  | "Ragging"
  | "Student Misconduct"
  | "Property Damage"
  | "Substance-related Incident"
  | "Unauthorized Activity"
  | "Hostel-related Incident"
  | "Campus Safety"
  | "Cyber / Digital Misconduct"
  | "Academic Issue"
  | "Hostel Issue"
  | "Laboratory Incident"
  | "Misconduct"
  | "Other";

export const COMPLAINT_CATEGORIES: ComplaintCategory[] = [
  "Academic Misconduct",
  "Harassment",
  "Bullying",
  "Ragging",
  "Student Misconduct",
  "Property Damage",
  "Substance-related Incident",
  "Unauthorized Activity",
  "Hostel-related Incident",
  "Campus Safety",
  "Cyber / Digital Misconduct",
  "Other",
];

export type PrivacyPreference = "identify" | "confidential" | "anonymous_to_reported";
export type UrgencyLevel = "normal" | "urgent" | "immediate_safety";

export interface ComplaintEvidence {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  url?: string | undefined;
  description?: string | undefined;
  uploadedAt: string;
}

export interface InvolvedSubject {
  id: string;
  name: string;
  rollNumber?: string | undefined;
  department?: string | undefined;
  relationship: "Student" | "Faculty" | "Staff" | "Other";
  isPrimary?: boolean | undefined;
  details?: string | undefined;
  unknownDetails?: boolean | undefined;
}

export interface WitnessItem {
  id: string;
  name: string;
  rollNumber?: string | undefined;
  department?: string | undefined;
  relationship?: string | undefined;
  contactInfo?: string | undefined;
  description?: string | undefined;
  unknownDetails?: boolean | undefined;
}

export const REJECTION_REASONS = [
  "Insufficient Information",
  "Outside Committee Jurisdiction",
  "Duplicate Complaint",
  "No Action Required",
  "False / Unsupported Report",
  "Withdrawn by Complainant",
  "Other",
] as const;

export type RejectionReasonType = typeof REJECTION_REASONS[number];

export const INFO_REQUEST_TYPES = [
  "Additional description",
  "Additional evidence",
  "Clarification",
  "Witness information",
  "Date/time clarification",
  "Location clarification",
  "Other",
] as const;

export type InfoRequestType = typeof INFO_REQUEST_TYPES[number];

export interface InfoRequest {
  id: string;
  complaintId?: string | undefined;
  requestedAt: string;
  requestedBy: string;
  requestType?: InfoRequestType | string | undefined;
  question: string;
  requestText?: string | undefined;
  response?: string | undefined;
  respondedAt?: string | undefined;
  responseEvidence?: ComplaintEvidence[] | undefined;
  status?: "Requested" | "Responded" | "Reviewed" | "Resolved" | undefined;
}

export interface ComplaintRecord {
  id: string; // e.g. CMP-001
  studentId: string;
  studentName: string;
  studentRoll: string;
  studentEmail: string;
  studentDepartment: string;
  academicYear: string;
  yearOfStudy: string;
  title: string;
  category: ComplaintCategory;
  incidentDate: string;
  incidentTime?: string | undefined;
  location: string;
  description: string;
  personsInvolved: InvolvedSubject[];
  hasWitnesses: "yes" | "no" | "not_sure";
  witnesses: WitnessItem[];
  evidence: ComplaintEvidence[];
  privacyPreference: PrivacyPreference;
  urgency: UrgencyLevel;
  status: ComplaintStatus;
  submittedAt: string;
  updatedAt: string;
  convertedCaseId?: string | undefined;
  sourceCaseId?: string | undefined;
  convertedAt?: string | undefined;
  convertedBy?: string | undefined;
  rejectionReason?: RejectionReasonType | string | undefined;
  rejectionRemarks?: string | undefined;
  rejectedBy?: string | undefined;
  rejectedAt?: string | undefined;
  reviewerRole?: string | undefined;
  authorizedUpdates?: string[] | undefined;
  infoRequests?: InfoRequest[] | undefined;
  timeline: { id: string; timestamp: string; event: string; description?: string | undefined }[];
}

export interface StudentProfile {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  department: string;
  academicYear: string;
  yearOfStudy: string;
  phone: string;
  photoUrl?: string | undefined;
  notificationPreferences?: {
    emailUpdates: boolean;
    smsAlerts: boolean;
    hearingReminders: boolean;
  } | undefined;
}

export interface StudentNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  complaintId?: string | undefined;
}


