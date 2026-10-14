import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as useDsim, d as evLabel, f as isCommitteeUser, n as Button, u as cn } from "./button-C7ZpzBGx.mjs";
import { b as Link, p as useRouterState, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Settings, Ft as CircleAlert, G as Menu, Lt as ChevronRight, Mt as CircleUser, Pt as CircleCheck, Q as LayoutDashboard, S as ShieldAlert, T as Search, Ut as CalendarClock, Wt as Bell, _ as Sparkles, _t as FileText, a as User, ct as Gavel, dt as FolderOpen, f as Timer, it as Inbox, j as Radar, o as UserX, q as LogOut, yt as FileImage, zt as ChevronDown } from "../_libs/lucide-react.mjs";
import { n as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { C as PopoverTrigger, D as SheetTitle, E as SheetContent, S as PopoverContent, T as Sheet, d as DropdownMenu, f as DropdownMenuContent, g as DropdownMenuTrigger, h as DropdownMenuSeparator, k as UnauthorizedPage, l as Avatar, m as DropdownMenuLabel, p as DropdownMenuItem, u as ConfirmDialog, x as Popover, y as PageSkeleton } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { n as DialogContent, t as Dialog } from "./dialog-BB0Q0GUL.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Protected-DW_nWC7p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var icons = {
	return: CalendarClock,
	synopsis: Sparkles,
	evidence: FileImage,
	investigation: Timer,
	decision: Gavel,
	closure: CircleCheck,
	complaint: CircleAlert,
	NEW_COMPLAINT_SUBMITTED: FileText
};
function NotificationDropdown() {
	const { notifications, markRead, markAllRead, currentUser } = useDsim();
	const navigate = useNavigate();
	const userNotifications = (0, import_react.useMemo)(() => {
		return notifications.filter((n) => {
			if (!currentUser) return true;
			if (n.recipientId && n.recipientId === currentUser.id) return true;
			if (n.recipientRole && n.recipientRole === currentUser.role) return true;
			if (!n.recipientRole && !n.recipientId) return true;
			return false;
		});
	}, [notifications, currentUser]);
	const unread = userNotifications.filter((n) => !n.read).length;
	const handleNotificationClick = (n) => {
		markRead(n.id);
		if (n.complaintId) navigate({
			to: "/complaints/$complaintId",
			params: { complaintId: n.complaintId }
		});
		else if (n.caseId) navigate({
			to: "/cases/$caseId",
			params: { caseId: n.caseId }
		});
		else if (n.actionUrl) navigate({ to: n.actionUrl });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "icon",
			className: "relative text-foreground hover:bg-muted",
			"aria-label": `Notifications, ${unread} unread for ${currentUser?.role || "Staff"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-[18px]" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-signal font-mono text-[0.6rem] text-signal-foreground animate-in zoom-in-50",
				children: unread
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
		align: "end",
		className: "w-[24rem] max-w-[calc(100vw-2rem)] p-0 shadow-xl border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-border px-4 py-3 bg-card/80 backdrop-blur",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold text-foreground",
						children: "Notifications"
					}),
					currentUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-medium text-primary",
						children: currentUser.role
					}),
					unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-signal/15 px-1.5 py-0.2 font-mono text-[0.62rem] font-bold text-signal",
						children: [unread, " new"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: markAllRead,
				className: "text-xs text-muted-foreground hover:text-foreground transition-colors",
				children: "Mark all read"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "max-h-96 overflow-y-auto divide-y divide-border/60",
			children: [userNotifications.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "px-4 py-8 text-center text-sm text-muted-foreground",
				children: "You're all caught up. No notifications for your current role."
			}), userNotifications.map((n) => {
				const Icon = icons[n.type] || Bell;
				const isUrgent = n.priority === "URGENT" || n.urgency === "immediate_safety";
				const isHigh = n.priority === "HIGH" || n.urgency === "urgent";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: () => handleNotificationClick(n),
					className: cn("group flex w-full cursor-pointer gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/70", !n.read ? "bg-primary/[0.04]" : "bg-transparent"),
					role: "button",
					tabIndex: 0,
					onKeyDown: (e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							handleNotificationClick(n);
						}
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg ring-1 transition-transform group-hover:scale-105", isUrgent ? "bg-rose-500/10 text-rose-600 ring-rose-500/30 dark:text-rose-400" : isHigh ? "bg-amber-500/10 text-amber-600 ring-amber-500/30 dark:text-amber-400" : n.type === "NEW_COMPLAINT_SUBMITTED" || n.type === "complaint" ? "bg-blue-500/10 text-blue-600 ring-blue-500/30 dark:text-blue-400" : "bg-card text-primary ring-border"),
							children: isUrgent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1 space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-foreground truncate",
										children: n.title || "Institutional Notice"
									}), isUrgent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 rounded bg-rose-500/15 px-1.5 py-0.5 text-[0.62rem] font-bold text-rose-600 dark:text-rose-400",
										children: "⚠ Urgent"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed",
									children: n.message
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between pt-0.5 text-[0.65rem] font-mono text-muted-foreground/80",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDistanceToNow(new Date(n.timestamp), { addSuffix: true }) }), n.complaintId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 font-sans text-[0.68rem] text-primary font-medium group-hover:underline",
										children: ["Review ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3" })]
									})]
								})
							]
						}),
						!n.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 size-2 shrink-0 rounded-full bg-signal",
							"aria-label": "Unread notification"
						})
					]
				}) }, n.id);
			})]
		})]
	})] });
}
var Command$1 = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e, {
	ref,
	className: cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className),
	...props
}));
Command$1.displayName = _e.displayName;
var CommandDialog = ({ children, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "overflow-hidden p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command$1, {
				className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
				children
			})
		})
	});
};
var CommandInput = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "flex items-center border-b px-3",
	"cmdk-input-wrapper": "",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
		ref,
		className: cn("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	})]
}));
CommandInput.displayName = _e.Input.displayName;
var CommandList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.List, {
	ref,
	className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
	...props
}));
CommandList.displayName = _e.List.displayName;
var CommandEmpty = import_react.forwardRef((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
	ref,
	className: "py-6 text-center text-sm",
	...props
}));
CommandEmpty.displayName = _e.Empty.displayName;
var CommandGroup = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
	ref,
	className: cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className),
	...props
}));
CommandGroup.displayName = _e.Group.displayName;
var CommandSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Separator, {
	ref,
	className: cn("-mx-1 h-px bg-border", className),
	...props
}));
CommandSeparator.displayName = _e.Separator.displayName;
var CommandItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
	ref,
	className: cn("relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", className),
	...props
}));
CommandItem.displayName = _e.Item.displayName;
var CommandShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className),
		...props
	});
};
CommandShortcut.displayName = "CommandShortcut";
function SearchCommand() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { cases } = useDsim();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen((o) => !o);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const go = (caseId) => {
		setOpen(false);
		navigate({
			to: "/cases/$caseId",
			params: { caseId }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: () => setOpen(true),
		className: "flex h-9 w-full max-w-sm items-center gap-2 rounded-lg border border-input bg-card px-3 text-sm text-muted-foreground transition-colors hover:border-ring/40",
		"aria-label": "Search cases, students, evidence",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden truncate sm:inline",
				children: "Search cases, students, roll no…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
				className: "ml-auto hidden rounded border border-border bg-muted px-1.5 font-mono text-[0.65rem] lg:inline",
				children: "⌘K"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandDialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, { placeholder: "Search by case ID, name, student, roll number, department…" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "No matching records." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
				heading: "Cases",
				children: cases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
					value: `${c.id} ${c.caseName} ${c.department}`,
					onSelect: () => go(c.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "size-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs",
							children: c.id
						}),
						" — ",
						c.caseName
					]
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
				heading: "Students",
				children: cases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
					value: `${c.accusedStudent} ${c.rollNumber} ${c.department} student`,
					onSelect: () => go(c.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4" }),
						c.accusedStudent,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto font-mono text-xs text-muted-foreground",
							children: c.rollNumber
						})
					]
				}, c.id + "s"))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
				heading: "Evidence",
				children: cases.flatMap((c) => c.evidence.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
					value: `${evLabel(e.number)} ${e.description} ${c.id} evidence`,
					onSelect: () => go(c.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }),
						evLabel(e.number),
						" — ",
						e.description,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto font-mono text-xs text-muted-foreground",
							children: c.id
						})
					]
				}, e.id)))
			})
		] })]
	})] });
}
var nav = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/complaints",
		label: "Incoming Complaints",
		icon: Inbox,
		badgeKey: "complaints"
	},
	{
		to: "/cases",
		label: "Cases",
		icon: FolderOpen
	},
	{
		to: "/investigations",
		label: "Active Investigations",
		icon: Radar
	},
	{
		to: "/suspensions",
		label: "Suspensions",
		icon: UserX
	},
	{
		to: "/returns",
		label: "Upcoming Returns",
		icon: CalendarClock
	},
	{
		to: "/profile",
		label: "Profile",
		icon: CircleUser
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function Brand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-start w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/kpr-logo.svg.png",
			alt: "KPR College of Arts Science and Research",
			className: "h-16 sm:h-20 w-auto max-w-full object-contain object-left brightness-0 invert"
		})
	});
}
function SidebarBody({ onNavigate, onLogout }) {
	const { profile, complaints, currentUser } = useDsim();
	const path = useRouterState({ select: (s) => s.location.pathname });
	const pendingComplaintsCount = complaints.filter((c) => c.status === "Submitted" || c.status === "Under Review" || c.status === "Additional Information Requested").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-sidebar text-sidebar-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-4 border-b border-sidebar-border flex items-center justify-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 space-y-0.5 px-3 py-3",
				"aria-label": "Main",
				children: nav.map((n) => {
					const active = path === n.to || n.to === "/cases" && path.startsWith("/cases") || n.to === "/complaints" && path.startsWith("/complaints");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: n.to,
						onClick: onNavigate,
						className: cn("flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors", active ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold" : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.label })]
						}), "badgeKey" in n && n.badgeKey === "complaints" && pendingComplaintsCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-5 place-items-center rounded-full bg-destructive text-[0.65rem] font-bold text-destructive-foreground animate-pulse",
							children: pendingComplaintsCount
						})]
					}, n.to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-3 mb-3 rounded-lg border border-sidebar-border px-3 py-2 font-mono text-[0.62rem] uppercase tracking-wider text-sidebar-foreground/55",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-st-returned" }), " Restricted Access · Encrypted"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-sidebar-border p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 px-2 py-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
						name: currentUser?.displayName || profile.name,
						tone: "ink"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-sm font-medium text-sidebar-accent-foreground",
							children: currentUser?.displayName || profile.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-xs text-sidebar-foreground/60",
							children: currentUser?.role || "Committee Head"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-2 gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/settings",
						onClick: onNavigate,
						className: "flex items-center justify-center gap-2 rounded-md py-1.5 text-xs text-sidebar-foreground/75 hover:bg-sidebar-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-3.5" }), " Settings"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onLogout,
						className: "flex items-center justify-center gap-2 rounded-md py-1.5 text-xs text-sidebar-foreground/75 hover:bg-sidebar-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3.5" }), " Logout"]
					})]
				})]
			})
		]
	});
}
function AppLayout({ children }) {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [confirmLogout, setConfirmLogout] = (0, import_react.useState)(false);
	const { logout, profile } = useDsim();
	const navigate = useNavigate();
	const path = useRouterState({ select: (s) => s.location.pathname });
	const doLogout = () => {
		logout();
		navigate({ to: "/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "fixed inset-y-0 left-0 hidden w-64 lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarBody, { onLogout: () => setConfirmLogout(true) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: mobileOpen,
				onOpenChange: setMobileOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "w-72 border-0 p-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
						className: "sr-only",
						children: "Navigation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarBody, {
						onNavigate: () => setMobileOpen(false),
						onLogout: () => setConfirmLogout(true)
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col lg:pl-64",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 px-4 backdrop-blur sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "lg:hidden",
							onClick: () => setMobileOpen(true),
							"aria-label": "Open menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumbs, { path })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center justify-end gap-1 sm:gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchCommand, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationDropdown, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "flex items-center gap-1.5 rounded-lg p-1 hover:bg-muted",
										"aria-label": "Account menu",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
											name: profile.name,
											size: "sm"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "hidden size-3.5 text-muted-foreground sm:block" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
									align: "end",
									className: "w-56",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm",
											children: profile.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-normal text-muted-foreground",
											children: profile.email
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											onSelect: () => navigate({ to: "/profile" }),
											children: "Profile"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											onSelect: () => navigate({ to: "/settings" }),
											children: "Settings"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											onSelect: () => setConfirmLogout(true),
											children: "Sign out"
										})
									]
								})] })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "page-enter mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8",
					children
				}, path)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmLogout,
				onOpenChange: setConfirmLogout,
				title: "Sign out of DSIM?",
				description: "Your secure session will end. Unsaved investigation notes may be lost.",
				confirmLabel: "Sign out",
				onConfirm: doLogout
			})
		]
	});
}
function Crumbs({ path }) {
	const parts = path.split("/").filter(Boolean);
	const labels = {
		dashboard: "Dashboard",
		complaints: "Incoming Complaints",
		cases: "Cases",
		new: "New Case",
		investigation: "Investigation",
		investigations: "Active Investigations",
		suspensions: "Suspensions",
		returns: "Upcoming Returns",
		profile: "Profile",
		settings: "Settings"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Breadcrumb",
		className: "hidden min-w-0 items-center gap-1.5 text-sm md:flex",
		children: parts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1.5 whitespace-nowrap",
			children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground/50",
				children: "/"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn(i === parts.length - 1 ? "font-medium" : "text-muted-foreground", (p.startsWith("DSIM") || p.startsWith("CMP")) && "font-mono text-xs"),
				children: labels[p] ?? p
			})]
		}, i))
	});
}
function Protected({ children, requiredPermission }) {
	const { ready, authed, currentUser, hasPermission } = useDsim();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (ready && !authed) navigate({ to: "/login" });
	}, [
		ready,
		authed,
		navigate
	]);
	if (!ready || !authed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background p-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {})
	});
	if (currentUser && !isCommitteeUser(currentUser)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnauthorizedPage, {
		portal: "committee",
		customMessage: "This section is restricted to authorized Discipline Committee personnel."
	});
	if (requiredPermission && !hasPermission(requiredPermission)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnauthorizedPage, {
		portal: "committee",
		customMessage: `You do not have the required permission (${requiredPermission}) to access this action or page.`
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, { children });
}
//#endregion
export { Protected as t };
