import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as useDsim, n as Button } from "./button-C7ZpzBGx.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Kt as ArrowUpRight, Pt as CircleCheck, T as Search, Ut as CalendarClock, Wt as Bell, c as UserCheck, kt as Clock } from "../_libs/lucide-react.mjs";
import { a as isValid, i as differenceInDays, t as parseISO } from "../_libs/date-fns.mjs";
import { _ as EmptyState, v as PageHeader, w as SecureTag } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { t as Protected } from "./Protected-DW_nWC7p.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-Ce6ny-d0.mjs";
import { n as RescheduleModal, t as MarkReturnedModal } from "./RescheduleModal-BQUeEBk1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/returns-BAFDlVFq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReturnsPage() {
	const { cases, updateCase, addTimeline } = useDsim();
	const [search, setSearch] = (0, import_react.useState)("");
	const [urgencyFilter, setUrgencyFilter] = (0, import_react.useState)("all");
	const [selectedForReturn, setSelectedForReturn] = (0, import_react.useState)(null);
	const [selectedForReschedule, setSelectedForReschedule] = (0, import_react.useState)(null);
	const returnItems = (0, import_react.useMemo)(() => {
		const today = /* @__PURE__ */ new Date();
		today.setHours(0, 0, 0, 0);
		return cases.filter((c) => c.returnDate || c.status === "Returned").map((c) => {
			let daysLeft = 0;
			let urgency = "upcoming";
			let reminderMessage = "";
			if (c.status === "Returned" || c.returned) {
				urgency = "returned";
				reminderMessage = `${c.accusedStudent} has been cleared and readmitted to campus.`;
			} else if (c.returnDate) try {
				const ret = parseISO(c.returnDate);
				if (isValid(ret)) {
					daysLeft = differenceInDays(ret, today);
					if (daysLeft < 0) {
						urgency = "overdue";
						reminderMessage = `${c.accusedStudent}'s return date has passed (${Math.abs(daysLeft)} days overdue). Please update the case.`;
					} else if (daysLeft === 0) {
						urgency = "today";
						reminderMessage = `${c.accusedStudent} is expected to return today. Conduct readmission briefing.`;
					} else if (daysLeft === 1) {
						urgency = "due-soon";
						reminderMessage = `${c.accusedStudent} is expected to return tomorrow.`;
					} else if (daysLeft <= 3) {
						urgency = "due-soon";
						reminderMessage = `${c.accusedStudent}'s return date is approaching in ${daysLeft} days.`;
					} else if (daysLeft <= 7) {
						urgency = "upcoming";
						reminderMessage = `${c.accusedStudent}'s suspension ends in ${daysLeft} days.`;
					} else {
						urgency = "upcoming";
						reminderMessage = `Suspension active. Scheduled return on ${c.returnDate}.`;
					}
				}
			} catch {
				daysLeft = 0;
				reminderMessage = "Return date pending calculation.";
			}
			return {
				caseRecord: c,
				daysLeft,
				urgency,
				reminderMessage
			};
		}).filter(({ caseRecord: c, urgency }) => {
			if (search.trim()) {
				const q = search.toLowerCase();
				if (!(c.accusedStudent.toLowerCase().includes(q) || c.rollNumber.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.department.toLowerCase().includes(q))) return false;
			}
			if (urgencyFilter !== "all") {
				if (urgencyFilter === "pending") {
					if (urgency === "returned") return false;
				} else if (urgency !== urgencyFilter) return false;
			}
			return true;
		}).sort((a, b) => {
			if (a.urgency === "returned" && b.urgency !== "returned") return 1;
			if (b.urgency === "returned" && a.urgency !== "returned") return -1;
			return a.daysLeft - b.daysLeft;
		});
	}, [
		cases,
		search,
		urgencyFilter
	]);
	const handleMarkReturned = (caseId, notes) => {
		updateCase(caseId, {
			status: "Returned",
			returned: true,
			actualReturnDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			actualReturnTime: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
			returnRemarks: notes
		});
		addTimeline(caseId, {
			event: "Student reinstated / returned",
			kind: "return",
			description: notes || "Suspension period completed. Student readmitted."
		});
	};
	const handleReschedule = (caseId, newDate, reason) => {
		const prevDate = cases.find((x) => x.id === caseId)?.returnDate;
		updateCase(caseId, { returnDate: newDate });
		addTimeline(caseId, {
			event: `Return date adjusted to ${newDate}`,
			kind: "decision",
			description: `Return date changed from ${prevDate || "N/A"} to ${newDate}. Reason: ${reason}`
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Protected, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Readmission Tracking",
				title: "Upcoming Returns & Clearance Schedule",
				subtitle: "Track suspension terms, automated countdown alerts, and clearance protocols for students returning to campus.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecureTag, { children: "Readmission Oversight" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface p-4 border border-primary/20 bg-primary/5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-semibold text-xs text-foreground",
						children: "Automated Return Reminder Protocol Active"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.68rem] text-muted-foreground",
						children: "Notifications scheduled automatically at 7-day, 3-day, 1-day, and Day-Of milestones."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2 text-xs font-mono",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-medium text-[0.68rem]",
						children: ["Today: ", (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, {
							month: "short",
							day: "numeric",
							year: "numeric"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					value: urgencyFilter,
					onValueChange: setUrgencyFilter,
					className: "w-full sm:w-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "grid grid-cols-5 w-full sm:w-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "all",
								className: "text-xs",
								children: [
									"All (",
									cases.filter((c) => c.returnDate || c.status === "Returned").length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "pending",
								className: "text-xs",
								children: "Awaiting"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "today",
								className: "text-xs",
								children: "Today"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "due-soon",
								className: "text-xs",
								children: "Due Soon"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "returned",
								className: "text-xs",
								children: "Returned"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full sm:w-72",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Filter by name, roll #, case ID...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "h-9 pl-8 text-xs bg-card"
					})]
				})]
			}),
			returnItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: CalendarClock,
				title: "No students match the return criteria",
				description: "All suspension terms are either cleared or not scheduled in this window."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: returnItems.map(({ caseRecord: c, daysLeft, urgency, reminderMessage }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `surface flex flex-col justify-between p-5 space-y-4 transition-all hover:shadow-md ${urgency === "today" ? "border-emerald-500/50 bg-emerald-500/5 ring-1 ring-emerald-500/20" : urgency === "overdue" ? "border-red-500/50 bg-red-500/5 ring-1 ring-red-500/20" : urgency === "due-soon" ? "border-amber-500/50 bg-amber-500/5 ring-1 ring-amber-500/20" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-base text-foreground",
								children: c.accusedStudent
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-xs text-muted-foreground",
								children: [
									c.rollNumber,
									" · ",
									c.department
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold ${urgency === "returned" ? "bg-slate-500/15 text-slate-600" : urgency === "today" ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 animate-pulse" : urgency === "overdue" ? "bg-red-500/20 text-red-700 dark:text-red-300" : urgency === "due-soon" ? "bg-amber-500/20 text-amber-700 dark:text-amber-300" : "bg-secondary text-primary"}`,
								children: urgency === "returned" ? "Returned" : urgency === "today" ? "Return Today" : urgency === "overdue" ? `Overdue (${Math.abs(daysLeft)}d)` : `${daysLeft} days remaining`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2.5 rounded bg-muted/40 p-2 text-[0.68rem] text-muted-foreground flex items-center gap-1.5 border border-border/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "line-clamp-2",
								children: reminderMessage
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 rounded-lg border border-border/60 bg-card p-3 text-xs space-y-1.5 font-sans",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Case Reference:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/cases/$caseId",
										params: { caseId: c.id },
										className: "font-mono font-medium text-primary hover:underline",
										children: c.id
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground line-clamp-1",
									children: c.caseName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border/40 pt-1.5 flex justify-between font-mono text-[0.68rem]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Term:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										c.suspensionStartDate || "—",
										" → ",
										c.returnDate
									] })]
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-t border-border/60 pt-3 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							className: "h-7 text-xs px-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cases/$caseId",
								params: { caseId: c.id },
								children: ["View Case ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5 ml-1" })]
							})
						}), urgency !== "returned" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setSelectedForReschedule(c),
								className: "h-7 text-xs px-2",
								children: "Reschedule"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => setSelectedForReturn(c),
								className: "h-7 text-xs px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-3" }), " Mark Returned"]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 font-mono text-[0.68rem] text-emerald-600 font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), " Readmitted"]
						})]
					})]
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkReturnedModal, {
				caseRecord: selectedForReturn,
				open: !!selectedForReturn,
				onOpenChange: (open) => !open && setSelectedForReturn(null),
				onConfirm: handleMarkReturned
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RescheduleModal, {
				caseRecord: selectedForReschedule,
				open: !!selectedForReschedule,
				onOpenChange: (open) => !open && setSelectedForReschedule(null),
				onReschedule: handleReschedule
			})
		]
	}) });
}
//#endregion
export { ReturnsPage as component };
