import { useState, useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Protected } from "@/components/dsim/Protected";
import { PageHeader, StatCard, SecureTag, EmptyState } from "@/components/dsim/common";
import { CaseTable } from "@/components/dsim/CaseTable";
import { StatusBadge } from "@/components/dsim/StatusBadge";
import { MarkReturnedModal } from "@/components/dsim/MarkReturnedModal";
import { RescheduleModal } from "@/components/dsim/RescheduleModal";
import { useDsim } from "@/lib/dsim/store";
import { fmtDate, fmtDateTime } from "@/lib/dsim/format";
import {
  FolderOpen,
  Radar,
  Clock,
  UserX,
  CalendarClock,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileBox,
  Sparkles,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { differenceInDays, parseISO, isValid } from "date-fns";
import type { CaseRecord } from "@/lib/dsim/types";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — DSIM" },
      { name: "description", content: "Discipline Committee Head overview and case monitor." },
      { property: "og:title", content: "Dashboard — DSIM" },
      { property: "og:description", content: "Discipline Committee Head overview and case monitor." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const { cases, complaints, updateCase, addTimeline, currentUser } = useDsim();
  const [search, setSearch] = useState("");
  const [selectedCaseForReturn, setSelectedCaseForReturn] = useState<CaseRecord | null>(null);
  const [selectedCaseForReschedule, setSelectedCaseForReschedule] = useState<CaseRecord | null>(null);

  // Dynamic time greeting
  const greeting = useMemo(() => {
    const hr = new Date().getHours();
    const roleLabel = currentUser?.role || "Committee Head";
    if (hr < 12) return `Good morning, ${roleLabel}`;
    if (hr < 17) return `Good afternoon, ${roleLabel}`;
    return `Good evening, ${roleLabel}`;
  }, [currentUser]);

  // Compute stats
  const totalCases = cases.length;
  const activeInvestigations = cases.filter((c) => c.status === "Under Investigation").length;
  const pendingDecisions = cases.filter((c) => c.status === "Decision Pending").length;
  const suspendedCount = cases.filter((c) => c.status === "Suspended" || c.status === "Awaiting Return").length;

  // Complaints metrics
  const incomingComplaintsTotal = complaints.length;
  const newComplaintsCount = complaints.filter((c) => c.status === "Submitted").length;
  const awaitingReviewCount = complaints.filter(
    (c) => c.status === "Submitted" || c.status === "Under Review",
  ).length;
  const urgentComplaints = complaints.filter(
    (c) =>
      (c.status === "Submitted" || c.status === "Under Review") &&
      (c.urgency === "immediate_safety" || c.urgency === "urgent"),
  );

  // Upcoming Returns (students suspended who have return dates)
  const upcomingReturns = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return cases
      .filter((c) => c.returnDate && (c.status === "Suspended" || c.status === "Awaiting Return"))
      .map((c) => {
        let daysLeft = 0;
        let urgency: "today" | "due-soon" | "upcoming" | "overdue" = "upcoming";
        try {
          if (c.returnDate) {
            const ret = parseISO(c.returnDate);
            if (isValid(ret)) {
              daysLeft = differenceInDays(ret, today);
              if (daysLeft < 0) urgency = "overdue";
              else if (daysLeft === 0) urgency = "today";
              else if (daysLeft <= 3) urgency = "due-soon";
              else urgency = "upcoming";
            }
          }
        } catch {
          daysLeft = 0;
        }
        return { caseRecord: c, daysLeft, urgency };
      })
      .sort((a, b) => a.daysLeft - b.daysLeft);
  }, [cases]);

  // Filtered recent cases
  const recentCases = useMemo(() => {
    let list = [...cases].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.caseName.toLowerCase().includes(q) ||
          c.accusedStudent.toLowerCase().includes(q) ||
          c.department.toLowerCase().includes(q) ||
          c.rollNumber.toLowerCase().includes(q),
      );
    }
    return list;
  }, [cases, search]);

  // Aggregate recent activity across all cases
  const recentActivities = useMemo(() => {
    const activities: {
      id: string;
      caseId: string;
      caseName: string;
      event: string;
      description?: string;
      timestamp: string;
      kind: string;
    }[] = [];

    cases.forEach((c) => {
      c.timeline.forEach((t) => {
        activities.push({
          id: t.id,
          caseId: c.id,
          caseName: c.caseName,
          event: t.event,
          ...(t.description ? { description: t.description } : {}),
          timestamp: t.timestamp,
          kind: t.kind,
        });
      });
    });

    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 6);
  }, [cases]);

  const handleMarkReturned = (caseId: string, notes: string) => {
    updateCase(caseId, {
      status: "Returned",
      returned: true,
      ...(notes ? { actionNotes: `Readmission note: ${notes}` } : {}),
    });
    addTimeline(caseId, {
      event: "Student reinstated / returned",
      kind: "decision",
      description: notes || "Suspension period completed. Student readmitted.",
    });
  };

  const handleReschedule = (caseId: string, newDate: string, reason: string) => {
    updateCase(caseId, { returnDate: newDate });
    addTimeline(caseId, {
      event: `Return date adjusted to ${newDate}`,
      kind: "decision",
      description: reason || "Extension granted by Discipline Committee.",
    });
  };

  return (
    <Protected>
      <div className="space-y-8">
        {/* Top Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="eyebrow">Executive Console</span>
              <SecureTag>Strictly Confidential</SecureTag>
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
              {greeting}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitor disciplinary investigations, evidence repositories, and upcoming sanctions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild size="default" className="gap-2 bg-primary hover:bg-primary/90 shadow-sm">
              <Link to="/cases/new">
                <Plus className="size-4" /> + Create New Case
              </Link>
            </Button>
          </div>
        </div>

        {/* 5 Key Metric Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <StatCard
            icon={FolderOpen}
            value={totalCases}
            label="Total Cases"
            context="Across all departments"
          />
          <StatCard
            icon={Radar}
            value={activeInvestigations}
            label="Active Investigations"
            context="Hearings & inquiries in progress"
            tone={activeInvestigations > 0 ? "alert" : "default"}
          />
          <StatCard
            icon={Clock}
            value={pendingDecisions}
            label="Pending Decisions"
            context="Awaiting sanction verdict"
          />
          <StatCard
            icon={UserX}
            value={suspendedCount}
            label="Suspended Students"
            context="Barred from campus"
          />
          <StatCard
            icon={CalendarClock}
            value={upcomingReturns.length}
            label="Upcoming Returns"
            context="Scheduled readmissions"
          />
        </div>

        {/* Section 19: Incoming Complaints Institutional Triage Indicator */}
        <div className="rounded-xl border border-border bg-gradient-to-r from-card via-card to-primary/[0.03] p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary">
                  <FileBox className="size-4" />
                </span>
                <h3 className="text-base font-semibold text-foreground">Incoming Complaints</h3>
                {newComplaintsCount > 0 && (
                  <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400 animate-pulse">
                    {newComplaintsCount} New
                  </span>
                )}
                {urgentComplaints.length > 0 && (
                  <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="size-3" /> {urgentComplaints.length} Urgent
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Grievances and incident reports submitted by students awaiting institutional triage and committee review.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-4 rounded-lg border border-border/80 bg-background/80 px-4 py-2 text-xs">
                <div className="text-center">
                  <span className="block font-mono text-sm font-bold text-foreground">{incomingComplaintsTotal}</span>
                  <span className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">Total</span>
                </div>
                <div className="h-6 w-px bg-border" />
                <div className="text-center">
                  <span className="block font-mono text-sm font-bold text-blue-600 dark:text-blue-400">{newComplaintsCount}</span>
                  <span className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">New</span>
                </div>
                <div className="h-6 w-px bg-border" />
                <div className="text-center">
                  <span className="block font-mono text-sm font-bold text-amber-600 dark:text-amber-400">{awaitingReviewCount}</span>
                  <span className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">Awaiting Review</span>
                </div>
              </div>

              <Button asChild size="sm" variant="default" className="gap-2 bg-primary hover:bg-primary/90 text-xs">
                <Link to="/complaints">
                  View Complaints <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Grid: Recent Cases + Upcoming Returns Widget */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left 2 Cols: Recent Cases */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">Recent Cases</h3>
                <p className="text-xs text-muted-foreground">
                  Latest active disciplinary investigations and proceedings.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  placeholder="Filter cases, roll #, name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 pl-8 text-xs bg-card"
                />
              </div>
            </div>

            <div className="surface overflow-hidden">
              <CaseTable cases={recentCases.slice(0, 5)} />
              <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-3 text-xs">
                <span className="text-muted-foreground">
                  Showing {Math.min(5, recentCases.length)} of {cases.length} cases
                </span>
                <Button asChild variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary">
                  <Link to="/cases">
                    View All Cases <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Col: Upcoming Returns Widget */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">Upcoming Returns</h3>
                <p className="text-xs text-muted-foreground">Students returning from suspension</p>
              </div>
              <Button asChild variant="ghost" size="sm" className="h-7 text-xs text-primary">
                <Link to="/returns">View All →</Link>
              </Button>
            </div>

            <div className="space-y-3">
              {upcomingReturns.length === 0 ? (
                <div className="surface p-6 text-center text-xs text-muted-foreground">
                  <CheckCircle2 className="size-6 mx-auto mb-2 text-emerald-500/60" />
                  No pending student returns in the queue.
                </div>
              ) : (
                upcomingReturns.slice(0, 3).map(({ caseRecord: c, daysLeft, urgency }) => (
                  <div
                    key={c.id}
                    className="surface p-4 space-y-3 hover:border-border/90 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-sm text-foreground">{c.accusedStudent}</div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {c.department} · {c.rollNumber}
                        </div>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold ${
                          urgency === "today"
                            ? "bg-emerald-500/15 text-emerald-600"
                            : urgency === "overdue"
                            ? "bg-red-500/15 text-red-600"
                            : urgency === "due-soon"
                            ? "bg-amber-500/15 text-amber-600"
                            : "bg-secondary text-primary"
                        }`}
                      >
                        {urgency === "today"
                          ? "Return Today"
                          : urgency === "overdue"
                          ? "Overdue"
                          : `${daysLeft} days remaining`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-2 font-mono">
                      <span>Return: {c.returnDate}</span>
                      <span className="text-[0.68rem]">{c.id}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedCaseForReturn(c)}
                        className="h-7 text-xs gap-1 hover:bg-emerald-500/10 hover:text-emerald-600"
                      >
                        <CheckCircle2 className="size-3" /> Mark Returned
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedCaseForReschedule(c)}
                        className="h-7 text-xs"
                      >
                        Reschedule
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Lower Row: Recent Investigation Activity Timeline */}
        <div className="surface p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <h3 className="text-base font-semibold text-foreground">Recent Investigation Activity</h3>
            </div>
            <span className="font-mono text-xs text-muted-foreground">Audit history trail</span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="rounded-xl border border-border/80 bg-background/50 p-3.5 text-xs space-y-1.5 transition-colors hover:bg-card"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.68rem] font-bold text-primary">
                    {act.caseId}
                  </span>
                  <span className="text-[0.68rem] text-muted-foreground">
                    {fmtDateTime(act.timestamp)}
                  </span>
                </div>
                <div className="font-semibold text-foreground">{act.event}</div>
                <p className="line-clamp-2 text-muted-foreground text-[0.72rem]">
                  {act.description || `Activity logged on ${act.caseName}`}
                </p>
                <div className="pt-1">
                  <Link
                    to="/cases/$caseId"
                    params={{ caseId: act.caseId }}
                    className="inline-flex items-center gap-1 text-[0.7rem] font-medium text-primary hover:underline"
                  >
                    Inspect Case →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modals */}
        <MarkReturnedModal
          caseRecord={selectedCaseForReturn}
          open={!!selectedCaseForReturn}
          onOpenChange={(open) => !open && setSelectedCaseForReturn(null)}
          onConfirm={handleMarkReturned}
        />

        <RescheduleModal
          caseRecord={selectedCaseForReschedule}
          open={!!selectedCaseForReschedule}
          onOpenChange={(open) => !open && setSelectedCaseForReschedule(null)}
          onReschedule={handleReschedule}
        />
      </div>
    </Protected>
  );
}
