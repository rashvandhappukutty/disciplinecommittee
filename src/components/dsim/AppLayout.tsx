import { useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  CalendarClock,
  ChevronDown,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Menu,
  Radar,
  Settings,
  ShieldCheck,
  UserCircle,
  UserX,
  Inbox,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDsim } from "@/lib/dsim/store";
import { cn } from "@/lib/utils";
import { Avatar, ConfirmDialog } from "./common";
import { NotificationDropdown } from "./NotificationDropdown";
import { SearchCommand } from "./SearchCommand";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/complaints", label: "Incoming Complaints", icon: Inbox, badgeKey: "complaints" },
  { to: "/cases", label: "Cases", icon: FolderOpen },
  { to: "/investigations", label: "Active Investigations", icon: Radar },
  { to: "/suspensions", label: "Suspensions", icon: UserX },
  { to: "/returns", label: "Upcoming Returns", icon: CalendarClock },
  { to: "/profile", label: "Profile", icon: UserCircle },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function Brand() {
  return (
    <div className="flex items-center justify-start w-full">
      <img
        src="/kpr-logo.svg.png"
        alt="KPR College of Arts Science and Research"
        className="h-16 sm:h-20 w-auto max-w-full object-contain object-left brightness-0 invert"
      />
    </div>
  );
}

function SidebarBody({ onNavigate, onLogout }: { onNavigate?: () => void; onLogout: () => void }) {
  const { profile, complaints, currentUser } = useDsim();
  const path = useRouterState({ select: (s) => s.location.pathname });

  // Count pending / under-review complaints
  const pendingComplaintsCount = complaints.filter(
    (c) => c.status === "Submitted" || c.status === "Under Review" || c.status === "Additional Information Requested",
  ).length;

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="px-4 py-4 border-b border-sidebar-border flex items-center justify-start">
        <Brand />
      </div>
      <nav className="flex-1 space-y-0.5 px-3 py-3" aria-label="Main">
        {nav.map((n) => {
          const active =
            path === n.to ||
            (n.to === "/cases" && path.startsWith("/cases")) ||
            (n.to === "/complaints" && path.startsWith("/complaints"));
          return (
            <Link
              key={n.to}
              to={n.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <div className="flex items-center gap-3">
                <n.icon className="size-4" />
                <span>{n.label}</span>
              </div>
              {'badgeKey' in n && n.badgeKey === "complaints" && pendingComplaintsCount > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-destructive text-[0.65rem] font-bold text-destructive-foreground animate-pulse">
                  {pendingComplaintsCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="mx-3 mb-3 rounded-lg border border-sidebar-border px-3 py-2 font-mono text-[0.62rem] uppercase tracking-wider text-sidebar-foreground/55">
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-st-returned" /> Restricted Access · Encrypted
        </div>
      </div>
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 px-2 py-1">
          <Avatar name={currentUser?.displayName || profile.name} tone="ink" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-sidebar-accent-foreground">{currentUser?.displayName || profile.name}</div>
            <div className="truncate text-xs text-sidebar-foreground/60">{currentUser?.role || "Committee Head"}</div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1">
          <Link
            to="/settings"
            onClick={onNavigate}
            className="flex items-center justify-center gap-2 rounded-md py-1.5 text-xs text-sidebar-foreground/75 hover:bg-sidebar-accent"
          >
            <Settings className="size-3.5" /> Settings
          </Link>
          <button
            onClick={onLogout}
            className="flex items-center justify-center gap-2 rounded-md py-1.5 text-xs text-sidebar-foreground/75 hover:bg-sidebar-accent"
          >
            <LogOut className="size-3.5" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const { logout, profile } = useDsim();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const doLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">
        <SidebarBody onLogout={() => setConfirmLogout(true)} />
      </aside>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 border-0 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarBody onNavigate={() => setMobileOpen(false)} onLogout={() => setConfirmLogout(true)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 px-4 backdrop-blur sm:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <Crumbs path={path} />
          </div>

          <div className="ml-auto flex items-center justify-end gap-1 sm:gap-2">
            <SearchCommand />
            <NotificationDropdown />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 rounded-lg p-1 hover:bg-muted" aria-label="Account menu">
                  <Avatar name={profile.name} size="sm" />
                  <ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="text-sm">{profile.name}</div>
                  <div className="text-xs font-normal text-muted-foreground">{profile.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate({ to: "/profile" })}>Profile</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate({ to: "/settings" })}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setConfirmLogout(true)}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main key={path} className="page-enter mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

      <ConfirmDialog
        open={confirmLogout}
        onOpenChange={setConfirmLogout}
        title="Sign out of DSIM?"
        description="Your secure session will end. Unsaved investigation notes may be lost."
        confirmLabel="Sign out"
        onConfirm={doLogout}
      />
    </div>
  );
}

function Crumbs({ path }: { path: string }) {
  const parts = path.split("/").filter(Boolean);
  const labels: Record<string, string> = {
    dashboard: "Dashboard",
    complaints: "Incoming Complaints",
    cases: "Cases",
    new: "New Case",
    investigation: "Investigation",
    investigations: "Active Investigations",
    suspensions: "Suspensions",
    returns: "Upcoming Returns",
    profile: "Profile",
    settings: "Settings",
  };
  return (
    <nav aria-label="Breadcrumb" className="hidden min-w-0 items-center gap-1.5 text-sm md:flex">
      {parts.map((p, i) => (
        <span key={i} className="flex items-center gap-1.5 whitespace-nowrap">
          {i > 0 && <span className="text-muted-foreground/50">/</span>}
          <span
            className={cn(
              i === parts.length - 1 ? "font-medium" : "text-muted-foreground",
              (p.startsWith("DSIM") || p.startsWith("CMP")) && "font-mono text-xs",
            )}
          >
            {labels[p] ?? p}
          </span>
        </span>
      ))}
    </nav>
  );
}
