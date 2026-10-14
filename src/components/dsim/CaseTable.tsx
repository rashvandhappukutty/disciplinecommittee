import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { fmtDate } from "@/lib/dsim/format";
import type { CaseRecord } from "@/lib/dsim/types";

export function CaseTable({ cases, compact }: { cases: CaseRecord[]; compact?: boolean }) {
  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              {["Case ID", "Case Name", "Student", "Department", "Status", "Created", "Last Updated", ""].map((h) => (
                <th key={h} className="eyebrow whitespace-nowrap px-4 py-3 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} className="border-b border-border/70 transition-colors last:border-0 hover:bg-muted/60">
                <td className={`whitespace-nowrap px-4 font-mono text-xs ${compact ? "py-2" : "py-3.5"}`}>{c.id}</td>
                <td className="px-4 font-medium">{c.caseName}</td>
                <td className="whitespace-nowrap px-4">{c.accusedStudent}</td>
                <td className="whitespace-nowrap px-4 text-muted-foreground">{c.department}</td>
                <td className="px-4">
                  <StatusBadge status={c.status} />
                </td>
                <td className="whitespace-nowrap px-4 text-muted-foreground">{fmtDate(c.createdAt)}</td>
                <td className="whitespace-nowrap px-4 text-muted-foreground">{fmtDate(c.updatedAt)}</td>
                <td className="px-4 text-right">
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/cases/$caseId" params={{ caseId: c.id }}>
                      Open <ArrowUpRight className="size-3.5" />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 p-3 md:hidden">
        {cases.map((c) => (
          <CaseCard key={c.id} c={c} />
        ))}
      </div>
    </>
  );
}

export function CaseCard({ c }: { c: CaseRecord }) {
  return (
    <Link
      to="/cases/$caseId"
      params={{ caseId: c.id }}
      className="surface group block p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs text-muted-foreground">{c.id}</span>
        <StatusBadge status={c.status} />
      </div>
      <h3 className="mt-3 font-semibold">{c.caseName}</h3>
      <p className="mt-0.5 text-sm text-muted-foreground">
        {c.accusedStudent} · {c.department}
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        <span>
          {c.academicYear} · Updated {fmtDate(c.updatedAt)}
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-foreground group-hover:underline">
          Open Case <ArrowUpRight className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}
