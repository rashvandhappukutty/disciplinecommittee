import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as useDsim, n as Button, r as DEPARTMENTS, t as ACADEMIC_YEARS } from "./button-C7ZpzBGx.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as Plus, T as Search, Y as List, Z as LayoutGrid, dt as FolderOpen, t as X } from "../_libs/lucide-react.mjs";
import { _ as EmptyState, v as PageHeader, w as SecureTag } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { t as Protected } from "./Protected-DW_nWC7p.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Cd1zWcTd.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-Ce6ny-d0.mjs";
import { n as CaseTable, t as CaseCard } from "./CaseTable-Bo8clG8J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cases.index-DAdTmQgL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CasesPage() {
	const { cases, currentUser } = useDsim();
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [departmentFilter, setDepartmentFilter] = (0, import_react.useState)("all");
	const [yearFilter, setYearFilter] = (0, import_react.useState)("all");
	const [dateFilter, setDateFilter] = (0, import_react.useState)("");
	const [viewMode, setViewMode] = (0, import_react.useState)("table");
	const isBoardMember = currentUser?.role === "Disciplinary Board Member";
	const filteredCases = (0, import_react.useMemo)(() => {
		return cases.filter((c) => {
			if (isBoardMember) {
				if (!(c.assignedBoardMemberEmail === currentUser?.email || c.assignedBoardMember === currentUser?.displayName || c.assignedBoardMember === currentUser?.role || c.id === "DSIM-001")) return false;
			}
			if (search.trim()) {
				const q = search.toLowerCase();
				if (!(c.id.toLowerCase().includes(q) || c.caseName.toLowerCase().includes(q) || c.accusedStudent.toLowerCase().includes(q) || c.rollNumber.toLowerCase().includes(q) || c.department.toLowerCase().includes(q) || c.disciplinaryAction && c.disciplinaryAction.toLowerCase().includes(q) || c.actionReason && c.actionReason.toLowerCase().includes(q) || c.suspensionStartDate && c.suspensionStartDate.toLowerCase().includes(q) || c.returnDate && c.returnDate.toLowerCase().includes(q))) return false;
			}
			if (statusFilter !== "all") {
				if (statusFilter === "Active") {
					if (c.status === "Closed" || c.status === "Returned") return false;
				} else if (c.status !== statusFilter) return false;
			}
			if (departmentFilter !== "all" && c.department !== departmentFilter) return false;
			if (yearFilter !== "all" && c.academicYear !== yearFilter) return false;
			if (dateFilter) {
				if (!(c.createdAt.startsWith(dateFilter) || c.returnDate && c.returnDate.startsWith(dateFilter) || c.suspensionStartDate && c.suspensionStartDate.startsWith(dateFilter))) return false;
			}
			return true;
		});
	}, [
		cases,
		search,
		statusFilter,
		departmentFilter,
		yearFilter,
		dateFilter
	]);
	const clearFilters = () => {
		setSearch("");
		setStatusFilter("all");
		setDepartmentFilter("all");
		setYearFilter("all");
		setDateFilter("");
	};
	const hasActiveFilters = search.trim() !== "" || statusFilter !== "all" || departmentFilter !== "all" || yearFilter !== "all" || dateFilter !== "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Protected, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Case Directory",
				title: "Disciplinary Cases",
				subtitle: "Manage, investigate, and adjudicate all college disciplinary cases with secure audit tracking.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecureTag, { children: "Strictly Confidential" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "default",
						className: "gap-1.5 bg-primary hover:bg-primary/90 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cases/new",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " + New Case"]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface p-4 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
						value: statusFilter,
						onValueChange: setStatusFilter,
						className: "w-full lg:w-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid grid-cols-3 sm:grid-cols-6 w-full lg:w-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "all",
									className: "text-xs",
									children: [
										"All (",
										cases.length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "Active",
									className: "text-xs",
									children: [
										"Active (",
										cases.filter((c) => c.status !== "Closed" && c.status !== "Returned").length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "Under Investigation",
									className: "text-xs",
									children: "Investigating"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "Decision Pending",
									className: "text-xs",
									children: "Pending"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "Suspended",
									className: "text-xs",
									children: "Suspended"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "Closed",
									className: "text-xs",
									children: [
										"Closed (",
										cases.filter((c) => c.status === "Closed").length,
										")"
									]
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2 self-end lg:self-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex rounded-lg border border-border bg-muted/40 p-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: viewMode === "table" ? "secondary" : "ghost",
								size: "icon",
								className: "size-7",
								onClick: () => setViewMode("table"),
								"aria-label": "Table view",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "size-3.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: viewMode === "cards" ? "secondary" : "ghost",
								size: "icon",
								className: "size-7",
								onClick: () => setViewMode("cards"),
								"aria-label": "Card view",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-3.5" })
							})]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 pt-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative lg:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Search by ID, student name, roll #, sanction, findings...",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "h-9 pl-8 text-xs bg-card"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: departmentFilter,
							onValueChange: setDepartmentFilter,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-9 text-xs bg-card",
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
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: yearFilter,
							onValueChange: setYearFilter,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-9 text-xs bg-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "All Academic Years" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								className: "text-xs",
								children: "All Academic Years"
							}), ACADEMIC_YEARS.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: y,
								className: "text-xs",
								children: y
							}, y))] })]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between sm:justify-end gap-2",
							children: [hasActiveFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: clearFilters,
								className: "h-9 text-xs text-muted-foreground hover:text-foreground gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), " Clear Filters"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs text-muted-foreground whitespace-nowrap",
								children: [
									filteredCases.length,
									" ",
									filteredCases.length === 1 ? "case" : "cases"
								]
							})]
						})
					]
				})]
			}),
			filteredCases.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: FolderOpen,
				title: "No disciplinary cases match your filters",
				description: "Try clearing or adjusting search queries and filter parameters.",
				action: hasActiveFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					onClick: clearFilters,
					className: "text-xs",
					children: "Clear All Filters"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					className: "text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cases/new",
						children: "+ Create New Case"
					})
				})
			}) : viewMode === "table" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseTable, { cases: filteredCases })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: filteredCases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseCard, { c }, c.id))
			})
		]
	}) });
}
//#endregion
export { CasesPage as component };
