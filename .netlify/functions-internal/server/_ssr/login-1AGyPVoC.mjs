import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useDsim, a as INSTITUTION, n as Button } from "./button-C7ZpzBGx.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ct as Eye, Ft as CircleAlert, H as Mic, J as Lock, K as Mail, Tt as ExternalLink, X as LifeBuoy, b as Shield, et as Laptop, nt as KeyRound, pt as FingerprintPattern, wt as EyeOff, x as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { t as Label } from "./label-Di2QZFiw.mjs";
import { t as Checkbox } from "./checkbox-_AGMNU8u.mjs";
import { t as passkeyClient } from "./passkeyClient-DCu3lk6B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-1AGyPVoC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STAFF_ACCOUNTS = [
	{
		role: "Principal",
		email: "principal@kprcas.ac.in",
		label: "🏛️ Principal",
		fallbackPassword: "principal@2026"
	},
	{
		role: "Administrative Officer",
		email: "ao@kprcas.ac.in",
		label: "📋 Administrative Officer (AO)",
		fallbackPassword: "ao@2026"
	},
	{
		role: "Committee Head",
		email: "discipline.head@kprcas.ac.in",
		label: "🎓 Discipline Committee Head",
		fallbackPassword: "committee@2026"
	},
	{
		role: "Disciplinary Board Member",
		email: "committee.member@kprcas.ac.in",
		label: "⚖️ Disciplinary Board Member",
		fallbackPassword: "board@2026"
	}
];
function LoginPage() {
	const { login } = useDsim();
	const navigate = useNavigate();
	const [authMode, setAuthMode] = (0, import_react.useState)("passkey");
	const [email, setEmail] = (0, import_react.useState)("discipline.head@kprcas.ac.in");
	const [password, setPassword] = (0, import_react.useState)("committee@2026");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [rememberMe, setRememberMe] = (0, import_react.useState)(true);
	const [capabilities, setCapabilities] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [cooldown, setCooldown] = (0, import_react.useState)(null);
	const [showRecoveryModal, setShowRecoveryModal] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		passkeyClient.checkDeviceCapabilities().then(setCapabilities);
	}, []);
	const handleSelectStaffRole = (staffEmail, defaultPw) => {
		setEmail(staffEmail);
		setPassword(defaultPw);
		setError("");
	};
	/**
	* PRIMARY LOGIN FLOW: WebAuthn Passkey Authentication (Requirement 2)
	*/
	const handlePasskeyLogin = async (overrideEmail) => {
		setError("");
		const targetEmail = overrideEmail || email.trim();
		if (!targetEmail || !targetEmail.includes("@")) {
			setError("Please enter a valid institutional staff email address.");
			return;
		}
		setLoading(true);
		try {
			const res = await passkeyClient.loginWithPasskey(targetEmail);
			setLoading(false);
			if (res.success && res.user) {
				login(res.user);
				toast.success(`Identity Verified: Welcome, ${res.user.displayName}`, { description: `Authenticated via WebAuthn Passkey. Active Role: ${res.user.role}` });
				navigate({ to: "/dashboard" });
			} else {
				setError(res.error || "Passkey authentication failed.");
				if (res.isRateLimited && res.retryAfterSeconds) triggerCooldown(res.retryAfterSeconds);
			}
		} catch (err) {
			setLoading(false);
			setError(err?.message || "Unexpected authentication error. Please try password fallback.");
		}
	};
	/**
	* 1-Click Discoverable Passkey Login (Usernameless)
	*/
	const handleDiscoverablePasskeyLogin = async () => {
		setError("");
		setLoading(true);
		try {
			const res = await passkeyClient.loginWithPasskey(void 0);
			setLoading(false);
			if (res.success && res.user) {
				login(res.user);
				toast.success(`Identity Verified: Welcome, ${res.user.displayName}`, { description: `Authenticated via Passkey. Active Role: ${res.user.role}` });
				navigate({ to: "/dashboard" });
			} else {
				setError(res.error || "Passkey authentication failed.");
				if (res.isRateLimited && res.retryAfterSeconds) triggerCooldown(res.retryAfterSeconds);
			}
		} catch (err) {
			setLoading(false);
			setError(err?.message || "Passkey authentication error.");
		}
	};
	/**
	* SECURE FALLBACK: Password-based Sign-in (Requirement 5)
	*/
	const handleFallbackSubmit = async (e) => {
		e.preventDefault();
		setError("");
		if (!email.trim() || !email.includes("@")) {
			setError("Please enter your institutional email address.");
			return;
		}
		if (password.length < 4) {
			setError("Password must contain at least 4 characters.");
			return;
		}
		setLoading(true);
		const res = await passkeyClient.loginWithPasswordFallback(email, password);
		setLoading(false);
		if (res.success && res.user) {
			login(res.user);
			toast.info(`Signed in via Institutional Fallback`, { description: `Welcome ${res.user.displayName}. Please register a passkey in Security Settings when biometrics are restored.` });
			navigate({ to: "/dashboard" });
		} else {
			setError(res.error || "Invalid institutional password.");
			if (res.isRateLimited && res.retryAfterSeconds) triggerCooldown(res.retryAfterSeconds);
		}
	};
	const triggerCooldown = (seconds) => {
		setCooldown(seconds);
		const interval = setInterval(() => {
			setCooldown((prev) => {
				if (!prev || prev <= 1) {
					clearInterval(interval);
					return null;
				}
				return prev - 1;
			});
		}, 1e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen lg:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/70 p-10 lg:flex text-slate-900 border-r border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: INSTITUTION.logoUrl,
							alt: INSTITUTION.name,
							className: "h-16 sm:h-20 w-auto object-contain"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 rounded-full border border-blue-900/20 bg-blue-900/5 px-3.5 py-1.5 font-mono text-[0.72rem] text-blue-950 backdrop-blur shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-emerald-600 animate-pulse" }),
								" ",
								INSTITUTION.shortName,
								" JUDICIAL ACCESS"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 space-y-6 max-w-lg my-auto py-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1 text-xs text-emerald-800 font-mono border border-emerald-300",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3.5 text-emerald-600" }),
										" ",
										INSTITUTION.shortName,
										" Official Disciplinary Workspace"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 leading-tight",
									children: "Investigate, document, and track disciplinary cases securely."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-slate-600 leading-relaxed",
									children: [
										INSTITUTION.description,
										" ",
										INSTITUTION.systemName,
										" provides the Discipline Committee with high-fidelity investigation interview audio recording, AI-assisted voice synopsis generation, structured evidence custody, and hardware-bound WebAuthn passkey security."
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 pt-2 font-sans text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-slate-200/90 bg-white/90 p-3.5 shadow-sm backdrop-blur",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4 text-emerald-600 mb-2" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-slate-900",
										children: "Hearing & Interview Audio"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[0.7rem] text-slate-500 mt-0.5",
										children: "Live audio capture & automated speech synopsis"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-slate-200/90 bg-white/90 p-3.5 shadow-sm backdrop-blur",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "size-4 text-emerald-600 mb-2" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-slate-900",
										children: "WebAuthn / Passkey Auth"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[0.7rem] text-slate-500 mt-0.5",
										children: "Native Face ID, Windows Hello & Fingerprint unlock"
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500 font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							INSTITUTION.shortName,
							" ",
							INSTITUTION.systemName,
							" Secure Core v3.0.0"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: INSTITUTION.website,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex items-center gap-1 hover:text-primary transition-colors",
							children: [
								INSTITUTION.website.replace("https://", "").replace("/", ""),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center p-6 sm:p-12 bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider",
									children: [INSTITUTION.shortName, " Staff Portal"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-bold tracking-tight text-foreground",
									children: authMode === "passkey" ? "Passkey Sign In" : "Institutional Password Fallback"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-muted-foreground",
									children: authMode === "passkey" ? "Authenticate using Face ID, Windows Hello, fingerprint, or device PIN." : "Secure fallback when biometric hardware is unavailable or in repair."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 rounded-xl bg-muted/60 p-1 text-xs font-medium border border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setAuthMode("passkey");
									setError("");
								},
								className: `flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${authMode === "passkey" ? "bg-background text-foreground font-semibold shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Passkey / Face Unlock" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setAuthMode("fallback");
									setError("");
								},
								className: `flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${authMode === "fallback" ? "bg-background text-foreground font-semibold shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Password Fallback" })]
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
						}),
						cooldown !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Rate limit active: Please wait ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [cooldown, "s"] }),
								" before retrying."
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-[0.72rem] font-semibold text-muted-foreground flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Select Authorized Staff Account:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.65rem] font-mono text-primary",
									children: "Exactly 4 Staff Roles"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-1.5 text-[0.68rem]",
								children: STAFF_ACCOUNTS.map((acc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => handleSelectStaffRole(acc.email, acc.fallbackPassword),
									className: `rounded-md border p-2 text-left font-medium transition-colors ${email === acc.email ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/30" : "border-border bg-card/60 text-muted-foreground hover:bg-muted"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate",
										children: acc.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[0.62rem] font-mono text-muted-foreground truncate opacity-85",
										children: acc.email
									})]
								}, acc.email))
							})]
						}),
						authMode === "passkey" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface p-6 sm:p-7 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "passkey-email",
										className: "text-xs font-semibold",
										children: "Institutional Staff Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-2.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "passkey-email",
											type: "email",
											placeholder: "discipline.head@kprcas.ac.in",
											value: email,
											onChange: (e) => setEmail(e.target.value),
											className: "pl-9 text-xs",
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-primary/5 border border-primary/20 p-3 text-xs flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid size-7 shrink-0 place-items-center rounded bg-primary/10 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 text-[0.7rem] text-muted-foreground",
										children: [
											"Detected hardware capability:",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: capabilities?.biometricLabel || "Face ID / Windows Hello / Device PIN"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									onClick: () => handlePasskeyLogin(),
									disabled: loading || cooldown !== null,
									className: "w-full text-xs font-semibold bg-primary hover:bg-primary/90 h-10 gap-2 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "size-4" }), loading ? "Authenticating Device..." : `Sign In with Passkey / Face Unlock`]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative my-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 flex items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-full border-t border-border" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative flex justify-center text-[0.65rem] uppercase",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bg-card px-2 text-muted-foreground font-mono",
											children: "Or"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									onClick: handleDiscoverablePasskeyLogin,
									disabled: loading || cooldown !== null,
									className: "w-full text-xs gap-2 h-9",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, { className: "size-3.5 text-muted-foreground" }), "Auto-Detect Enrolled Hardware Device"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-2 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setAuthMode("fallback");
											setError("");
										},
										className: "text-[0.72rem] text-primary hover:underline font-medium inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-3" }), " Biometrics not working? Switch to Password Fallback →"]
									})
								})
							]
						}),
						authMode === "fallback" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleFallbackSubmit,
							className: "surface p-6 sm:p-7 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-[0.72rem] text-amber-700 dark:text-amber-300 space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-semibold flex items-center gap-1.5 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), " Institutional Fallback Policy"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "leading-relaxed",
										children: "Use this fallback only when your passkey device or biometric hardware is temporarily unavailable. Access is audited and rate-limited."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "fb-email",
										className: "text-xs font-semibold",
										children: "Institutional Staff Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-2.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "fb-email",
											type: "email",
											value: email,
											onChange: (e) => setEmail(e.target.value),
											className: "pl-9 text-xs",
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "fb-pw",
											className: "text-xs font-semibold",
											children: "Account Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowRecoveryModal(true),
											className: "text-[0.7rem] text-primary hover:underline",
											children: "Lost passkey device?"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-2.5 size-4 text-muted-foreground" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "fb-pw",
												type: showPassword ? "text" : "password",
												value: password,
												onChange: (e) => setPassword(e.target.value),
												className: "pl-9 pr-9 text-xs",
												required: true
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setShowPassword((v) => !v),
												className: "absolute right-3 top-2.5 text-muted-foreground hover:text-foreground",
												"aria-label": showPassword ? "Hide password" : "Show password",
												children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-between pt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center space-x-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											id: "remember",
											checked: rememberMe,
											onCheckedChange: (checked) => setRememberMe(!!checked)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "remember",
											className: "text-xs font-medium leading-none cursor-pointer text-muted-foreground",
											children: "Remember my staff session"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: loading || cooldown !== null,
									className: "w-full text-xs font-semibold bg-primary hover:bg-primary/90 h-10 mt-1",
									children: loading ? "Verifying Credentials..." : "Sign In via Password Fallback →"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-2 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setAuthMode("passkey");
											setError("");
										},
										className: "text-[0.72rem] text-muted-foreground hover:text-foreground font-medium inline-flex items-center gap-1",
										children: "← Return to Passkey Sign In"
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card/60 p-3.5 space-y-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-[0.72rem] font-semibold text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Quick Development Passkey Test" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[0.65rem] px-1.5 py-0.5 rounded bg-secondary",
									children: "4 Staff Roles"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => {
											handleSelectStaffRole("principal@kprcas.ac.in", "principal@2026");
											handlePasskeyLogin("principal@kprcas.ac.in");
										},
										className: "h-7 text-[0.68rem] justify-start px-2 font-medium truncate",
										children: "🏛️ Principal Passkey"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => {
											handleSelectStaffRole("ao@kprcas.ac.in", "ao@2026");
											handlePasskeyLogin("ao@kprcas.ac.in");
										},
										className: "h-7 text-[0.68rem] justify-start px-2 font-medium truncate",
										children: "📋 AO Passkey"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => {
											handleSelectStaffRole("discipline.head@kprcas.ac.in", "committee@2026");
											handlePasskeyLogin("discipline.head@kprcas.ac.in");
										},
										className: "h-7 text-[0.68rem] justify-start px-2 font-medium truncate",
										children: "🎓 Head Passkey"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => {
											handleSelectStaffRole("committee.member@kprcas.ac.in", "board@2026");
											handlePasskeyLogin("committee.member@kprcas.ac.in");
										},
										className: "h-7 text-[0.68rem] justify-start px-2 font-medium truncate",
										children: "⚖️ Board Member Passkey"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center space-y-2 pt-2 border-t border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.72rem] text-muted-foreground",
								children: "Institutional Access · Authorized credentials and FIDO2 passkeys required."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/student/login",
								className: "inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline",
								children: "Student Complaint & Reporting Portal →"
							}) })]
						})
					]
				})
			}),
			showRecoveryModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-9 place-items-center rounded-lg bg-amber-500/10 text-amber-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeBuoy, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-bold text-foreground",
								children: "Lost Device & Passkey Recovery"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.68rem] text-muted-foreground",
								children: "Institution-Approved Security Process"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "If your primary device (laptop, phone, or hardware security key) has been lost, damaged, or compromised, follow the institutional recovery workflow:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-muted/40 p-3 text-xs space-y-2 border border-border/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-primary font-bold",
										children: "1."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.72rem] text-foreground",
										children: "Sign in using your institutional password on this secure terminal."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-primary font-bold",
										children: "2."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[0.72rem] text-foreground",
										children: [
											"Navigate to ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Profile → Security & Passkey Access" }),
											" and immediately ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Revoke" }),
											" the lost passkey."
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-primary font-bold",
										children: "3."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.72rem] text-foreground",
										children: "Enroll your replacement device or hardware security key."
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-primary/5 p-3 text-xs space-y-1 border border-primary/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground block text-[0.72rem]",
									children: "Campus IT & Security Desk"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.68rem] text-muted-foreground block",
									children: "Email: security@kprcas.ac.in"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.68rem] text-muted-foreground block",
									children: "Emergency Hotline: 0422-2635600 (Ext. 101)"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full text-xs",
							onClick: () => setShowRecoveryModal(false),
							children: "Understood"
						})
					]
				})
			})
		]
	});
}
//#endregion
export { LoginPage as component };
