import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useDsim } from "@/lib/dsim/store";
import { isCommitteeUser } from "@/lib/dsim/auth";
import type { Permission } from "@/lib/dsim/types";
import { AppLayout } from "./AppLayout";
import { PageSkeleton } from "./common";
import { UnauthorizedPage } from "./UnauthorizedPage";

interface ProtectedProps {
  children: ReactNode;
  requiredPermission?: Permission;
}

export function Protected({ children, requiredPermission }: ProtectedProps) {
  const { ready, authed, currentUser, hasPermission } = useDsim();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !authed) {
      navigate({ to: "/login" });
    }
  }, [ready, authed, navigate]);

  if (!ready || !authed) {
    return (
      <div className="min-h-screen bg-background p-8">
        <PageSkeleton />
      </div>
    );
  }

  // If authenticated but not a committee user (e.g. somehow student session reached here)
  if (currentUser && !isCommitteeUser(currentUser)) {
    return <UnauthorizedPage portal="committee" customMessage="This section is restricted to authorized Discipline Committee personnel." />;
  }

  // If specific permission required
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <AppLayout>
        <UnauthorizedPage
          portal="committee"
          customMessage={`You do not have the required permission (${requiredPermission}) to access this action or page.`}
        />
      </AppLayout>
    );
  }

  return <AppLayout>{children}</AppLayout>;
}
