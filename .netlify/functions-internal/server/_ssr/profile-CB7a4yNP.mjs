import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useDsim, n as Button } from "./button-C7ZpzBGx.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as Phone, K as Mail, Pt as CircleCheck, nt as KeyRound, q as LogOut, x as ShieldCheck, xt as FileCheck, z as PenLine } from "../_libs/lucide-react.mjs";
import { A as fmtDate, l as Avatar, u as ConfirmDialog, v as PageHeader, w as SecureTag } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BB0Q0GUL.mjs";
import { t as Protected } from "./Protected-DW_nWC7p.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { t as Label } from "./label-Di2QZFiw.mjs";
import { t as PasskeyManager } from "./PasskeyManager-7gs1Fida.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-CB7a4yNP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { profile, setProfile, logout, cases, currentUser, login } = useDsim();
	const navigate = useNavigate();
	const [showEditProfile, setShowEditProfile] = (0, import_react.useState)(false);
	const [showPasswordModal, setShowPasswordModal] = (0, import_react.useState)(false);
	const [showLogoutConfirm, setShowLogoutConfirm] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)(profile.name);
	const [email, setEmail] = (0, import_react.useState)(profile.email);
	const [phone, setPhone] = (0, import_react.useState)(profile.phone);
	const [committee, setCommittee] = (0, import_react.useState)(profile.committee);
	const [currentPw, setCurrentPw] = (0, import_react.useState)("");
	const [newPw, setNewPw] = (0, import_react.useState)("");
	const [confirmPw, setConfirmPw] = (0, import_react.useState)("");
	const handleSaveProfile = (e) => {
		e.preventDefault();
		setProfile({
			...profile,
			name: name.trim(),
			email: email.trim(),
			phone: phone.trim(),
			committee: committee.trim()
		});
		setShowEditProfile(false);
		toast.success("Profile details updated successfully.");
	};
	const handlePasswordChange = (e) => {
		e.preventDefault();
		if (newPw.length < 8) {
			toast.error("New password must be at least 8 characters long.");
			return;
		}
		if (newPw !== confirmPw) {
			toast.error("New passwords do not match.");
			return;
		}
		setShowPasswordModal(false);
		setCurrentPw("");
		setNewPw("");
		setConfirmPw("");
		toast.success("Security credentials updated successfully.");
	};
	const doLogout = () => {
		logout();
		navigate({ to: "/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Protected, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Staff Profile",
				title: currentUser?.role || "Discipline Committee Head",
				subtitle: "Official credential ledger, security clearance, and contact records.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecureTag, { children: currentUser?.role || "Committee Access" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setShowEditProfile(true),
						className: "gap-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-3.5" }), " Edit Profile"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
						name: currentUser?.displayName || profile.name,
						size: "lg",
						tone: "ink"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl sm:text-2xl font-bold text-foreground",
									children: currentUser?.displayName || profile.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[0.68rem] font-bold text-emerald-700 dark:text-emerald-300",
									children: "Active Tenure"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium text-muted-foreground",
								children: [
									currentUser?.role || "Committee Head",
									" · ",
									currentUser?.department || profile.committee
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 font-mono",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5" }),
										" ",
										currentUser?.email || profile.email
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 font-mono",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }),
										" ",
										profile.phone
									]
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground block",
							children: "Committee Branch"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground mt-0.5 block",
							children: profile.committee
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground block",
							children: "Total Cases Overseen"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-foreground font-semibold mt-0.5 block",
							children: [cases.length, " cases"]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground block",
							children: "Appointment Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-foreground mt-0.5 block",
							children: fmtDate(profile.createdAt)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground block",
							children: "Clearance Level"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-emerald-600 mt-0.5 block",
							children: "Level 4 (Full Audit Access)"
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface p-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Security & Passkey Access"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-xs",
						children: [
							currentUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasskeyManager, { user: currentUser }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-lg border border-border p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium text-foreground",
									children: "Institutional Fallback Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground text-[0.7rem]",
									children: "Used when biometric hardware is unavailable"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setShowPasswordModal(true),
									className: "h-7 text-xs gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-3" }), " Change"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-lg border border-border p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium text-foreground",
									children: "Active Session"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground text-[0.7rem]",
									children: "Encrypted TLS 1.3 · WebAuthn Passkey Verified"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[0.68rem] text-muted-foreground",
									children: "Expires in 8h"
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-sm",
								children: "Authority & Case Jurisdiction"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: [
								"Authorized role: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground",
									children: currentUser?.role || "Committee Head"
								}),
								". Access is governed by institutional RBAC policies."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-muted/40 p-3.5 border border-border/60 text-xs space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-foreground font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-600" }), " Active Role & Permissions"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[0.68rem] text-primary font-bold",
									children: [currentUser?.permissions.length || 0, " granted"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1 pt-1",
								children: (currentUser?.permissions || []).map((perm) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-secondary/80 border border-border px-1.5 py-0.5 font-mono text-[0.62rem] text-muted-foreground",
									children: perm
								}, perm))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-primary/20 bg-primary/5 p-3.5 space-y-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-primary",
									children: "Development Role Switcher"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[0.7rem] text-muted-foreground",
									children: "Switch between committee roles to evaluate role-based permission gates:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-1.5 pt-1",
									children: [
										"Principal",
										"Administrative Officer",
										"Committee Head",
										"Disciplinary Board Member"
									].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: currentUser?.role === r ? "default" : "outline",
										size: "sm",
										className: "h-7 text-[0.68rem] justify-start truncate",
										onClick: () => {
											login(r);
											toast.success(`Switched role to: ${r}`);
										},
										children: r
									}, r))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setShowLogoutConfirm(true),
								className: "w-full text-xs text-destructive hover:bg-destructive/10 gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3.5" }), " Sign Out of All Sessions"]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: showEditProfile,
				onOpenChange: setShowEditProfile,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Edit Profile Information" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Update your Committee Head administrative contact details." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveProfile,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "prof-name",
									className: "text-xs",
									children: "Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "prof-name",
									value: name,
									onChange: (e) => setName(e.target.value),
									className: "text-xs",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "prof-email",
									className: "text-xs",
									children: "Official Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "prof-email",
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "text-xs font-mono",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "prof-phone",
									className: "text-xs",
									children: "Direct Emergency Phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "prof-phone",
									value: phone,
									onChange: (e) => setPhone(e.target.value),
									className: "text-xs font-mono",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "prof-comm",
									className: "text-xs",
									children: "Committee / Body Title"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "prof-comm",
									value: committee,
									onChange: (e) => setCommittee(e.target.value),
									className: "text-xs",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => setShowEditProfile(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "sm",
									children: "Save Profile"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: showPasswordModal,
				onOpenChange: setShowPasswordModal,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Change Security Password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Update your primary authentication passphrase. Minimum 8 characters." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handlePasswordChange,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "curr-pw",
									className: "text-xs",
									children: "Current Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "curr-pw",
									type: "password",
									value: currentPw,
									onChange: (e) => setCurrentPw(e.target.value),
									className: "text-xs",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "new-pw",
									className: "text-xs",
									children: "New Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "new-pw",
									type: "password",
									value: newPw,
									onChange: (e) => setNewPw(e.target.value),
									className: "text-xs",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "conf-pw",
									className: "text-xs",
									children: "Confirm New Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "conf-pw",
									type: "password",
									value: confirmPw,
									onChange: (e) => setConfirmPw(e.target.value),
									className: "text-xs",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => setShowPasswordModal(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "sm",
									children: "Update Password"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: showLogoutConfirm,
				onOpenChange: setShowLogoutConfirm,
				title: "Sign out of DSIM session?",
				description: "Are you sure you want to end your current session? Unsaved investigation recordings will be sealed.",
				confirmLabel: "Sign Out",
				onConfirm: doLogout
			})
		]
	}) });
}
//#endregion
export { ProfilePage as component };
