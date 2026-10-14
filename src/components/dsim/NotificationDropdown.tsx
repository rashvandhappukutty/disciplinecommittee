import { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  CalendarClock,
  FileImage,
  Sparkles,
  Timer,
  Gavel,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  FileText,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDsim } from "@/lib/dsim/store";
import { cn } from "@/lib/utils";
import type { AppNotification } from "@/lib/dsim/types";

const icons: Record<AppNotification["type"], typeof Bell> = {
  return: CalendarClock,
  synopsis: Sparkles,
  evidence: FileImage,
  investigation: Timer,
  decision: Gavel,
  closure: CheckCircle2,
  complaint: AlertCircle,
  NEW_COMPLAINT_SUBMITTED: FileText,
};

export function NotificationDropdown() {
  const { notifications, markRead, markAllRead, currentUser } = useDsim();
  const navigate = useNavigate();

  // Filter notifications relevant to the active institutional user
  const userNotifications = useMemo(() => {
    return notifications.filter((n) => {
      if (!currentUser) return true;
      // If notification has a specific recipient role or recipientId, match it
      if (n.recipientId && n.recipientId === currentUser.id) return true;
      if (n.recipientRole && n.recipientRole === currentUser.role) return true;
      // If no specific recipient role set, it's a general institutional alert
      if (!n.recipientRole && !n.recipientId) return true;
      return false;
    });
  }, [notifications, currentUser]);

  const unread = userNotifications.filter((n) => !n.read).length;

  const handleNotificationClick = (n: AppNotification) => {
    markRead(n.id);
    if (n.complaintId) {
      navigate({ to: "/complaints/$complaintId", params: { complaintId: n.complaintId } });
    } else if (n.caseId) {
      navigate({ to: "/cases/$caseId", params: { caseId: n.caseId } });
    } else if (n.actionUrl) {
      navigate({ to: n.actionUrl as any });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-foreground hover:bg-muted"
          aria-label={`Notifications, ${unread} unread for ${currentUser?.role || "Staff"}`}
        >
          <Bell className="size-[18px]" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-signal font-mono text-[0.6rem] text-signal-foreground animate-in zoom-in-50">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[24rem] max-w-[calc(100vw-2rem)] p-0 shadow-xl border-border">
        {/* Header with Role indicator */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-card/80 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">Notifications</span>
            {currentUser && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-medium text-primary">
                {currentUser.role}
              </span>
            )}
            {unread > 0 && (
              <span className="rounded-full bg-signal/15 px-1.5 py-0.2 font-mono text-[0.62rem] font-bold text-signal">
                {unread} new
              </span>
            )}
          </div>
          <button
            onClick={markAllRead}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Mark all read
          </button>
        </div>

        {/* Notifications list */}
        <ul className="max-h-96 overflow-y-auto divide-y divide-border/60">
          {userNotifications.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-muted-foreground">
              You're all caught up. No notifications for your current role.
            </li>
          )}
          {userNotifications.map((n) => {
            const Icon = icons[n.type] || Bell;
            const isUrgent = n.priority === "URGENT" || n.urgency === "immediate_safety";
            const isHigh = n.priority === "HIGH" || n.urgency === "urgent";

            return (
              <li key={n.id}>
                <div
                  onClick={() => handleNotificationClick(n)}
                  className={cn(
                    "group flex w-full cursor-pointer gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/70",
                    !n.read ? "bg-primary/[0.04]" : "bg-transparent",
                  )}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleNotificationClick(n);
                    }
                  }}
                >
                  {/* Icon badge */}
                  <span
                    className={cn(
                      "mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg ring-1 transition-transform group-hover:scale-105",
                      isUrgent
                        ? "bg-rose-500/10 text-rose-600 ring-rose-500/30 dark:text-rose-400"
                        : isHigh
                        ? "bg-amber-500/10 text-amber-600 ring-amber-500/30 dark:text-amber-400"
                        : n.type === "NEW_COMPLAINT_SUBMITTED" || n.type === "complaint"
                        ? "bg-blue-500/10 text-blue-600 ring-blue-500/30 dark:text-blue-400"
                        : "bg-card text-primary ring-border",
                    )}
                  >
                    {isUrgent ? (
                      <ShieldAlert className="size-4" />
                    ) : (
                      <Icon className="size-4" />
                    )}
                  </span>

                  {/* Body */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold text-foreground truncate">
                        {n.title || "Institutional Notice"}
                      </span>
                      {isUrgent && (
                        <span className="shrink-0 rounded bg-rose-500/15 px-1.5 py-0.5 text-[0.62rem] font-bold text-rose-600 dark:text-rose-400">
                          ⚠ Urgent
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {n.message}
                    </p>

                    {/* Metadata line */}
                    <div className="flex items-center justify-between pt-0.5 text-[0.65rem] font-mono text-muted-foreground/80">
                      <span>{formatDistanceToNow(new Date(n.timestamp), { addSuffix: true })}</span>
                      {n.complaintId && (
                        <span className="flex items-center gap-1 font-sans text-[0.68rem] text-primary font-medium group-hover:underline">
                          Review <ChevronRight className="size-3" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Unread indicator dot */}
                  {!n.read && (
                    <span
                      className="mt-2 size-2 shrink-0 rounded-full bg-signal"
                      aria-label="Unread notification"
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
