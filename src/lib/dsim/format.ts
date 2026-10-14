import { differenceInCalendarDays, format } from "date-fns";
import type { CaseRecord } from "./types";

export const fmtDate = (s?: string) => (s ? format(new Date(s), "dd MMM yyyy") : "—");
export const fmtTime = (s?: string) => (s ? format(new Date(s), "hh:mm a") : "—");
export const fmtDateTime = (s?: string) => (s ? format(new Date(s), "dd MMM yyyy, hh:mm a") : "—");

export const fmtClock = (sec: number) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
};

export const fmtShortClock = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const daysBetween = (a?: string, b?: string) =>
  a && b ? differenceInCalendarDays(new Date(b), new Date(a)) : 0;

export type ReturnUrgency = "Upcoming" | "Due Soon" | "Today" | "Overdue" | "Returned";

export function returnUrgency(c: CaseRecord): ReturnUrgency {
  if (c.returned) return "Returned";
  const d = differenceInCalendarDays(new Date(c.returnDate!), new Date());
  if (d < 0) return "Overdue";
  if (d === 0) return "Today";
  if (d <= 3) return "Due Soon";
  return "Upcoming";
}

export function daysRemainingLabel(c: CaseRecord) {
  if (c.returned) return "Returned to campus";
  const d = differenceInCalendarDays(new Date(c.returnDate!), new Date());
  if (d < 0) return `${Math.abs(d)} day${d === -1 ? "" : "s"} overdue`;
  if (d === 0) return "Return today";
  return `${d} day${d === 1 ? "" : "s"} remaining`;
}

export const initials = (n: string) =>
  n.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
