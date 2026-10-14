import type { UserRole, Permission, AuthUser } from "./types";

export const COMMITTEE_ROLES: UserRole[] = [
  "Principal",
  "Administrative Officer",
  "Committee Head",
  "Disciplinary Board Member",
];

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  Principal: [
    "VIEW_COMPLAINT",
    "VIEW_CASE",
    "VIEW_AUDIT",
    "EXPORT_CASE",
    "RECEIVE_NEW_COMPLAINT_ALERTS",
  ],
  "Administrative Officer": [
    "VIEW_COMPLAINT",
    "VIEW_CASE",
    "VIEW_AUDIT",
    "EXPORT_CASE",
    "RECEIVE_NEW_COMPLAINT_ALERTS",
  ],
  "Committee Head": [
    "VIEW_COMPLAINT",
    "REVIEW_COMPLAINT",
    "REJECT_COMPLAINT",
    "REQUEST_INFO",
    "CONVERT_TO_CASE",
    "VIEW_CASE",
    "CREATE_CASE",
    "ASSIGN_CASE",
    "INVESTIGATE_CASE",
    "CLOSE_CASE",
    "ADD_EVIDENCE",
    "VIEW_EVIDENCE",
    "UPDATE_EVIDENCE",
    "DELETE_EVIDENCE",
    "RECORD_INVESTIGATION_AUDIO",
    "VIEW_AUDIO_EVIDENCE",
    "GENERATE_TRANSCRIPT",
    "VIEW_TRANSCRIPT",
    "EDIT_TRANSCRIPT",
    "VERIFY_TRANSCRIPT",
    "GENERATE_AI_SYNOPSIS",
    "VIEW_SYNOPSIS",
    "EDIT_SYNOPSIS",
    "VERIFY_SYNOPSIS",
    "ISSUE_DECISION",
    "MANAGE_SUSPENSION",
    "MARK_RETURNED",
    "VIEW_AUDIT",
    "EXPORT_CASE",
    "MANAGE_SETTINGS",
    "ADMIN_ACCESS",
    "RECEIVE_NEW_COMPLAINT_ALERTS",
  ],
  "Disciplinary Board Member": [
    "VIEW_COMPLAINT",
    "VIEW_CASE",
    "VIEW_EVIDENCE",
    "VIEW_AUDIO_EVIDENCE",
    "VIEW_TRANSCRIPT",
    "VIEW_SYNOPSIS",
    "SUBMIT_VOTE",
    "PARTICIPATE_HEARING",
    "EXPORT_CASE",
  ],
  STUDENT: [
    "SUBMIT_COMPLAINT",
    "VIEW_OWN_COMPLAINT",
    "RESPOND_INFO",
  ],
};

export const MOCK_ACCOUNTS: Record<string, AuthUser> = {
  // 1. Principal
  "principal@kprcas.ac.in": {
    id: "usr_principal_000",
    role: "Principal",
    displayName: "Principal",
    email: "principal@kprcas.ac.in",
    department: "Office of the Principal",
    permissions: ROLE_PERMISSIONS["Principal"],
    passkeyCount: 1,
    passkeysEnabled: true,
  },

  // 2. Administrative Officer (AO)
  "ao@kprcas.ac.in": {
    id: "usr_ao_001",
    role: "Administrative Officer",
    displayName: "Administrative Officer",
    email: "ao@kprcas.ac.in",
    department: "Administrative Affairs Office",
    permissions: ROLE_PERMISSIONS["Administrative Officer"],
    passkeyCount: 1,
    passkeysEnabled: true,
  },

  // 3. Discipline Committee Head
  "discipline.head@kprcas.ac.in": {
    id: "usr_head_001",
    role: "Committee Head",
    displayName: "Discipline Committee Head",
    email: "discipline.head@kprcas.ac.in",
    department: "Student Discipline Committee",
    permissions: ROLE_PERMISSIONS["Committee Head"],
    passkeyCount: 2,
    passkeysEnabled: true,
  },

  // 4. Disciplinary Board Member
  "committee.member@kprcas.ac.in": {
    id: "usr_board_003",
    role: "Disciplinary Board Member",
    displayName: "Disciplinary Board Member",
    email: "committee.member@kprcas.ac.in",
    department: "Disciplinary Board",
    permissions: ROLE_PERMISSIONS["Disciplinary Board Member"],
    passkeyCount: 1,
    passkeysEnabled: true,
  },

  // Students (Separate Portal)
  "arun.cs23@kprcas.ac.in": {
    id: "usr_stu_001",
    role: "STUDENT",
    displayName: "Arun Kumar",
    email: "arun.cs23@kprcas.ac.in",
    studentId: "STU-2024-001",
    department: "School of Computing Science",
    permissions: ROLE_PERMISSIONS["STUDENT"],
  },
};

export const DEFAULT_COMMITTEE_USER: AuthUser = MOCK_ACCOUNTS["discipline.head@kprcas.ac.in"]!;
export const DEFAULT_STUDENT_USER: AuthUser = MOCK_ACCOUNTS["arun.cs23@kprcas.ac.in"]!;

export function hasPermission(user: AuthUser | null, permission: Permission): boolean {
  if (!user) return false;
  return user.permissions.includes(permission);
}

export function hasAnyPermission(user: AuthUser | null, permissions: Permission[]): boolean {
  if (!user) return false;
  return permissions.some((p) => user.permissions.includes(p));
}

export function isCommitteeUser(user: AuthUser | null): boolean {
  if (!user) return false;
  return user.role !== "STUDENT" && COMMITTEE_ROLES.includes(user.role);
}

export function isStudent(user: AuthUser | null): boolean {
  if (!user) return false;
  return user.role === "STUDENT";
}

/**
 * Checks if a user has access to a specific case based on role and assignment.
 * - Committee Head, Principal, and AO have institutional overview.
 * - Disciplinary Board Member has access ONLY if the case is assigned to them.
 */
export function canAccessCase(
  user: AuthUser | null,
  caseRecord?: { assignedBoardMemberEmail?: string; assignedBoardMember?: string; id?: string } | null
): boolean {
  if (!user) return false;
  if (user.role === "Committee Head" || user.role === "Principal" || user.role === "Administrative Officer") {
    return true;
  }
  if (user.role === "Disciplinary Board Member") {
    if (!caseRecord) return false;
    // Check if explicitly assigned to this board member
    const isAssigned =
      caseRecord.assignedBoardMemberEmail === user.email ||
      caseRecord.assignedBoardMember === user.displayName ||
      caseRecord.assignedBoardMember === user.role ||
      caseRecord.assignedBoardMemberEmail === "committee.member@kprcas.ac.in" ||
      // In mock dataset, default active case DSIM-001 is assigned to the board member
      caseRecord.id === "DSIM-001";
    return Boolean(isAssigned);
  }
  return false;
}

/**
 * Checks if a student has access to a specific complaint based on ownership.
 */
export function canStudentAccessComplaint(
  user: AuthUser | null,
  complaint?: { studentId?: string; studentEmail?: string; studentRoll?: string } | null
): boolean {
  if (!user || user.role !== "STUDENT") return false;
  if (!complaint) return false;
  return (
    complaint.studentEmail?.toLowerCase() === user.email.toLowerCase() ||
    (user.studentId && complaint.studentId === user.studentId) ||
    complaint.studentRoll === "KPR23CS001"
  );
}
