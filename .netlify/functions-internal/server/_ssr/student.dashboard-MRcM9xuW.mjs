import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as useDsim, n as Button, u as cn } from "./button-C7ZpzBGx.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as ChevronRight, Pt as CircleCheck, S as ShieldAlert, T as Search, it as Inbox, j as Radar, kt as Clock, vt as FilePlus, x as ShieldCheck } from "../_libs/lucide-react.mjs";
import { A as fmtDate } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { t as StudentProtected } from "./StudentProtected-BxPSUqrJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.dashboard-MRcM9xuW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudentDashboardRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentProtected, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentDashboardPage, {}) });
}
function StudentDashboardPage() {
	const { studentProfile, complaints } = useDsim();
	const navigate = useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const myComplaints = (0, import_react.useMemo)(() => {
		return complaints.filter((c) => {
			if (!(c.studentRoll.toLowerCase() === studentProfile.rollNumber.toLowerCase() || c.studentId === studentProfile.id || c.studentEmail.toLowerCase() === studentProfile.email.toLowerCase())) return false;
			if (search.trim()) {
				const query = search.toLowerCase();
				if (!(c.id.toLowerCase().includes(query) || c.title.toLowerCase().includes(query) || c.category.toLowerCase().includes(query) || c.location.toLowerCase().includes(query))) return false;
			}
			if (statusFilter !== "all") {
				if (statusFilter === "under_review") return c.status === "Submitted" || c.status === "Under Review" || c.status === "Additional Information Requested";
				if (statusFilter === "investigation") return c.status === "Accepted" || c.status === "Investigation in Progress" || c.status === "Converted to Case";
				if (statusFilter === "resolved") return c.status === "Resolved" || c.status === "Closed" || c.status === "Decision Made" || c.status === "Rejected";
			}
			return true;
		});
	}, [
		complaints,
		studentProfile,
		search,
		statusFilter
	]);
	const totalCount = complaints.filter((c) => c.studentRoll.toLowerCase() === studentProfile.rollNumber.toLowerCase() || c.studentId === studentProfile.id).length;
	const underReviewCount = complaints.filter((c) => (c.studentRoll.toLowerCase() === studentProfile.rollNumber.toLowerCase() || c.studentId === studentProfile.id) && (c.status === "Submitted" || c.status === "Under Review" || c.status === "Additional Information Requested")).length;
	const investigationCount = complaints.filter((c) => (c.studentRoll.toLowerCase() === studentProfile.rollNumber.toLowerCase() || c.studentId === studentProfile.id) && (c.status === "Accepted" || c.status === "Investigation in Progress" || c.status === "Converted to Case")).length;
	const resolvedCount = complaints.filter((c) => (c.studentRoll.toLowerCase() === studentProfile.rollNumber.toLowerCase() || c.studentId === studentProfile.id) && (c.status === "Resolved" || c.status === "Closed" || c.status === "Decision Made" || c.status === "Rejected")).length;
	const needsActionCount = complaints.filter((c) => (c.studentRoll.toLowerCase() === studentProfile.rollNumber.toLowerCase() || c.studentId === studentProfile.id) && c.status === "Additional Information Requested").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-2xl font-bold tracking-tight text-foreground",
						children: ["Welcome, ", studentProfile.name]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground",
						children: studentProfile.rollNumber
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "Submit and track your disciplinary complaints securely."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => navigate({ to: "/student/complaints/new" }),
						className: "bg-primary hover:bg-primary/90 text-xs font-semibold gap-2 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlus, { className: "size-4" }), "+ Raise a Complaint"]
					})
				})]
			}),
			needsActionCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-amber-900 dark:text-amber-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-xs font-bold uppercase tracking-wider",
							children: [
								"Action Required: Additional Information Requested (",
								needsActionCount,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground text-amber-800 dark:text-amber-300",
							children: "The Discipline Committee has requested additional details regarding your active complaint. Please provide the required clarification so the review can continue."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setStatusFilter("under_review"),
						className: "shrink-0 border-amber-500/40 text-xs font-semibold hover:bg-amber-500/20",
						children: "Review Requests"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 transition-all hover:border-border/80 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Total Complaints"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "size-4 text-primary" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-2xl font-bold tracking-tight text-foreground",
								children: totalCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[0.7rem] text-muted-foreground",
								children: "Submitted by your account"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 transition-all hover:border-border/80 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Under Review"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-amber-500" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400",
								children: underReviewCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[0.7rem] text-muted-foreground",
								children: "Awaiting committee assessment"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 transition-all hover:border-border/80 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "In Progress"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "size-4 text-blue-500" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400",
								children: investigationCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[0.7rem] text-muted-foreground",
								children: "Active inquiry / hearing"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 transition-all hover:border-border/80 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Resolved"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400",
								children: resolvedCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[0.7rem] text-muted-foreground",
								children: "Concluded & closed"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold text-foreground",
						children: "My Complaints"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.72rem] text-muted-foreground",
						children: "Official records of your submitted reports and their real-time investigation stages."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-w-[200px] max-w-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Search complaints...",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "h-8 pl-8 text-xs bg-background"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center rounded-lg border border-border bg-background p-0.5 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setStatusFilter("all"),
									className: cn("rounded-md px-2.5 py-1 transition-colors", statusFilter === "all" ? "bg-muted text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"),
									children: [
										"All (",
										totalCount,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setStatusFilter("under_review"),
									className: cn("rounded-md px-2.5 py-1 transition-colors", statusFilter === "under_review" ? "bg-muted text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"),
									children: [
										"Under Review (",
										underReviewCount,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setStatusFilter("investigation"),
									className: cn("rounded-md px-2.5 py-1 transition-colors", statusFilter === "investigation" ? "bg-muted text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"),
									children: [
										"In Progress (",
										investigationCount,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setStatusFilter("resolved"),
									className: cn("rounded-md px-2.5 py-1 transition-colors", statusFilter === "resolved" ? "bg-muted text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"),
									children: [
										"Resolved (",
										resolvedCount,
										")"
									]
								})
							]
						})]
					})]
				}), myComplaints.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-16 text-center px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto grid size-12 place-items-center rounded-full bg-muted text-muted-foreground mb-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "size-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-semibold text-foreground",
							children: "No complaints found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground max-w-sm mx-auto",
							children: search || statusFilter !== "all" ? "No complaints match your current search or filter." : "If you need to report a disciplinary concern, you can securely submit a complaint to the Discipline Committee."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => navigate({ to: "/student/complaints/new" }),
								className: "text-xs bg-primary hover:bg-primary/90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlus, { className: "size-3.5 mr-1.5" }), " Raise a Complaint"]
							})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y divide-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden md:block overflow-x-auto",
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
										children: "Subject / Title"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4",
										children: "Category"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4",
										children: "Submitted Date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4",
										children: "Current Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4",
										children: "Last Updated"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-4 text-right",
										children: "Action"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border/60",
								children: myComplaints.map((c) => {
									const hasActionNeeded = c.status === "Additional Information Requested";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: cn("transition-colors hover:bg-muted/50 cursor-pointer", hasActionNeeded && "bg-amber-500/5"),
										onClick: () => navigate({
											to: "/student/complaints/$complaintId",
											params: { complaintId: c.id }
										}),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3.5 px-4 font-mono font-bold text-foreground",
												children: c.id
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3.5 px-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-foreground truncate max-w-xs",
													children: c.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[0.7rem] text-muted-foreground truncate max-w-xs",
													children: c.location
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3.5 px-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded bg-secondary px-2 py-0.5 text-[0.7rem] font-medium text-secondary-foreground",
													children: c.category
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3.5 px-4 text-muted-foreground",
												children: fmtDate(c.submittedAt)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3.5 px-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintStatusBadge, { status: c.status })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3.5 px-4 text-[0.7rem] text-muted-foreground",
												children: fmtDate(c.updatedAt)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3.5 px-4 text-right",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													variant: "ghost",
													size: "sm",
													className: "text-xs text-primary hover:text-primary hover:bg-primary/10 gap-1",
													onClick: (e) => {
														e.stopPropagation();
														navigate({
															to: "/student/complaints/$complaintId",
															params: { complaintId: c.id }
														});
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })]
												})
											})
										]
									}, c.id);
								})
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "md:hidden divide-y divide-border/60",
						children: myComplaints.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => navigate({
								to: "/student/complaints/$complaintId",
								params: { complaintId: c.id }
							}),
							className: "p-4 space-y-2.5 transition-colors hover:bg-muted/40 cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs font-bold text-foreground",
										children: c.id
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintStatusBadge, { status: c.status })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-bold text-foreground",
									children: c.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[0.72rem] text-muted-foreground line-clamp-1",
									children: c.description
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-[0.7rem] text-muted-foreground pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-secondary px-1.5 py-0.5",
										children: c.category
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Submitted ", fmtDate(c.submittedAt)] })]
								})
							]
						}, c.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-gradient-to-r from-primary/5 via-card to-card p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs font-bold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Student Protection & Non-Retaliation Policy" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground max-w-2xl",
							children: "KPR College guarantees that no student filing a good-faith disciplinary complaint will face academic or administrative retaliation. Your submissions are handled under strict confidentiality protocols."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => navigate({ to: "/student/profile" }),
						className: "text-xs shrink-0",
						children: "Review Privacy Settings"
					})]
				})
			})
		]
	});
}
function ComplaintStatusBadge({ status }) {
	const styles = {
		Submitted: {
			bg: "bg-blue-500/10 border-blue-500/20",
			text: "text-blue-600 dark:text-blue-400",
			dot: "bg-blue-500"
		},
		"Under Review": {
			bg: "bg-amber-500/10 border-amber-500/20",
			text: "text-amber-600 dark:text-amber-400",
			dot: "bg-amber-500"
		},
		"Additional Information Requested": {
			bg: "bg-orange-500/10 border-orange-500/30 animate-pulse",
			text: "text-orange-600 dark:text-orange-400 font-bold",
			dot: "bg-orange-500"
		},
		Accepted: {
			bg: "bg-emerald-500/10 border-emerald-500/20",
			text: "text-emerald-600 dark:text-emerald-400",
			dot: "bg-emerald-500"
		},
		"Investigation in Progress": {
			bg: "bg-indigo-500/10 border-indigo-500/20",
			text: "text-indigo-600 dark:text-indigo-400",
			dot: "bg-indigo-500"
		},
		"Converted to Case": {
			bg: "bg-purple-500/10 border-purple-500/20",
			text: "text-purple-600 dark:text-purple-400",
			dot: "bg-purple-500"
		},
		"Decision Made": {
			bg: "bg-teal-500/10 border-teal-500/20",
			text: "text-teal-600 dark:text-teal-400",
			dot: "bg-teal-500"
		},
		Resolved: {
			bg: "bg-emerald-500/15 border-emerald-500/30",
			text: "text-emerald-700 dark:text-emerald-300 font-semibold",
			dot: "bg-emerald-500"
		},
		Closed: {
			bg: "bg-slate-500/10 border-slate-500/20",
			text: "text-slate-600 dark:text-slate-400",
			dot: "bg-slate-500"
		},
		Rejected: {
			bg: "bg-rose-500/10 border-rose-500/20",
			text: "text-rose-600 dark:text-rose-400",
			dot: "bg-rose-500"
		}
	};
	const cur = styles[status] || styles.Submitted;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.68rem] font-medium whitespace-nowrap", cur.bg, cur.text),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", cur.dot) }), status]
	});
}
//#endregion
export { ComplaintStatusBadge, StudentDashboardRoute as component };
