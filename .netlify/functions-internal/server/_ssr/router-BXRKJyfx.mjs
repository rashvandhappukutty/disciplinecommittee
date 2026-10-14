import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { _ as useDsim, a as INSTITUTION, d as evLabel, i as DsimProvider, n as Button, u as cn } from "./button-C7ZpzBGx.mjs";
import { C as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, q as redirect, v as createFileRoute, x as useNavigate, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Radio, B as Pause, Dt as Download, E as Save, F as Play, Ft as CircleAlert, H as Mic, Jt as ArrowLeft, Nt as CirclePlus, O as RotateCcw, Pt as CircleCheck, U as MicOff, V as Music, W as MessageSquare, Wt as Bell, _ as Sparkles, b as Shield, ct as Gavel, d as Trash2, g as Square, h as StickyNote, i as Users, j as Radar, kt as Clock, lt as FolderX, n as Volume2, pt as FingerprintPattern, rt as Info, s as UserPlus, x as ShieldCheck, xt as FileCheck, y as SlidersVertical } from "../_libs/lucide-react.mjs";
import { _ as EmptyState, a as AlertDialogDescription, b as PersonCard, c as AlertDialogTitle, i as AlertDialogContent, j as fmtDateTime, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog, v as PageHeader, w as SecureTag } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BB0Q0GUL.mjs";
import { t as Protected } from "./Protected-DW_nWC7p.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Cd1zWcTd.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-Ce6ny-d0.mjs";
import { a as Slider, i as Route$18, n as InvestigationNotesView, o as SynopsisEditor, r as InvestigationTimeline, s as TranscriptViewer, t as EvidenceGallery } from "./InvestigationTimeline-CxZExNmK.mjs";
import { t as AddPersonModal } from "./AddPersonModal-CXLUEoDX.mjs";
import { n as Route$19 } from "./student.dashboard-DTR9e2n-.mjs";
import { t as PasskeyManager } from "./PasskeyManager-7gs1Fida.mjs";
import { t as Switch } from "./switch-C2AvPllQ.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BXRKJyfx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DlEqM06w.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$17 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "DSIM — Discipline Investigation Management System" },
			{
				name: "description",
				content: "Confidential Discipline & Investigation Management Portal — KPR College of Arts Science and Research"
			},
			{
				name: "theme-color",
				content: "#0f172a"
			},
			{
				property: "og:title",
				content: "DSIM — Discipline Investigation Management System"
			},
			{
				property: "og:description",
				content: "Confidential Discipline & Investigation Management Portal — KPR College of Arts Science and Research"
			},
			{
				property: "og:type",
				content: "website"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "shortcut icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon.ico"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$17.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DsimProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, { position: "bottom-right" })] })
	});
}
var Route$16 = createFileRoute("/")({ beforeLoad: () => {
	throw redirect({ to: "/login" });
} });
var $$splitComponentImporter$13 = () => import("./dashboard-idGgWCPa.mjs");
var Route$15 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: "Dashboard — DSIM" },
		{
			name: "description",
			content: "Discipline Committee Head overview and case monitor."
		},
		{
			property: "og:title",
			content: "Dashboard — DSIM"
		},
		{
			property: "og:description",
			content: "Discipline Committee Head overview and case monitor."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./investigations-BEHv8GKx.mjs");
var Route$14 = createFileRoute("/investigations")({
	head: () => ({ meta: [
		{ title: "Active Investigations — DSIM" },
		{
			name: "description",
			content: "Cases under investigation."
		},
		{
			property: "og:title",
			content: "Active Investigations — DSIM"
		},
		{
			property: "og:description",
			content: "Cases under investigation."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./login-1AGyPVoC.mjs");
var Route$13 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: `Sign in — ${INSTITUTION.shortName} ${INSTITUTION.systemName} Staff Portal` },
		{
			name: "description",
			content: `Confidential case workspace for ${INSTITUTION.name}.`
		},
		{
			property: "og:title",
			content: `${INSTITUTION.shortName} DSIM — Staff Portal`
		},
		{
			property: "og:description",
			content: `Confidential case workspace for ${INSTITUTION.name}.`
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./profile-CB7a4yNP.mjs");
var Route$12 = createFileRoute("/profile")({
	head: () => ({ meta: [
		{ title: "Profile — Discipline Committee Head — DSIM" },
		{
			name: "description",
			content: "Official profile and security credentials."
		},
		{
			property: "og:title",
			content: "Profile — Discipline Committee Head — DSIM"
		},
		{
			property: "og:description",
			content: "Official profile and security credentials."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./returns-BAFDlVFq.mjs");
var Route$11 = createFileRoute("/returns")({
	head: () => ({ meta: [
		{ title: "Upcoming Returns — DSIM" },
		{
			name: "description",
			content: "Schedule and clearance monitor for students returning from suspension."
		},
		{
			property: "og:title",
			content: "Upcoming Returns — DSIM"
		},
		{
			property: "og:description",
			content: "Schedule and clearance monitor for students returning from suspension."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var Route$10 = createFileRoute("/settings")({
	head: () => ({ meta: [
		{ title: "Settings — DSIM" },
		{
			name: "description",
			content: "Workspace preferences and system configuration."
		},
		{
			property: "og:title",
			content: "Settings — DSIM"
		},
		{
			property: "og:description",
			content: "Workspace preferences and system configuration."
		}
	] }),
	component: SettingsPage
});
function SettingsPage() {
	const { settings, setSetting, currentUser } = useDsim();
	const handleSaveAll = () => {
		toast.success("Preferences and system configurations saved.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Protected, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "System Configuration",
			title: "Settings & Preferences",
			subtitle: "Configure notification alerts, AI synopsis synthesis parameters, and audio recording fidelity.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecureTag, { children: "Workspace Controls" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: handleSaveAll,
					className: "gap-1.5 text-xs bg-primary hover:bg-primary/90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" }), " Save Preferences"]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface overflow-hidden p-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Notification Alerts"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.7rem] text-muted-foreground",
							children: "Manage push and in-app alert dispatches"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "divide-y divide-border/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-semibold text-foreground",
									children: "Return Date Reminders"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[0.7rem] text-muted-foreground",
									children: "Receive automated alerts 3 days, 1 day, and on the morning of scheduled student return."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: settings.returnReminders,
									onCheckedChange: (v) => {
										setSetting("returnReminders", v);
										toast.success(`Return reminders ${v ? "enabled" : "disabled"}`);
									}
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-semibold text-foreground",
									children: "Active Investigation Alerts"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[0.7rem] text-muted-foreground",
									children: "Notify when an investigation session has been active for more than 2 hours."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: settings.investigationNotifications,
									onCheckedChange: (v) => {
										setSetting("investigationNotifications", v);
										toast.success(`Investigation alerts ${v ? "enabled" : "disabled"}`);
									}
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-semibold text-foreground",
									children: "Evidence Intake Notifications"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[0.7rem] text-muted-foreground",
									children: "Receive confirmation notifications whenever new photos, videos, or documents are filed."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: settings.evidenceNotifications,
									onCheckedChange: (v) => {
										setSetting("evidenceNotifications", v);
										toast.success(`Evidence notifications ${v ? "enabled" : "disabled"}`);
									}
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-semibold text-foreground",
									children: "AI Synopsis Readiness"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[0.7rem] text-muted-foreground",
									children: "Notify immediately when an audio recording finishes processing and is ready for review."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: settings.synopsisNotifications,
									onCheckedChange: (v) => {
										setSetting("synopsisNotifications", v);
										toast.success(`Synopsis notifications ${v ? "enabled" : "disabled"}`);
									}
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface overflow-hidden p-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Investigation Interview & Hearing Audio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.7rem] text-muted-foreground",
							children: "Configure microphone sampling and encoding standards"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-foreground",
								children: "Recording Quality Preset"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: settings.recordingQuality,
								onValueChange: (v) => setSetting("recordingQuality", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "high",
									className: "text-xs",
									children: "High Fidelity (Lossless 48kHz, Noise Gate)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "standard",
									className: "text-xs",
									children: "Standard (Compact Opus 24kHz)"
								})] })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-lg border border-border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold text-foreground",
								children: "Automatic AI Pipeline on Stop"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[0.7rem] text-muted-foreground",
								children: "Auto-transcribe as soon as recording ends"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: settings.autoSynopsis,
								onCheckedChange: (v) => setSetting("autoSynopsis", v)
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface overflow-hidden p-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "AI Synopsis Engine Parameters"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.7rem] text-muted-foreground",
							children: "Control summary verbosity and legal formatting style"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 max-w-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold text-foreground",
							children: "Synopsis Detail Level"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: settings.synopsisLength,
							onValueChange: (v) => setSetting("synopsisLength", v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "detailed",
								className: "text-xs",
								children: "Detailed (Includes statements, contradictions, next steps)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "concise",
								className: "text-xs",
								children: "Executive Summary (Key finding bullet points only)"
							})] })]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface overflow-hidden p-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Passkeys & Hardware Authentication"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.7rem] text-muted-foreground",
							children: "Manage enrolled biometric devices, Windows Hello, and hardware security keys"
						})] })]
					}), currentUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasskeyManager, { user: currentUser })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface overflow-hidden p-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Security & Interface Density"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.7rem] text-muted-foreground",
							children: "Session protection and table spacing"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "divide-y divide-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold text-foreground",
								children: "Require Device User Verification"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[0.7rem] text-muted-foreground",
								children: "Enforce biometric check (Face ID / Windows Hello) or device PIN on every passkey sign-in."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: settings.requireUserVerification,
								onCheckedChange: (v) => {
									setSetting("requireUserVerification", v);
									toast.success(`User verification requirement ${v ? "enabled" : "disabled"}`);
								}
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold text-foreground",
								children: "Compact Case Tables"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[0.7rem] text-muted-foreground",
								children: "Reduce vertical padding to display higher information density on laptop screens."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: settings.compactTables,
								onCheckedChange: (v) => setSetting("compactTables", v)
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card/60 p-5 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs font-semibold text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "System Architecture & Deployment Notice" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground leading-relaxed",
						children: "Frontend prototype with local persistence. Production deployment requires backend authentication, authorization, database persistence, secure evidence storage, server-side audit integrity, and production AI/STT services."
					})]
				})
			]
		})]
	}) });
}
var $$splitComponentImporter$8 = () => import("./suspensions-B41WQCxJ.mjs");
var Route$9 = createFileRoute("/suspensions")({
	head: () => ({ meta: [
		{ title: "Suspensions Registry — DSIM" },
		{
			name: "description",
			content: "Directory of students currently under active suspension sanctions."
		},
		{
			property: "og:title",
			content: "Suspensions Registry — DSIM"
		},
		{
			property: "og:description",
			content: "Directory of students currently under active suspension sanctions."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./cases.index-DAdTmQgL.mjs");
var Route$8 = createFileRoute("/cases/")({
	head: () => ({ meta: [
		{ title: "Disciplinary Cases — DSIM" },
		{
			name: "description",
			content: "Manage and investigate all college disciplinary cases."
		},
		{
			property: "og:title",
			content: "Disciplinary Cases — DSIM"
		},
		{
			property: "og:description",
			content: "Manage and investigate all college disciplinary cases."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./cases.new-7ugv2PPo.mjs");
var Route$7 = createFileRoute("/cases/new")({
	head: () => ({ meta: [
		{ title: "Create New Case — DSIM" },
		{
			name: "description",
			content: "Initiate a new confidential disciplinary investigation."
		},
		{
			property: "og:title",
			content: "Create New Case — DSIM"
		},
		{
			property: "og:description",
			content: "Initiate a new confidential disciplinary investigation."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./complaints.index-Bk2oaF0Y.mjs");
var Route$6 = createFileRoute("/complaints/")({
	head: () => ({ meta: [
		{ title: "Incoming Complaints — DSIM" },
		{
			name: "description",
			content: "Review and process incoming student disciplinary complaints and reports."
		},
		{
			property: "og:title",
			content: "Incoming Complaints — DSIM"
		},
		{
			property: "og:description",
			content: "Review and process incoming student disciplinary complaints and reports."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./complaints._complaintId-D7vdtoJb.mjs");
var Route$5 = createFileRoute("/complaints/$complaintId")({
	head: () => ({ meta: [
		{ title: "Review Complaint — DSIM" },
		{
			name: "description",
			content: "Discipline Committee Head complaint assessment and case conversion."
		},
		{
			property: "og:title",
			content: "Review Complaint — DSIM"
		},
		{
			property: "og:description",
			content: "Discipline Committee Head complaint assessment and case conversion."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./student.login-B-jeP789.mjs");
var Route$4 = createFileRoute("/student/login")({
	head: () => ({ meta: [
		{ title: `${INSTITUTION.shortName} Student Portal — ${INSTITUTION.systemName} Grievance & Reporting` },
		{
			name: "description",
			content: `Submit and track disciplinary complaints securely through the ${INSTITUTION.shortName} student portal.`
		},
		{
			property: "og:title",
			content: `${INSTITUTION.shortName} Student Portal — DSIM`
		},
		{
			property: "og:description",
			content: `Submit and track disciplinary complaints securely through the ${INSTITUTION.shortName} student portal.`
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./student.profile-DMrrXLkQ.mjs");
var Route$3 = createFileRoute("/student/profile")({
	head: () => ({ meta: [
		{ title: "Student Profile & Security — DSIM" },
		{
			name: "description",
			content: "Manage your student profile, privacy safeguards, and notification preferences."
		},
		{
			property: "og:title",
			content: "Student Profile — DSIM"
		},
		{
			property: "og:description",
			content: "Manage your student profile, privacy safeguards, and notification preferences."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
function AudioRecorder({ caseId = "DSIM-2026-00001", caseName = "Investigation Hearing", accusedStudent = "Student Respondent", recordedBy = "Discipline Committee Head", recordedByRole = "Discipline Committee Head", onRecordingComplete, onSaveRecording, onGenerateTranscript, onStartRecording, isProcessing: externalProcessing = false }) {
	const [currentSessionId, setCurrentSessionId] = (0, import_react.useState)(() => {
		const randomSuffix = Math.floor(1e4 + Math.random() * 9e4);
		return `INV-AUD-${(/* @__PURE__ */ new Date()).getFullYear()}-${randomSuffix}`;
	});
	const [recordingType, setRecordingType] = (0, import_react.useState)("Investigation Interview");
	const [participantsList, setParticipantsList] = (0, import_react.useState)([{
		name: recordedBy,
		role: recordedByRole
	}, {
		name: accusedStudent,
		role: "Student / Respondent"
	}]);
	const [newWitnessName, setNewWitnessName] = (0, import_react.useState)("");
	const [micPermission, setMicPermission] = (0, import_react.useState)("prompt");
	const [availableDevices, setAvailableDevices] = (0, import_react.useState)([]);
	const [selectedDeviceId, setSelectedDeviceId] = (0, import_react.useState)("default");
	const [isRecording, setIsRecording] = (0, import_react.useState)(false);
	const [isPaused, setIsPaused] = (0, import_react.useState)(false);
	const [elapsedSeconds, setElapsedSeconds] = (0, import_react.useState)(0);
	const [hasRecording, setHasRecording] = (0, import_react.useState)(false);
	const [isSaved, setIsSaved] = (0, import_react.useState)(false);
	const [selectedMimeType, setSelectedMimeType] = (0, import_react.useState)("audio/webm;codecs=opus");
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [playbackTime, setPlaybackTime] = (0, import_react.useState)(0);
	const [savedDuration, setSavedDuration] = (0, import_react.useState)(0);
	const [volume, setVolume] = (0, import_react.useState)(85);
	const [playbackRate, setPlaybackRate] = (0, import_react.useState)(1);
	const [audioUrl, setAudioUrl] = (0, import_react.useState)(null);
	const [recordedBlob, setRecordedBlob] = (0, import_react.useState)(null);
	const [micAudioLevel, setMicAudioLevel] = (0, import_react.useState)(0);
	const [frequencyData, setFrequencyData] = (0, import_react.useState)(new Array(32).fill(12));
	const [showLiveTranscription, setShowLiveTranscription] = (0, import_react.useState)(false);
	const [showNoticeModal, setShowNoticeModal] = (0, import_react.useState)(false);
	const [showStopConfirm, setShowStopConfirm] = (0, import_react.useState)(false);
	const [showDiscardConfirm, setShowDiscardConfirm] = (0, import_react.useState)(false);
	const mediaRecorderRef = (0, import_react.useRef)(null);
	const audioChunksRef = (0, import_react.useRef)([]);
	const streamRef = (0, import_react.useRef)(null);
	const audioContextRef = (0, import_react.useRef)(null);
	const analyserRef = (0, import_react.useRef)(null);
	const animationFrameRef = (0, import_react.useRef)(null);
	const timerRef = (0, import_react.useRef)(null);
	const audioElementRef = (0, import_react.useRef)(null);
	const getSupportedMimeType = (0, import_react.useCallback)(() => {
		if (typeof window === "undefined" || typeof MediaRecorder === "undefined") return "audio/webm";
		for (const mime of [
			"audio/webm;codecs=opus",
			"audio/webm",
			"audio/ogg;codecs=opus",
			"audio/ogg",
			"audio/mp4",
			"audio/aac"
		]) if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(mime)) return mime;
		return "audio/webm";
	}, []);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || !navigator.mediaDevices) {
			setMicPermission("unsupported");
			return;
		}
		const mime = getSupportedMimeType();
		setSelectedMimeType(mime);
		if (navigator.permissions && navigator.permissions.query) navigator.permissions.query({ name: "microphone" }).then((status) => {
			setMicPermission(status.state);
			status.onchange = () => {
				setMicPermission(status.state);
			};
		}).catch(() => {
			setMicPermission("prompt");
		});
		navigator.mediaDevices.enumerateDevices().then((devices) => {
			const audioInputs = devices.filter((d) => d.kind === "audioinput");
			setAvailableDevices(audioInputs);
		}).catch((err) => {
			console.warn("Could not enumerate audio devices:", err);
		});
	}, [getSupportedMimeType]);
	(0, import_react.useEffect)(() => {
		const handleBeforeUnload = (e) => {
			if (hasRecording && !isSaved) {
				e.preventDefault();
				e.returnValue = "";
			}
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [hasRecording, isSaved]);
	(0, import_react.useEffect)(() => {
		if (isRecording && !isPaused) timerRef.current = window.setInterval(() => {
			setElapsedSeconds((prev) => prev + 1);
		}, 1e3);
		else if (timerRef.current) clearInterval(timerRef.current);
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isRecording, isPaused]);
	const cleanupAudioPipeline = () => {
		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
			animationFrameRef.current = null;
		}
		if (streamRef.current) {
			streamRef.current.getTracks().forEach((track) => track.stop());
			streamRef.current = null;
		}
		if (audioContextRef.current && audioContextRef.current.state !== "closed") {
			try {
				audioContextRef.current.close();
			} catch {}
			audioContextRef.current = null;
		}
		setMicAudioLevel(0);
		setFrequencyData(new Array(32).fill(12));
	};
	(0, import_react.useEffect)(() => {
		return () => {
			cleanupAudioPipeline();
		};
	}, []);
	const requestMicAccess = async () => {
		try {
			if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
				setMicPermission("unsupported");
				toast.error("Browser does not support microphone recording.");
				return;
			}
			const testStream = await navigator.mediaDevices.getUserMedia({ audio: selectedDeviceId !== "default" ? { deviceId: { exact: selectedDeviceId } } : true });
			setMicPermission("granted");
			testStream.getTracks().forEach((track) => track.stop());
			toast.success("Microphone access authorized for investigation recording.");
			const devices = await navigator.mediaDevices.enumerateDevices();
			setAvailableDevices(devices.filter((d) => d.kind === "audioinput"));
		} catch (err) {
			if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
				setMicPermission("denied");
				toast.error("Microphone access denied. Please grant permission in browser settings.");
			} else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
				setMicPermission("unavailable");
				toast.error("No microphone device was detected on this workstation.");
			} else {
				setMicPermission("denied");
				toast.error("Unable to access microphone: " + (err.message || "Unknown error"));
			}
		}
	};
	const handleInitiateRecording = () => {
		if (micPermission === "denied") {
			toast.error("Microphone access is required to record an investigation.");
			return;
		}
		const randomSuffix = Math.floor(1e4 + Math.random() * 9e4);
		setCurrentSessionId(`INV-AUD-${(/* @__PURE__ */ new Date()).getFullYear()}-${randomSuffix}`);
		setShowNoticeModal(true);
	};
	const handleConfirmNoticeAndStart = async () => {
		setShowNoticeModal(false);
		try {
			if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
				setMicPermission("unsupported");
				toast.error("Browser does not support audio recording.");
				return;
			}
			const constraints = { audio: selectedDeviceId !== "default" ? {
				deviceId: { exact: selectedDeviceId },
				echoCancellation: true,
				noiseSuppression: true,
				autoGainControl: true
			} : {
				echoCancellation: true,
				noiseSuppression: true,
				autoGainControl: true
			} };
			const stream = await navigator.mediaDevices.getUserMedia(constraints);
			streamRef.current = stream;
			setMicPermission("granted");
			try {
				const AudioCtx = window.AudioContext || window.webkitAudioContext;
				if (AudioCtx) {
					const audioCtx = new AudioCtx();
					audioContextRef.current = audioCtx;
					const analyser = audioCtx.createAnalyser();
					analyser.fftSize = 64;
					analyser.smoothingTimeConstant = .8;
					analyserRef.current = analyser;
					audioCtx.createMediaStreamSource(stream).connect(analyser);
					const dataArray = new Uint8Array(analyser.frequencyBinCount);
					const updateMeter = () => {
						if (!analyserRef.current || !streamRef.current) return;
						analyserRef.current.getByteFrequencyData(dataArray);
						let sum = 0;
						const bars = [];
						for (let i = 0; i < 32; i++) {
							const val = dataArray[i] ?? 0;
							sum += val;
							bars.push(Math.max(10, Math.min(95, val / 255 * 100)));
						}
						const avg = sum / (dataArray.length || 1);
						const normalizedLevel = Math.min(100, Math.round(avg / 128 * 100));
						setMicAudioLevel(normalizedLevel);
						setFrequencyData(bars);
						animationFrameRef.current = requestAnimationFrame(updateMeter);
					};
					updateMeter();
				}
			} catch (audioCtxErr) {
				console.warn("Web Audio Analyser not available:", audioCtxErr);
			}
			const mime = getSupportedMimeType();
			setSelectedMimeType(mime);
			const mediaRecorder = new MediaRecorder(stream, { mimeType: mime });
			mediaRecorderRef.current = mediaRecorder;
			audioChunksRef.current = [];
			mediaRecorder.ondataavailable = (event) => {
				if (event.data && event.data.size > 0) audioChunksRef.current.push(event.data);
			};
			mediaRecorder.onstop = () => {
				const blob = new Blob(audioChunksRef.current, { type: mime });
				const url = URL.createObjectURL(blob);
				setRecordedBlob(blob);
				setAudioUrl(url);
				cleanupAudioPipeline();
			};
			mediaRecorder.start(250);
		} catch (err) {
			console.warn("Failed to initiate MediaRecorder:", err);
			if (err.name === "NotAllowedError") {
				setMicPermission("denied");
				toast.error("Microphone access was denied.");
				return;
			}
			toast.error("Failed to start recording: " + (err.message || "Unknown error"));
			return;
		}
		setIsRecording(true);
		setIsPaused(false);
		setElapsedSeconds(0);
		setHasRecording(false);
		setIsSaved(false);
		setIsPlaying(false);
		setAudioUrl(null);
		setRecordedBlob(null);
		onStartRecording?.();
		toast.info("Audio recording session started. Recording testimony.");
	};
	const handlePauseResume = () => {
		if (!mediaRecorderRef.current) return;
		if (mediaRecorderRef.current.state === "recording") {
			mediaRecorderRef.current.pause();
			setIsPaused(true);
			setMicAudioLevel(0);
			toast.info("Recording paused.");
		} else if (mediaRecorderRef.current.state === "paused") {
			mediaRecorderRef.current.resume();
			setIsPaused(false);
			toast.info("Recording resumed.");
		}
	};
	const confirmStop = () => {
		setShowStopConfirm(false);
		setSavedDuration(elapsedSeconds || 1);
		setIsRecording(false);
		setIsPaused(false);
		setHasRecording(true);
		setIsSaved(false);
		setPlaybackTime(0);
		if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
		else cleanupAudioPipeline();
		toast.success("Recording finalized. Ready for review and evidence vaulting.");
	};
	const handleSaveToEvidence = () => {
		const finalDuration = savedDuration || elapsedSeconds || 1;
		const nowIso = (/* @__PURE__ */ new Date()).toISOString();
		const fileName = `${currentSessionId}.webm`;
		const fileSize = `${(finalDuration * .035).toFixed(2)} MB`;
		const payload = {
			recordingId: `REC-${Date.now().toString().slice(-6)}`,
			sessionId: currentSessionId,
			durationSec: finalDuration,
			fileName,
			url: audioUrl || void 0,
			rawBlob: recordedBlob || void 0,
			mimeType: selectedMimeType,
			fileSize,
			recordedAt: nowIso,
			recordedBy,
			recordedByRole,
			recordingType,
			participants: participantsList
		};
		setIsSaved(true);
		if (onSaveRecording) onSaveRecording(payload);
		else if (onRecordingComplete) onRecordingComplete(payload);
		toast.success("Audio recording permanently saved to case evidence.");
	};
	const handleDiscard = () => {
		setShowDiscardConfirm(false);
		cleanupAudioPipeline();
		if (audioElementRef.current) audioElementRef.current.pause();
		setIsRecording(false);
		setIsPaused(false);
		setElapsedSeconds(0);
		setHasRecording(false);
		setIsSaved(false);
		setIsPlaying(false);
		setPlaybackTime(0);
		setAudioUrl(null);
		setRecordedBlob(null);
		toast.info("Unsaved recording discarded.");
	};
	const togglePlayback = () => {
		if (!audioUrl) return;
		if (!audioElementRef.current) {
			const audio = new Audio(audioUrl);
			audioElementRef.current = audio;
			audio.volume = volume / 100;
			audio.playbackRate = playbackRate;
			audio.ontimeupdate = () => {
				setPlaybackTime(Math.floor(audio.currentTime));
			};
			audio.onended = () => {
				setIsPlaying(false);
				setPlaybackTime(0);
			};
		}
		if (isPlaying) {
			audioElementRef.current.pause();
			setIsPlaying(false);
		} else {
			audioElementRef.current.playbackRate = playbackRate;
			audioElementRef.current.play().catch((err) => {
				console.warn("Audio play error:", err);
			});
			setIsPlaying(true);
		}
	};
	const handleSeek = (newTimeSec) => {
		setPlaybackTime(newTimeSec);
		if (audioElementRef.current) audioElementRef.current.currentTime = newTimeSec;
	};
	const handleVolumeChange = (newVol) => {
		setVolume(newVol);
		if (audioElementRef.current) audioElementRef.current.volume = newVol / 100;
	};
	const handleSpeedChange = (speed) => {
		setPlaybackRate(speed);
		if (audioElementRef.current) audioElementRef.current.playbackRate = speed;
	};
	const formatTime = (secs) => {
		const hrs = Math.floor(secs / 3600);
		const mins = Math.floor(secs % 3600 / 60);
		const s = secs % 60;
		return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
	};
	const activeSegments = Math.round(micAudioLevel / 100 * 10);
	const toggleParticipantRole = (roleName, defaultName) => {
		if (participantsList.some((p) => p.role === roleName)) setParticipantsList(participantsList.filter((p) => p.role !== roleName));
		else setParticipantsList([...participantsList, {
			name: defaultName,
			role: roleName
		}]);
	};
	const handleAddCustomWitness = () => {
		if (!newWitnessName.trim()) return;
		setParticipantsList([...participantsList, {
			name: newWitnessName.trim(),
			role: "Witness"
		}]);
		setNewWitnessName("");
	};
	const removeParticipant = (index) => {
		setParticipantsList(participantsList.filter((_, i) => i !== index));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface overflow-hidden p-5 sm:p-6 space-y-4",
		role: "region",
		"aria-label": "Investigation Audio Recorder",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-base font-bold text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {
							className: "size-4 text-primary",
							"aria-hidden": "true"
						}), "INVESTIGATION AUDIO RECORDER"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 font-mono text-[0.68rem] text-muted-foreground border border-border/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
								className: "size-3 text-signal",
								"aria-hidden": "true"
							}),
							" MediaRecorder (",
							selectedMimeType.split(";")[0],
							")"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Case: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "font-mono text-foreground",
							children: caseId
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Session: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "font-mono text-foreground",
							children: currentSessionId
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Microphone: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: availableDevices.find((d) => d.deviceId === selectedDeviceId)?.label || "Default Microphone"
						})] })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: isRecording ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold ring-1 transition-all", isPaused ? "bg-amber-500/15 text-amber-600 ring-amber-500/30 dark:text-amber-400" : "bg-signal/15 text-signal ring-signal/30"),
					role: "status",
					"aria-live": "polite",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2.5 rounded-full", isPaused ? "bg-amber-500" : "bg-signal rec-pulse") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isPaused ? "PAUSED" : "● RECORDING LIVE" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono tabular-nums",
							children: formatTime(elapsedSeconds)
						})
					]
				}) : hasRecording ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					role: "status",
					children: isSaved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-500/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), " Recording Saved as Evidence"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-600 ring-1 ring-amber-500/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-3.5" }), " Unsaved Recording in Memory"]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground border border-border/70",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-muted-foreground/50" }), " Ready to Record"]
				}) })]
			}),
			micPermission === "denied" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-xs space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 font-semibold text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-4" }), " Microphone Access Blocked"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Microphone access is required to record investigation hearings. Please allow microphone access in your browser bar."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 pt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: requestMicAccess,
							className: "text-xs h-7 gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-3.5" }), " Try Again / Allow Microphone"]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/20 px-3.5 py-2 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 flex-1 min-w-[240px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground shrink-0 flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "size-3.5" }), " Microphone Input:"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: selectedDeviceId,
						onChange: (e) => setSelectedDeviceId(e.target.value),
						disabled: isRecording,
						className: "h-7 rounded border border-border bg-card px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-full max-w-xs",
						"aria-label": "Select microphone device",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "default",
							children: "Default System Microphone"
						}), availableDevices.map((d, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: d.deviceId,
							children: d.label || `Microphone ${idx + 1}`
						}, d.deviceId || idx))]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "live-stt-toggle",
						className: "text-xs text-muted-foreground cursor-pointer select-none",
						children: "Live Transcription Stream"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						id: "live-stt-toggle",
						checked: showLiveTranscription,
						onCheckedChange: setShowLiveTranscription,
						"aria-label": "Toggle live transcription display"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border/80 bg-background/50 p-4 sm:p-6",
				children: [
					!isRecording && !hasRecording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center py-6 text-center space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleInitiateRecording,
									className: "grid size-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-primary/20",
									"aria-label": "Start recording investigation audio",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-8" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-sm text-foreground",
								children: "Ready to Record Investigation Statement"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-md text-xs text-muted-foreground mx-auto",
								children: "Direct browser recording with Web Audio API. Displays live frequency waveform, precise timer, and converts directly into DSIM case evidence."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-center gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: handleInitiateRecording,
									size: "lg",
									className: "gap-2 px-6 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }), " 🎙 Start Recording"]
								}), micPermission === "prompt" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "lg",
									onClick: requestMicAccess,
									className: "text-xs",
									children: "Test Microphone Access"
								})]
							})
						]
					}),
					isRecording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("grid gap-4", showLiveTranscription ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-24 items-center justify-center gap-1 rounded-xl bg-card/90 px-4 border border-border/60 shadow-inner",
									role: "img",
									"aria-label": "Live audio waveform visualizer",
									children: frequencyData.map((heightPercent, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("w-1.5 rounded-full transition-all duration-75", isPaused ? "bg-muted-foreground/30" : "bg-signal"),
										style: { height: isPaused ? "12%" : `${heightPercent}%` }
									}, i))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border/60 bg-card p-3 space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-medium text-foreground flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3 text-signal" }), " Microphone Level"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[0.68rem] text-muted-foreground",
											children: isPaused ? "Paused" : `${micAudioLevel}%`
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-1 h-3",
										role: "progressbar",
										"aria-valuenow": micAudioLevel,
										"aria-valuemin": 0,
										"aria-valuemax": 100,
										"aria-label": "Microphone input level",
										children: Array.from({ length: 10 }).map((_, idx) => {
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("flex-1 h-full rounded-xs transition-colors duration-100", !(!isPaused && idx < activeSegments) ? "bg-secondary" : idx >= 8 ? "bg-rose-500" : idx >= 6 && idx < 8 ? "bg-amber-500" : "bg-emerald-500") }, idx);
										})
									})]
								})]
							}), showLiveTranscription && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-dashed border-border bg-card/60 p-4 flex flex-col justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-border/60 pb-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 text-xs font-semibold text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3.5 text-indigo-500" }), " Live Transcript Stream"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.65rem] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground",
										children: "STT Service Pending"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "py-6 text-center space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-6 text-muted-foreground mx-auto" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold text-foreground",
											children: "Live speech-to-text service not configured"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[0.72rem] text-muted-foreground max-w-xs mx-auto",
											children: "Real-time streaming transcription requires an external WebSocket STT service. Full transcript generation is available once recording is saved to evidence."
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[0.65rem] font-mono text-muted-foreground border-t border-border/50 pt-2 flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Active Participants: ", participantsList.length] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Status: Offline STT" })]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-between gap-4 sm:flex-row pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 font-mono text-2xl sm:text-3xl font-bold tracking-tight text-foreground tabular-nums",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-3 rounded-full", isPaused ? "bg-amber-500" : "bg-signal rec-pulse") }), formatTime(elapsedSeconds)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground font-mono",
									children: isPaused ? "(Paused)" : "(Recording)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									onClick: handlePauseResume,
									className: "gap-1.5 text-xs h-9",
									"aria-label": isPaused ? "Resume recording" : "Pause recording",
									children: [isPaused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5 text-signal" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }), isPaused ? "Resume" : "Pause"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "destructive",
									onClick: () => setShowStopConfirm(true),
									className: "gap-1.5 text-xs h-9 shadow-sm",
									"aria-label": "Stop recording",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3.5 fill-current" }), " Stop Recording"]
								})]
							})]
						})]
					}),
					hasRecording && !isRecording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-border/80 bg-card p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-10 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-6" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-bold text-foreground",
											children: "Recording Complete"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-mono mt-0.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Duration: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground",
													children: formatTime(savedDuration)
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Format: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground",
													children: selectedMimeType
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Size: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
													className: "text-foreground",
													children: [(savedDuration * .035).toFixed(2), " MB"]
												})] })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 text-xs text-muted-foreground",
											children: ["Participants: ", participantsList.map((p) => p.name).join(", ")]
										})
									] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: isSaved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), " Saved as Evidence"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-medium px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-3.5" }), " Unsaved Track"]
								}) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-card p-4 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "outline",
											className: "size-11 rounded-full shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
											onClick: togglePlayback,
											"aria-label": isPlaying ? "Pause audio playback" : "Play audio recording",
											children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-5 ml-0.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 w-full space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
												value: [playbackTime],
												max: savedDuration || 100,
												step: 1,
												onValueChange: (val) => handleSeek(val[0] ?? 0),
												className: "w-full",
												"aria-label": "Seek audio timeline"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between font-mono text-[0.68rem] text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTime(playbackTime) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTime(savedDuration) })]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "hidden items-center gap-2 sm:flex",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
												className: "size-4 text-muted-foreground",
												"aria-hidden": "true"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
												value: [volume],
												max: 100,
												step: 5,
												onValueChange: (val) => handleVolumeChange(val[0] ?? 80),
												className: "w-16",
												"aria-label": "Playback volume"
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-t border-border/50 pt-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground text-[0.72rem]",
										children: "Playback speed:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-1",
										children: [
											.75,
											1,
											1.25,
											1.5,
											2
										].map((spd) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleSpeedChange(spd),
											className: cn("rounded px-2 py-0.5 font-mono text-[0.7rem] transition-colors cursor-pointer", playbackRate === spd ? "bg-primary text-primary-foreground font-bold" : "bg-muted text-muted-foreground hover:bg-muted/80"),
											children: [spd, "x"]
										}, spd))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => setShowDiscardConfirm(true),
											className: "gap-1.5 text-xs text-muted-foreground hover:text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), " Re-record"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => setShowDiscardConfirm(true),
											className: "gap-1.5 text-xs text-destructive hover:bg-destructive/10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), " Discard"]
										}),
										audioUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											size: "sm",
											className: "gap-1.5 text-xs",
											onClick: () => {
												const a = document.createElement("a");
												a.href = audioUrl;
												a.download = `${currentSessionId}.webm`;
												a.click();
												toast.success("Downloaded recording file for audit backup");
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), " Download"]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [!isSaved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										onClick: handleSaveToEvidence,
										className: "gap-1.5 text-xs bg-primary shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" }), " Save as Evidence"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										disabled: true,
										className: "gap-1.5 text-xs text-emerald-600 border-emerald-500/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), " Saved as Evidence"]
									}), onGenerateTranscript && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: isSaved ? "default" : "outline",
										onClick: () => {
											if (!isSaved) handleSaveToEvidence();
											onGenerateTranscript();
										},
										disabled: externalProcessing,
										className: "gap-1.5 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-indigo-400" }), externalProcessing ? "Transcribing..." : "Generate Transcript"]
									})]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: showNoticeModal,
				onOpenChange: setShowNoticeModal,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "text-base font-bold flex items-center gap-2 text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-primary" }), "AUDIO RECORDING NOTICE"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-xs text-muted-foreground",
							children: "KPR College of Arts, Science and Research — Disciplinary Investigation Hearing"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-primary/20 bg-primary/5 p-3 text-muted-foreground leading-relaxed",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: "Institutional Recording Policy: "
									}), "This session will be audio recorded for authorized institutional investigation and disciplinary proceedings under KPRCAS regulations. The recorded audio will be cataloged into the confidential case evidence dossier."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 rounded-lg bg-muted/40 p-3 font-mono text-[0.72rem]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Case ID:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-foreground",
										children: caseId
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Session ID:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-foreground",
										children: currentSessionId
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-semibold text-foreground text-xs",
										children: "Recording Purpose / Type:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-3 gap-2",
										children: [
											"Investigation Interview",
											"Hearing Statement",
											"Witness Deposition"
										].map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setRecordingType(type),
											className: cn("rounded-lg border p-2 text-center text-xs font-medium transition-colors cursor-pointer", recordingType === type ? "border-primary bg-primary text-primary-foreground shadow-xs" : "border-border bg-card text-muted-foreground hover:bg-muted"),
											children: type
										}, type))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "font-semibold text-foreground text-xs flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5 text-primary" }), " Present Participants:"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[0.68rem] text-muted-foreground",
												children: "Verify all persons in attendance"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => toggleParticipantRole("Discipline Committee Head", "Dr. S. Ramanathan"),
													className: cn("rounded-md px-2.5 py-1 text-xs border transition-colors cursor-pointer", participantsList.some((p) => p.role.includes("Committee Head")) ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 font-medium" : "border-border bg-card text-muted-foreground"),
													children: "✓ Committee Head"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => toggleParticipantRole("Disciplinary Board Member", "Board Member"),
													className: cn("rounded-md px-2.5 py-1 text-xs border transition-colors cursor-pointer", participantsList.some((p) => p.role.includes("Board Member")) ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 font-medium" : "border-border bg-card text-muted-foreground"),
													children: "+ Board Member"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => toggleParticipantRole("Student / Respondent", accusedStudent),
													className: cn("rounded-md px-2.5 py-1 text-xs border transition-colors cursor-pointer", participantsList.some((p) => p.role.includes("Student")) ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 font-medium" : "border-border bg-card text-muted-foreground"),
													children: "✓ Student / Respondent"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-lg border border-border bg-card p-2 space-y-1.5 max-h-32 overflow-y-auto",
											children: participantsList.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-xs py-0.5 border-b border-border/40 last:border-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-foreground font-medium",
													children: [
														p.name,
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-muted-foreground font-mono text-[0.68rem]",
															children: [
																"(",
																p.role,
																")"
															]
														})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => removeParticipant(idx),
													className: "text-muted-foreground hover:text-destructive text-[0.7rem]",
													children: "Remove"
												})]
											}, idx))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: newWitnessName,
												onChange: (e) => setNewWitnessName(e.target.value),
												placeholder: "Add additional witness name...",
												className: "h-8 text-xs bg-background"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												size: "sm",
												variant: "outline",
												onClick: handleAddCustomWitness,
												className: "h-8 text-xs",
												children: "Add Witness"
											})]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "flex justify-between sm:justify-between items-center pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setShowNoticeModal(false),
								className: "text-xs h-8",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: handleConfirmNoticeAndStart,
								className: "text-xs h-8 bg-primary gap-1.5 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { className: "size-3.5" }), " I Understand and Continue"]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: showStopConfirm,
				onOpenChange: setShowStopConfirm,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
					className: "text-base font-bold",
					children: "Finalize Investigation Audio Track?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, {
					className: "text-xs text-muted-foreground",
					children: [
						"Stopping will finalize the current audio stream (",
						formatTime(elapsedSeconds),
						"). You can review playback, adjust speed, save it to the case evidence vault, and generate speech-to-text transcripts."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
					className: "text-xs",
					children: "Continue Recording"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: confirmStop,
					className: "text-xs bg-destructive text-destructive-foreground",
					children: "Stop Recording"
				})] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: showDiscardConfirm,
				onOpenChange: setShowDiscardConfirm,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
					className: "text-base font-bold text-destructive",
					children: "Discard Unsaved Recording?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
					className: "text-xs text-muted-foreground",
					children: "Current recording has not been saved. Re-recording will discard it from memory. If you need this testimony, save it as case evidence first."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
					className: "text-xs",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: handleDiscard,
					className: "text-xs bg-destructive text-destructive-foreground",
					children: "Discard & Re-record"
				})] })] })
			})
		]
	});
}
function AudioEvidencePlayer({ evidence, open, onOpenChange, onViewTranscript, onGenerateTranscript, onAuditDownload }) {
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [currentTimeSec, setCurrentTimeSec] = (0, import_react.useState)(0);
	const [durationSec, setDurationSec] = (0, import_react.useState)(evidence?.durationSec || 120);
	const [volume, setVolume] = (0, import_react.useState)(85);
	const [playbackRate, setPlaybackRate] = (0, import_react.useState)(1);
	const audioElemRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (evidence) {
			setDurationSec(evidence.durationSec || 120);
			setCurrentTimeSec(0);
			setIsPlaying(false);
			setPlaybackRate(1);
		}
	}, [evidence]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (audioElemRef.current) {
				audioElemRef.current.pause();
				audioElemRef.current = null;
			}
		};
	}, []);
	if (!evidence) return null;
	const togglePlay = () => {
		if (evidence.url) {
			if (!audioElemRef.current) {
				const a = new Audio(evidence.url);
				audioElemRef.current = a;
				a.volume = volume / 100;
				a.playbackRate = playbackRate;
				a.ontimeupdate = () => setCurrentTimeSec(Math.floor(a.currentTime));
				a.onloadedmetadata = () => setDurationSec(Math.floor(a.duration));
				a.onended = () => {
					setIsPlaying(false);
					setCurrentTimeSec(0);
				};
			}
			if (isPlaying) {
				audioElemRef.current.pause();
				setIsPlaying(false);
			} else {
				audioElemRef.current.playbackRate = playbackRate;
				audioElemRef.current.play().catch((err) => console.warn(err));
				setIsPlaying(true);
			}
		} else setIsPlaying((prev) => !prev);
	};
	const handleSeek = (newSec) => {
		setCurrentTimeSec(newSec);
		if (audioElemRef.current) audioElemRef.current.currentTime = newSec;
	};
	const handleVolume = (vol) => {
		setVolume(vol);
		if (audioElemRef.current) audioElemRef.current.volume = vol / 100;
	};
	const handleSpeed = (speed) => {
		setPlaybackRate(speed);
		if (audioElemRef.current) audioElemRef.current.playbackRate = speed;
	};
	const handleDownload = () => {
		if (evidence.url) {
			const a = document.createElement("a");
			a.href = evidence.url;
			a.download = evidence.fileName || `Investigation-Audio-${evidence.id}.webm`;
			a.click();
		}
		onAuditDownload?.(evidence);
		toast.success(`Downloaded authorized audio evidence: ${evidence.fileName || evidence.id}`);
	};
	const formatTime = (secs) => {
		const hrs = Math.floor(secs / 3600);
		const mins = Math.floor(secs % 3600 / 60);
		const s = secs % 60;
		if (hrs > 0) return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
		return `${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[0.68rem] text-muted-foreground uppercase tracking-wider",
							children: [evLabel(evidence.number), " · AUDIO EVIDENCE"]
						}), evidence.status === "Verified" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[0.68rem] font-semibold text-emerald-600 border border-emerald-500/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Chain-of-Custody Verified"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-[0.68rem] font-semibold text-amber-600 border border-amber-500/20",
							children: "Under Review"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "text-base font-bold flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "size-4 text-primary" }), evidence.description || "Investigation Audio Recording"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs text-muted-foreground",
						children: "Confidential Investigation Hearing Audio Dossier"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 py-2 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 sm:grid-cols-4 gap-2.5 rounded-xl border border-border bg-muted/20 p-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.68rem] text-muted-foreground",
									children: "Evidence ID:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono font-bold text-foreground truncate",
									children: evidence.id
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.68rem] text-muted-foreground",
									children: "Case ID:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono font-semibold text-foreground truncate",
									children: evidence.caseId
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.68rem] text-muted-foreground",
									children: "Recorded By:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium text-foreground truncate",
									children: evidence.recordedBy || evidence.capturedBy || "Dr. S. Ramanathan"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.68rem] text-muted-foreground",
									children: "Recorded At:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium text-foreground truncate",
									children: fmtDateTime(evidence.recordedAt || evidence.timestamp)
								})] })
							]
						}),
						evidence.participants && evidence.participants.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border/70 bg-card p-2.5 space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[0.68rem] font-semibold text-muted-foreground flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3 text-primary" }), " Identified Recording Participants:"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5 pt-0.5",
								children: evidence.participants.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded bg-secondary px-2 py-0.5 font-mono text-[0.68rem] text-foreground border border-border/50",
									children: [
										p.name,
										" (",
										p.role,
										")"
									]
								}, idx))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-4 space-y-3 shadow-inner",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "outline",
										className: "size-11 rounded-full shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground shadow-sm",
										onClick: togglePlay,
										"aria-label": isPlaying ? "Pause audio evidence" : "Play audio evidence",
										children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-5 ml-0.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 w-full space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
											value: [currentTimeSec],
											max: durationSec,
											step: 1,
											onValueChange: (val) => handleSeek(val[0] ?? 0),
											className: "w-full",
											"aria-label": "Audio scrubber slider"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between font-mono text-[0.68rem] text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTime(currentTimeSec) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTime(durationSec) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hidden items-center gap-2 sm:flex",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
											className: "size-4 text-muted-foreground",
											"aria-hidden": "true"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
											value: [volume],
											max: 100,
											step: 5,
											onValueChange: (val) => handleVolume(val[0] ?? 80),
											className: "w-16",
											"aria-label": "Playback volume"
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-t border-border/50 pt-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground text-[0.7rem]",
									children: "Playback Speed:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-1",
									children: [
										.75,
										1,
										1.25,
										1.5,
										2
									].map((spd) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => handleSpeed(spd),
										className: cn("rounded px-2 py-0.5 font-mono text-[0.7rem] transition-colors cursor-pointer", playbackRate === spd ? "bg-primary text-primary-foreground font-bold" : "bg-muted text-muted-foreground hover:bg-muted/80"),
										children: [spd, "x"]
									}, spd))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2 rounded-lg border border-border/70 bg-muted/30 p-2.5 text-[0.7rem] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 shrink-0 text-primary mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Chain of Custody & Audit Protection:" }), " All playback and export actions on this audio track are timestamped and permanently logged in the DSIM Audit History."] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: handleDownload,
						className: "text-xs h-8 gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), " Download Audio Track"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [evidence.transcriptStatus === "Completed" || evidence.transcriptStatus === "Verified" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => {
								onOpenChange(false);
								onViewTranscript?.(evidence.id);
							},
							className: "text-xs h-8 gap-1.5 text-primary border-primary/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3.5" }), " View Transcript →"]
						}) : onGenerateTranscript ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => {
								onOpenChange(false);
								onGenerateTranscript(evidence.id);
							},
							className: "text-xs h-8 gap-1.5 bg-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Generate Transcript"]
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => onOpenChange(false),
							className: "text-xs h-8",
							children: "Close"
						})]
					})]
				})
			]
		})
	});
}
var Route$2 = createFileRoute("/cases/$caseId/investigation")({
	head: ({ params }) => ({ meta: [
		{ title: `Investigation: ${params.caseId} — DSIM` },
		{
			name: "description",
			content: "Active confidential investigation workspace."
		},
		{
			property: "og:title",
			content: `Investigation: ${params.caseId} — DSIM`
		},
		{
			property: "og:description",
			content: "Active confidential investigation workspace."
		}
	] }),
	component: InvestigationWorkspacePage
});
function InvestigationWorkspacePage() {
	const { caseId } = Route$2.useParams();
	const navigate = useNavigate();
	const { getCase, updateCase, addEvidence, updateEvidence, removeEvidence, addTimeline, addInvestigationNote, updateInvestigationNote, deleteInvestigationNote, setTranscript, updateTranscriptEntry, verifyTranscript, setTranscriptStatus, pushNotification, currentUser } = useDsim();
	const caseRecord = getCase(caseId);
	const [sessionTimer, setSessionTimer] = (0, import_react.useState)(1968);
	const [isTimerRunning, setIsTimerRunning] = (0, import_react.useState)(true);
	const [isAiProcessing, setIsAiProcessing] = (0, import_react.useState)(false);
	const [isTranscribing, setIsTranscribing] = (0, import_react.useState)(false);
	const [showAddPerson, setShowAddPerson] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("recorder");
	const [latestAudioEvidenceId, setLatestAudioEvidenceId] = (0, import_react.useState)(void 0);
	const [latestAudioUrl, setLatestAudioUrl] = (0, import_react.useState)(void 0);
	const [selectedAudioEvidence, setSelectedAudioEvidence] = (0, import_react.useState)(null);
	const timerRef = (0, import_react.useRef)(null);
	const recorderSectionRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (isTimerRunning) timerRef.current = window.setInterval(() => {
			setSessionTimer((t) => t + 1);
		}, 1e3);
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isTimerRunning]);
	if (!caseRecord) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Protected, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: FolderX,
		title: "Investigation Case Not Found",
		description: "The requested investigation file does not exist or has been deleted.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/cases",
				children: "Return to Cases"
			})
		})
	}) });
	const audioRecordingsList = caseRecord.evidence.filter((e) => e.type === "audio");
	const formatTimer = (totalSecs) => {
		const hrs = Math.floor(totalSecs / 3600);
		const mins = Math.floor(totalSecs % 3600 / 60);
		const secs = totalSecs % 60;
		return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	};
	const handleRecordingStart = () => {
		addTimeline(caseId, {
			event: "Audio recording started",
			kind: "audio",
			description: "Investigation interview / hearing statement recording session initiated in browser studio."
		});
	};
	const handleSaveAudioEvidence = (recording) => {
		const ev = addEvidence(caseId, {
			type: "audio",
			fileName: recording.fileName,
			fileSize: recording.fileSize,
			description: `${recording.recordingType || "Investigation audio statement"} (${Math.floor(recording.durationSec / 60)}m ${recording.durationSec % 60}s)`,
			durationSec: recording.durationSec,
			...recording.url ? { url: recording.url } : {},
			...recording.rawBlob ? { rawBlob: recording.rawBlob } : {},
			mimeType: recording.mimeType,
			capturedBy: recording.recordedBy || currentUser?.displayName || "Dr. S. Ramanathan",
			recordedBy: recording.recordedBy || currentUser?.displayName || "Dr. S. Ramanathan",
			recordedByRole: recording.recordedByRole || currentUser?.role || "Discipline Committee Head",
			sessionId: recording.sessionId,
			recordingType: recording.recordingType,
			participants: recording.participants,
			status: "Pending Review",
			transcriptStatus: "Not Generated"
		});
		setLatestAudioEvidenceId(ev.id);
		if (recording.url) setLatestAudioUrl(recording.url);
		addTimeline(caseId, {
			event: "Audio recording completed",
			kind: "audio",
			evidenceRef: `Evidence #${String(ev.number).padStart(2, "0")}`,
			description: `Captured ${recording.durationSec}s encrypted audio statement (${recording.sessionId}).`
		});
		toast.success("Audio recording saved to Case Evidence vault.");
	};
	const handleGenerateTranscript = (targetEvId) => {
		const audioEvId = targetEvId || latestAudioEvidenceId || caseRecord?.transcriptAudioEvidenceId || "AUD-0001";
		setIsTranscribing(true);
		setTranscriptStatus(caseId, "Processing", audioEvId);
		addTimeline(caseId, {
			event: "Transcript generation started",
			kind: "transcript",
			evidenceRef: audioEvId,
			description: "Transcribing investigation audio stream via speech-to-text pipeline."
		});
		toast.info("Transcribing the investigation recording...");
		setTimeout(() => {
			setIsTranscribing(false);
			const generatedDialogue = [
				{
					id: `tr-${Date.now()}-1`,
					timestamp: "00:00:15",
					timeOffsetSec: 15,
					speaker: "Investigator",
					speakerName: "Dr. S. Ramanathan",
					text: `We are recording the formal inquiry into the incident in ${caseRecord.caseName}. Please state your full name and roll number for the record.`,
					confidence: .96,
					reviewed: false,
					audioEvidenceId: audioEvId
				},
				{
					id: `tr-${Date.now()}-2`,
					timestamp: "00:00:38",
					timeOffsetSec: 38,
					speaker: "Student",
					speakerName: caseRecord.accusedStudent,
					text: `My name is ${caseRecord.accusedStudent}, roll number ${caseRecord.rollNumber}, Department of ${caseRecord.department}.`,
					confidence: .94,
					reviewed: false,
					audioEvidenceId: audioEvId
				},
				{
					id: `tr-${Date.now()}-3`,
					timestamp: "00:01:14",
					timeOffsetSec: 74,
					speaker: "Investigator",
					speakerName: "Dr. S. Ramanathan",
					text: `Please explain your presence at the location during the reported incident time.`,
					confidence: .92,
					reviewed: false,
					audioEvidenceId: audioEvId
				},
				{
					id: `tr-${Date.now()}-4`,
					timestamp: "00:01:42",
					timeOffsetSec: 102,
					speaker: "Student",
					speakerName: caseRecord.accusedStudent,
					text: `I was present in the department area as requested for academic laboratory work, but I was not involved in unauthorized access to the restricted terminal.`,
					confidence: .88,
					reviewed: false,
					audioEvidenceId: audioEvId
				},
				{
					id: `tr-${Date.now()}-5`,
					timestamp: "00:02:18",
					timeOffsetSec: 138,
					speaker: "Witness",
					speakerName: "Lab Invigilator / Staff",
					text: `The student arrived at approximately 14:15. We noticed terminal logs indicating concurrent credential usage.`,
					confidence: .65,
					flaggedUnclear: true,
					notes: "Acoustic echo near corridor microphone",
					reviewed: false,
					audioEvidenceId: audioEvId
				},
				{
					id: `tr-${Date.now()}-6`,
					timestamp: "00:02:55",
					timeOffsetSec: 175,
					speaker: "Investigator",
					speakerName: "Dr. S. Ramanathan",
					text: `We will verify the terminal audit timestamps against the network access logs. Do you have any additional statements to record?`,
					confidence: .95,
					reviewed: false,
					audioEvidenceId: audioEvId
				},
				{
					id: `tr-${Date.now()}-7`,
					timestamp: "00:03:20",
					timeOffsetSec: 200,
					speaker: "Student",
					speakerName: caseRecord.accusedStudent,
					text: `No, sir. I have submitted my statement and I will cooperate with any additional verification.`,
					confidence: .93,
					reviewed: false,
					audioEvidenceId: audioEvId
				}
			];
			setTranscript(caseId, generatedDialogue, audioEvId, "Completed");
			updateEvidence(caseId, audioEvId, { transcriptStatus: "Completed" }, "Transcript generated from recording");
			toast.success("Transcript generated successfully.");
			setActiveTab("transcript");
		}, 2200);
	};
	const handleVerifyTranscript = () => {
		verifyTranscript(caseId);
		toast.success("Transcript verified by Committee.");
	};
	const handleGenerateAiSynopsis = () => {
		setActiveTab("synopsis");
		setIsAiProcessing(true);
		toast.info("Generating AI investigation synopsis from verified transcript and evidence...");
		setTimeout(() => {
			setIsAiProcessing(false);
			const synopsisContent = `INVESTIGATION SYNOPSIS (CASE ${caseRecord.id}):\n\n1. INCIDENT OVERVIEW:\nInquiry concerning allegations in ${caseRecord.caseName}. Primary subject identified as ${caseRecord.accusedStudent} (${caseRecord.rollNumber}, ${caseRecord.department}).\n\n2. TESTIMONY & SPOKEN EVIDENCE ANALYSIS:\nAudio statement analysis confirms subject was physically present during stated hours. Subject denies intentional unauthorized system manipulation, claiming standard laboratory session participation. Witness testimony recorded in dialogue corroborates subject presence at 14:15, with acoustic flags noted for terminal log corroboration.\n\n3. EVIDENCE CORROBORATION:\n${caseRecord.evidence.length} evidence items currently catalogued in dossier. Cross-referencing digital access logs with witness oral statements indicates technical contradiction requiring invigilator confirmation.\n\n4. COMMITTEE NOTICE:\nAssistive AI summary. Human adjudication and committee review mandatory before disciplinary determination.`;
			updateCase(caseId, {
				synopsis: synopsisContent,
				aiSynopsis: {
					status: "AI Generated",
					content: synopsisContent,
					generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
					generatedBy: "Assistive AI Synthesis Engine",
					reviewed: false,
					confidenceScore: .91
				}
			});
			addTimeline(caseId, {
				event: "AI synopsis generated",
				kind: "synopsis",
				description: "AI synthesis finalized key witness statements and contradiction analysis."
			});
			pushNotification({
				type: "synopsis",
				message: `${caseId} AI synopsis is ready for committee review.`,
				caseId
			});
			toast.success("AI synopsis synthesized. Committee review and verification required.");
		}, 2500);
	};
	const handleSaveSynopsis = (newSynopsis) => {
		updateCase(caseId, { synopsis: newSynopsis });
	};
	const handleAddPerson = (p) => {
		const newPerson = {
			...p,
			id: Math.random().toString(36).slice(2, 9)
		};
		updateCase(caseId, { involvedPersons: [...caseRecord.involvedPersons, newPerson] });
		addTimeline(caseId, {
			event: "Additional person added",
			kind: "person",
			description: `${p.name} added as ${p.role} (${p.department})`
		});
		toast.success(`Added ${p.name} to involved persons`);
	};
	const handleCompleteInvestigation = () => {
		updateCase(caseId, {
			status: "Decision Pending",
			investigationEnd: (/* @__PURE__ */ new Date()).toISOString()
		});
		addTimeline(caseId, {
			event: "Investigation concluded",
			kind: "start",
			description: "Investigation session closed. Moved to Decision Pending stage."
		});
		pushNotification({
			type: "investigation",
			message: `Investigation for ${caseId} marked complete. Pending Committee decision.`,
			caseId
		});
		toast.success("Investigation session concluded. Redirecting to Case details.");
		navigate({
			to: "/cases/$caseId",
			params: { caseId }
		});
	};
	const scrollToRecorder = () => {
		setActiveTab("recorder");
		setTimeout(() => {
			recorderSectionRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Protected, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						className: "text-xs text-muted-foreground hover:text-foreground gap-1.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cases/$caseId",
							params: { caseId },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Back to Case File"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecureTag, { children: "Secure Case Workspace · Tamper-Proof" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: handleCompleteInvestigation,
						className: "gap-1.5 text-xs bg-primary hover:bg-primary/90 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, { className: "size-3.5" }), " Conclude & Record Sanction"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface overflow-hidden p-5 sm:p-6 bg-gradient-to-r from-card via-card to-secondary/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs font-bold text-muted-foreground",
									children: caseRecord.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-border" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: caseRecord.department
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-border" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: ["Accused: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: caseRecord.accusedStudent
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl sm:text-2xl font-bold tracking-tight text-foreground",
							children: caseRecord.caseName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground max-w-2xl",
							children: caseRecord.description
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 rounded-xl border border-border bg-background/80 p-3 sm:p-4 backdrop-blur shadow-inner",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-11 place-items-center rounded-lg bg-signal/10 text-signal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
								className: "size-6 animate-spin",
								style: { animationDuration: "8s" }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-wider text-signal",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-signal rec-pulse" }), "Investigation Active"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-2xl sm:text-3xl font-bold tracking-wider text-foreground tabular-nums",
								children: formatTimer(sessionTimer)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[0.65rem] text-muted-foreground",
								children: ["Session Started: ", new Date(caseRecord.investigationStart || Date.now()).toLocaleTimeString()]
							})
						] })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-3 border-b border-border/70 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-foreground",
						children: "Interview & Statement Roster"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setShowAddPerson(true),
						className: "h-7 text-xs gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-3" }), " + Add Witness"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3 sm:grid-cols-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonCard, {
						main: true,
						person: {
							id: "main-accused",
							name: caseRecord.accusedStudent,
							role: `${caseRecord.yearOfStudy} (Main Accused)`,
							department: caseRecord.department,
							rollNumber: caseRecord.rollNumber
						}
					}), caseRecord.involvedPersons.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonCard, { person: p }, p.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: activeTab,
				onValueChange: setActiveTab,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "grid grid-cols-3 sm:grid-cols-6 w-full sm:w-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "recorder",
								className: "text-xs gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-3.5" }), " Audio Recorder"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "transcript",
								className: "text-xs gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3.5" }), " Transcript"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "synopsis",
								className: "text-xs gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }),
									" Synopsis",
									caseRecord.synopsis && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-primary" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "evidence",
								className: "text-xs gap-1.5",
								children: [
									"Evidence (",
									caseRecord.evidence.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "notes",
								className: "text-xs gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyNote, { className: "size-3.5" }), " Notes"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "timeline",
								className: "text-xs gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }), " Chronology"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "recorder",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								ref: recorderSectionRef,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioRecorder, {
									caseId,
									caseName: caseRecord.caseName,
									accusedStudent: caseRecord.accusedStudent,
									recordedBy: currentUser?.displayName || "Dr. S. Ramanathan",
									recordedByRole: currentUser?.role || "Discipline Committee Head",
									onStartRecording: handleRecordingStart,
									onSaveRecording: handleSaveAudioEvidence,
									onGenerateTranscript: () => handleGenerateTranscript(),
									isProcessing: isTranscribing
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface p-5 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-sm font-bold text-foreground flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "size-4 text-primary" }),
											"INVESTIGATION AUDIO RECORDINGS (",
											audioRecordingsList.length,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: [
											"Catalog of all formal hearing statements, witness depositions, and recorded audio tracks for Case ",
											caseId,
											"."
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										onClick: scrollToRecorder,
										className: "text-xs gap-1.5 bg-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "size-3.5" }), " + New Recording"]
									})]
								}), audioRecordingsList.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-dashed border-border p-6 text-center space-y-2 bg-muted/10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-8 mx-auto text-muted-foreground" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-semibold text-foreground",
											children: "No audio recordings captured yet for this case"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground max-w-sm mx-auto",
											children: "Use the recording studio above to capture formal hearing testimony from the respondent or witnesses."
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-3.5",
									children: audioRecordingsList.map((audioEv, idx) => {
										const recIndex = String(idx + 1).padStart(2, "0");
										const durationMins = audioEv.durationSec ? Math.floor(audioEv.durationSec / 60) : 0;
										const durationSecs = audioEv.durationSec ? audioEv.durationSec % 60 : 0;
										const durFormatted = `${String(durationMins).padStart(2, "0")}:${String(durationSecs).padStart(2, "0")}`;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border bg-card p-4 space-y-3 shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between gap-2 border-b border-border/50 pb-2.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-bold text-xs text-foreground",
														children: ["Recording ", recIndex]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded bg-secondary px-1.5 py-0.2 font-mono text-[0.65rem] text-muted-foreground",
														children: audioEv.sessionId || evLabel(audioEv.number)
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[0.7rem] text-muted-foreground mt-0.5 font-mono",
													children: fmtDateTime(audioEv.recordedAt || audioEv.timestamp)
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted text-foreground",
													children: durFormatted
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5 pt-2 text-xs",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between text-muted-foreground",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Recorder:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-medium text-foreground",
															children: audioEv.recordedBy || audioEv.capturedBy || "Committee Head"
														})]
													}),
													audioEv.participants && audioEv.participants.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-start justify-between text-muted-foreground text-[0.72rem]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Participants:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-medium text-foreground text-right max-w-[200px] truncate",
															children: audioEv.participants.map((p) => p.name).join(", ")
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between pt-1 border-t border-border/40",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[0.68rem] text-muted-foreground",
															children: "Evidence Status:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-[0.68rem] font-semibold text-emerald-600 flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Stored in Vault"]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[0.68rem] text-muted-foreground",
															children: "Transcript:"
														}), audioEv.transcriptStatus === "Verified" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-[0.68rem] font-semibold text-emerald-600 flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Verified"]
														}) : audioEv.transcriptStatus === "Completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-[0.68rem] font-semibold text-indigo-600 flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Generated"]
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-[0.68rem] font-medium text-amber-600 flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-3" }), " Pending Generation"]
														})]
													})
												]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-2 pt-2 border-t border-border/60",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													variant: "outline",
													onClick: () => setSelectedAudioEvidence(audioEv),
													className: "text-xs h-7.5 gap-1.5 flex-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3 text-primary" }), " Open Recording"]
												}), audioEv.transcriptStatus === "Completed" || audioEv.transcriptStatus === "Verified" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													variant: "outline",
													onClick: () => {
														setLatestAudioEvidenceId(audioEv.id);
														if (audioEv.url) setLatestAudioUrl(audioEv.url);
														setActiveTab("transcript");
													},
													className: "text-xs h-7.5 gap-1 text-primary border-primary/30",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3" }), " View Transcript"]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													variant: "outline",
													onClick: () => handleGenerateTranscript(audioEv.id),
													className: "text-xs h-7.5 gap-1 text-indigo-600",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 text-indigo-500" }), " Transcribe"]
												})]
											})]
										}, audioEv.id);
									})
								})]
							}),
							caseRecord.synopsis && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-primary" }), " Active Investigation Synopsis"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										onClick: () => setActiveTab("synopsis"),
										className: "text-xs text-primary",
										children: "Open Full Editor →"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "line-clamp-3 text-xs text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-lg border border-border/50",
									children: caseRecord.synopsis
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "transcript",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranscriptViewer, {
							transcript: caseRecord.transcript ?? [],
							caseId,
							caseName: caseRecord.caseName,
							studentName: caseRecord.accusedStudent,
							audioEvidenceId: caseRecord.transcriptAudioEvidenceId || latestAudioEvidenceId,
							audioUrl: latestAudioUrl,
							transcriptStatus: caseRecord.transcriptStatus || (caseRecord.transcript && caseRecord.transcript.length > 0 ? "Completed" : "Not Generated"),
							onRegenerateTranscript: () => handleGenerateTranscript(),
							onUpdateEntry: (entryId, patch) => updateTranscriptEntry(caseId, entryId, patch),
							onVerifyTranscript: handleVerifyTranscript,
							onGenerateAiSynopsis: handleGenerateAiSynopsis
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "synopsis",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SynopsisEditor, {
							initialSynopsis: caseRecord.synopsis ?? "",
							aiSynopsis: caseRecord.aiSynopsis,
							isGenerating: isAiProcessing,
							onSaveSynopsis: handleSaveSynopsis,
							caseId,
							caseName: caseRecord.caseName,
							studentName: caseRecord.accusedStudent
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "evidence",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceGallery, {
							caseId,
							evidence: caseRecord.evidence,
							onAddEvidence: (e) => {
								const newEv = addEvidence(caseId, e);
								addTimeline(caseId, {
									event: `${e.type === "photo" ? "Photo" : e.type === "video" ? "Video" : e.type === "audio" ? "Audio" : "Document"} evidence added`,
									kind: e.type === "photo" ? "photo" : e.type === "video" ? "video" : e.type === "audio" ? "audio" : "note",
									evidenceRef: `Evidence #${String(newEv.number).padStart(2, "0")}`,
									description: e.description
								});
							},
							onUpdateEvidence: (evId, patch, custodyAction) => {
								updateEvidence(caseId, evId, patch, custodyAction);
							},
							onRemoveEvidence: (evId) => removeEvidence(caseId, evId),
							onViewTranscript: () => setActiveTab("transcript"),
							onGenerateTranscript: (evId) => handleGenerateTranscript(evId)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "notes",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvestigationNotesView, {
							caseId,
							notes: caseRecord.investigationNotes ?? [],
							onAddNote: (content) => addInvestigationNote(caseId, content),
							onUpdateNote: (noteId, content) => updateInvestigationNote(caseId, noteId, content),
							onDeleteNote: (noteId) => deleteInvestigationNote(caseId, noteId)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "timeline",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvestigationTimeline, {
							caseId,
							timeline: caseRecord.timeline,
							onAddNote: (note) => {
								addTimeline(caseId, {
									event: "Investigator note recorded",
									kind: "note",
									description: note
								});
							}
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddPersonModal, {
				open: showAddPerson,
				onOpenChange: setShowAddPerson,
				onAdd: handleAddPerson
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioEvidencePlayer, {
				evidence: selectedAudioEvidence,
				open: !!selectedAudioEvidence,
				onOpenChange: (open) => !open && setSelectedAudioEvidence(null),
				onViewTranscript: (evId) => {
					setLatestAudioEvidenceId(evId);
					if (selectedAudioEvidence?.url) setLatestAudioUrl(selectedAudioEvidence.url);
					setActiveTab("transcript");
				},
				onGenerateTranscript: (evId) => handleGenerateTranscript(evId),
				onAuditDownload: (ev) => {
					addTimeline(caseId, {
						event: "Audio evidence downloaded",
						kind: "audio",
						evidenceRef: ev.id,
						description: `Audio track ${ev.fileName} exported by ${currentUser?.displayName || "Committee Head"}.`
					});
				}
			})
		]
	}) });
}
var $$splitComponentImporter$1 = () => import("./student.complaints._complaintId-C-Alebn7.mjs");
var Route$1 = createFileRoute("/student/complaints/$complaintId")({
	head: () => ({ meta: [
		{ title: "Complaint Details — DSIM Student Portal" },
		{
			name: "description",
			content: "Track your complaint status and view authorized committee updates."
		},
		{
			property: "og:title",
			content: "Complaint Details — DSIM"
		},
		{
			property: "og:description",
			content: "Track your complaint status and view authorized committee updates."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./student.complaints.new-CjGglo1M.mjs");
var Route = createFileRoute("/student/complaints/new")({
	head: () => ({ meta: [
		{ title: "Raise a Complaint — DSIM Student Portal" },
		{
			name: "description",
			content: "Submit a new confidential disciplinary complaint."
		},
		{
			property: "og:title",
			content: "Raise a Complaint — DSIM"
		},
		{
			property: "og:description",
			content: "Submit a new confidential disciplinary complaint."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$17
});
var DashboardRoute = Route$15.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$17
});
var InvestigationsRoute = Route$14.update({
	id: "/investigations",
	path: "/investigations",
	getParentRoute: () => Route$17
});
var LoginRoute = Route$13.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$17
});
var ProfileRoute = Route$12.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$17
});
var ReturnsRoute = Route$11.update({
	id: "/returns",
	path: "/returns",
	getParentRoute: () => Route$17
});
var SettingsRoute = Route$10.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$17
});
var SuspensionsRoute = Route$9.update({
	id: "/suspensions",
	path: "/suspensions",
	getParentRoute: () => Route$17
});
var CasesIndexRoute = Route$8.update({
	id: "/cases/",
	path: "/cases/",
	getParentRoute: () => Route$17
});
var CasesCaseIdRoute = Route$18.update({
	id: "/cases/$caseId",
	path: "/cases/$caseId",
	getParentRoute: () => Route$17
});
var CasesNewRoute = Route$7.update({
	id: "/cases/new",
	path: "/cases/new",
	getParentRoute: () => Route$17
});
var ComplaintsIndexRoute = Route$6.update({
	id: "/complaints/",
	path: "/complaints/",
	getParentRoute: () => Route$17
});
var ComplaintsComplaintIdRoute = Route$5.update({
	id: "/complaints/$complaintId",
	path: "/complaints/$complaintId",
	getParentRoute: () => Route$17
});
var StudentDashboardRoute = Route$19.update({
	id: "/student/dashboard",
	path: "/student/dashboard",
	getParentRoute: () => Route$17
});
var StudentLoginRoute = Route$4.update({
	id: "/student/login",
	path: "/student/login",
	getParentRoute: () => Route$17
});
var StudentProfileRoute = Route$3.update({
	id: "/student/profile",
	path: "/student/profile",
	getParentRoute: () => Route$17
});
var CasesCaseIdInvestigationRoute = Route$2.update({
	id: "/investigation",
	path: "/investigation",
	getParentRoute: () => CasesCaseIdRoute
});
var StudentComplaintsComplaintIdRoute = Route$1.update({
	id: "/student/complaints/$complaintId",
	path: "/student/complaints/$complaintId",
	getParentRoute: () => Route$17
});
var StudentComplaintsNewRoute = Route.update({
	id: "/student/complaints/new",
	path: "/student/complaints/new",
	getParentRoute: () => Route$17
});
var CasesCaseIdRouteChildren = { CasesCaseIdInvestigationRoute };
var rootRouteChildren = {
	IndexRoute,
	DashboardRoute,
	InvestigationsRoute,
	LoginRoute,
	ProfileRoute,
	ReturnsRoute,
	SettingsRoute,
	SuspensionsRoute,
	CasesCaseIdRoute: CasesCaseIdRoute._addFileChildren(CasesCaseIdRouteChildren),
	CasesNewRoute,
	ComplaintsComplaintIdRoute,
	StudentDashboardRoute,
	StudentLoginRoute,
	StudentProfileRoute,
	CasesIndexRoute,
	ComplaintsIndexRoute,
	StudentComplaintsComplaintIdRoute,
	StudentComplaintsNewRoute
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
