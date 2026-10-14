import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useDsim, a as INSTITUTION, n as Button } from "./button-C7ZpzBGx.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ct as Eye, Ft as CircleAlert, J as Lock, Jt as ArrowLeft, K as Mail, Tt as ExternalLink, X as LifeBuoy, nt as KeyRound, qt as ArrowRight, st as GraduationCap, v as Smartphone, wt as EyeOff, x as ShieldCheck, xt as FileCheck } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { t as Label } from "./label-Di2QZFiw.mjs";
import { t as Checkbox } from "./checkbox-_AGMNU8u.mjs";
import { n as twoFactorService, t as OtpInput } from "./twoFactorService-CVszy_n6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.login-B-jeP789.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudentLoginPage() {
	const { studentLogin } = useDsim();
	const navigate = useNavigate();
	const [stage, setStage] = (0, import_react.useState)("credentials");
	const [identifier, setIdentifier] = (0, import_react.useState)("22CS089");
	const [password, setPassword] = (0, import_react.useState)("student@kpr");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [rememberMe, setRememberMe] = (0, import_react.useState)(true);
	const [trustDevice, setTrustDevice] = (0, import_react.useState)(false);
	const [otpCode, setOtpCode] = (0, import_react.useState)("");
	const [recoveryCode, setRecoveryCode] = (0, import_react.useState)("");
	const [tempUser, setTempUser] = (0, import_react.useState)(null);
	const [tempToken, setTempToken] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [cooldown, setCooldown] = (0, import_react.useState)(null);
	const [forgotModal, setForgotModal] = (0, import_react.useState)(false);
	const handleCredentialsSubmit = async (e) => {
		e.preventDefault();
		setError("");
		const trimmed = identifier.trim();
		if (!trimmed) {
			setError("Please enter your College Email or Student Roll Number.");
			return;
		}
		if (password.length < 4) {
			setError("Password must contain at least 4 characters.");
			return;
		}
		setLoading(true);
		const res = await twoFactorService.loginCredentials(trimmed, password);
		setLoading(false);
		if (res.success && res.user && res.tempToken) {
			setTempUser(res.user);
			setTempToken(res.tempToken);
			setOtpCode("");
			setStage("otp");
			toast.info("Password Verified", { description: "Please enter the 6-digit code from your authenticator app." });
		} else setError(res.error || "Invalid student credentials.");
	};
	const handleOtpSubmit = async (e) => {
		if (e) e.preventDefault();
		if (!tempUser || !tempToken) return;
		if (otpCode.length !== 6) {
			setError("Please enter the complete 6-digit verification code.");
			return;
		}
		setError("");
		setLoading(true);
		const res = await twoFactorService.verifyTotp(tempToken, otpCode, tempUser);
		setLoading(false);
		if (res.success && res.user) {
			studentLogin(tempUser.email || identifier);
			toast.success("Welcome back!", { description: `Two-Factor Identity Verified: ${res.user.displayName}` });
			navigate({ to: "/student/dashboard" });
		} else {
			setError(res.error || "Invalid verification code.");
			if (res.isRateLimited && res.retryAfterSeconds) {
				setCooldown(res.retryAfterSeconds);
				const timer = setInterval(() => {
					setCooldown((prev) => {
						if (!prev || prev <= 1) {
							clearInterval(timer);
							return null;
						}
						return prev - 1;
					});
				}, 1e3);
			}
		}
	};
	const handleRecoverySubmit = async (e) => {
		e.preventDefault();
		if (!tempUser || !tempToken) return;
		if (recoveryCode.trim().length < 6) {
			setError("Please enter a valid 8-character recovery code (e.g. A8K2-P7Q9).");
			return;
		}
		setError("");
		setLoading(true);
		const res = await twoFactorService.verifyRecoveryCode(tempToken, recoveryCode, tempUser);
		setLoading(false);
		if (res.success && res.user) {
			studentLogin(tempUser.email || identifier);
			toast.success("Welcome back!", { description: "Authenticated via single-use emergency recovery code." });
			navigate({ to: "/student/dashboard" });
		} else setError(res.error || "Invalid or previously used recovery code.");
	};
	const handleGoogleSignIn = async () => {
		setLoading(true);
		const res = await twoFactorService.loginCredentials("kavitha.cs22@kprcas.ac.in", "google-sso");
		setLoading(false);
		if (res.success && res.user && res.tempToken) {
			setTempUser(res.user);
			setTempToken(res.tempToken);
			setStage("otp");
			toast.info("Google Identity Authenticated", { description: "Two-Factor Verification code required." });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden lg:flex lg:w-1/2 flex-col justify-between bg-sidebar p-12 text-sidebar-foreground border-r border-sidebar-border relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: INSTITUTION.logoUrl,
							alt: INSTITUTION.name,
							className: "h-16 w-auto object-contain brightness-0 invert mb-8"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [INSTITUTION.shortName, " Student Disciplinary & Grievance Portal"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-3xl font-bold tracking-tight text-white sm:text-4xl",
							children: [
								"A safe, confidential voice for every ",
								INSTITUTION.shortName,
								" student."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm text-sidebar-foreground/80 leading-relaxed max-w-md",
							children: [INSTITUTION.description, " Submit confidential complaints, track investigation milestones in real-time, communicate directly with the Discipline Committee, and protect your student profile with 2FA authenticator security."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-primary mb-2" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-semibold text-white",
										children: "Full Confidentiality"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[0.7rem] text-sidebar-foreground/70 mt-0.5",
										children: "Optional anonymous mode protected by strict institutional firewalls"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { className: "size-5 text-primary mb-2" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-semibold text-white",
										children: "Live Tracking & 2FA"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[0.7rem] text-sidebar-foreground/70 mt-0.5",
										children: "Multi-factor authentication protecting your sensitive grievance records"
									})
								]
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs text-sidebar-foreground/60 border-t border-sidebar-border/40 pt-4 font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							INSTITUTION.shortName,
							" ",
							INSTITUTION.systemName,
							" Student Gateway v2.6.4"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: INSTITUTION.website,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex items-center gap-1 hover:text-white transition-colors",
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
				className: "w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:hidden flex items-center gap-3 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: INSTITUTION.logoUrl,
								alt: INSTITUTION.shortName,
								className: "h-10 w-auto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: [INSTITUTION.shortName, " Student Portal"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-1",
								children: [INSTITUTION.shortName, " Student Portal"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold tracking-tight text-foreground",
								children: stage === "credentials" ? "Student Sign In" : "Verify Your Identity"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: stage === "credentials" ? `Submit and track student complaints securely through the ${INSTITUTION.shortName} disciplinary and grievance management system.` : stage === "otp" ? "Enter the 6-digit verification code from your authenticator app." : "Enter an unused emergency recovery code."
							})
						] }),
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
						stage === "credentials" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleCredentialsSubmit,
							className: "space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "stu-ident",
										className: "text-xs font-semibold",
										children: "College Email or Student Roll Number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-2.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "stu-ident",
											type: "text",
											placeholder: "e.g. 22CS089 or student@kprcas.ac.in",
											value: identifier,
											onChange: (e) => setIdentifier(e.target.value),
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
											htmlFor: "stu-pw",
											className: "text-xs font-semibold",
											children: "Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setForgotModal(true),
											className: "text-[0.7rem] text-primary hover:underline",
											children: "Forgot password?"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-2.5 size-4 text-muted-foreground" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "stu-pw",
												type: showPassword ? "text" : "password",
												placeholder: "••••••••••••",
												value: password,
												onChange: (e) => setPassword(e.target.value),
												className: "pl-9 pr-9 text-xs",
												required: true
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setShowPassword((v) => !v),
												className: "absolute right-3 top-2.5 text-muted-foreground hover:text-foreground",
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
											id: "stu-rem",
											checked: rememberMe,
											onCheckedChange: (c) => setRememberMe(!!c)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "stu-rem",
											className: "text-xs text-muted-foreground cursor-pointer",
											children: "Remember my credentials"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: loading,
									className: "w-full text-xs bg-primary hover:bg-primary/90 font-semibold",
									children: loading ? "Verifying Credentials..." : "Continue to 2FA Verification →"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative my-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 flex items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-full border-t border-border" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative flex justify-center text-[0.65rem] uppercase",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bg-card px-2 text-muted-foreground font-mono",
											children: "Or sign in with"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									onClick: handleGoogleSignIn,
									disabled: loading,
									className: "w-full text-xs gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										className: "size-4",
										viewBox: "0 0 24 24",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
												fill: "#4285F4"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
												fill: "#34A853"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z",
												fill: "#FBBC05"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z",
												fill: "#EA4335"
											})
										]
									}), "Sign in with Institutional Google SSO"]
								})
							]
						}),
						stage === "otp" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-primary flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1 text-[0.72rem]",
										children: [
											"Signing in as Student ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: tempUser?.displayName || identifier
											}),
											" (",
											tempUser?.studentId || identifier,
											")"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-semibold block text-foreground",
											children: "6-Digit Authenticator Code"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[0.72rem] text-muted-foreground",
											children: "Open your authenticator app (Google Authenticator, Authy, etc.) to view your current verification code."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "py-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtpInput, {
												value: otpCode,
												onChange: setOtpCode,
												onComplete: () => handleOtpSubmit(),
												disabled: loading || cooldown !== null,
												hasError: Boolean(error),
												autoFocus: true
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center space-x-2 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										id: "stu-trust",
										checked: trustDevice,
										onCheckedChange: (checked) => setTrustDevice(!!checked)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "stu-trust",
										className: "text-xs font-medium leading-none cursor-pointer text-muted-foreground",
										children: "Trust this device for 30 days"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									onClick: () => handleOtpSubmit(),
									className: "w-full text-xs font-semibold bg-primary hover:bg-primary/90 mt-1",
									disabled: loading || otpCode.length !== 6 || cooldown !== null,
									children: loading ? "Verifying Authenticator Code..." : "Verify Code & Sign In"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-muted/40 p-2.5 text-[0.7rem] text-muted-foreground text-center",
									children: ["💡 Development Demo TOTP Code: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: "123456"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-border text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setError("");
											setStage("credentials");
										},
										className: "inline-flex items-center gap-1 text-muted-foreground hover:text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Back to Login"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setError("");
											setRecoveryCode("");
											setStage("recovery");
										},
										className: "text-primary hover:underline font-medium text-[0.72rem]",
										children: "Can't access your authenticator?"
									})]
								})
							]
						}),
						stage === "recovery" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleRecoverySubmit,
							className: "space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[0.72rem] leading-relaxed",
										children: [
											"Enter one of your 8-character single-use emergency recovery codes (e.g. ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "A8K2-P7Q9" }),
											")."
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "stu-rec-code",
											className: "text-xs font-semibold",
											children: "Emergency Recovery Code"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "stu-rec-code",
											type: "text",
											placeholder: "A8K2-P7Q9",
											value: recoveryCode,
											onChange: (e) => setRecoveryCode(e.target.value.toUpperCase()),
											className: "font-mono text-center tracking-widest text-sm",
											autoFocus: true,
											required: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[0.68rem] text-muted-foreground",
											children: "Each recovery code can be used only once to sign in."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "w-full text-xs font-semibold bg-primary hover:bg-primary/90 mt-2",
									disabled: loading || recoveryCode.trim().length < 6,
									children: loading ? "Validating Recovery Code..." : "Verify Recovery Code & Sign In"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-muted/40 p-2.5 text-[0.7rem] text-muted-foreground text-center",
									children: ["💡 Demo Recovery Code: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: "A8K2-P7Q9"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between pt-2 border-t border-border text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setError("");
											setStage("otp");
										},
										className: "inline-flex items-center gap-1 text-muted-foreground hover:text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Back to Authenticator"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => toast.info("Contact student support at studentaffairs@kprcas.ac.in for identity assistance."),
										className: "inline-flex items-center gap-1 text-primary hover:underline text-[0.72rem]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeBuoy, { className: "size-3.5" }), " Contact Support"]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card/60 p-3.5 space-y-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-[0.72rem] font-semibold text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Quick Test Student Account" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[0.65rem] px-1.5 py-0.5 rounded bg-secondary",
									children: "Demo"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-lg border border-border/80 bg-background/80 p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-foreground block",
									children: "Kavitha S (22CS089)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.68rem] text-muted-foreground",
									children: "kavitha.cs22@kprcas.ac.in"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => {
										setIdentifier("22CS089");
										setPassword("student@kpr");
										toast.success("Loaded test student credentials (22CS089). Click Continue.");
									},
									className: "h-7 text-xs font-medium",
									children: "Autofill"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border pt-4 text-center space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Are you a member of the Discipline Committee?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/login",
								className: "inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline",
								children: ["Access Committee Workspace ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" })]
							})]
						})
					]
				})
			}),
			forgotModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-xl space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-bold text-foreground",
								children: "Password Reset"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "For security reasons, password resets are processed via your student portal administrator or college ERP account."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-muted/40 p-3 text-xs space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground block",
									children: "Student Support Desk"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block",
									children: "Email: studentaffairs@kprcas.ac.in"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block",
									children: "Phone: 0422-2635600 (Ext. 204)"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full text-xs",
							onClick: () => {
								setForgotModal(false);
								toast.info("Password assistance instructions dispatched to institutional desk.");
							},
							children: "Close"
						})
					]
				})
			})
		]
	});
}
//#endregion
export { StudentLoginPage as component };
