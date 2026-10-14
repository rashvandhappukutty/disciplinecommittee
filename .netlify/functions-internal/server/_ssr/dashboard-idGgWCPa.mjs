import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as useDsim, n as Button } from "./button-C7ZpzBGx.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ft as CircleAlert, P as Plus, Pt as CircleCheck, St as FileBox, T as Search, Ut as CalendarClock, _ as Sparkles, dt as FolderOpen, j as Radar, kt as Clock, o as UserX, qt as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as isValid, i as differenceInDays, t as parseISO } from "../_libs/date-fns.mjs";
import { O as StatCard, j as fmtDateTime, w as SecureTag } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { t as Protected } from "./Protected-DW_nWC7p.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { n as RescheduleModal, t as MarkReturnedModal } from "./RescheduleModal-BQUeEBk1.mjs";
import { n as CaseTable } from "./CaseTable-Bo8clG8J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-idGgWCPa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	useNavigate();
	const { cases, complaints, updateCase, addTimeline, currentUser } = useDsim();
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedCaseForReturn, setSelectedCaseForReturn] = (0, import_react.useState)(null);
	const [selectedCaseForReschedule, setSelectedCaseForReschedule] = (0, import_react.useState)(null);
	const greeting = (0, import_react.useMemo)(() => {
		const hr = (/* @__PURE__ */ new Date()).getHours();
		const roleLabel = currentUser?.role || "Committee Head";
		if (hr < 12) return `Good morning, ${roleLabel}`;
		if (hr < 17) return `Good afternoon, ${roleLabel}`;
		return `Good evening, ${roleLabel}`;
	}, [currentUser]);
	const totalCases = cases.length;
	const activeInvestigations = cases.filter((c) => c.status === "Under Investigation").length;
	const pendingDecisions = cases.filter((c) => c.status === "Decision Pending").length;
	const suspendedCount = cases.filter((c) => c.status === "Suspended" || c.status === "Awaiting Return").length;
	const incomingComplaintsTotal = complaints.length;
	const newComplaintsCount = complaints.filter((c) => c.status === "Submitted").length;
	const awaitingReviewCount = complaints.filter((c) => c.status === "Submitted" || c.status === "Under Review").length;
	const urgentComplaints = complaints.filter((c) => (c.status === "Submitted" || c.status === "Under Review") && (c.urgency === "immediate_safety" || c.urgency === "urgent"));
	const upcomingReturns = (0, import_react.useMemo)(() => {
		const today = /* @__PURE__ */ new Date();
		today.setHours(0, 0, 0, 0);
		return cases.filter((c) => c.returnDate && (c.status === "Suspended" || c.status === "Awaiting Return")).map((c) => {
			let daysLeft = 0;
			let urgency = "upcoming";
			try {
				if (c.returnDate) {
					const ret = parseISO(c.returnDate);
					if (isValid(ret)) {
						daysLeft = differenceInDays(ret, today);
						if (daysLeft < 0) urgency = "overdue";
						else if (daysLeft === 0) urgency = "today";
						else if (daysLeft <= 3) urgency = "due-soon";
						else urgency = "upcoming";
					}
				}
			} catch {
				daysLeft = 0;
			}
			return {
				caseRecord: c,
				daysLeft,
				urgency
			};
		}).sort((a, b) => a.daysLeft - b.daysLeft);
	}, [cases]);
	const recentCases = (0, import_react.useMemo)(() => {
		let list = [...cases].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
		if (search.trim()) {
			const q = search.toLowerCase();
			list = list.filter((c) => c.id.toLowerCase().includes(q) || c.caseName.toLowerCase().includes(q) || c.accusedStudent.toLowerCase().includes(q) || c.department.toLowerCase().includes(q) || c.rollNumber.toLowerCase().includes(q));
		}
		return list;
	}, [cases, search]);
	const recentActivities = (0, import_react.useMemo)(() => {
		const activities = [];
		cases.forEach((c) => {
			c.timeline.forEach((t) => {
				activities.push({
					id: t.id,
					caseId: c.id,
					caseName: c.caseName,
					event: t.event,
					...t.description ? { description: t.description } : {},
					timestamp: t.timestamp,
					kind: t.kind
				});
			});
		});
		return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 6);
	}, [cases]);
	const handleMarkReturned = (caseId, notes) => {
		updateCase(caseId, {
			status: "Returned",
			returned: true,
			...notes ? { actionNotes: `Readmission note: ${notes}` } : {}
		});
		addTimeline(caseId, {
			event: "Student reinstated / returned",
			kind: "decision",
			description: notes || "Suspension period completed. Student readmitted."
		});
	};
	const handleReschedule = (caseId, newDate, reason) => {
		updateCase(caseId, { returnDate: newDate });
		addTimeline(caseId, {
			event: `Return date adjusted to ${newDate}`,
			kind: "decision",
			description: reason || "Extension granted by Discipline Committee."
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Protected, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Executive Console"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecureTag, { children: "Strictly Confidential" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight sm:text-3xl text-foreground",
						children: greeting
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Monitor disciplinary investigations, evidence repositories, and upcoming sanctions."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "default",
						className: "gap-2 bg-primary hover:bg-primary/90 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cases/new",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " + Create New Case"]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4 lg:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: FolderOpen,
						value: totalCases,
						label: "Total Cases",
						context: "Across all departments"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Radar,
						value: activeInvestigations,
						label: "Active Investigations",
						context: "Hearings & inquiries in progress",
						tone: activeInvestigations > 0 ? "alert" : "default"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Clock,
						value: pendingDecisions,
						label: "Pending Decisions",
						context: "Awaiting sanction verdict"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: UserX,
						value: suspendedCount,
						label: "Suspended Students",
						context: "Barred from campus"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CalendarClock,
						value: upcomingReturns.length,
						label: "Upcoming Returns",
						context: "Scheduled readmissions"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-gradient-to-r from-card via-card to-primary/[0.03] p-5 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-7 place-items-center rounded-lg bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileBox, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold text-foreground",
									children: "Incoming Complaints"
								}),
								newComplaintsCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full bg-blue-500/15 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400 animate-pulse",
									children: [newComplaintsCount, " New"]
								}),
								urgentComplaints.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full bg-rose-500/15 px-2 py-0.5 text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-3" }),
										" ",
										urgentComplaints.length,
										" Urgent"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Grievances and incident reports submitted by students awaiting institutional triage and committee review."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 rounded-lg border border-border/80 bg-background/80 px-4 py-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-mono text-sm font-bold text-foreground",
										children: incomingComplaintsTotal
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.65rem] text-muted-foreground uppercase tracking-wider",
										children: "Total"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-px bg-border" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-mono text-sm font-bold text-blue-600 dark:text-blue-400",
										children: newComplaintsCount
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.65rem] text-muted-foreground uppercase tracking-wider",
										children: "New"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-px bg-border" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-mono text-sm font-bold text-amber-600 dark:text-amber-400",
										children: awaitingReviewCount
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.65rem] text-muted-foreground uppercase tracking-wider",
										children: "Awaiting Review"
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "default",
							className: "gap-2 bg-primary hover:bg-primary/90 text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/complaints",
								children: ["View Complaints ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-semibold text-foreground",
							children: "Recent Cases"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Latest active disciplinary investigations and proceedings."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full sm:w-64",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Filter cases, roll #, name...",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "h-8 pl-8 text-xs bg-card"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseTable, { cases: recentCases.slice(0, 5) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-t border-border bg-muted/20 px-4 py-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									"Showing ",
									Math.min(5, recentCases.length),
									" of ",
									cases.length,
									" cases"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "ghost",
								size: "sm",
								className: "h-7 text-xs gap-1 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/cases",
									children: ["View All Cases ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
								})
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-semibold text-foreground",
							children: "Upcoming Returns"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Students returning from suspension"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							className: "h-7 text-xs text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/returns",
								children: "View All →"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: upcomingReturns.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface p-6 text-center text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-6 mx-auto mb-2 text-emerald-500/60" }), "No pending student returns in the queue."]
						}) : upcomingReturns.slice(0, 3).map(({ caseRecord: c, daysLeft, urgency }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface p-4 space-y-3 hover:border-border/90 transition-all",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-sm text-foreground",
										children: c.accusedStudent
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground font-mono",
										children: [
											c.department,
											" · ",
											c.rollNumber
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold ${urgency === "today" ? "bg-emerald-500/15 text-emerald-600" : urgency === "overdue" ? "bg-red-500/15 text-red-600" : urgency === "due-soon" ? "bg-amber-500/15 text-amber-600" : "bg-secondary text-primary"}`,
										children: urgency === "today" ? "Return Today" : urgency === "overdue" ? "Overdue" : `${daysLeft} days remaining`
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-2 font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Return: ", c.returnDate] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.68rem]",
										children: c.id
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => setSelectedCaseForReturn(c),
										className: "h-7 text-xs gap-1 hover:bg-emerald-500/10 hover:text-emerald-600",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Mark Returned"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => setSelectedCaseForReschedule(c),
										className: "h-7 text-xs",
										children: "Reschedule"
									})]
								})
							]
						}, c.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface p-6 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-semibold text-foreground",
							children: "Recent Investigation Activity"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-muted-foreground",
						children: "Audit history trail"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
					children: recentActivities.map((act) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/80 bg-background/50 p-3.5 text-xs space-y-1.5 transition-colors hover:bg-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[0.68rem] font-bold text-primary",
									children: act.caseId
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.68rem] text-muted-foreground",
									children: fmtDateTime(act.timestamp)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-foreground",
								children: act.event
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "line-clamp-2 text-muted-foreground text-[0.72rem]",
								children: act.description || `Activity logged on ${act.caseName}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/cases/$caseId",
									params: { caseId: act.caseId },
									className: "inline-flex items-center gap-1 text-[0.7rem] font-medium text-primary hover:underline",
									children: "Inspect Case →"
								})
							})
						]
					}, act.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkReturnedModal, {
				caseRecord: selectedCaseForReturn,
				open: !!selectedCaseForReturn,
				onOpenChange: (open) => !open && setSelectedCaseForReturn(null),
				onConfirm: handleMarkReturned
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RescheduleModal, {
				caseRecord: selectedCaseForReschedule,
				open: !!selectedCaseForReschedule,
				onOpenChange: (open) => !open && setSelectedCaseForReschedule(null),
				onReschedule: handleReschedule
			})
		]
	}) });
}
//#endregion
export { DashboardPage as component };
