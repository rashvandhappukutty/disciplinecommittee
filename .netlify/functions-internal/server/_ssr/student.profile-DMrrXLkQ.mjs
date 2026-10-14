import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useDsim, n as Button } from "./button-C7ZpzBGx.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Bt as Check, Dt as Download, E as Save, J as Lock, M as QrCode, Ot as Copy, Wt as Bell, a as User, nt as KeyRound, q as LogOut, u as TriangleAlert, v as Smartphone, x as ShieldCheck } from "../_libs/lucide-react.mjs";
import { l as Avatar, u as ConfirmDialog } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BB0Q0GUL.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { t as Label } from "./label-Di2QZFiw.mjs";
import { t as Switch } from "./switch-C2AvPllQ.mjs";
import { t as StudentProtected } from "./StudentProtected-BxPSUqrJ.mjs";
import { n as twoFactorService, t as OtpInput } from "./twoFactorService-CVszy_n6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.profile-DMrrXLkQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TwoFactorSetupModal({ open, onOpenChange, user, onSuccess }) {
	const [step, setStep] = (0, import_react.useState)("password");
	const [password, setPassword] = (0, import_react.useState)("");
	const [setupData, setSetupData] = (0, import_react.useState)(null);
	const [otpCode, setOtpCode] = (0, import_react.useState)("");
	const [copiedKey, setCopiedKey] = (0, import_react.useState)(false);
	const [copiedCodes, setCopiedCodes] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const handleReset = () => {
		setStep("password");
		setPassword("");
		setOtpCode("");
		setError("");
		setSetupData(null);
	};
	const handlePasswordSubmit = (e) => {
		e.preventDefault();
		if (password.length < 4) {
			setError("Please enter your current account password to proceed.");
			return;
		}
		setError("");
		setLoading(true);
		setTimeout(() => {
			const data = twoFactorService.generateSetupData(user);
			setSetupData(data);
			setLoading(false);
			setStep("scan");
		}, 300);
	};
	const handleCopyKey = () => {
		if (setupData?.manualSetupKey) {
			navigator.clipboard.writeText(setupData.manualSetupKey.replace(/\s+/g, ""));
			setCopiedKey(true);
			toast.success("Setup key copied to clipboard");
			setTimeout(() => setCopiedKey(false), 2e3);
		}
	};
	const handleVerifySetup = async () => {
		if (!setupData || otpCode.length !== 6) {
			setError("Please enter the 6-digit verification code from your authenticator app.");
			return;
		}
		setLoading(true);
		setError("");
		const res = await twoFactorService.enableTwoFactor(user.id, setupData.secret, otpCode, setupData.recoveryCodes);
		setLoading(false);
		if (res.success) {
			toast.success("Two-Factor Authentication Enabled Successfully!");
			setStep("recovery");
			onSuccess?.();
		} else setError(res.error || "Invalid code. Please check your authenticator app.");
	};
	const handleCopyRecoveryCodes = () => {
		if (setupData?.recoveryCodes) {
			navigator.clipboard.writeText(setupData.recoveryCodes.join("\n"));
			setCopiedCodes(true);
			toast.success("Recovery codes copied to clipboard");
			setTimeout(() => setCopiedCodes(false), 2e3);
		}
	};
	const handleDownloadCodes = () => {
		if (!setupData?.recoveryCodes) return;
		const content = `DSIM INSTITUTIONAL PORTAL — TWO-FACTOR RECOVERY CODES\nAccount: ${user.email} (${user.role})\nGenerated: ${(/* @__PURE__ */ new Date()).toLocaleString()}\n\nEach recovery code can be used ONLY ONCE to sign in if you lose access to your authenticator app:\n\n` + setupData.recoveryCodes.map((c, i) => `${i + 1}. ${c}`).join("\n") + `\n\nStore these codes in a secure, confidential place.`;
		const blob = new Blob([content], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `dsim-recovery-codes-${user.role.toLowerCase().replace(/\s+/g, "-")}.txt`;
		a.click();
		URL.revokeObjectURL(url);
		toast.success("Recovery codes file downloaded");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			if (!v) handleReset();
			onOpenChange(v);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 place-items-center rounded-lg bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-base sm:text-lg",
						children: step === "recovery" ? "Save Your Recovery Codes" : "Set Up Two-Factor Authentication"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
					className: "text-xs",
					children: [
						step === "password" && "Confirm your password to initiate authenticator enrollment.",
						step === "scan" && "Scan the QR code with Google Authenticator, Microsoft Authenticator, or Authy.",
						step === "verify" && "Enter the 6-digit code shown in your authenticator app.",
						step === "recovery" && "Save these single-use recovery codes in case you lose access to your device."
					]
				})] }),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
				}),
				step === "password" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handlePasswordSubmit,
					className: "space-y-4 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Account Password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "Enter current password",
									className: "text-xs pl-8",
									autoFocus: true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.7rem] text-muted-foreground",
								children: "Re-authenticating ensures only authorized personnel modify 2FA settings."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => onOpenChange(false),
							className: "text-xs",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "sm",
							disabled: loading,
							className: "text-xs bg-primary hover:bg-primary/90",
							children: loading ? "Verifying..." : "Continue →"
						})]
					})]
				}),
				step === "scan" && setupData && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 py-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-36 shrink-0 place-items-center rounded-xl bg-white p-2 shadow-inner border border-slate-200 text-slate-900",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative grid size-32 place-items-center bg-[radial-gradient(#0f172a_2px,transparent_2px)] [background-size:8px_8px] rounded-lg border-2 border-slate-900",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-1.5 left-1.5 size-7 rounded border-2 border-slate-900 bg-slate-900 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-3 bg-white rounded-xs" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-1.5 right-1.5 size-7 rounded border-2 border-slate-900 bg-slate-900 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-3 bg-white rounded-xs" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute bottom-1.5 left-1.5 size-7 rounded border-2 border-slate-900 bg-slate-900 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-3 bg-white rounded-xs" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-6 text-slate-900" })
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-left min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-semibold text-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scan using Authenticator App" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[0.72rem] text-muted-foreground leading-relaxed",
									children: "Open Google Authenticator, Microsoft Authenticator, or Authy on your mobile device and scan the QR code."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.68rem] text-muted-foreground block mb-1",
										children: "Can't scan QR? Enter setup key manually:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 font-mono text-[0.7rem] bg-muted px-2.5 py-1.5 rounded-lg border border-border/80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate select-all text-foreground font-semibold",
											children: setupData.manualSetupKey
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: handleCopyKey,
											className: "ml-auto text-muted-foreground hover:text-foreground shrink-0",
											title: "Copy Key",
											children: copiedKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" })
										})]
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => setStep("password"),
							className: "text-xs",
							children: "Back"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							onClick: () => setStep("verify"),
							className: "text-xs bg-primary hover:bg-primary/90",
							children: "Next: Enter 6-Digit Code →"
						})]
					})]
				}),
				step === "verify" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 py-3 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-foreground",
								children: "Enter the 6-digit code shown in your app"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.7rem] text-muted-foreground",
								children: "Codes refresh every 30 seconds."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtpInput, {
								value: otpCode,
								onChange: setOtpCode,
								onComplete: handleVerifySetup,
								hasError: Boolean(error)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-muted/40 p-2.5 text-[0.7rem] text-muted-foreground",
							children: ["💡 Development Demo Code: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: "123456"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => setStep("scan"),
								className: "text-xs",
								children: "Back to QR Code"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								disabled: loading || otpCode.length !== 6,
								onClick: handleVerifySetup,
								className: "text-xs bg-primary hover:bg-primary/90",
								children: loading ? "Verifying..." : "Verify & Enable 2FA"
							})]
						})
					]
				}),
				step === "recovery" && setupData && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 py-2 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-[0.72rem] text-amber-700 dark:text-amber-300 flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save these 8 recovery codes in a safe place. If you lose access to your authenticator app, each code can be used once to access your account." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2 font-mono text-xs p-3.5 rounded-xl border border-border bg-muted/40 text-center font-bold",
							children: setupData.recoveryCodes.map((code, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-1.5 rounded bg-background border border-border/80 select-all",
								children: code
							}, idx))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: handleCopyRecoveryCodes,
									className: "text-xs gap-1.5 h-8",
									children: [copiedCodes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" }), "Copy All"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: handleDownloadCodes,
									className: "text-xs gap-1.5 h-8",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3" }), " Download .txt"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								onClick: () => {
									onOpenChange(false);
									handleReset();
								},
								className: "text-xs bg-primary hover:bg-primary/90 h-8 ml-auto",
								children: "I've Saved Them"
							})]
						})
					]
				})
			]
		})
	});
}
function StudentProfileRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentProtected, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentProfilePage, {}) });
}
function StudentProfilePage() {
	const { studentProfile, updateStudentProfile, studentLogout } = useDsim();
	const navigate = useNavigate();
	const [phone, setPhone] = (0, import_react.useState)(studentProfile.phone);
	const [emailUpdates, setEmailUpdates] = (0, import_react.useState)(studentProfile.notificationPreferences?.emailUpdates ?? true);
	const [smsAlerts, setSmsAlerts] = (0, import_react.useState)(studentProfile.notificationPreferences?.smsAlerts ?? true);
	const [hearingReminders, setHearingReminders] = (0, import_react.useState)(studentProfile.notificationPreferences?.hearingReminders ?? true);
	const [showPasswordModal, setShowPasswordModal] = (0, import_react.useState)(false);
	const [showTwoFactorSetup, setShowTwoFactorSetup] = (0, import_react.useState)(false);
	const [currentPass, setCurrentPass] = (0, import_react.useState)("");
	const [newPass, setNewPass] = (0, import_react.useState)("");
	const [confirmPass, setConfirmPass] = (0, import_react.useState)("");
	const [showPass, setShowPass] = (0, import_react.useState)(false);
	const [confirmLogout, setConfirmLogout] = (0, import_react.useState)(false);
	const handleSaveProfile = (e) => {
		e.preventDefault();
		updateStudentProfile({
			phone,
			notificationPreferences: {
				emailUpdates,
				smsAlerts,
				hearingReminders
			}
		});
		toast.success("Profile Preferences Saved", { description: "Your contact details and notification settings were updated." });
	};
	const handleChangePassword = () => {
		if (newPass.length < 6) {
			toast.error("New password must be at least 6 characters.");
			return;
		}
		if (newPass !== confirmPass) {
			toast.error("New passwords do not match.");
			return;
		}
		toast.success("Password Updated", { description: "Your student portal password has been changed securely." });
		setShowPasswordModal(false);
		setCurrentPass("");
		setNewPass("");
		setConfirmPass("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl mx-auto space-y-6 pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold tracking-tight text-foreground",
					children: "Student Profile & Settings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "View your institutional records, adjust contact preferences, and manage security settings."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 text-center shadow-sm space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto grid size-20 place-items-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
									name: studentProfile.name,
									size: "lg",
									tone: "ink"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-bold text-foreground",
									children: studentProfile.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-xs font-semibold text-primary",
									children: studentProfile.rollNumber
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: studentProfile.department
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border pt-3 text-xs space-y-1.5 text-left text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Academic Year:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground font-medium",
											children: studentProfile.academicYear
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Year of Study:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground font-medium",
											children: studentProfile.yearOfStudy
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Status:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-emerald-500 font-semibold",
											children: "Active Student"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: () => setConfirmLogout(true),
								className: "w-full text-xs text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3.5 mr-1.5" }), " Sign Out"]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-2 space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveProfile,
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 border-b border-border pb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-bold text-foreground",
										children: "Personal Information"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Full Name (Official Record)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: studentProfile.name,
												disabled: true,
												className: "bg-muted text-xs cursor-not-allowed"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs text-muted-foreground",
												children: "College Roll Number"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: studentProfile.rollNumber,
												disabled: true,
												className: "bg-muted text-xs font-mono cursor-not-allowed"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Institutional Email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: studentProfile.email,
												disabled: true,
												className: "bg-muted text-xs cursor-not-allowed"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "studentPhone",
												className: "text-xs font-semibold",
												children: "Contact Phone Number"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "studentPhone",
												type: "tel",
												value: phone,
												onChange: (e) => setPhone(e.target.value),
												className: "text-xs",
												placeholder: "+91 94400 00000"
											})]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 border-b border-border pb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-bold text-foreground",
										children: "Notification Preferences"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between py-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-foreground",
												children: "Email Status Notifications"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[0.7rem] text-muted-foreground",
												children: "Receive email alerts whenever your complaint status transitions."
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												checked: emailUpdates,
												onCheckedChange: setEmailUpdates
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between py-1 border-t border-border/60",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-foreground",
												children: "SMS & Urgent Alerts"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[0.7rem] text-muted-foreground",
												children: "Receive immediate SMS notifications when the committee requests additional details."
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												checked: smsAlerts,
												onCheckedChange: setSmsAlerts
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between py-1 border-t border-border/60",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-foreground",
												children: "Hearing & Meeting Reminders"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[0.7rem] text-muted-foreground",
												children: "Reminders regarding scheduled committee meetings or inquiry hearings."
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												checked: hearingReminders,
												onCheckedChange: setHearingReminders
											})]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 border-b border-border pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-bold text-foreground",
											children: "Security & Multi-Factor Access"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border p-3.5 space-y-2.5 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-medium text-foreground flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-3.5 text-primary" }), "Two-Factor Authentication (TOTP)"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-muted-foreground text-[0.7rem]",
												children: "Protects your confidential grievance history with an authenticator app."
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-[0.65rem] font-bold text-emerald-600",
												children: "● ENABLED"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2 pt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												type: "button",
												variant: "outline",
												size: "sm",
												onClick: () => setShowTwoFactorSetup(true),
												className: "h-7 text-xs gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-3" }), " Reconfigure Authenticator"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												type: "button",
												variant: "outline",
												size: "sm",
												onClick: () => setShowTwoFactorSetup(true),
												className: "h-7 text-xs gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-3" }), " Recovery Codes"]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-foreground",
											children: "Account Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[0.7rem] text-muted-foreground",
											children: "Protect your student complaint submissions with a secure password."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "outline",
											size: "sm",
											onClick: () => setShowPasswordModal(true),
											className: "text-xs shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-3.5 mr-1.5" }), " Change Password"]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									className: "text-xs bg-primary hover:bg-primary/90 gap-1.5 font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" }), " Save Preferences"]
								})
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: showPasswordModal,
				onOpenChange: setShowPasswordModal,
				title: "Change Student Password",
				description: "Enter your current password and your new secure credentials.",
				confirmLabel: "Update Password",
				onConfirm: handleChangePassword,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 my-2 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Current Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: showPass ? "text" : "password",
								value: currentPass,
								onChange: (e) => setCurrentPass(e.target.value),
								className: "text-xs",
								placeholder: "Enter current password"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "New Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: showPass ? "text" : "password",
								value: newPass,
								onChange: (e) => setNewPass(e.target.value),
								className: "text-xs",
								placeholder: "At least 6 characters"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Confirm New Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: showPass ? "text" : "password",
								value: confirmPass,
								onChange: (e) => setConfirmPass(e.target.value),
								className: "text-xs",
								placeholder: "Repeat new password"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TwoFactorSetupModal, {
				open: showTwoFactorSetup,
				onOpenChange: setShowTwoFactorSetup,
				user: {
					id: studentProfile.id,
					role: "STUDENT",
					displayName: studentProfile.name,
					email: studentProfile.email,
					studentId: studentProfile.rollNumber,
					department: studentProfile.department,
					permissions: [
						"SUBMIT_COMPLAINT",
						"VIEW_OWN_COMPLAINT",
						"RESPOND_INFO"
					],
					twoFactorEnabled: true
				},
				onSuccess: () => toast.success("Student 2FA credentials updated.")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmLogout,
				onOpenChange: setConfirmLogout,
				title: "Sign out of Student Portal?",
				description: "You will be returned to the student login page.",
				confirmLabel: "Sign out",
				onConfirm: () => {
					studentLogout();
					navigate({ to: "/student/login" });
				}
			})
		]
	});
}
//#endregion
export { StudentProfileRoute as component };
