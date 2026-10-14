import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as useDsim, n as Button, u as cn } from "./button-C7ZpzBGx.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as Lock, Lt as ChevronRight, Pt as CircleCheck, S as ShieldAlert, T as Search, it as Inbox, kt as Clock, u as TriangleAlert, ut as FolderPlus } from "../_libs/lucide-react.mjs";
import { A as fmtDate } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { t as Protected } from "./Protected-DW_nWC7p.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Cd1zWcTd.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { n as COMPLAINT_CATEGORIES } from "./types-BJyJLv_7.mjs";
import { t as ComplaintStatusBadge } from "./student.dashboard-DTR9e2n-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/complaints.index-Bk2oaF0Y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ComplaintsIndexRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Protected, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintsIndexPage, {}) });
}
function ComplaintsIndexPage() {
	const { complaints } = useDsim();
	const navigate = useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusTab, setStatusTab] = (0, import_react.useState)("all");
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("all");
	const [urgencyFilter, setUrgencyFilter] = (0, import_react.useState)("all");
	const filteredComplaints = (0, import_react.useMemo)(() => {
		return complaints.filter((c) => {
			if (statusTab !== "all") {
				if (statusTab === "pending") {
					if (c.status !== "Submitted" && c.status !== "Under Review") return false;
				} else if (statusTab === "info_requested") {
					if (c.status !== "Additional Information Requested") return false;
				} else if (statusTab === "accepted") {
					if (c.status !== "Accepted") return false;
				} else if (statusTab === "converted") {
					if (c.status !== "Converted to Case") return false;
				} else if (statusTab === "rejected") {
					if (c.status !== "Rejected") return false;
				} else if (c.status !== statusTab) return false;
			}
			if (categoryFilter !== "all" && c.category !== categoryFilter) return false;
			if (urgencyFilter !== "all" && c.urgency !== urgencyFilter) return false;
			if (search.trim()) {
				const q = search.toLowerCase();
				if (!(c.id.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.studentName.toLowerCase().includes(q) || c.studentRoll.toLowerCase().includes(q) || c.location.toLowerCase().includes(q) || c.personsInvolved.some((p) => p.name.toLowerCase().includes(q)))) return false;
			}
			return true;
		});
	}, [
		complaints,
		statusTab,
		categoryFilter,
		urgencyFilter,
		search
	]);
	const newCount = complaints.filter((c) => c.status === "Submitted" || c.status === "Under Review").length;
	const infoRequestedCount = complaints.filter((c) => c.status === "Additional Information Requested").length;
	const acceptedCount = complaints.filter((c) => c.status === "Accepted").length;
	const convertedCount = complaints.filter((c) => c.status === "Converted to Case").length;
	const urgentCount = complaints.filter((c) => c.urgency === "urgent" || c.urgency === "immediate_safety").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight text-foreground",
						children: "Incoming Student Complaints"
					}), newCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-destructive text-destructive-foreground font-mono text-xs font-bold px-2.5 py-0.5 animate-pulse",
						children: [newCount, " Pending"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "Review submitted student reports, verify preliminary evidence, and convert substantiated complaints into disciplinary cases."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cases/new",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "text-xs",
							children: "+ Direct Case Entry"
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-5 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => setStatusTab("pending"),
						className: cn("rounded-xl border p-3.5 bg-card transition-all cursor-pointer", statusTab === "pending" ? "border-primary ring-1 ring-primary" : "border-border hover:border-border/80"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Pending Review"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-amber-500" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400",
								children: newCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[0.68rem] text-muted-foreground",
								children: "Requires intake decision"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => setStatusTab("info_requested"),
						className: cn("rounded-xl border p-3.5 bg-card transition-all cursor-pointer", statusTab === "info_requested" ? "border-primary ring-1 ring-primary" : "border-border hover:border-border/80"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Info Requested"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4 text-orange-500" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-2xl font-bold tracking-tight text-orange-600 dark:text-orange-400",
								children: infoRequestedCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[0.68rem] text-muted-foreground",
								children: "Awaiting student reply"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => setStatusTab("accepted"),
						className: cn("rounded-xl border p-3.5 bg-card transition-all cursor-pointer", statusTab === "accepted" ? "border-primary ring-1 ring-primary" : "border-border hover:border-border/80"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Accepted"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400",
								children: acceptedCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[0.68rem] text-muted-foreground",
								children: "Ready for case conversion"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => setStatusTab("converted"),
						className: cn("rounded-xl border p-3.5 bg-card transition-all cursor-pointer", statusTab === "converted" ? "border-primary ring-1 ring-primary" : "border-border hover:border-border/80"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Converted to Cases"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, { className: "size-4 text-purple-500" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-2xl font-bold tracking-tight text-purple-600 dark:text-purple-400",
								children: convertedCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[0.68rem] text-muted-foreground",
								children: "Active DSIM inquiries"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => {
							setUrgencyFilter("urgent");
							setStatusTab("all");
						},
						className: cn("rounded-xl border p-3.5 bg-card transition-all cursor-pointer col-span-2 sm:col-span-1", urgencyFilter === "urgent" ? "border-destructive ring-1 ring-destructive" : "border-border hover:border-border/80"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Urgent / Safety"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-destructive" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-2xl font-bold tracking-tight text-destructive",
								children: urgentCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[0.68rem] text-muted-foreground",
								children: "High priority intake"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 border-b border-border space-y-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col lg:flex-row lg:items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center gap-1.5 text-xs",
							children: [
								{
									key: "all",
									label: `All (${complaints.length})`
								},
								{
									key: "pending",
									label: `Pending Review (${newCount})`
								},
								{
									key: "info_requested",
									label: `Info Requested (${infoRequestedCount})`
								},
								{
									key: "accepted",
									label: `Accepted (${acceptedCount})`
								},
								{
									key: "converted",
									label: `Converted (${convertedCount})`
								},
								{
									key: "rejected",
									label: "Rejected"
								}
							].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setStatusTab(tab.key),
								className: cn("rounded-lg px-3 py-1.5 font-medium transition-colors", statusTab === tab.key ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"),
								children: tab.label
							}, tab.key))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative min-w-[220px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Search complaints, students...",
										value: search,
										onChange: (e) => setSearch(e.target.value),
										className: "h-8 pl-8 text-xs bg-background"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: categoryFilter,
									onValueChange: setCategoryFilter,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "h-8 text-xs w-[140px] bg-background",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Category" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "all",
										className: "text-xs",
										children: "All Categories"
									}), COMPLAINT_CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: cat,
										className: "text-xs",
										children: cat
									}, cat))] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: urgencyFilter,
									onValueChange: setUrgencyFilter,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "h-8 text-xs w-[130px] bg-background",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Urgency" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "all",
											className: "text-xs",
											children: "All Urgencies"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "normal",
											className: "text-xs",
											children: "Normal"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "urgent",
											className: "text-xs",
											children: "Urgent"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "immediate_safety",
											className: "text-xs",
											children: "Immediate Safety"
										})
									] })]
								})
							]
						})]
					})
				}), filteredComplaints.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-16 text-center px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "mx-auto size-10 text-muted-foreground mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-semibold text-foreground",
							children: "No complaints match criteria"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Adjust filters or search query to view submissions."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-muted/40 text-[0.7rem] uppercase tracking-wider text-muted-foreground font-semibold border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Complaint ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Reported Incident"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Complainant"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Person(s) Reported"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Urgency"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Submitted"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 text-right",
									children: "Review Action"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/60",
							children: filteredComplaints.map((c) => {
								const primaryPerson = c.personsInvolved.find((p) => p.isPrimary) || c.personsInvolved[0];
								const isUrgent = c.urgency === "urgent" || c.urgency === "immediate_safety";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									onClick: () => navigate({
										to: "/complaints/$complaintId",
										params: { complaintId: c.id }
									}),
									className: cn("transition-colors hover:bg-muted/50 cursor-pointer", c.status === "Submitted" && "bg-blue-500/[0.03]", isUrgent && "border-l-2 border-l-destructive"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3.5 px-4 font-mono font-bold text-foreground",
											children: c.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-3.5 px-4 max-w-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-foreground truncate",
												children: c.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[0.7rem] text-muted-foreground truncate",
												children: [
													c.location,
													" · ",
													c.category
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-3.5 px-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-medium text-foreground",
												children: c.privacyPreference === "anonymous_to_reported" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 text-primary",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3" }),
														" ",
														c.studentName
													]
												}) : c.studentName
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[0.7rem] text-muted-foreground font-mono",
												children: [
													c.studentRoll,
													" (",
													c.studentDepartment,
													")"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-3.5 px-4 max-w-[180px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-foreground truncate",
												children: primaryPerson?.unknownDetails ? "Unidentified Subject" : primaryPerson?.name
											}), c.personsInvolved.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[0.68rem] text-muted-foreground",
												children: [
													"+",
													c.personsInvolved.length - 1,
													" other individual(s)"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3.5 px-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("rounded px-2 py-0.5 text-[0.68rem] font-bold uppercase", c.urgency === "immediate_safety" ? "bg-destructive/15 text-destructive" : c.urgency === "urgent" ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" : "bg-muted text-muted-foreground"),
												children: c.urgency.replace(/_/g, " ")
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3.5 px-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintStatusBadge, { status: c.status })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3.5 px-4 text-muted-foreground text-[0.72rem]",
											children: fmtDate(c.submittedAt)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3.5 px-4 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "ghost",
												size: "sm",
												className: "text-xs text-primary hover:text-primary hover:bg-primary/10 gap-1 font-semibold",
												onClick: (e) => {
													e.stopPropagation();
													navigate({
														to: "/complaints/$complaintId",
														params: { complaintId: c.id }
													});
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Review" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })]
											})
										})
									]
								}, c.id);
							})
						})]
					})
				})]
			})
		]
	});
}
//#endregion
export { ComplaintsIndexRoute as component };
