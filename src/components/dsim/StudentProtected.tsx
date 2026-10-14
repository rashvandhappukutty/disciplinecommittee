import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useDsim } from "@/lib/dsim/store";
import { isStudent } from "@/lib/dsim/auth";
import { StudentLayout } from "./StudentLayout";
import { PageSkeleton } from "./common";
import { UnauthorizedPage } from "./UnauthorizedPage";

export function StudentProtected({ children }: { children: ReactNode }) {
  const { ready, studentAuthed, currentUser } = useDsim();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !studentAuthed) {
      navigate({ to: "/student/login" });
    }
  }, [ready, studentAuthed, navigate]);

  if (!ready || !studentAuthed) {
    return (
      <div className="min-h-screen bg-background p-8">
        <PageSkeleton />
      </div>
    );
  }

  // If user is logged in as committee staff, do not let them view student portal without student session
  if (currentUser && !isStudent(currentUser)) {
    return (
      <UnauthorizedPage
        portal="student"
        customMessage="You are currently signed in with a staff/committee account. Please sign in with an enrolled student account to access the Student Portal."
      />
    );
  }

  return <StudentLayout>{children}</StudentLayout>;
}
