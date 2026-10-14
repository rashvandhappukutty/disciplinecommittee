import { useState, useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { StudentProtected } from "@/components/dsim/StudentProtected";
import { useDsim } from "@/lib/dsim/store";
import { fmtDate, fmtDateTime } from "@/lib/dsim/format";
import {
  FilePlus,
  Inbox,
  Clock,
  Radar,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Search,
  Filter,
  FileText,
  AlertCircle,
  HelpCircle,
  Eye,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ComplaintRecord, ComplaintStatus } from "@/lib/dsim/types";

export const Route = createFileRoute("/student/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — DSIM" },
      { name: "description", content: "Submit and track disciplinary complaints securely." },
      { property: "og:title", content: "Student Dashboard — DSIM" },
      { property: "og:description", content: "Submit and track disciplinary complaints securely." },
    ],
  }),
  component: StudentDashboardRoute,
});

function StudentDashboardRoute() {
  return (
    <StudentProtected>
      <StudentDashboardPage />
    </StudentProtected>
  );
}

function StudentDashboardPage() {
  const { studentProfile, complaints } = useDsim();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter complaints belonging to the current student (or all student complaints in this portal session)
  const myComplaints = useMemo(() => {
    return complaints.filter((c) => {
      // Matches student roll number or ID or is demo user
      const isMine =
        c.studentRoll.toLowerCase() === studentProfile.rollNumber.toLowerCase() ||
        c.studentId === studentProfile.id ||
        c.studentEmail.toLowerCase() === studentProfile.email.toLowerCase();

      if (!isMine) return false;

      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesQuery =
          c.id.toLowerCase().includes(query) ||
          c.title.toLowerCase().includes(query) ||
          c.category.toLowerCase().includes(query) ||
          c.location.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      if (statusFilter !== "all") {
        if (statusFilter === "under_review") {
          return c.status === "Submitted" || c.status === "Under Review" || c.status === "Additional Information Requested";
        }
        if (statusFilter === "investigation") {
          return c.status === "Accepted" || c.status === "Investigation in Progress" || c.status === "Converted to Case";
        }
        if (statusFilter === "resolved") {
          return c.status === "Resolved" || c.status === "Closed" || c.status === "Decision Made" || c.status === "Rejected";
        }
      }

      return true;
    });
  }, [complaints, studentProfile, search, statusFilter]);

  // Statistics
  const totalCount = complaints.filter(
    (c) =>
      c.studentRoll.toLowerCase() === studentProfile.rollNumber.toLowerCase() ||
      c.studentId === studentProfile.id,
  ).length;

  const underReviewCount = complaints.filter(
    (c) =>
      (c.studentRoll.toLowerCase() === studentProfile.rollNumber.toLowerCase() || c.studentId === studentProfile.id) &&
      (c.status === "Submitted" || c.status === "Under Review" || c.status === "Additional Information Requested"),
  ).length;

  const investigationCount = complaints.filter(
    (c) =>
      (c.studentRoll.toLowerCase() === studentProfile.rollNumber.toLowerCase() || c.studentId === studentProfile.id) &&
      (c.status === "Accepted" || c.status === "Investigation in Progress" || c.status === "Converted to Case"),
  ).length;

  const resolvedCount = complaints.filter(
    (c) =>
      (c.studentRoll.toLowerCase() === studentProfile.rollNumber.toLowerCase() || c.studentId === studentProfile.id) &&
      (c.status === "Resolved" || c.status === "Closed" || c.status === "Decision Made" || c.status === "Rejected"),
  ).length;

  const needsActionCount = complaints.filter(
    (c) =>
      (c.studentRoll.toLowerCase() === studentProfile.rollNumber.toLowerCase() || c.studentId === studentProfile.id) &&
      c.status === "Additional Information Requested",
  ).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome, {studentProfile.name}
            </h1>
            <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground">
              {studentProfile.rollNumber}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Submit and track your disciplinary complaints securely.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate({ to: "/student/complaints/new" })}
            className="bg-primary hover:bg-primary/90 text-xs font-semibold gap-2 shadow-sm"
          >
            <FilePlus className="size-4" />
            + Raise a Complaint
          </Button>
        </div>
      </div>

      {/* Action Required Alert Banner if committee requested info */}
      {needsActionCount > 0 && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-amber-900 dark:text-amber-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <ShieldAlert className="size-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Action Required: Additional Information Requested ({needsActionCount})
                </h4>
                <p className="mt-1 text-xs text-muted-foreground text-amber-800 dark:text-amber-300">
                  The Discipline Committee has requested additional details regarding your active complaint.
                  Please provide the required clarification so the review can continue.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStatusFilter("under_review")}
              className="shrink-0 border-amber-500/40 text-xs font-semibold hover:bg-amber-500/20"
            >
              Review Requests
            </Button>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
        <div className="rounded-xl border border-border bg-card p-4 transition-all hover:border-border/80 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Total Complaints</span>
            <Inbox className="size-4 text-primary" />
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">{totalCount}</div>
          <div className="mt-1 text-[0.7rem] text-muted-foreground">Submitted by your account</div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 transition-all hover:border-border/80 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Under Review</span>
            <Clock className="size-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400">
            {underReviewCount}
          </div>
          <div className="mt-1 text-[0.7rem] text-muted-foreground">Awaiting committee assessment</div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 transition-all hover:border-border/80 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">In Progress</span>
            <Radar className="size-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
            {investigationCount}
          </div>
          <div className="mt-1 text-[0.7rem] text-muted-foreground">Active inquiry / hearing</div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 transition-all hover:border-border/80 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Resolved</span>
            <CheckCircle2 className="size-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
            {resolvedCount}
          </div>
          <div className="mt-1 text-[0.7rem] text-muted-foreground">Concluded & closed</div>
        </div>
      </div>

      {/* Main Complaints List */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        {/* Table Filters & Search */}
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground">My Complaints</h3>
            <p className="text-[0.72rem] text-muted-foreground">
              Official records of your submitted reports and their real-time investigation stages.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[200px] max-w-xs">
              <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Search complaints..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 pl-8 text-xs bg-background"
              />
            </div>

            <div className="flex items-center rounded-lg border border-border bg-background p-0.5 text-xs">
              <button
                onClick={() => setStatusFilter("all")}
                className={cn(
                  "rounded-md px-2.5 py-1 transition-colors",
                  statusFilter === "all" ? "bg-muted text-foreground font-semibold" : "text-muted-foreground hover:text-foreground",
                )}
              >
                All ({totalCount})
              </button>
              <button
                onClick={() => setStatusFilter("under_review")}
                className={cn(
                  "rounded-md px-2.5 py-1 transition-colors",
                  statusFilter === "under_review" ? "bg-muted text-foreground font-semibold" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Under Review ({underReviewCount})
              </button>
              <button
                onClick={() => setStatusFilter("investigation")}
                className={cn(
                  "rounded-md px-2.5 py-1 transition-colors",
                  statusFilter === "investigation" ? "bg-muted text-foreground font-semibold" : "text-muted-foreground hover:text-foreground",
                )}
              >
                In Progress ({investigationCount})
              </button>
              <button
                onClick={() => setStatusFilter("resolved")}
                className={cn(
                  "rounded-md px-2.5 py-1 transition-colors",
                  statusFilter === "resolved" ? "bg-muted text-foreground font-semibold" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Resolved ({resolvedCount})
              </button>
            </div>
          </div>
        </div>

        {/* Complaints Content */}
        {myComplaints.length === 0 ? (
          <div className="py-16 text-center px-4">
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-muted text-muted-foreground mb-3">
              <Inbox className="size-6" />
            </div>
            <h4 className="text-sm font-semibold text-foreground">No complaints found</h4>
            <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
              {search || statusFilter !== "all"
                ? "No complaints match your current search or filter."
                : "If you need to report a disciplinary concern, you can securely submit a complaint to the Discipline Committee."}
            </p>
            <div className="mt-5">
              <Button
                onClick={() => navigate({ to: "/student/complaints/new" })}
                className="text-xs bg-primary hover:bg-primary/90"
              >
                <FilePlus className="size-3.5 mr-1.5" /> Raise a Complaint
              </Button>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/40 text-[0.7rem] uppercase tracking-wider text-muted-foreground font-semibold border-b border-border">
                  <tr>
                    <th className="py-3 px-4">Complaint ID</th>
                    <th className="py-3 px-4">Subject / Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Submitted Date</th>
                    <th className="py-3 px-4">Current Status</th>
                    <th className="py-3 px-4">Last Updated</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {myComplaints.map((c) => {
                    const hasActionNeeded = c.status === "Additional Information Requested";
                    return (
                      <tr
                        key={c.id}
                        className={cn(
                          "transition-colors hover:bg-muted/50 cursor-pointer",
                          hasActionNeeded && "bg-amber-500/5",
                        )}
                        onClick={() => navigate({ to: "/student/complaints/$complaintId", params: { complaintId: c.id } })}
                      >
                        <td className="py-3.5 px-4 font-mono font-bold text-foreground">
                          {c.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-foreground truncate max-w-xs">{c.title}</div>
                          <div className="text-[0.7rem] text-muted-foreground truncate max-w-xs">{c.location}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="rounded bg-secondary px-2 py-0.5 text-[0.7rem] font-medium text-secondary-foreground">
                            {c.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-muted-foreground">
                          {fmtDate(c.submittedAt)}
                        </td>
                        <td className="py-3.5 px-4">
                          <ComplaintStatusBadge status={c.status} />
                        </td>
                        <td className="py-3.5 px-4 text-[0.7rem] text-muted-foreground">
                          {fmtDate(c.updatedAt)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-primary hover:text-primary hover:bg-primary/10 gap-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate({ to: "/student/complaints/$complaintId", params: { complaintId: c.id } });
                            }}
                          >
                            <span>View</span>
                            <ChevronRight className="size-3.5" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-border/60">
              {myComplaints.map((c) => (
                <div
                  key={c.id}
                  onClick={() => navigate({ to: "/student/complaints/$complaintId", params: { complaintId: c.id } })}
                  className="p-4 space-y-2.5 transition-colors hover:bg-muted/40 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-foreground">{c.id}</span>
                    <ComplaintStatusBadge status={c.status} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{c.title}</h4>
                    <p className="text-[0.72rem] text-muted-foreground line-clamp-1">{c.description}</p>
                  </div>
                  <div className="flex items-center justify-between text-[0.7rem] text-muted-foreground pt-1">
                    <span className="rounded bg-secondary px-1.5 py-0.5">{c.category}</span>
                    <span>Submitted {fmtDate(c.submittedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Helpful Guidelines & Assurance Box */}
      <div className="rounded-xl border border-border bg-gradient-to-r from-primary/5 via-card to-card p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <ShieldCheck className="size-4 text-emerald-500" />
              <span>Student Protection & Non-Retaliation Policy</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-2xl">
              KPR College guarantees that no student filing a good-faith disciplinary complaint will face academic
              or administrative retaliation. Your submissions are handled under strict confidentiality protocols.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate({ to: "/student/profile" })}
            className="text-xs shrink-0"
          >
            Review Privacy Settings
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ComplaintStatusBadge({ status }: { status: ComplaintStatus }) {
  const styles: Record<ComplaintStatus, { bg: string; text: string; dot: string }> = {
    Submitted: {
      bg: "bg-blue-500/10 border-blue-500/20",
      text: "text-blue-600 dark:text-blue-400",
      dot: "bg-blue-500",
    },
    "Under Review": {
      bg: "bg-amber-500/10 border-amber-500/20",
      text: "text-amber-600 dark:text-amber-400",
      dot: "bg-amber-500",
    },
    "Additional Information Requested": {
      bg: "bg-orange-500/10 border-orange-500/30 animate-pulse",
      text: "text-orange-600 dark:text-orange-400 font-bold",
      dot: "bg-orange-500",
    },
    Accepted: {
      bg: "bg-emerald-500/10 border-emerald-500/20",
      text: "text-emerald-600 dark:text-emerald-400",
      dot: "bg-emerald-500",
    },
    "Investigation in Progress": {
      bg: "bg-indigo-500/10 border-indigo-500/20",
      text: "text-indigo-600 dark:text-indigo-400",
      dot: "bg-indigo-500",
    },
    "Converted to Case": {
      bg: "bg-purple-500/10 border-purple-500/20",
      text: "text-purple-600 dark:text-purple-400",
      dot: "bg-purple-500",
    },
    "Decision Made": {
      bg: "bg-teal-500/10 border-teal-500/20",
      text: "text-teal-600 dark:text-teal-400",
      dot: "bg-teal-500",
    },
    Resolved: {
      bg: "bg-emerald-500/15 border-emerald-500/30",
      text: "text-emerald-700 dark:text-emerald-300 font-semibold",
      dot: "bg-emerald-500",
    },
    Closed: {
      bg: "bg-slate-500/10 border-slate-500/20",
      text: "text-slate-600 dark:text-slate-400",
      dot: "bg-slate-500",
    },
    Rejected: {
      bg: "bg-rose-500/10 border-rose-500/20",
      text: "text-rose-600 dark:text-rose-400",
      dot: "bg-rose-500",
    },
  };

  const cur = styles[status] || styles.Submitted;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.68rem] font-medium whitespace-nowrap",
        cur.bg,
        cur.text,
      )}
    >
      <span className={cn("size-1.5 rounded-full", cur.dot)} />
      {status}
    </span>
  );
}
