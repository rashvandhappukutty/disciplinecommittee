import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as useDsim, a as INSTITUTION, n as Button, p as isStudent, u as cn } from "./button-C7ZpzBGx.mjs";
import { b as Link, p as useRouterState, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as Menu, L as PhoneCall, Q as LayoutDashboard, S as ShieldAlert, Tt as ExternalLink, W as MessageSquare, Wt as Bell, X as LifeBuoy, a as User, b as Shield, q as LogOut, vt as FilePlus, x as ShieldCheck, zt as ChevronDown } from "../_libs/lucide-react.mjs";
import { n as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { C as PopoverTrigger, D as SheetTitle, E as SheetContent, S as PopoverContent, T as Sheet, d as DropdownMenu, f as DropdownMenuContent, g as DropdownMenuTrigger, h as DropdownMenuSeparator, k as UnauthorizedPage, l as Avatar, m as DropdownMenuLabel, p as DropdownMenuItem, u as ConfirmDialog, x as Popover, y as PageSkeleton } from "./UnauthorizedPage-B_V7V3Jx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StudentProtected-BxPSUqrJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudentNotificationDropdown() {
	const { studentNotifications, markStudentNotificationRead, markAllStudentNotificationsRead } = useDsim();
	const navigate = useNavigate();
	const unread = studentNotifications.filter((n) => !n.read).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "icon",
			className: "relative text-foreground hover:bg-muted",
			"aria-label": `Student Notifications, ${unread} unread`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-[18px]" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-primary font-mono text-[0.6rem] text-primary-foreground",
				children: unread
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
		align: "end",
		className: "w-[22rem] max-w-[calc(100vw-2rem)] p-0 shadow-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-border px-4 py-3 bg-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-semibold text-foreground",
					children: "Updates & Notices"
				}), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-medium text-primary",
					children: [unread, " new"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: markAllStudentNotificationsRead,
				className: "text-xs text-muted-foreground hover:text-foreground transition-colors",
				children: "Mark all read"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "max-h-96 overflow-y-auto divide-y divide-border/60",
			children: [studentNotifications.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "px-4 py-8 text-center text-sm text-muted-foreground",
				children: "No notifications yet. You will receive updates as your complaint is processed."
			}), studentNotifications.map((n) => {
				const isAlert = n.title.toLowerCase().includes("action") || n.title.toLowerCase().includes("required");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						markStudentNotificationRead(n.id);
						if (n.complaintId) navigate({
							to: "/student/complaints/$complaintId",
							params: { complaintId: n.complaintId }
						});
					},
					className: cn("flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/80", !n.read ? "bg-primary/5" : "bg-transparent"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg ring-1", isAlert ? "bg-amber-500/10 text-amber-500 ring-amber-500/20" : "bg-primary/10 text-primary ring-primary/20"),
							children: isAlert ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs font-semibold text-foreground",
									children: n.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs text-muted-foreground mt-0.5 line-clamp-2",
									children: n.message
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-[0.65rem] font-mono text-muted-foreground/80",
									children: formatDistanceToNow(new Date(n.timestamp), { addSuffix: true })
								})
							]
						}),
						!n.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 size-2 shrink-0 rounded-full bg-primary",
							"aria-label": "Unread"
						})
					]
				}) }, n.id);
			})]
		})]
	})] });
}
var studentNav = [
	{
		to: "/student/dashboard",
		label: "My Complaints",
		icon: LayoutDashboard
	},
	{
		to: "/student/complaints/new",
		label: "Raise a Complaint",
		icon: FilePlus,
		highlight: true
	},
	{
		to: "/student/profile",
		label: "Student Profile",
		icon: User
	}
];
function StudentLayout({ children }) {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [confirmLogout, setConfirmLogout] = (0, import_react.useState)(false);
	const [showHelpline, setShowHelpline] = (0, import_react.useState)(false);
	const { studentLogout, studentProfile } = useDsim();
	const navigate = useNavigate();
	const path = useRouterState({ select: (s) => s.location.pathname });
	const doLogout = () => {
		studentLogout();
		navigate({ to: "/student/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-primary/10 text-primary px-4 py-1.5 text-xs font-medium border-b border-primary/20 flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 max-w-4xl mx-auto w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3.5 shrink-0 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: "Confidential Reporting Portal · All complaints are securely reviewed in accordance with college policy."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowHelpline(true),
							className: "ml-auto underline text-xs font-semibold shrink-0 hover:text-primary/80 flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneCall, { className: "size-3" }), " Campus Safety Helpline"]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "md:hidden",
								onClick: () => setMobileOpen(true),
								"aria-label": "Open navigation menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/student/dashboard",
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/kpr-logo.svg.png",
									alt: "KPR College of Arts Science and Research",
									className: "h-10 sm:h-12 w-auto object-contain brightness-0 invert"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hidden sm:block border-l border-border pl-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs font-bold tracking-tight text-foreground flex items-center gap-1.5",
										children: ["DSIM ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-primary/15 px-1.5 py-0.5 text-[0.65rem] font-semibold text-primary",
											children: "Student Portal"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[0.68rem] text-muted-foreground",
										children: "Discipline Support & Grievance Reporting"
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden md:flex items-center gap-1",
							children: studentNav.map((n) => {
								const active = path === n.to || n.to !== "/student/dashboard" && path.startsWith(n.to);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: n.to,
									className: cn("flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors", active ? "bg-primary text-primary-foreground font-semibold shadow-sm" : "highlight" in n && n.highlight ? "border border-primary/30 text-primary bg-primary/5 hover:bg-primary/10" : "text-muted-foreground hover:bg-muted hover:text-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "size-3.5" }), n.label]
								}, n.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 sm:gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentNotificationDropdown, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "flex items-center gap-2 rounded-lg border border-border p-1.5 hover:bg-muted transition-colors text-left",
									"aria-label": "Student Account menu",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
											name: studentProfile.name,
											size: "sm",
											tone: "ink"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "hidden lg:block text-left pr-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs font-medium text-foreground truncate max-w-[120px]",
												children: studentProfile.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[0.65rem] text-muted-foreground font-mono",
												children: studentProfile.rollNumber
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5 text-muted-foreground" })
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
								align: "end",
								className: "w-56",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-bold text-foreground",
											children: studentProfile.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[0.7rem] font-mono text-muted-foreground",
											children: [
												studentProfile.rollNumber,
												" · ",
												studentProfile.department
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[0.7rem] text-muted-foreground truncate",
											children: studentProfile.email
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onSelect: () => navigate({ to: "/student/dashboard" }),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "size-3.5 mr-2" }), " My Complaints"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onSelect: () => navigate({ to: "/student/complaints/new" }),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlus, { className: "size-3.5 mr-2" }), " Raise Complaint"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onSelect: () => navigate({ to: "/student/profile" }),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3.5 mr-2" }), " Profile & Security"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onSelect: () => setShowHelpline(true),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeBuoy, { className: "size-3.5 mr-2 text-primary" }), " Safety Help & Guidelines"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onSelect: () => setConfirmLogout(true),
										className: "text-destructive focus:text-destructive",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3.5 mr-2" }), " Sign out"]
									})
								]
							})] })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: mobileOpen,
				onOpenChange: setMobileOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "w-72 p-0 flex flex-col justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
							className: "sr-only",
							children: "Student Portal Navigation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 border-b border-border bg-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/kpr-logo.svg.png",
									alt: "KPR College of Arts Science and Research",
									className: "h-10 w-auto object-contain brightness-0 invert mb-2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-semibold text-foreground",
									children: "Student Complaint Portal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[0.7rem] text-muted-foreground",
									children: [
										studentProfile.name,
										" (",
										studentProfile.rollNumber,
										")"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "p-3 space-y-1",
							children: studentNav.map((n) => {
								const active = path === n.to || n.to !== "/student/dashboard" && path.startsWith(n.to);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: n.to,
									onClick: () => setMobileOpen(false),
									className: cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", active ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "size-4" }), n.label]
								}, n.to);
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 border-t border-border bg-muted/40 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setMobileOpen(false);
									setShowHelpline(true);
								},
								className: "flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneCall, { className: "size-3.5 text-primary" }), " Campus Safety Hotline"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setMobileOpen(false);
									setConfirmLogout(true);
								},
								className: "flex w-full items-center gap-2 rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3.5" }), " Sign out"]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border bg-card/60 py-6 text-center text-xs text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-[0.75rem] text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 font-semibold text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: INSTITUTION.name })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline text-muted-foreground",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									INSTITUTION.systemName,
									" — ",
									INSTITUTION.systemFullName
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3 text-[0.72rem]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								INSTITUTION.city,
								", ",
								INSTITUTION.state
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: INSTITUTION.website,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "hover:underline text-primary flex items-center gap-1",
								children: ["Official Website ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowHelpline(true),
								className: "hover:underline text-primary",
								children: "Safety Helplines"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: showHelpline,
				onOpenChange: setShowHelpline,
				title: "Campus Safety & Immediate Assistance",
				description: "If you are currently experiencing immediate danger, threat, physical assault, or active harassment, please reach out to emergency services directly:",
				confirmLabel: "Understood",
				onConfirm: () => setShowHelpline(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-3 space-y-2 text-xs border rounded-lg p-3 bg-muted/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center py-1 border-b border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "Campus Reception / General:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-primary font-bold",
								children: INSTITUTION.phone
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center py-1 border-b border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "Admission Office:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-primary font-bold",
								children: INSTITUTION.admissionPhone
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center py-1 border-b border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "Anti-Ragging Toll Free 24/7:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-primary font-bold",
								children: INSTITUTION.antiRaggingPhone
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center py-1 border-b border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "Hostel Warden On-Duty:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-primary font-bold",
								children: INSTITUTION.wardenPhone
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center py-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "Official Inquiries:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-primary font-bold",
								children: INSTITUTION.email
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmLogout,
				onOpenChange: setConfirmLogout,
				title: "Sign out of Student Portal?",
				description: "Your complaint drafts and submitted reports will remain saved safely on the secure server.",
				confirmLabel: "Sign out",
				onConfirm: doLogout
			})
		]
	});
}
function StudentProtected({ children }) {
	const { ready, studentAuthed, currentUser } = useDsim();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (ready && !studentAuthed) navigate({ to: "/student/login" });
	}, [
		ready,
		studentAuthed,
		navigate
	]);
	if (!ready || !studentAuthed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background p-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {})
	});
	if (currentUser && !isStudent(currentUser)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnauthorizedPage, {
		portal: "student",
		customMessage: "You are currently signed in with a staff/committee account. Please sign in with an enrolled student account to access the Student Portal."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentLayout, { children });
}
//#endregion
export { StudentProtected as t };
