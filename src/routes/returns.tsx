import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Protected } from "@/components/dsim/Protected";
import { PageHeader, EmptyState, SecureTag } from "@/components/dsim/common";
import { MarkReturnedModal } from "@/components/dsim/MarkReturnedModal";
import { RescheduleModal } from "@/components/dsim/RescheduleModal";
import { useDsim } from "@/lib/dsim/store";
import { fmtDate } from "@/lib/dsim/format";
import { differenceInDays, parseISO, isValid } from "date-fns";
import {
  CalendarClock,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Search,
  RotateCcw,
  UserCheck,
  Bell,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CaseRecord } from "@/lib/dsim/types";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Upcoming Returns — DSIM" },
      { name: "description", content: "Schedule and clearance monitor for students returning from suspension." },
      { property: "og:title", content: "Upcoming Returns — DSIM" },
      { property: "og:description", content: "Schedule and clearance monitor for students returning from suspension." },
    ],
  }),
  component: ReturnsPage,
});

function ReturnsPage() {
  const { cases, updateCase, addTimeline } = useDsim();
  const [search, setSearch] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [selectedForReturn, setSelectedForReturn] = useState<CaseRecord | null>(null);
  const [selectedForReschedule, setSelectedForReschedule] = useState<CaseRecord | null>(null);

  const returnItems = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return cases
      .filter((c) => c.returnDate || c.status === "Returned")
      .map((c) => {
        let daysLeft = 0;
        let urgency: "today" | "due-soon" | "upcoming" | "overdue" | "returned" = "upcoming";
        let reminderMessage = "";

        if (c.status === "Returned" || c.returned) {
          urgency = "returned";
          reminderMessage = `${c.accusedStudent} has been cleared and readmitted to campus.`;
        } else if (c.returnDate) {
          try {
            const ret = parseISO(c.returnDate);
            if (isValid(ret)) {
              daysLeft = differenceInDays(ret, today);
              if (daysLeft < 0) {
                urgency = "overdue";
                reminderMessage = `${c.accusedStudent}'s return date has passed (${Math.abs(daysLeft)} days overdue). Please update the case.`;
              } else if (daysLeft === 0) {
                urgency = "today";
                reminderMessage = `${c.accusedStudent} is expected to return today. Conduct readmission briefing.`;
              } else if (daysLeft === 1) {
                urgency = "due-soon";
                reminderMessage = `${c.accusedStudent} is expected to return tomorrow.`;
              } else if (daysLeft <= 3) {
                urgency = "due-soon";
                reminderMessage = `${c.accusedStudent}'s return date is approaching in ${daysLeft} days.`;
              } else if (daysLeft <= 7) {
                urgency = "upcoming";
                reminderMessage = `${c.accusedStudent}'s suspension ends in ${daysLeft} days.`;
              } else {
                urgency = "upcoming";
                reminderMessage = `Suspension active. Scheduled return on ${c.returnDate}.`;
              }
            }
          } catch {
            daysLeft = 0;
            reminderMessage = "Return date pending calculation.";
          }
        }

        return { caseRecord: c, daysLeft, urgency, reminderMessage };
      })
      .filter(({ caseRecord: c, urgency }) => {
        if (search.trim()) {
          const q = search.toLowerCase();
          const match =
            c.accusedStudent.toLowerCase().includes(q) ||
            c.rollNumber.toLowerCase().includes(q) ||
            c.id.toLowerCase().includes(q) ||
            c.department.toLowerCase().includes(q);
          if (!match) return false;
        }

        if (urgencyFilter !== "all") {
          if (urgencyFilter === "pending") {
            if (urgency === "returned") return false;
          } else if (urgency !== urgencyFilter) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (a.urgency === "returned" && b.urgency !== "returned") return 1;
        if (b.urgency === "returned" && a.urgency !== "returned") return -1;
        return a.daysLeft - b.daysLeft;
      });
  }, [cases, search, urgencyFilter]);

  const handleMarkReturned = (caseId: string, notes: string) => {
    updateCase(caseId, {
      status: "Returned",
      returned: true,
      actualReturnDate: new Date().toISOString().slice(0, 10),
      actualReturnTime: new Date().toLocaleTimeString(),
      returnRemarks: notes,
    });
    addTimeline(caseId, {
      event: "Student reinstated / returned",
      kind: "return",
      description: notes || "Suspension period completed. Student readmitted.",
    });
  };

  const handleReschedule = (caseId: string, newDate: string, reason: string) => {
    const prevDate = cases.find((x) => x.id === caseId)?.returnDate;
    updateCase(caseId, { returnDate: newDate });
    addTimeline(caseId, {
      event: `Return date adjusted to ${newDate}`,
      kind: "decision",
      description: `Return date changed from ${prevDate || "N/A"} to ${newDate}. Reason: ${reason}`,
    });
  };

  return (
    <Protected>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Readmission Tracking"
          title="Upcoming Returns & Clearance Schedule"
          subtitle="Track suspension terms, automated countdown alerts, and clearance protocols for students returning to campus."
          actions={<SecureTag>Readmission Oversight</SecureTag>}
        />

        {/* 35.15 Advanced Return Reminders Banner */}
        <div className="surface p-4 border border-primary/20 bg-primary/5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Bell className="size-4" />
            </span>
            <div>
              <h4 className="font-semibold text-xs text-foreground">Automated Return Reminder Protocol Active</h4>
              <p className="text-[0.68rem] text-muted-foreground">
                Notifications scheduled automatically at 7-day, 3-day, 1-day, and Day-Of milestones.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-medium text-[0.68rem]">
              Today: {new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>

        {/* Filter Strip */}
        <div className="surface p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Tabs value={urgencyFilter} onValueChange={setUrgencyFilter} className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-5 w-full sm:w-auto">
              <TabsTrigger value="all" className="text-xs">All ({cases.filter((c) => c.returnDate || c.status === "Returned").length})</TabsTrigger>
              <TabsTrigger value="pending" className="text-xs">Awaiting</TabsTrigger>
              <TabsTrigger value="today" className="text-xs">Today</TabsTrigger>
              <TabsTrigger value="due-soon" className="text-xs">Due Soon</TabsTrigger>
              <TabsTrigger value="returned" className="text-xs">Returned</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Filter by name, roll #, case ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-8 text-xs bg-card"
            />
          </div>
        </div>

        {/* Returns Cards Grid */}
        {returnItems.length === 0 ? (
          <EmptyState
            icon={CalendarClock}
            title="No students match the return criteria"
            description="All suspension terms are either cleared or not scheduled in this window."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {returnItems.map(({ caseRecord: c, daysLeft, urgency, reminderMessage }) => (
              <div
                key={c.id}
                className={`surface flex flex-col justify-between p-5 space-y-4 transition-all hover:shadow-md ${
                  urgency === "today"
                    ? "border-emerald-500/50 bg-emerald-500/5 ring-1 ring-emerald-500/20"
                    : urgency === "overdue"
                    ? "border-red-500/50 bg-red-500/5 ring-1 ring-red-500/20"
                    : urgency === "due-soon"
                    ? "border-amber-500/50 bg-amber-500/5 ring-1 ring-amber-500/20"
                    : ""
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-base text-foreground">{c.accusedStudent}</h3>
                      <div className="font-mono text-xs text-muted-foreground">
                        {c.rollNumber} · {c.department}
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold ${
                        urgency === "returned"
                          ? "bg-slate-500/15 text-slate-600"
                          : urgency === "today"
                          ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 animate-pulse"
                          : urgency === "overdue"
                          ? "bg-red-500/20 text-red-700 dark:text-red-300"
                          : urgency === "due-soon"
                          ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                          : "bg-secondary text-primary"
                      }`}
                    >
                      {urgency === "returned"
                        ? "Returned"
                        : urgency === "today"
                        ? "Return Today"
                        : urgency === "overdue"
                        ? `Overdue (${Math.abs(daysLeft)}d)`
                        : `${daysLeft} days remaining`}
                    </span>
                  </div>

                  {/* Reminder message pill (35.15) */}
                  <div className="mt-2.5 rounded bg-muted/40 p-2 text-[0.68rem] text-muted-foreground flex items-center gap-1.5 border border-border/40">
                    <Clock className="size-3 text-primary shrink-0" />
                    <span className="line-clamp-2">{reminderMessage}</span>
                  </div>

                  <div className="mt-3 rounded-lg border border-border/60 bg-card p-3 text-xs space-y-1.5 font-sans">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Case Reference:</span>
                      <Link
                        to="/cases/$caseId"
                        params={{ caseId: c.id }}
                        className="font-mono font-medium text-primary hover:underline"
                      >
                        {c.id}
                      </Link>
                    </div>
                    <div className="text-muted-foreground line-clamp-1">{c.caseName}</div>
                    <div className="border-t border-border/40 pt-1.5 flex justify-between font-mono text-[0.68rem]">
                      <span className="text-muted-foreground">Term:</span>
                      <span>{c.suspensionStartDate || "—"} → {c.returnDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                  <Button asChild variant="ghost" size="sm" className="h-7 text-xs px-2">
                    <Link to="/cases/$caseId" params={{ caseId: c.id }}>
                      View Case <ArrowUpRight className="size-3.5 ml-1" />
                    </Link>
                  </Button>

                  {urgency !== "returned" ? (
                    <div className="flex gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedForReschedule(c)}
                        className="h-7 text-xs px-2"
                      >
                        Reschedule
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setSelectedForReturn(c)}
                        className="h-7 text-xs px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                      >
                        <UserCheck className="size-3" /> Mark Returned
                      </Button>
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-mono text-[0.68rem] text-emerald-600 font-semibold">
                      <CheckCircle2 className="size-3.5" /> Readmitted
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modals */}
        <MarkReturnedModal
          caseRecord={selectedForReturn}
          open={!!selectedForReturn}
          onOpenChange={(open) => !open && setSelectedForReturn(null)}
          onConfirm={handleMarkReturned}
        />

        <RescheduleModal
          caseRecord={selectedForReschedule}
          open={!!selectedForReschedule}
          onOpenChange={(open) => !open && setSelectedForReschedule(null)}
          onReschedule={handleReschedule}
        />
      </div>
    </Protected>
  );
}
