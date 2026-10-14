import { useState, useMemo } from "react";
import {
  ShieldAlert,
  Clock,
  User,
  Search,
  FileText,
  Filter,
  CheckCircle2,
  Mic,
  Image,
  Gavel,
  Lock,
  Edit,
  FolderPlus,
  RefreshCw,
  UserPlus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { fmtDateTime } from "@/lib/dsim/format";
import type { AuditLogEntry } from "@/lib/dsim/types";

interface AuditLogViewProps {
  auditLog?: AuditLogEntry[];
  caseId: string;
}

export function AuditLogView({ auditLog = [], caseId }: AuditLogViewProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const sortedAndFiltered = useMemo(() => {
    return [...auditLog]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .filter((entry) => {
        if (categoryFilter !== "all" && entry.category !== categoryFilter) {
          return false;
        }
        if (search.trim()) {
          const q = search.toLowerCase();
          return (
            entry.event.toLowerCase().includes(q) ||
            entry.user.toLowerCase().includes(q) ||
            entry.description.toLowerCase().includes(q) ||
            entry.timestamp.toLowerCase().includes(q)
          );
        }
        return true;
      });
  }, [auditLog, search, categoryFilter]);

  const getEventIcon = (event: string, cat?: string) => {
    const e = event.toLowerCase();
    if (e.includes("close")) return <Lock className="size-3.5 text-slate-500" />;
    if (e.includes("record") || e.includes("audio")) return <Mic className="size-3.5 text-indigo-500" />;
    if (e.includes("evidence") || e.includes("photo") || e.includes("document")) return <Image className="size-3.5 text-emerald-500" />;
    if (e.includes("decision") || e.includes("suspension") || e.includes("sanction")) return <Gavel className="size-3.5 text-signal" />;
    if (e.includes("person") || e.includes("witness")) return <UserPlus className="size-3.5 text-amber-500" />;
    if (e.includes("synopsis") || e.includes("transcript")) return <RefreshCw className="size-3.5 text-primary" />;
    if (e.includes("created")) return <FolderPlus className="size-3.5 text-primary" />;
    return <FileText className="size-3.5 text-muted-foreground" />;
  };

  return (
    <div className="surface overflow-hidden p-5 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-secondary text-foreground">
              <ShieldAlert className="size-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-foreground">Audit History</h3>
              <p className="text-xs text-muted-foreground">
                Chronological record of significant case actions. Production integrity and tamper protection are enforced by backend controls.
              </p>
            </div>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary text-foreground text-[0.68rem] font-mono font-medium self-start sm:self-auto border border-border">
          <ShieldAlert className="size-3 text-primary" /> Session Audited
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Search audit trail by actor, event, description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8.5 pl-8 text-xs bg-card"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
          {["all", "case", "investigation", "evidence", "synopsis", "suspension", "closure"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-md capitalize font-medium transition-colors text-[0.7rem] ${
                categoryFilter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Trail List */}
      {sortedAndFiltered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center bg-muted/20">
          <Clock className="size-8 mx-auto text-muted-foreground" />
          <p className="text-xs font-semibold text-foreground mt-2">No audit records found</p>
          <p className="text-xs text-muted-foreground">Adjust filters or record new investigation actions.</p>
        </div>
      ) : (
        <div className="relative border-l border-border ml-3 sm:ml-4 pl-4 sm:pl-6 space-y-4 max-h-[550px] overflow-y-auto pr-1">
          {sortedAndFiltered.map((log) => (
            <div key={log.id} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[27px] sm:-left-[35px] top-1 grid size-6 place-items-center rounded-full bg-card border border-border group-hover:border-primary transition-colors">
                {getEventIcon(log.event, log.category)}
              </div>

              {/* Log Card */}
              <div className="rounded-lg border border-border/80 bg-card/60 p-3.5 hover:bg-card transition-all space-y-1.5 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-foreground">{log.event}</span>
                    <span className="rounded bg-secondary px-1.5 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
                      {log.user}
                    </span>
                  </div>

                  <span className="font-mono text-[0.68rem] text-muted-foreground">
                    {fmtDateTime(log.timestamp)}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {log.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
