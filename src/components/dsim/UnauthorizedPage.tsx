import { useNavigate } from "@tanstack/react-router";
import { ShieldAlert, ArrowLeft, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDsim } from "@/lib/dsim/store";

interface UnauthorizedPageProps {
  portal?: "committee" | "student";
  customMessage?: string;
}

export function UnauthorizedPage({
  portal = "committee",
  customMessage = "You do not have permission to access this resource.",
}: UnauthorizedPageProps) {
  const navigate = useNavigate();
  const { logout, studentLogout, currentUser } = useDsim();

  const handleDashboard = () => {
    if (portal === "student" || currentUser?.role === "STUDENT") {
      navigate({ to: "/student/dashboard" });
    } else {
      navigate({ to: "/dashboard" });
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      handleDashboard();
    }
  };

  const handleSignOut = () => {
    if (portal === "student" || currentUser?.role === "STUDENT") {
      studentLogout();
    } else {
      logout();
    }
  };

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-destructive/10 text-destructive ring-8 ring-destructive/5">
          <ShieldAlert className="size-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-destructive/20 bg-destructive/5 px-2.5 py-0.5 text-xs font-semibold text-destructive">
            <span>403</span>
            <span>•</span>
            <span>Access Restricted</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Access Restricted
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {customMessage}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 text-left shadow-xs">
          <div className="text-xs font-medium text-foreground">Security & Governance Note</div>
          <p className="mt-1 text-[0.75rem] text-muted-foreground leading-relaxed">
            DSIM enforces institutional role-based access control. If you believe you should have access to this resource, contact the Discipline Committee Secretariat or Institutional Administrator.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="gap-1.5 text-xs"
          >
            <ArrowLeft className="size-3.5" /> Return to Previous Page
          </Button>

          <Button
            size="sm"
            onClick={handleDashboard}
            className="gap-1.5 text-xs"
          >
            <LayoutDashboard className="size-3.5" /> Go to Dashboard
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="gap-1.5 text-xs text-muted-foreground hover:text-destructive"
          >
            <LogOut className="size-3.5" /> Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
