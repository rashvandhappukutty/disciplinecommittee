import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button } from "./button-C7ZpzBGx.mjs";
import { D as RotateCw, J as Lock, P as Plus, Pt as CircleCheck, R as Pen, b as Shield, d as Trash2, et as Laptop, kt as Clock, nt as KeyRound, pt as FingerprintPattern, tt as Key, u as TriangleAlert, v as Smartphone, x as ShieldCheck } from "../_libs/lucide-react.mjs";
import { j as fmtDateTime } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BB0Q0GUL.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { t as Label } from "./label-Di2QZFiw.mjs";
import { t as passkeyClient } from "./passkeyClient-DCu3lk6B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PasskeyManager-7gs1Fida.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PasskeyManager({ user, onPasskeyCountChange }) {
	const [passkeys, setPasskeys] = (0, import_react.useState)([]);
	const [capabilities, setCapabilities] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [showRegisterModal, setShowRegisterModal] = (0, import_react.useState)(false);
	const [isBackupDevice, setIsBackupDevice] = (0, import_react.useState)(false);
	const [deviceName, setDeviceName] = (0, import_react.useState)("");
	const [reauthPassword, setReauthPassword] = (0, import_react.useState)("");
	const [regStep, setRegStep] = (0, import_react.useState)("reauth");
	const [regError, setRegError] = (0, import_react.useState)("");
	const [registering, setRegistering] = (0, import_react.useState)(false);
	const [editingPasskey, setEditingPasskey] = (0, import_react.useState)(null);
	const [newDeviceName, setNewDeviceName] = (0, import_react.useState)("");
	const [revokingPasskey, setRevokingPasskey] = (0, import_react.useState)(null);
	const [revokePassword, setRevokePassword] = (0, import_react.useState)("");
	const [revokeError, setRevokeError] = (0, import_react.useState)("");
	const refreshPasskeys = () => {
		const list = passkeyClient.listPasskeys(user.email);
		setPasskeys(list);
		onPasskeyCountChange?.(list.length);
	};
	(0, import_react.useEffect)(() => {
		refreshPasskeys();
		passkeyClient.checkDeviceCapabilities().then(setCapabilities);
	}, [user.email]);
	const handleOpenRegister = (asBackup = false) => {
		setIsBackupDevice(asBackup);
		setRegStep("reauth");
		setReauthPassword("");
		setRegError("");
		setDeviceName(asBackup ? "Backup Hardware Security Key (FIDO2)" : capabilities?.biometricLabel || "Institutional Workstation Passkey");
		setShowRegisterModal(true);
	};
	const handleReauthSubmit = async (e) => {
		e.preventDefault();
		setRegError("");
		if (!reauthPassword.trim()) {
			setRegError("Please enter your current account password to authorize passkey enrollment.");
			return;
		}
		setRegistering(true);
		const valid = await passkeyClient.reauthenticate(user.email, reauthPassword);
		setRegistering(false);
		if (!valid) {
			setRegError("Incorrect account password. Please re-enter your valid credentials.");
			return;
		}
		setRegStep("device_prompt");
		triggerNativeRegistration();
	};
	const triggerNativeRegistration = async () => {
		setRegistering(true);
		setRegError("");
		const res = await passkeyClient.registerPasskey(user.email, deviceName.trim(), isBackupDevice ? "cross-platform" : "platform");
		setRegistering(false);
		if (res.success && res.passkey) {
			setRegStep("success");
			refreshPasskeys();
			toast.success("Passkey Registered Successfully!", { description: `Enrolled "${res.passkey.name}". You can now sign in using Face ID, Windows Hello, or PIN.` });
		} else setRegError(res.error || "Device passkey registration failed. Please try again.");
	};
	const handleRenameSubmit = (e) => {
		e.preventDefault();
		if (!editingPasskey || !newDeviceName.trim()) return;
		passkeyClient.renamePasskey(user.email, editingPasskey.id, newDeviceName.trim());
		toast.success("Passkey device name updated.");
		setEditingPasskey(null);
		refreshPasskeys();
	};
	const handleRevokeSubmit = async (e) => {
		e.preventDefault();
		if (!revokingPasskey) return;
		if (!revokePassword.trim()) {
			setRevokeError("Please enter your account password to authorize credential revocation.");
			return;
		}
		setLoading(true);
		const valid = await passkeyClient.reauthenticate(user.email, revokePassword);
		setLoading(false);
		if (!valid) {
			setRevokeError("Incorrect account password. Revocation authorization failed.");
			return;
		}
		const res = passkeyClient.revokePasskey(user.email, revokingPasskey.id);
		if (res.success) {
			toast.success("Passkey Revoked", { description: `Successfully revoked "${revokingPasskey.name}". This device can no longer access this account.` });
			setRevokingPasskey(null);
			setRevokePassword("");
			setRevokeError("");
			refreshPasskeys();
		} else setRevokeError(res.error || "Failed to revoke passkey.");
	};
	const getDeviceIcon = (pk) => {
		const n = pk.name.toLowerCase();
		if (n.includes("yubi") || n.includes("usb") || n.includes("key") || pk.deviceType === "cross-platform") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "size-4 text-amber-600 dark:text-amber-400" });
		if (n.includes("iphone") || n.includes("phone") || n.includes("android")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-4 text-primary" });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, { className: "size-4 text-primary" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-xs text-foreground",
							children: "Native Biometric & Passkey Engine"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[0.62rem] font-bold text-emerald-700 dark:text-emerald-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-2.5" }), " FIDO2 / WebAuthn Active"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[0.72rem] text-muted-foreground mt-0.5",
						children: [
							"Detected platform capability:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: capabilities?.biometricLabel || "Windows Hello / Touch ID / Face ID"
							}),
							". Cryptographic credentials are securely bound to your physical device hardware."
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						onClick: () => handleOpenRegister(false),
						className: "text-xs gap-1.5 bg-primary hover:bg-primary/90 h-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Register Passkey"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => handleOpenRegister(true),
						className: "text-xs gap-1.5 h-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "size-3.5" }), " Add Backup Key"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 border-b border-border flex items-center justify-between bg-muted/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-xs font-semibold text-foreground flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary" }),
							"Registered Passkeys (",
							passkeys.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[0.68rem] text-muted-foreground",
						children: [
							"Devices authorized to sign into ",
							user.displayName,
							"'s ",
							user.role,
							" workspace without OTP."
						]
					})] })
				}), passkeys.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-8 text-center space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-12 place-items-center rounded-full bg-muted mx-auto text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
								className: "text-xs font-semibold text-foreground",
								children: "No passkeys enrolled yet"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.72rem] text-muted-foreground max-w-sm mx-auto",
								children: "Register your current device with Windows Hello, Touch ID, Face ID, or a hardware security key for instantaneous passwordless sign-in."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							onClick: () => handleOpenRegister(false),
							className: "text-xs gap-1.5 bg-primary hover:bg-primary/90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Enroll Your First Passkey"]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border/60",
					children: passkeys.map((pk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/15 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-9 shrink-0 place-items-center rounded-lg bg-secondary border border-border",
								children: getDeviceIcon(pk)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 flex-wrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-xs text-foreground truncate",
											children: pk.name
										}),
										pk.deviceType === "cross-platform" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.2 font-mono text-[0.62rem] text-amber-700 dark:text-amber-300",
											children: "External Key"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-primary/10 border border-primary/20 px-1.5 py-0.2 font-mono text-[0.62rem] text-primary font-medium",
											children: "Platform Biometric"
										}),
										pk.backedUp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-emerald-500/10 px-1.5 py-0.2 font-mono text-[0.62rem] text-emerald-600",
											children: "Synced"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-[0.68rem] text-muted-foreground flex-wrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }),
												" Registered: ",
												fmtDateTime(pk.createdAt)
											]
										}),
										pk.lastUsedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· Last used: ", fmtDateTime(pk.lastUsedAt)] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono",
											children: [
												"· Credential ID: ",
												pk.id.slice(0, 12),
												"..."
											]
										})
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 shrink-0 self-end sm:self-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "ghost",
								size: "sm",
								onClick: () => {
									setEditingPasskey(pk);
									setNewDeviceName(pk.name);
								},
								className: "h-7 text-xs px-2 gap-1",
								title: "Rename device",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-3" }), " Rename"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "ghost",
								size: "sm",
								onClick: () => {
									setRevokingPasskey(pk);
									setRevokePassword("");
									setRevokeError("");
								},
								className: "h-7 text-xs px-2 text-destructive hover:bg-destructive/10 gap-1",
								title: "Revoke passkey",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" }), " Revoke"]
							})]
						})]
					}, pk.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg bg-muted/40 p-3.5 border border-border/70 text-[0.72rem] text-muted-foreground space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 font-semibold text-foreground text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3.5 text-primary" }), " Institutional Passkey Architecture"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "leading-relaxed",
					children: "Passkey authentication relies on asymmetric public-key cryptography (W3C WebAuthn). Your device generates a unique private key stored inside its Secure Enclave / TPM chip, and only the corresponding public key is registered with KPRCAS DSIM. Biometric templates never leave your personal device."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: showRegisterModal,
				onOpenChange: setShowRegisterModal,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-8 place-items-center rounded-lg bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-base",
								children: isBackupDevice ? "Enroll Backup Security Key" : "Register Passkey / Device Unlock"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							className: "text-xs",
							children: [
								regStep === "reauth" && "Confirm your identity before adding a new authentication passkey.",
								regStep === "device_prompt" && "Complete the biometric or device challenge on your hardware.",
								regStep === "success" && "Your passkey has been verified and enrolled."
							]
						})] }),
						regError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: regError })]
						}),
						regStep === "reauth" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleReauthSubmit,
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "pk-name",
											className: "text-xs font-semibold",
											children: "Device / Authenticator Name"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "pk-name",
											type: "text",
											value: deviceName,
											onChange: (e) => setDeviceName(e.target.value),
											placeholder: "e.g. Work Laptop (Windows Hello)",
											className: "text-xs",
											required: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[0.68rem] text-muted-foreground",
											children: "Give this device an identifiable name to easily manage it later."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "pk-pw",
											className: "text-xs font-semibold",
											children: "Re-enter Account Password"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-2.5 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "pk-pw",
												type: "password",
												value: reauthPassword,
												onChange: (e) => setReauthPassword(e.target.value),
												placeholder: "Enter password to authorize",
												className: "pl-9 text-xs",
												autoFocus: true,
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[0.68rem] text-muted-foreground",
											children: "Security policy requires step-up re-authentication before registering new credentials."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
									className: "pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => setShowRegisterModal(false),
										className: "text-xs",
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										size: "sm",
										disabled: registering,
										className: "text-xs bg-primary hover:bg-primary/90",
										children: registering ? "Authorizing..." : "Continue to Device Prompt →"
									})]
								})
							]
						}),
						regStep === "device_prompt" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-4 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-14 place-items-center rounded-full bg-primary/10 text-primary mx-auto animate-pulse",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "size-8" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
										className: "text-xs font-bold text-foreground",
										children: "Waiting for device response"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[0.72rem] text-muted-foreground max-w-xs mx-auto",
										children: "When prompted by your operating system, scan your face (Face ID / Windows Hello), touch your fingerprint sensor, or enter your device security PIN."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => triggerNativeRegistration(),
										disabled: registering,
										className: "text-xs gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "size-3" }), " Retry Device Prompt"]
									})
								})
							]
						}),
						regStep === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-4 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 mx-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-8" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
										className: "text-xs font-bold text-foreground",
										children: "Passkey Enrolled!"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[0.72rem] text-muted-foreground",
										children: [
											"\"",
											deviceName,
											"\" is now configured for your ",
											user.role,
											" institutional account."
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
									className: "pt-2 justify-center sm:justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										onClick: () => setShowRegisterModal(false),
										className: "text-xs bg-primary hover:bg-primary/90",
										children: "Done"
									})
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(editingPasskey),
				onOpenChange: (v) => !v && setEditingPasskey(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-sm",
						children: "Rename Passkey Device"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs",
						children: "Update the friendly label for this passkey device."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleRenameSubmit,
						className: "space-y-4 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs font-semibold",
								children: "Device Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "text",
								value: newDeviceName,
								onChange: (e) => setNewDeviceName(e.target.value),
								className: "text-xs",
								autoFocus: true,
								required: true
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => setEditingPasskey(null),
								className: "text-xs",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "sm",
								className: "text-xs bg-primary hover:bg-primary/90",
								children: "Save Name"
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(revokingPasskey),
				onOpenChange: (v) => !v && setRevokingPasskey(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-destructive mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-sm",
								children: "Revoke Passkey Credential?"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							className: "text-xs",
							children: [
								"Are you sure you want to revoke ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									"\"",
									revokingPasskey?.name,
									"\""
								] }),
								"?"
							]
						})] }),
						revokeError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive",
							children: revokeError
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-[0.72rem] text-amber-700 dark:text-amber-300",
							children: "Once revoked, this device will no longer be able to authenticate. If you lose all passkeys, you must use the institutional password fallback or contact the DSIM administrator."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleRevokeSubmit,
							className: "space-y-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Confirm Account Password to Revoke"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "password",
									value: revokePassword,
									onChange: (e) => setRevokePassword(e.target.value),
									placeholder: "Enter password",
									className: "text-xs",
									autoFocus: true,
									required: true
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => setRevokingPasskey(null),
									className: "text-xs",
									children: "Keep Passkey"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									variant: "destructive",
									size: "sm",
									disabled: loading,
									className: "text-xs",
									children: loading ? "Revoking..." : "Permanently Revoke Passkey"
								})]
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { PasskeyManager as t };
