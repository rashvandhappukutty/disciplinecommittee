import { cn } from "@/lib/utils";
import type { CaseStatus } from "@/lib/dsim/types";
import type { ReturnUrgency } from "@/lib/dsim/format";

const statusStyles: Record<CaseStatus, string> = {
  Draft: "bg-st-draft/10 text-st-draft ring-st-draft/25",
  "Under Investigation": "bg-st-investigation/10 text-st-investigation ring-st-investigation/25",
  "Decision Pending": "bg-st-pending/12 text-st-pending ring-st-pending/30",
  Suspended: "bg-st-suspended/10 text-st-suspended ring-st-suspended/25",
  "Awaiting Return": "bg-st-awaiting/10 text-st-awaiting ring-st-awaiting/25",
  Returned: "bg-st-returned/10 text-st-returned ring-st-returned/25",
  Closed: "bg-st-closed/10 text-st-closed ring-st-closed/25",
};

const dotStyles: Record<CaseStatus, string> = {
  Draft: "bg-st-draft",
  "Under Investigation": "bg-st-investigation",
  "Decision Pending": "bg-st-pending",
  Suspended: "bg-st-suspended",
  "Awaiting Return": "bg-st-awaiting",
  Returned: "bg-st-returned",
  Closed: "bg-st-closed",
};

export function StatusBadge({ status, className }: { status: CaseStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        statusStyles[status],
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", dotStyles[status])} />
      {status}
    </span>
  );
}

const urgencyStyles: Record<ReturnUrgency, string> = {
  Upcoming: "bg-st-investigation/10 text-st-investigation ring-st-investigation/25",
  "Due Soon": "bg-st-pending/12 text-st-pending ring-st-pending/30",
  Today: "bg-signal text-signal-foreground ring-signal",
  Overdue: "bg-st-suspended/10 text-st-suspended ring-st-suspended/30",
  Returned: "bg-st-returned/10 text-st-returned ring-st-returned/25",
};

export function UrgencyBadge({ urgency }: { urgency: ReturnUrgency }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        urgencyStyles[urgency],
      )}
    >
      {urgency === "Today" ? "Return Today" : urgency}
    </span>
  );
}
