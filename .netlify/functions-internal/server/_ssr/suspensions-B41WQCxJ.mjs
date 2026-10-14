import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as useDsim, n as Button, r as DEPARTMENTS } from "./button-C7ZpzBGx.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Kt as ArrowUpRight, Pt as CircleCheck, T as Search, kt as Clock, o as UserX } from "../_libs/lucide-react.mjs";
import { a as isValid, i as differenceInDays, t as parseISO } from "../_libs/date-fns.mjs";
import { O as StatCard, _ as EmptyState, v as PageHeader, w as SecureTag } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { t as Protected } from "./Protected-DW_nWC7p.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Cd1zWcTd.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { n as RescheduleModal, t as MarkReturnedModal } from "./RescheduleModal-BQUeEBk1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/suspensions-B41WQCxJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SuspensionsPage() {
	const { cases, updateCase, addTimeline } = useDsim();
	const [search, setSearch] = (0, import_react.useState)("");
	const [departmentFilter, setDepartmentFilter] = (0, import_react.useState)("all");
	const [selectedForReturn, setSelectedForReturn] = (0, import_react.useState)(null);
	const [selectedForReschedule, setSelectedForReschedule] = (0, import_react.useState)(null);
	const suspendedCases = (0, import_react.useMemo)(() => {
		const today = /* @__PURE__ */ new Date();
		today.setHours(0, 0, 0, 0);
		return cases.filter((c) => c.status === "Suspended" || c.status === "Awaiting Return" || c.disciplinaryAction === "Suspension").map((c) => {
			let daysRemaining = 0;
			let totalDays = 0;
			try {
				if (c.suspensionStartDate && c.returnDate) {
					const start = parseISO(c.suspensionStartDate);
					const end = parseISO(c.returnDate);
					if (isValid(start) && isValid(end)) totalDays = differenceInDays(end, start);
				}
				if (c.returnDate) {
					const end = parseISO(c.returnDate);
					if (isValid(end)) daysRemaining = differenceInDays(end, today);
				}
			} catch {
				daysRemaining = 0;
			}
			return {
				...c,
				daysRemaining,
				totalDays
			};
		}).filter((c) => {
			if (search.trim()) {
				const q = search.toLowerCase();
				if (!(c.accusedStudent.toLowerCase().includes(q) || c.rollNumber.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.department.toLowerCase().includes(q))) return false;
			}
			if (departmentFilter !== "all" && c.department !== departmentFilter) return false;
			return true;
		});
	}, [
		cases,
		search,
		departmentFilter
	]);
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
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Sanctions Oversight",
				title: "Suspensions Registry",
				subtitle: "Directory of students currently barred from campus facilities and academic sessions.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecureTag, { children: "Enforcement Ledger" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: UserX,
						value: suspendedCases.length,
						label: "Active Suspensions",
						context: "Barred from classes",
						tone: suspendedCases.length > 0 ? "alert" : "default"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Clock,
						value: suspendedCases.filter((c) => c.daysRemaining <= 7 && c.daysRemaining >= 0).length,
						label: "Expiring Within 7 Days",
						context: "Clearance review required"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CircleCheck,
						value: cases.filter((c) => c.status === "Returned").length,
						label: "Reinstated Students",
						context: "Successfully cleared this academic year"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface p-4 flex flex-col sm:flex-row items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full sm:w-80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Search suspended student, roll #, case...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "h-9 pl-8 text-xs bg-card"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2 w-full sm:w-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: departmentFilter,
						onValueChange: setDepartmentFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-9 text-xs w-full sm:w-48",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "All Departments" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							className: "text-xs",
							children: "All Departments"
						}), DEPARTMENTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: d,
							className: "text-xs",
							children: d
						}, d))] })]
					})
				})]
			}),
			suspendedCases.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: UserX,
				title: "No students under active suspension",
				description: "Currently there are no active suspension orders matching your filter criteria."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-b border-border text-left",
							children: [
								"Student & Roll #",
								"Department",
								"Case Reference",
								"Suspension Term",
								"Days Left",
								"Reason",
								"Actions"
							].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "eyebrow whitespace-nowrap px-4 py-3 font-normal",
								children: h
							}, h))
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: suspendedCases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/70 transition-colors last:border-0 hover:bg-muted/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3.5 font-medium whitespace-nowrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-foreground",
										children: c.accusedStudent
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-[0.68rem] text-muted-foreground",
										children: c.rollNumber
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 whitespace-nowrap text-muted-foreground",
									children: c.department
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3.5 whitespace-nowrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/cases/$caseId",
										params: { caseId: c.id },
										className: "font-mono font-medium text-primary hover:underline",
										children: c.id
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-[0.68rem] text-muted-foreground max-w-[140px]",
										children: c.caseName
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3.5 whitespace-nowrap font-mono text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [c.suspensionStartDate || "—", " →"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: c.returnDate || "Indefinite" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 whitespace-nowrap",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-2 py-0.5 font-mono text-[0.68rem] font-bold ${c.daysRemaining <= 0 ? "bg-red-500/15 text-red-600" : c.daysRemaining <= 3 ? "bg-amber-500/15 text-amber-600" : "bg-secondary text-primary"}`,
										children: c.daysRemaining < 0 ? "Overdue" : c.daysRemaining === 0 ? "Today" : `${c.daysRemaining} days`
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 text-muted-foreground max-w-[200px] truncate",
									title: c.actionReason,
									children: c.actionReason || "Disciplinary infraction"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 text-right whitespace-nowrap",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-end gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "outline",
												size: "sm",
												onClick: () => setSelectedForReturn(c),
												className: "h-7 text-[0.7rem] hover:bg-emerald-500/10 hover:text-emerald-600",
												children: "Mark Returned"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => setSelectedForReschedule(c),
												className: "h-7 text-[0.7rem]",
												children: "Reschedule"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												variant: "ghost",
												size: "icon",
												className: "size-7",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/cases/$caseId",
													params: { caseId: c.id },
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })
												})
											})
										]
									})
								})
							]
						}, c.id)) })]
					})
				})
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
export { SuspensionsPage as component };
