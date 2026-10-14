import type { ReactNode } from "react";
import { AlertTriangle, Lock, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { initials } from "@/lib/dsim/format";
import type { Person } from "@/lib/dsim/types";

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  actions,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
        <h1 className="text-2xl font-semibold tracking-tight sm:text-[1.7rem]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function SecureTag({ children = "Confidential Investigation Record" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
      <Lock className="size-3" aria-hidden />
      {children}
    </span>
  );
}

export function StatCard({
  icon: Icon,
  value,
  label,
  context,
  tone = "default",
}: {
  icon: LucideIcon;
  value: number | string;
  label: string;
  context: string;
  tone?: "default" | "alert";
}) {
  return (
    <div className="surface p-4">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "grid size-9 place-items-center rounded-lg",
            tone === "alert" ? "bg-signal/10 text-signal" : "bg-secondary text-primary",
          )}
        >
          <Icon className="size-[18px]" aria-hidden />
        </div>
      </div>
      <div className="mt-4 font-mono text-3xl font-medium tabular-nums tracking-tight">{value}</div>
      <div className="mt-1 text-sm font-medium">{label}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{context}</div>
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-12 text-center">
      <div className="grid size-11 place-items-center rounded-full bg-secondary text-muted-foreground">
        <Icon className="size-5" aria-hidden />
      </div>
      <h3 className="mt-4 text-sm font-semibold">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({
  title,
  onRetry,
  onBack,
}: {
  title: string;
  onRetry?: () => void;
  onBack?: () => void;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center">
      <AlertTriangle className="size-6 text-destructive" aria-hidden />
      <h3 className="mt-3 text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">Please try again or return to the previous page.</p>
      <div className="mt-5 flex gap-2">
        {onRetry && <Button onClick={onRetry}>Retry</Button>}
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            Go Back
          </Button>
        )}
      </div>
    </div>
  );
}

export function PageSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading">
      <div className="space-y-2">
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-14 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  destructive,
  onConfirm,
  children,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  children?: ReactNode;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn(destructive && "bg-destructive text-destructive-foreground hover:bg-destructive/90")}
            onClick={onConfirm}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function Avatar({ name, size = "md", tone = "default" }: { name: string; size?: "sm" | "md" | "lg"; tone?: "default" | "alert" | "ink" }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-mono font-medium",
        size === "sm" && "size-7 text-[0.65rem]",
        size === "md" && "size-9 text-xs",
        size === "lg" && "size-16 text-lg",
        tone === "default" && "bg-secondary text-primary",
        tone === "alert" && "bg-signal/12 text-signal",
        tone === "ink" && "bg-sidebar-accent text-sidebar-accent-foreground",
      )}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

export function PersonCard({
  person,
  main,
  onRemove,
}: {
  person: Person;
  main?: boolean;
  onRemove?: () => void;
}) {
  return (
    <div
      className={cn(
        "relative flex items-start gap-3 rounded-xl border p-4",
        main ? "border-signal/40 bg-signal/5" : "border-border bg-card",
      )}
    >
      <Avatar name={person.name} tone={main ? "alert" : "default"} />
      <div className="min-w-0 flex-1">
        {main && <div className="eyebrow mb-1 text-signal">Main accused</div>}
        <div className="truncate font-medium">{person.name}</div>
        <div className="text-xs text-muted-foreground">{person.role}</div>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span>{person.department}</span>
          {person.rollNumber && <span className="font-mono">{person.rollNumber}</span>}
        </div>
      </div>
      {onRemove && (
        <Button variant="ghost" size="sm" onClick={onRemove} aria-label={`Remove ${person.name}`}>
          Remove
        </Button>
      )}
    </div>
  );
}
