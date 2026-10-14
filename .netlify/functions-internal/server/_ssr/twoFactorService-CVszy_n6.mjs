import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as MOCK_ACCOUNTS, u as cn } from "./button-C7ZpzBGx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/twoFactorService-CVszy_n6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OtpInput({ value = "", onChange, length = 6, disabled = false, hasError = false, onComplete, autoFocus = true }) {
	const inputRefs = (0, import_react.useRef)([]);
	const digits = Array.from({ length }, (_, i) => value[i] || "");
	(0, import_react.useEffect)(() => {
		if (autoFocus && !disabled && inputRefs.current[0]) inputRefs.current[0].focus();
	}, [autoFocus, disabled]);
	const handleChange = (index, e) => {
		const cleanDigit = e.target.value.replace(/\D/g, "");
		if (!cleanDigit) {
			const newDigits = [...digits];
			newDigits[index] = "";
			onChange(newDigits.join(""));
			return;
		}
		const char = cleanDigit.slice(-1);
		const newDigits = [...digits];
		newDigits[index] = char;
		const newVal = newDigits.join("");
		onChange(newVal);
		if (index < length - 1 && inputRefs.current[index + 1]) inputRefs.current[index + 1]?.focus();
		if (newVal.length === length && onComplete) onComplete(newVal);
	};
	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace") {
			if (!digits[index] && index > 0) {
				const newDigits = [...digits];
				newDigits[index - 1] = "";
				onChange(newDigits.join(""));
				inputRefs.current[index - 1]?.focus();
			}
		} else if (e.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
		else if (e.key === "ArrowRight" && index < length - 1) inputRefs.current[index + 1]?.focus();
	};
	const handlePaste = (e) => {
		e.preventDefault();
		const pasted = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, length);
		if (!pasted) return;
		onChange(pasted);
		const nextIdx = Math.min(pasted.length, length - 1);
		inputRefs.current[nextIdx]?.focus();
		if (pasted.length === length && onComplete) onComplete(pasted);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center gap-2 sm:gap-3",
		role: "group",
		"aria-label": "6-digit verification code",
		children: Array.from({ length }).map((_, index) => {
			const isFilled = Boolean(digits[index]);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: (el) => {
					inputRefs.current[index] = el;
				},
				type: "text",
				inputMode: "numeric",
				pattern: "[0-9]*",
				maxLength: 1,
				value: digits[index],
				disabled,
				onChange: (e) => handleChange(index, e),
				onKeyDown: (e) => handleKeyDown(index, e),
				onPaste: handlePaste,
				"aria-label": `Digit ${index + 1} of ${length}`,
				className: cn("h-12 w-10 sm:h-14 sm:w-12 rounded-xl border text-center font-mono text-xl font-bold tracking-widest transition-all", "bg-background text-foreground shadow-sm focus:outline-none focus:ring-2", hasError ? "border-destructive/80 bg-destructive/5 text-destructive focus:border-destructive focus:ring-destructive/30" : isFilled ? "border-primary/80 bg-primary/5 text-primary focus:border-primary focus:ring-primary/30" : "border-border hover:border-border/80 focus:border-primary focus:ring-primary/20", disabled && "opacity-50 cursor-not-allowed bg-muted")
			}, index);
		})
	});
}
var rateLimitMap = /* @__PURE__ */ new Map();
var usedCodesSet = /* @__PURE__ */ new Set();
var userRecoveryCodesMap = /* @__PURE__ */ new Map();
var userSecretMap = /* @__PURE__ */ new Map();
var DEFAULT_RECOVERY_CODES = [
	"A8K2-P7Q9",
	"M4T8-X1R6",
	"W9Q3-L2N5",
	"F7B1-C4V8",
	"D3H6-J9K2",
	"Z5P8-Y1X4",
	"E2N7-U9M3",
	"R6T1-S8W4"
];
Object.values(MOCK_ACCOUNTS).filter((acc) => acc.role === "STUDENT").forEach((acc) => {
	userRecoveryCodesMap.set(acc.id, [...DEFAULT_RECOVERY_CODES]);
	userSecretMap.set(acc.id, "JBSWY3DPEHPK3PXP24X7");
});
var twoFactorService = {
	/**
	* Step 1 of Student Login: Verify student credentials and issue temp token
	*/
	async loginCredentials(identifier, passwordInput) {
		await new Promise((res) => setTimeout(res, 250));
		const trimmed = identifier.trim().toLowerCase();
		if ([
			"principal@kprcas.ac.in",
			"ao@kprcas.ac.in",
			"discipline.head@kprcas.ac.in",
			"committee.member@kprcas.ac.in"
		].includes(trimmed) || trimmed.includes("principal") || trimmed.includes("discipline.head") || trimmed.includes("committee.member") || trimmed === "ao") return {
			success: false,
			requiresTwoFactor: false,
			error: "Staff members must authenticate via WebAuthn Passkey at the Staff Portal (/login). Authenticator OTP has been decommissioned for staff."
		};
		let matchedUser = Object.values(MOCK_ACCOUNTS).find((u) => u.role === "STUDENT" && (u.email.toLowerCase() === trimmed || u.studentId && u.studentId.toLowerCase() === trimmed || trimmed === "22cs089"));
		if (!matchedUser && (trimmed.startsWith("22") || trimmed.startsWith("23") || trimmed.startsWith("stu") || trimmed.includes("arun") || trimmed === "student")) matchedUser = MOCK_ACCOUNTS["arun.cs23@kprcas.ac.in"];
		if (!matchedUser) return {
			success: false,
			requiresTwoFactor: false,
			error: "Invalid student credentials."
		};
		return {
			success: true,
			tempToken: `tmp_${matchedUser.id}_${Date.now()}`,
			requiresTwoFactor: true,
			user: {
				...matchedUser,
				twoFactorEnabled: true,
				twoFactorRequired: false
			}
		};
	},
	/**
	* Step 2 of Login: Verify 6-digit TOTP Authenticator Code
	*/
	async verifyTotp(tempToken, code, user) {
		await new Promise((res) => setTimeout(res, 200));
		const cleanCode = code.replace(/\s+/g, "").trim();
		const key = user.id;
		const rl = rateLimitMap.get(key) || {
			failedAttempts: 0,
			lockedUntil: null
		};
		const now = Date.now();
		if (rl.lockedUntil && rl.lockedUntil > now) {
			const remainingSec = Math.ceil((rl.lockedUntil - now) / 1e3);
			return {
				success: false,
				isRateLimited: true,
				retryAfterSeconds: remainingSec,
				error: `Too many verification attempts. Please wait ${remainingSec} seconds before trying again.`
			};
		}
		if (!/^\d{6}$/.test(cleanCode)) return {
			success: false,
			error: "Invalid verification code. Enter a 6-digit numerical code."
		};
		const isDemoCode = cleanCode === "123456" || cleanCode === "000000";
		const isDynamicMatch = cleanCode === String(Math.floor(Date.now() / 3e4) % 1e6).padStart(6, "0");
		const codeId = `${user.id}:${cleanCode}:${Math.floor(Date.now() / 15e3)}`;
		if (usedCodesSet.has(codeId)) return {
			success: false,
			error: "Verification code expired or already used. Please enter the current code from your authenticator app."
		};
		if (isDemoCode || isDynamicMatch) {
			usedCodesSet.add(codeId);
			rateLimitMap.delete(key);
			return {
				success: true,
				sessionToken: `dsim_sess_${user.id}_${Date.now()}`,
				user
			};
		}
		rl.failedAttempts += 1;
		if (rl.failedAttempts >= 5) {
			rl.lockedUntil = now + 3e4;
			rateLimitMap.set(key, rl);
			return {
				success: false,
				isRateLimited: true,
				retryAfterSeconds: 30,
				error: "Too many failed attempts. Account temporarily throttled for 30 seconds."
			};
		}
		rateLimitMap.set(key, rl);
		return {
			success: false,
			error: "Invalid verification code. Check your authenticator app and try again."
		};
	},
	/**
	* Verify using Single-Use Recovery Code
	*/
	async verifyRecoveryCode(tempToken, recoveryCode, user) {
		await new Promise((res) => setTimeout(res, 200));
		const clean = recoveryCode.trim().toUpperCase();
		const existing = userRecoveryCodesMap.get(user.id) || DEFAULT_RECOVERY_CODES;
		const idx = existing.indexOf(clean);
		if (idx !== -1) {
			existing.splice(idx, 1);
			userRecoveryCodesMap.set(user.id, existing);
			return {
				success: true,
				sessionToken: `dsim_sess_${user.id}_${Date.now()}`,
				user
			};
		}
		return {
			success: false,
			error: "Invalid or previously used recovery code. Please enter an unused code."
		};
	},
	/**
	* Generate Two-Factor Enrollment Setup Data (QR Code URI + Manual Key + Recovery Codes)
	*/
	generateSetupData(user) {
		const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
		let secret = "";
		for (let i = 0; i < 24; i++) secret += chars.charAt(Math.floor(Math.random() * 32));
		const manualSetupKey = secret.match(/.{1,4}/g)?.join(" ") || secret;
		const issuer = "DSIM Institutional Portal";
		const account = user.email || `${user.role.toLowerCase().replace(/\s+/g, ".")}@kprcas.ac.in`;
		const qrCodeUri = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(account)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;
		const recoveryCodes = Array.from({ length: 8 }, () => {
			return `${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
		});
		const expiresAt = new Date(Date.now() + 9e5).toISOString();
		return {
			secret,
			manualSetupKey,
			qrCodeUri,
			recoveryCodes,
			expiresAt
		};
	},
	/**
	* Finalize and activate 2FA after user enters code from scanned app
	*/
	async enableTwoFactor(userId, setupSecret, code, recoveryCodes) {
		await new Promise((res) => setTimeout(res, 200));
		if (!/^\d{6}$/.test(code.trim())) return {
			success: false,
			error: "Please enter a valid 6-digit numerical code."
		};
		userSecretMap.set(userId, setupSecret);
		userRecoveryCodesMap.set(userId, recoveryCodes);
		return { success: true };
	},
	/**
	* Disable 2FA (prohibited for mandatory roles, requires current password + OTP)
	*/
	async disableTwoFactor(user, passwordConfirm, code) {
		await new Promise((res) => setTimeout(res, 200));
		if (user.twoFactorRequired) return {
			success: false,
			error: "Two-Factor Authentication is mandatory for high-privilege institutional accounts and cannot be disabled."
		};
		if (!passwordConfirm || passwordConfirm.length < 4) return {
			success: false,
			error: "Current password is required to disable Two-Factor Authentication."
		};
		if (!/^\d{6}$/.test(code.trim())) return {
			success: false,
			error: "A valid 6-digit authenticator code is required to authorize this change."
		};
		return { success: true };
	},
	/**
	* Get remaining recovery codes count for user
	*/
	getRemainingRecoveryCodesCount(userId) {
		const codes = userRecoveryCodesMap.get(userId);
		return codes ? codes.length : DEFAULT_RECOVERY_CODES.length;
	}
};
//#endregion
export { twoFactorService as n, OtpInput as t };
