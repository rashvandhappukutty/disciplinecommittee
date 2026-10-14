import { useState, useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Protected } from "@/components/dsim/Protected";
import { useDsim } from "@/lib/dsim/store";
import { fmtDate, fmtDateTime } from "@/lib/dsim/format";
import {
  Inbox,
  Filter,
  Search,
  ShieldAlert,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  User,
  ArrowRight,
  ChevronRight,
  AlertTriangle,
  FolderPlus,
  Lock,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ComplaintStatusBadge } from "./student.dashboard";
import { COMPLAINT_CATEGORIES, type ComplaintCategory, type ComplaintStatus, type UrgencyLevel } from "@/lib/dsim/types";

export const Route = createFileRoute("/complaints/")({
  head: () => ({
    meta: [
      { title: "Incoming Complaints — DSIM" },
      { name: "description", content: "Review and process incoming student disciplinary complaints and reports." },
      { property: "og:title", content: "Incoming Complaints — DSIM" },
      { property: "og:description", content: "Review and process incoming student disciplinary complaints and reports." },
    ],
  }),
  component: ComplaintsIndexRoute,
});

function ComplaintsIndexRoute() {
  return (
    <Protected>
      <ComplaintsIndexPage />
    </Protected>
  );
}

function ComplaintsIndexPage() {
  const { complaints } = useDsim();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusTab, setStatusTab] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all");

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      if (statusTab !== "all") {
        if (statusTab === "pending") {
          if (c.status !== "Submitted" && c.status !== "Under Review") return false;
        } else if (statusTab === "info_requested") {
          if (c.status !== "Additional Information Requested") return false;
        } else if (statusTab === "accepted") {
          if (c.status !== "Accepted") return false;
        } else if (statusTab === "converted") {
          if (c.status !== "Converted to Case") return false;
        } else if (statusTab === "rejected") {
          if (c.status !== "Rejected") return false;
        } else if (c.status !== statusTab) {
          return false;
        }
      }

      if (categoryFilter !== "all" && c.category !== categoryFilter) return false;
      if (urgencyFilter !== "all" && c.urgency !== urgencyFilter) return false;

      if (search.trim()) {
        const q = search.toLowerCase();
        const matches =
          c.id.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.studentName.toLowerCase().includes(q) ||
          c.studentRoll.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.personsInvolved.some((p) => p.name.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [complaints, statusTab, categoryFilter, urgencyFilter, search]);

  // Metric counts
  const newCount = complaints.filter((c) => c.status === "Submitted" || c.status === "Under Review").length;
  const infoRequestedCount = complaints.filter((c) => c.status === "Additional Information Requested").length;
  const acceptedCount = complaints.filter((c) => c.status === "Accepted").length;
  const convertedCount = complaints.filter((c) => c.status === "Converted to Case").length;
  const urgentCount = complaints.filter((c) => c.urgency === "urgent" || c.urgency === "immediate_safety").length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Incoming Student Complaints</h1>
            {newCount > 0 && (
              <span className="rounded-full bg-destructive text-destructive-foreground font-mono text-xs font-bold px-2.5 py-0.5 animate-pulse">
                {newCount} Pending
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Review submitted student reports, verify preliminary evidence, and convert substantiated complaints into disciplinary cases.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/cases/new">
            <Button variant="outline" className="text-xs">
              + Direct Case Entry
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div
          onClick={() => setStatusTab("pending")}
          className={cn(
            "rounded-xl border p-3.5 bg-card transition-all cursor-pointer",
            statusTab === "pending" ? "border-primary ring-1 ring-primary" : "border-border hover:border-border/80",
          )}
        >
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Pending Review</span>
            <Clock className="size-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400">{newCount}</div>
          <div className="mt-1 text-[0.68rem] text-muted-foreground">Requires intake decision</div>
        </div>

        <div
          onClick={() => setStatusTab("info_requested")}
          className={cn(
            "rounded-xl border p-3.5 bg-card transition-all cursor-pointer",
            statusTab === "info_requested" ? "border-primary ring-1 ring-primary" : "border-border hover:border-border/80",
          )}
        >
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Info Requested</span>
            <ShieldAlert className="size-4 text-orange-500" />
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-orange-600 dark:text-orange-400">{infoRequestedCount}</div>
          <div className="mt-1 text-[0.68rem] text-muted-foreground">Awaiting student reply</div>
        </div>

        <div
          onClick={() => setStatusTab("accepted")}
          className={cn(
            "rounded-xl border p-3.5 bg-card transition-all cursor-pointer",
            statusTab === "accepted" ? "border-primary ring-1 ring-primary" : "border-border hover:border-border/80",
          )}
        >
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Accepted</span>
            <CheckCircle2 className="size-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">{acceptedCount}</div>
          <div className="mt-1 text-[0.68rem] text-muted-foreground">Ready for case conversion</div>
        </div>

        <div
          onClick={() => setStatusTab("converted")}
          className={cn(
            "rounded-xl border p-3.5 bg-card transition-all cursor-pointer",
            statusTab === "converted" ? "border-primary ring-1 ring-primary" : "border-border hover:border-border/80",
          )}
        >
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Converted to Cases</span>
            <FolderPlus className="size-4 text-purple-500" />
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-purple-600 dark:text-purple-400">{convertedCount}</div>
          <div className="mt-1 text-[0.68rem] text-muted-foreground">Active DSIM inquiries</div>
        </div>

        <div
          onClick={() => {
            setUrgencyFilter("urgent");
            setStatusTab("all");
          }}
          className={cn(
            "rounded-xl border p-3.5 bg-card transition-all cursor-pointer col-span-2 sm:col-span-1",
            urgencyFilter === "urgent" ? "border-destructive ring-1 ring-destructive" : "border-border hover:border-border/80",
          )}
        >
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Urgent / Safety</span>
            <AlertTriangle className="size-4 text-destructive" />
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-destructive">{urgentCount}</div>
          <div className="mt-1 text-[0.68rem] text-muted-foreground">High priority intake</div>
        </div>
      </div>

      {/* Main Complaints Table & Filters */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        {/* Filters bar */}
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                { key: "all", label: `All (${complaints.length})` },
                { key: "pending", label: `Pending Review (${newCount})` },
                { key: "info_requested", label: `Info Requested (${infoRequestedCount})` },
                { key: "accepted", label: `Accepted (${acceptedCount})` },
                { key: "converted", label: `Converted (${convertedCount})` },
                { key: "rejected", label: "Rejected" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setStatusTab(tab.key)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 font-medium transition-colors",
                    statusTab === tab.key
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[220px]">
                <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search complaints, students..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 pl-8 text-xs bg-background"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-8 text-xs w-[140px] bg-background">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">All Categories</SelectItem>
                  {COMPLAINT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-xs">{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="h-8 text-xs w-[130px] bg-background">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">All Urgencies</SelectItem>
                  <SelectItem value="normal" className="text-xs">Normal</SelectItem>
                  <SelectItem value="urgent" className="text-xs">Urgent</SelectItem>
                  <SelectItem value="immediate_safety" className="text-xs">Immediate Safety</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Complaints Table */}
        {filteredComplaints.length === 0 ? (
          <div className="py-16 text-center px-4">
            <Inbox className="mx-auto size-10 text-muted-foreground mb-3" />
            <h4 className="text-sm font-semibold text-foreground">No complaints match criteria</h4>
            <p className="mt-1 text-xs text-muted-foreground">Adjust filters or search query to view submissions.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 text-[0.7rem] uppercase tracking-wider text-muted-foreground font-semibold border-b border-border">
                <tr>
                  <th className="py-3 px-4">Complaint ID</th>
                  <th className="py-3 px-4">Reported Incident</th>
                  <th className="py-3 px-4">Complainant</th>
                  <th className="py-3 px-4">Person(s) Reported</th>
                  <th className="py-3 px-4">Urgency</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4 text-right">Review Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredComplaints.map((c) => {
                  const primaryPerson = c.personsInvolved.find((p) => p.isPrimary) || c.personsInvolved[0];
                  const isUrgent = c.urgency === "urgent" || c.urgency === "immediate_safety";

                  return (
                    <tr
                      key={c.id}
                      onClick={() => navigate({ to: "/complaints/$complaintId", params: { complaintId: c.id } })}
                      className={cn(
                        "transition-colors hover:bg-muted/50 cursor-pointer",
                        c.status === "Submitted" && "bg-blue-500/[0.03]",
                        isUrgent && "border-l-2 border-l-destructive",
                      )}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-foreground">
                        {c.id}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-semibold text-foreground truncate">{c.title}</div>
                        <div className="text-[0.7rem] text-muted-foreground truncate">{c.location} · {c.category}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-foreground">
                          {c.privacyPreference === "anonymous_to_reported" ? (
                            <span className="inline-flex items-center gap-1 text-primary">
                              <Lock className="size-3" /> {c.studentName}
                            </span>
                          ) : (
                            c.studentName
                          )}
                        </div>
                        <div className="text-[0.7rem] text-muted-foreground font-mono">{c.studentRoll} ({c.studentDepartment})</div>
                      </td>
                      <td className="py-3.5 px-4 max-w-[180px]">
                        <div className="font-semibold text-foreground truncate">
                          {primaryPerson?.unknownDetails ? "Unidentified Subject" : primaryPerson?.name}
                        </div>
                        {c.personsInvolved.length > 1 && (
                          <div className="text-[0.68rem] text-muted-foreground">
                            +{c.personsInvolved.length - 1} other individual(s)
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "rounded px-2 py-0.5 text-[0.68rem] font-bold uppercase",
                            c.urgency === "immediate_safety"
                              ? "bg-destructive/15 text-destructive"
                              : c.urgency === "urgent"
                              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {c.urgency.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <ComplaintStatusBadge status={c.status} />
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground text-[0.72rem]">
                        {fmtDate(c.submittedAt)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-primary hover:text-primary hover:bg-primary/10 gap-1 font-semibold"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate({ to: "/complaints/$complaintId", params: { complaintId: c.id } });
                          }}
                        >
                          <span>Review</span>
                          <ChevronRight className="size-3.5" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
