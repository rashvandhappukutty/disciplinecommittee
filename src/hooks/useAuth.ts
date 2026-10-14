import { useDsim } from "@/lib/dsim/store";
import { isCommitteeUser, isStudent, hasPermission as checkPermission, hasAnyPermission as checkAnyPermission, canAccessCase as checkCaseAccess, canStudentAccessComplaint as checkComplaintAccess } from "@/lib/dsim/auth";
import type { Permission, UserRole, AuthUser } from "@/lib/dsim/types";

export function useAuth() {
  const store = useDsim();
  const user = store.currentUser;

  return {
    ready: store.ready,
    isAuthenticated: store.isAuthenticated,
    user,
    currentUser: user,
    role: (user?.role || null) as UserRole | null,
    userRole: (user?.role || null) as UserRole | null,
    displayName: user?.displayName || "",
    email: user?.email || "",
    studentId: user?.studentId || undefined,
    department: user?.department || undefined,
    permissions: user?.permissions || [],

    // Permissions check
    hasPermission: (permission: Permission) => checkPermission(user, permission),
    hasAnyPermission: (permissions: Permission[]) => checkAnyPermission(user, permissions),
    
    // Role identity checks (Strictly 4 staff roles + student)
    isCommittee: isCommitteeUser(user),
    isStudent: isStudent(user),
    isPrincipal: user?.role === "Principal",
    isAO: user?.role === "Administrative Officer",
    isCommitteeHead: user?.role === "Committee Head",
    isDisciplinaryBoardMember: user?.role === "Disciplinary Board Member",

    // Entity-level security checks
    canAccessCase: (caseRecord?: any) => checkCaseAccess(user, caseRecord),
    canAccessComplaint: (complaint?: any) => checkComplaintAccess(user, complaint),

    // Auth actions
    login: store.login,
    logout: store.logout,
    studentLogin: store.studentLogin,
    studentLogout: store.studentLogout,
  };
}
