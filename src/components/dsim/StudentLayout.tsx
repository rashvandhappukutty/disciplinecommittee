import { useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  FilePlus,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  User,
  HelpCircle,
  PhoneCall,
  ExternalLink,
  ChevronDown,
  Shield,
  LifeBuoy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDsim } from "@/lib/dsim/store";
import { cn } from "@/lib/utils";
import { Avatar, ConfirmDialog } from "./common";
import { StudentNotificationDropdown } from "./StudentNotificationDropdown";
import { INSTITUTION } from "@/lib/dsim/institution";

const studentNav = [
  { to: "/student/dashboard", label: "My Complaints", icon: LayoutDashboard },
  { to: "/student/complaints/new", label: "Raise a Complaint", icon: FilePlus, highlight: true },
  { to: "/student/profile", label: "Student Profile", icon: User },
] as const;

export function StudentLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [showHelpline, setShowHelpline] = useState(false);
  const { studentLogout, studentProfile } = useDsim();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const doLogout = () => {
    studentLogout();
    navigate({ to: "/student/login" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20">
      {/* Top Reassurance & Emergency Bar */}
      <div className="bg-primary/10 text-primary px-4 py-1.5 text-xs font-medium border-b border-primary/20 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-4xl mx-auto w-full">
          <Shield className="size-3.5 shrink-0 text-primary" />
          <span className="truncate">
            Confidential Reporting Portal · All complaints are securely reviewed in accordance with college policy.
          </span>
          <button
            onClick={() => setShowHelpline(true)}
            className="ml-auto underline text-xs font-semibold shrink-0 hover:text-primary/80 flex items-center gap-1"
          >
            <PhoneCall className="size-3" /> Campus Safety Helpline
          </button>
        </div>
      </div>

      {/* Main Student Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </Button>

            <Link to="/student/dashboard" className="flex items-center gap-3">
              <img
                src="/kpr-logo.svg.png"
                alt="KPR College of Arts Science and Research"
                className="h-10 sm:h-12 w-auto object-contain brightness-0 invert"
              />
              <div className="hidden sm:block border-l border-border pl-3">
                <div className="text-xs font-bold tracking-tight text-foreground flex items-center gap-1.5">
                  DSIM <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[0.65rem] font-semibold text-primary">Student Portal</span>
                </div>
                <div className="text-[0.68rem] text-muted-foreground">Discipline Support & Grievance Reporting</div>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {studentNav.map((n) => {
              const active = path === n.to || (n.to !== "/student/dashboard" && path.startsWith(n.to));
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : ('highlight' in n && n.highlight)
                      ? "border border-primary/30 text-primary bg-primary/5 hover:bg-primary/10"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <n.icon className="size-3.5" />
                  {n.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <StudentNotificationDropdown />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 rounded-lg border border-border p-1.5 hover:bg-muted transition-colors text-left"
                  aria-label="Student Account menu"
                >
                  <Avatar name={studentProfile.name} size="sm" tone="ink" />
                  <div className="hidden lg:block text-left pr-1">
                    <div className="text-xs font-medium text-foreground truncate max-w-[120px]">{studentProfile.name}</div>
                    <div className="text-[0.65rem] text-muted-foreground font-mono">{studentProfile.rollNumber}</div>
                  </div>
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="text-xs font-bold text-foreground">{studentProfile.name}</div>
                  <div className="text-[0.7rem] font-mono text-muted-foreground">{studentProfile.rollNumber} · {studentProfile.department}</div>
                  <div className="text-[0.7rem] text-muted-foreground truncate">{studentProfile.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate({ to: "/student/dashboard" })}>
                  <LayoutDashboard className="size-3.5 mr-2" /> My Complaints
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate({ to: "/student/complaints/new" })}>
                  <FilePlus className="size-3.5 mr-2" /> Raise Complaint
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate({ to: "/student/profile" })}>
                  <User className="size-3.5 mr-2" /> Profile & Security
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setShowHelpline(true)}>
                  <LifeBuoy className="size-3.5 mr-2 text-primary" /> Safety Help & Guidelines
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setConfirmLogout(true)} className="text-destructive focus:text-destructive">
                  <LogOut className="size-3.5 mr-2" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0 flex flex-col justify-between">
          <SheetTitle className="sr-only">Student Portal Navigation</SheetTitle>
          <div>
            <div className="p-4 border-b border-border bg-card">
              <img
                src="/kpr-logo.svg.png"
                alt="KPR College of Arts Science and Research"
                className="h-10 w-auto object-contain brightness-0 invert mb-2"
              />
              <div className="text-xs font-semibold text-foreground">Student Complaint Portal</div>
              <div className="text-[0.7rem] text-muted-foreground">{studentProfile.name} ({studentProfile.rollNumber})</div>
            </div>
            <nav className="p-3 space-y-1">
              {studentNav.map((n) => {
                const active = path === n.to || (n.to !== "/student/dashboard" && path.startsWith(n.to));
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <n.icon className="size-4" />
                    {n.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-border bg-muted/40 space-y-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                setShowHelpline(true);
              }}
              className="flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-muted"
            >
              <PhoneCall className="size-3.5 text-primary" /> Campus Safety Hotline
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                setConfirmLogout(true);
              }}
              className="flex w-full items-center gap-2 rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10"
            >
              <LogOut className="size-3.5" /> Sign out
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Student Portal Footer */}
      <footer className="border-t border-border bg-card/60 py-6 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-[0.75rem] text-left">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <ShieldCheck className="size-4 text-emerald-500" />
              <span>{INSTITUTION.name}</span>
            </div>
            <span className="hidden sm:inline text-muted-foreground">·</span>
            <span className="text-muted-foreground">{INSTITUTION.systemName} — {INSTITUTION.systemFullName}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[0.72rem]">
            <span>{INSTITUTION.city}, {INSTITUTION.state}</span>
            <span>·</span>
            <a
              href={INSTITUTION.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-primary flex items-center gap-1"
            >
              Official Website <ExternalLink className="size-3" />
            </a>
            <span>·</span>
            <button onClick={() => setShowHelpline(true)} className="hover:underline text-primary">
              Safety Helplines
            </button>
          </div>
        </div>
      </footer>

      {/* Safety / Hotline Dialog */}
      <ConfirmDialog
        open={showHelpline}
        onOpenChange={setShowHelpline}
        title="Campus Safety & Immediate Assistance"
        description={
          "If you are currently experiencing immediate danger, threat, physical assault, or active harassment, please reach out to emergency services directly:"
        }
        confirmLabel="Understood"
        onConfirm={() => setShowHelpline(false)}
      >
        <div className="my-3 space-y-2 text-xs border rounded-lg p-3 bg-muted/30">
          <div className="flex justify-between items-center py-1 border-b border-border/60">
            <span className="font-semibold text-foreground">Campus Reception / General:</span>
            <span className="font-mono text-primary font-bold">{INSTITUTION.phone}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/60">
            <span className="font-semibold text-foreground">Admission Office:</span>
            <span className="font-mono text-primary font-bold">{INSTITUTION.admissionPhone}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/60">
            <span className="font-semibold text-foreground">Anti-Ragging Toll Free 24/7:</span>
            <span className="font-mono text-primary font-bold">{INSTITUTION.antiRaggingPhone}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/60">
            <span className="font-semibold text-foreground">Hostel Warden On-Duty:</span>
            <span className="font-mono text-primary font-bold">{INSTITUTION.wardenPhone}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="font-semibold text-foreground">Official Inquiries:</span>
            <span className="font-mono text-primary font-bold">{INSTITUTION.email}</span>
          </div>
        </div>
      </ConfirmDialog>

      {/* Logout Confirmation */}
      <ConfirmDialog
        open={confirmLogout}
        onOpenChange={setConfirmLogout}
        title="Sign out of Student Portal?"
        description="Your complaint drafts and submitted reports will remain saved safely on the secure server."
        confirmLabel="Sign out"
        onConfirm={doLogout}
      />
    </div>
  );
}
