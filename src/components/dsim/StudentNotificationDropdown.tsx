import { useNavigate } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { Bell, CheckCircle2, MessageSquare, ShieldAlert, FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDsim } from "@/lib/dsim/store";
import { cn } from "@/lib/utils";

export function StudentNotificationDropdown() {
  const { studentNotifications, markStudentNotificationRead, markAllStudentNotificationsRead } = useDsim();
  const navigate = useNavigate();
  const unread = studentNotifications.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-foreground hover:bg-muted" aria-label={`Student Notifications, ${unread} unread`}>
          <Bell className="size-[18px]" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-primary font-mono text-[0.6rem] text-primary-foreground">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[22rem] max-w-[calc(100vw-2rem)] p-0 shadow-lg">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-card">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">Updates & Notices</span>
            {unread > 0 && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-medium text-primary">
                {unread} new
              </span>
            )}
          </div>
          <button
            onClick={markAllStudentNotificationsRead}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Mark all read
          </button>
        </div>
        <ul className="max-h-96 overflow-y-auto divide-y divide-border/60">
          {studentNotifications.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-muted-foreground">
              No notifications yet. You will receive updates as your complaint is processed.
            </li>
          )}
          {studentNotifications.map((n) => {
            const isAlert = n.title.toLowerCase().includes("action") || n.title.toLowerCase().includes("required");
            return (
              <li key={n.id}>
                <button
                  onClick={() => {
                    markStudentNotificationRead(n.id);
                    if (n.complaintId) {
                      navigate({ to: "/student/complaints/$complaintId", params: { complaintId: n.complaintId } });
                    }
                  }}
                  className={cn(
                    "flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/80",
                    !n.read ? "bg-primary/5" : "bg-transparent",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg ring-1",
                      isAlert
                        ? "bg-amber-500/10 text-amber-500 ring-amber-500/20"
                        : "bg-primary/10 text-primary ring-primary/20",
                    )}
                  >
                    {isAlert ? <ShieldAlert className="size-4" /> : <MessageSquare className="size-4" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold text-foreground">{n.title}</span>
                    <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</span>
                    <span className="mt-1 block text-[0.65rem] font-mono text-muted-foreground/80">
                      {formatDistanceToNow(new Date(n.timestamp), { addSuffix: true })}
                    </span>
                  </span>
                  {!n.read && <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />}
                </button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
