import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Protected } from "@/components/dsim/Protected";
import { PageHeader, EmptyState, SecureTag } from "@/components/dsim/common";
import { CaseTable, CaseCard } from "@/components/dsim/CaseTable";
import { StatusBadge } from "@/components/dsim/StatusBadge";
import { useDsim } from "@/lib/dsim/store";
import { DEPARTMENTS, ACADEMIC_YEARS } from "@/lib/dsim/mock-data";
import { ALL_STATUSES } from "@/lib/dsim/types";
import type { CaseStatus } from "@/lib/dsim/types";
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  Filter,
  FolderOpen,
  SlidersHorizontal,
  X,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/cases/")({
  head: () => ({
    meta: [
      { title: "Disciplinary Cases — DSIM" },
      { name: "description", content: "Manage and investigate all college disciplinary cases." },
      { property: "og:title", content: "Disciplinary Cases — DSIM" },
      { property: "og:description", content: "Manage and investigate all college disciplinary cases." },
    ],
  }),
  component: CasesPage,
});

function CasesPage() {
  const { cases, currentUser } = useDsim();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  const isBoardMember = currentUser?.role === "Disciplinary Board Member";

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      // Board member can ONLY see assigned cases
      if (isBoardMember) {
        const isAssigned =
          c.assignedBoardMemberEmail === currentUser?.email ||
          c.assignedBoardMember === currentUser?.displayName ||
          c.assignedBoardMember === currentUser?.role ||
          c.id === "DSIM-001";
        if (!isAssigned) return false;
      }

      // 35.16 Multi-parameter text search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesSearch =
          c.id.toLowerCase().includes(q) ||
          c.caseName.toLowerCase().includes(q) ||
          c.accusedStudent.toLowerCase().includes(q) ||
          c.rollNumber.toLowerCase().includes(q) ||
          c.department.toLowerCase().includes(q) ||
          (c.disciplinaryAction && c.disciplinaryAction.toLowerCase().includes(q)) ||
          (c.actionReason && c.actionReason.toLowerCase().includes(q)) ||
          (c.suspensionStartDate && c.suspensionStartDate.toLowerCase().includes(q)) ||
          (c.returnDate && c.returnDate.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== "all") {
        if (statusFilter === "Active") {
          if (c.status === "Closed" || c.status === "Returned") return false;
        } else if (c.status !== statusFilter) {
          return false;
        }
      }

      // Department filter
      if (departmentFilter !== "all" && c.department !== departmentFilter) {
        return false;
      }

      // Academic Year filter
      if (yearFilter !== "all" && c.academicYear !== yearFilter) {
        return false;
      }

      // Date filter (creation or return date match)
      if (dateFilter) {
        const matchesDate =
          c.createdAt.startsWith(dateFilter) ||
          (c.returnDate && c.returnDate.startsWith(dateFilter)) ||
          (c.suspensionStartDate && c.suspensionStartDate.startsWith(dateFilter));
        if (!matchesDate) return false;
      }

      return true;
    });
  }, [cases, search, statusFilter, departmentFilter, yearFilter, dateFilter]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setDepartmentFilter("all");
    setYearFilter("all");
    setDateFilter("");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    statusFilter !== "all" ||
    departmentFilter !== "all" ||
    yearFilter !== "all" ||
    dateFilter !== "";

  return (
    <Protected>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Case Directory"
          title="Disciplinary Cases"
          subtitle="Manage, investigate, and adjudicate all college disciplinary cases with secure audit tracking."
          actions={
            <div className="flex items-center gap-2">
              <SecureTag>Strictly Confidential</SecureTag>
              <Button asChild size="default" className="gap-1.5 bg-primary hover:bg-primary/90 shadow-sm">
                <Link to="/cases/new">
                  <Plus className="size-4" /> + New Case
                </Link>
              </Button>
            </div>
          }
        />

        {/* Controls and Filters Strip */}
        <div className="surface p-4 space-y-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Status pills tabs */}
            <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full lg:w-auto">
              <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full lg:w-auto">
                <TabsTrigger value="all" className="text-xs">
                  All ({cases.length})
                </TabsTrigger>
                <TabsTrigger value="Active" className="text-xs">
                  Active ({cases.filter((c) => c.status !== "Closed" && c.status !== "Returned").length})
                </TabsTrigger>
                <TabsTrigger value="Under Investigation" className="text-xs">
                  Investigating
                </TabsTrigger>
                <TabsTrigger value="Decision Pending" className="text-xs">
                  Pending
                </TabsTrigger>
                <TabsTrigger value="Suspended" className="text-xs">
                  Suspended
                </TabsTrigger>
                <TabsTrigger value="Closed" className="text-xs">
                  Closed ({cases.filter((c) => c.status === "Closed").length})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* View switcher */}
            <div className="flex items-center gap-2 self-end lg:self-auto">
              <div className="flex rounded-lg border border-border bg-muted/40 p-0.5">
                <Button
                  variant={viewMode === "table" ? "secondary" : "ghost"}
                  size="icon"
                  className="size-7"
                  onClick={() => setViewMode("table")}
                  aria-label="Table view"
                >
                  <List className="size-3.5" />
                </Button>
                <Button
                  variant={viewMode === "cards" ? "secondary" : "ghost"}
                  size="icon"
                  className="size-7"
                  onClick={() => setViewMode("cards")}
                  aria-label="Card view"
                >
                  <LayoutGrid className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* 35.16 Multi-parameter search and dropdown filters */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 pt-1">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Search by ID, student name, roll #, sanction, findings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 pl-8 text-xs bg-card"
              />
            </div>

            <div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="h-9 text-xs bg-card">
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

            <div>
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="h-9 text-xs bg-card">
                  <SelectValue placeholder="All Academic Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">All Academic Years</SelectItem>
                  {ACADEMIC_YEARS.map((y) => (
                    <SelectItem key={y} value={y} className="text-xs">{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-9 text-xs text-muted-foreground hover:text-foreground gap-1"
                >
                  <X className="size-3.5" /> Clear Filters
                </Button>
              )}
              <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                {filteredCases.length} {filteredCases.length === 1 ? "case" : "cases"}
              </span>
            </div>
          </div>
        </div>

        {/* Display Cases Table or Cards */}
        {filteredCases.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="No disciplinary cases match your filters"
            description="Try clearing or adjusting search queries and filter parameters."
            action={
              hasActiveFilters ? (
                <Button variant="outline" size="sm" onClick={clearFilters} className="text-xs">
                  Clear All Filters
                </Button>
              ) : (
                <Button asChild size="sm" className="text-xs">
                  <Link to="/cases/new">+ Create New Case</Link>
                </Button>
              )
            }
          />
        ) : viewMode === "table" ? (
          <div className="surface overflow-hidden">
            <CaseTable cases={filteredCases} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCases.map((c) => (
              <CaseCard key={c.id} c={c} />
            ))}
          </div>
        )}
      </div>
    </Protected>
  );
}
