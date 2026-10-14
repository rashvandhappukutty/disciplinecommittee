import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Protected } from "@/components/dsim/Protected";
import { PageHeader, EmptyState, SecureTag, StatCard } from "@/components/dsim/common";
import { StatusBadge } from "@/components/dsim/StatusBadge";
import { MarkReturnedModal } from "@/components/dsim/MarkReturnedModal";
import { RescheduleModal } from "@/components/dsim/RescheduleModal";
import { useDsim } from "@/lib/dsim/store";
import { fmtDate } from "@/lib/dsim/format";
import { DEPARTMENTS } from "@/lib/dsim/mock-data";
import { differenceInDays, parseISO, isValid } from "date-fns";
import {
  UserX,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Search,
  Filter,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CaseRecord } from "@/lib/dsim/types";

export const Route = createFileRoute("/suspensions")({
  head: () => ({
    meta: [
      { title: "Suspensions Registry — DSIM" },
      { name: "description", content: "Directory of students currently under active suspension sanctions." },
      { property: "og:title", content: "Suspensions Registry — DSIM" },
      { property: "og:description", content: "Directory of students currently under active suspension sanctions." },
    ],
  }),
  component: SuspensionsPage,
});

function SuspensionsPage() {
  const { cases, updateCase, addTimeline } = useDsim();
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedForReturn, setSelectedForReturn] = useState<CaseRecord | null>(null);
  const [selectedForReschedule, setSelectedForReschedule] = useState<CaseRecord | null>(null);

  const suspendedCases = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return cases
      .filter((c) => c.status === "Suspended" || c.status === "Awaiting Return" || c.disciplinaryAction === "Suspension")
      .map((c) => {
        let daysRemaining = 0;
        let totalDays = 0;
        try {
          if (c.suspensionStartDate && c.returnDate) {
            const start = parseISO(c.suspensionStartDate);
            const end = parseISO(c.returnDate);
            if (isValid(start) && isValid(end)) {
              totalDays = differenceInDays(end, start);
            }
          }
          if (c.returnDate) {
            const end = parseISO(c.returnDate);
            if (isValid(end)) {
              daysRemaining = differenceInDays(end, today);
            }
          }
        } catch {
          daysRemaining = 0;
        }
        return { ...c, daysRemaining, totalDays };
      })
      .filter((c) => {
        if (search.trim()) {
          const q = search.toLowerCase();
          const match =
            c.accusedStudent.toLowerCase().includes(q) ||
            c.rollNumber.toLowerCase().includes(q) ||
            c.id.toLowerCase().includes(q) ||
            c.department.toLowerCase().includes(q);
          if (!match) return false;
        }
        if (departmentFilter !== "all" && c.department !== departmentFilter) {
          return false;
        }
        return true;
      });
  }, [cases, search, departmentFilter]);

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
      <div className="space-y-6">
        <PageHeader
          eyebrow="Sanctions Oversight"
          title="Suspensions Registry"
          subtitle="Directory of students currently barred from campus facilities and academic sessions."
          actions={<SecureTag>Enforcement Ledger</SecureTag>}
        />

        {/* Stats Strip */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={UserX}
            value={suspendedCases.length}
            label="Active Suspensions"
            context="Barred from classes"
            tone={suspendedCases.length > 0 ? "alert" : "default"}
          />
          <StatCard
            icon={Clock}
            value={suspendedCases.filter((c) => c.daysRemaining <= 7 && c.daysRemaining >= 0).length}
            label="Expiring Within 7 Days"
            context="Clearance review required"
          />
          <StatCard
            icon={CheckCircle2}
            value={cases.filter((c) => c.status === "Returned").length}
            label="Reinstated Students"
            context="Successfully cleared this academic year"
          />
        </div>

        {/* Search & Filters */}
        <div className="surface p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search suspended student, roll #, case..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-8 text-xs bg-card"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="h-9 text-xs w-full sm:w-48">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All Departments</SelectItem>
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d} value={d} className="text-xs">{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Suspensions Table */}
        {suspendedCases.length === 0 ? (
          <EmptyState
            icon={UserX}
            title="No students under active suspension"
            description="Currently there are no active suspension orders matching your filter criteria."
          />
        ) : (
          <div className="surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border text-left">
                    {["Student & Roll #", "Department", "Case Reference", "Suspension Term", "Days Left", "Reason", "Actions"].map((h) => (
                      <th key={h} className="eyebrow whitespace-nowrap px-4 py-3 font-normal">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {suspendedCases.map((c) => (
                    <tr key={c.id} className="border-b border-border/70 transition-colors last:border-0 hover:bg-muted/60">
                      <td className="px-4 py-3.5 font-medium whitespace-nowrap">
                        <div className="font-semibold text-foreground">{c.accusedStudent}</div>
                        <div className="font-mono text-[0.68rem] text-muted-foreground">{c.rollNumber}</div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-muted-foreground">
                        {c.department}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <Link
                          to="/cases/$caseId"
                          params={{ caseId: c.id }}
                          className="font-mono font-medium text-primary hover:underline"
                        >
                          {c.id}
                        </Link>
                        <div className="truncate text-[0.68rem] text-muted-foreground max-w-[140px]">
                          {c.caseName}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono text-muted-foreground">
                        <div>{c.suspensionStartDate || "—"} →</div>
                        <div>{c.returnDate || "Indefinite"}</div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-[0.68rem] font-bold ${
                            c.daysRemaining <= 0
                              ? "bg-red-500/15 text-red-600"
                              : c.daysRemaining <= 3
                              ? "bg-amber-500/15 text-amber-600"
                              : "bg-secondary text-primary"
                          }`}
                        >
                          {c.daysRemaining < 0
                            ? "Overdue"
                            : c.daysRemaining === 0
                            ? "Today"
                            : `${c.daysRemaining} days`}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground max-w-[200px] truncate" title={c.actionReason}>
                        {c.actionReason || "Disciplinary infraction"}
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedForReturn(c)}
                            className="h-7 text-[0.7rem] hover:bg-emerald-500/10 hover:text-emerald-600"
                          >
                            Mark Returned
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedForReschedule(c)}
                            className="h-7 text-[0.7rem]"
                          >
                            Reschedule
                          </Button>
                          <Button asChild variant="ghost" size="icon" className="size-7">
                            <Link to="/cases/$caseId" params={{ caseId: c.id }}>
                              <ArrowUpRight className="size-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
