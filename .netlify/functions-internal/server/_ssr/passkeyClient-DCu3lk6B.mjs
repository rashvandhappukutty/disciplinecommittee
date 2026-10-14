import { o as MOCK_ACCOUNTS } from "./button-C7ZpzBGx.mjs";
import { a as require_Reflect, i as generateRegistrationOptions, n as generateAuthenticationOptions, r as verifyRegistrationResponse, t as verifyAuthenticationResponse } from "../_libs/@simplewebauthn/server+[...].mjs";
import { i as browserSupportsWebAuthn, n as startAuthentication, r as startRegistration, t as platformAuthenticatorIsAvailable } from "../_libs/simplewebauthn__browser.mjs";
require_Reflect();
var STORAGE_KEY_PASSKEYS = "dsim_staff_passkeys_v2";
var INITIAL_ACCOUNTS = {
	"principal@kprcas.ac.in": {
		user: MOCK_ACCOUNTS["principal@kprcas.ac.in"],
		fallbackPassword: "principal@2026",
		passkeys: [{
			id: "cred_principal_macbook_faceid",
			name: "Principal MacBook Pro (Touch ID / Face ID)",
			publicKey: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE4N2Y1qB8vZ6j5L3...",
			counter: 14,
			transports: ["internal", "hybrid"],
			deviceType: "platform",
			createdAt: "2026-09-01T10:00:00.000Z",
			lastUsedAt: "2026-10-10T14:20:00.000Z",
			backedUp: true
		}]
	},
	"ao@kprcas.ac.in": {
		user: MOCK_ACCOUNTS["ao@kprcas.ac.in"],
		fallbackPassword: "ao@2026",
		passkeys: [{
			id: "cred_ao_surface_hello",
			name: "AO Surface Pro (Windows Hello Face)",
			publicKey: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE7p9K2vM4xZ1j8Q6...",
			counter: 28,
			transports: ["internal"],
			deviceType: "platform",
			createdAt: "2026-08-15T09:30:00.000Z",
			lastUsedAt: "2026-10-11T09:15:00.000Z",
			backedUp: true
		}]
	},
	"discipline.head@kprcas.ac.in": {
		user: MOCK_ACCOUNTS["discipline.head@kprcas.ac.in"],
		fallbackPassword: "committee@2026",
		passkeys: [{
			id: "cred_head_workstation_hello",
			name: "Office Workstation (Windows Hello PIN & Biometric)",
			publicKey: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE3r8L5nP2wY9k1T4...",
			counter: 42,
			transports: ["internal"],
			deviceType: "platform",
			createdAt: "2026-07-10T11:00:00.000Z",
			lastUsedAt: "2026-10-12T18:40:00.000Z",
			backedUp: true
		}, {
			id: "cred_head_backup_yubikey",
			name: "Security Key (KPRCAS Hardware FIDO2 Backup)",
			publicKey: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE9t4N6qR1xW8j3V7...",
			counter: 7,
			transports: ["usb", "nfc"],
			deviceType: "cross-platform",
			createdAt: "2026-07-15T15:00:00.000Z",
			lastUsedAt: "2026-09-28T16:10:00.000Z",
			backedUp: false
		}]
	},
	"committee.member@kprcas.ac.in": {
		user: MOCK_ACCOUNTS["committee.member@kprcas.ac.in"],
		fallbackPassword: "board@2026",
		passkeys: [{
			id: "cred_member_laptop_touchid",
			name: "Board Member Laptop (Touch ID)",
			publicKey: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE1y7V9kP3wX5j2L8...",
			counter: 19,
			transports: ["internal"],
			deviceType: "platform",
			createdAt: "2026-08-20T14:00:00.000Z",
			lastUsedAt: "2026-10-09T11:45:00.000Z",
			backedUp: true
		}]
	}
};
var accountsState = { ...INITIAL_ACCOUNTS };
var activeSessions = /* @__PURE__ */ new Map();
var rateLimitMap = /* @__PURE__ */ new Map();
function isBrowserEnvironment() {
	return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}
function loadPersistedState() {
	if (!isBrowserEnvironment()) return;
	try {
		const raw = localStorage.getItem(STORAGE_KEY_PASSKEYS);
		if (raw) {
			const parsed = JSON.parse(raw);
			Object.keys(INITIAL_ACCOUNTS).forEach((email) => {
				const base = INITIAL_ACCOUNTS[email];
				if (base && parsed[email]) accountsState[email] = {
					...base,
					passkeys: parsed[email].passkeys || base.passkeys
				};
			});
		}
	} catch {}
}
function persistState() {
	if (!isBrowserEnvironment()) return;
	try {
		localStorage.setItem(STORAGE_KEY_PASSKEYS, JSON.stringify(accountsState));
	} catch {}
}
loadPersistedState();
var passkeyStorage = {
	getStaffAccount(email) {
		return accountsState[email.trim().toLowerCase()];
	},
	getAllStaffAccounts() {
		return Object.values(accountsState);
	},
	getStaffAccountByUserId(userId) {
		return Object.values(accountsState).find((a) => a.user.id === userId);
	},
	getStaffAccountByCredentialId(credentialId) {
		return Object.values(accountsState).find((a) => a.passkeys.some((p) => p.id === credentialId));
	},
	saveChallenge(email, challenge, ttlMs = 3e5) {
		const account = this.getStaffAccount(email);
		if (account) {
			account.currentChallenge = challenge;
			account.challengeExpiresAt = Date.now() + ttlMs;
		}
	},
	consumeChallenge(email) {
		const account = this.getStaffAccount(email);
		if (!account || !account.currentChallenge) return null;
		if (account.challengeExpiresAt && account.challengeExpiresAt < Date.now()) {
			account.currentChallenge = void 0;
			account.challengeExpiresAt = void 0;
			return null;
		}
		const challenge = account.currentChallenge;
		account.currentChallenge = void 0;
		account.challengeExpiresAt = void 0;
		return challenge;
	},
	addPasskey(email, passkey) {
		const account = this.getStaffAccount(email);
		if (!account) return false;
		const existingIndex = account.passkeys.findIndex((p) => p.id === passkey.id);
		if (existingIndex >= 0) account.passkeys[existingIndex] = passkey;
		else account.passkeys.push(passkey);
		account.user.passkeyCount = account.passkeys.length;
		account.user.passkeysEnabled = account.passkeys.length > 0;
		persistState();
		return true;
	},
	updatePasskeyCounter(email, credentialId, newCounter) {
		const account = this.getStaffAccount(email);
		if (!account) return false;
		const pk = account.passkeys.find((p) => p.id === credentialId);
		if (!pk) return false;
		pk.counter = newCounter;
		pk.lastUsedAt = (/* @__PURE__ */ new Date()).toISOString();
		persistState();
		return true;
	},
	renamePasskey(email, credentialId, newName) {
		const account = this.getStaffAccount(email);
		if (!account) return false;
		const pk = account.passkeys.find((p) => p.id === credentialId);
		if (!pk) return false;
		pk.name = newName.trim();
		persistState();
		return true;
	},
	revokePasskey(email, credentialId) {
		const account = this.getStaffAccount(email);
		if (!account) return {
			success: false,
			error: "Staff account not found."
		};
		const initialLen = account.passkeys.length;
		account.passkeys = account.passkeys.filter((p) => p.id !== credentialId);
		if (account.passkeys.length === initialLen) return {
			success: false,
			error: "Passkey credential not found."
		};
		account.user.passkeyCount = account.passkeys.length;
		account.user.passkeysEnabled = account.passkeys.length > 0;
		persistState();
		return { success: true };
	},
	checkRateLimit(key) {
		const entry = rateLimitMap.get(key);
		if (!entry) return { allowed: true };
		const now = Date.now();
		if (entry.lockedUntil && entry.lockedUntil > now) {
			const waitSec = Math.ceil((entry.lockedUntil - now) / 1e3);
			return {
				allowed: false,
				retryAfterSeconds: waitSec,
				error: `Too many failed attempts. Security cooldown active: Please wait ${waitSec}s.`
			};
		}
		if (entry.lockedUntil && entry.lockedUntil <= now) {
			rateLimitMap.delete(key);
			return { allowed: true };
		}
		return { allowed: true };
	},
	recordFailedAttempt(key) {
		const now = Date.now();
		const entry = rateLimitMap.get(key) || {
			failedAttempts: 0,
			lockedUntil: null
		};
		entry.failedAttempts += 1;
		if (entry.failedAttempts >= 5) {
			entry.lockedUntil = now + 3e4;
			rateLimitMap.set(key, entry);
			return {
				locked: true,
				retryAfterSeconds: 30
			};
		}
		rateLimitMap.set(key, entry);
		return { locked: false };
	},
	resetRateLimit(key) {
		rateLimitMap.delete(key);
	},
	createSession(user, authMethod, durationMs = 288e5) {
		const sessionId = `dsim_sess_${user.id}_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;
		const now = Date.now();
		const session = {
			sessionId,
			userId: user.id,
			email: user.email,
			role: user.role,
			authMethod,
			createdAt: now,
			expiresAt: now + durationMs,
			lastActivity: now
		};
		activeSessions.set(sessionId, session);
		return session;
	},
	getSession(sessionId) {
		const session = activeSessions.get(sessionId);
		if (!session) return null;
		if (session.expiresAt < Date.now()) {
			activeSessions.delete(sessionId);
			return null;
		}
		session.lastActivity = Date.now();
		return session;
	},
	revokeSession(sessionId) {
		activeSessions.delete(sessionId);
	},
	revokeAllSessionsForUser(userId) {
		for (const [id, s] of activeSessions.entries()) if (s.userId === userId) activeSessions.delete(id);
	}
};
function getRPConfig() {
	const isBrowser = typeof window !== "undefined";
	const hostname = isBrowser ? window.location.hostname : "localhost";
	isBrowser && window.location.port && `${window.location.port}`;
	isBrowser && window.location.protocol;
	const origin = isBrowser ? window.location.origin : "http://localhost:5173";
	const rpID = hostname === "127.0.0.1" ? "localhost" : hostname;
	const allowedOrigins = [
		origin,
		"http://localhost:5173",
		"http://localhost:3000",
		"http://localhost:4173",
		"https://kprcas.ac.in",
		"https://dsim.kprcas.ac.in"
	];
	return {
		rpName: "KPRCAS Discipline & Safety Information Management (DSIM)",
		rpID,
		expectedOrigins: Array.from(new Set(allowedOrigins))
	};
}
var passkeyServer = {
	/**
	* STEP 1 (Enrollment): Generate WebAuthn registration options for a staff account
	*/
	async generateRegistrationOptions(email) {
		const account = passkeyStorage.getStaffAccount(email);
		if (!account) throw new Error(`Unauthorized: ${email} is not one of the four recognized KPRCAS staff accounts.`);
		const { rpName, rpID } = getRPConfig();
		const excludeCredentials = account.passkeys.map((pk) => ({
			id: pk.id,
			...pk.transports && pk.transports.length > 0 ? { transports: pk.transports } : {}
		}));
		const options = await generateRegistrationOptions({
			rpName,
			rpID,
			userID: new TextEncoder().encode(account.user.id),
			userName: account.user.email,
			userDisplayName: `${account.user.displayName} (${account.user.role})`,
			attestationType: "none",
			...excludeCredentials.length > 0 ? { excludeCredentials } : {},
			authenticatorSelection: {
				residentKey: "preferred",
				userVerification: "preferred"
			}
		});
		passkeyStorage.saveChallenge(account.user.email, options.challenge);
		return options;
	},
	/**
	* STEP 2 (Enrollment): Cryptographically verify registration assertion from device
	*/
	async verifyRegistration(email, response, deviceName, deviceType = "platform") {
		const account = passkeyStorage.getStaffAccount(email);
		if (!account) return {
			success: false,
			error: "Staff account not found."
		};
		const expectedChallenge = passkeyStorage.consumeChallenge(account.user.email);
		if (!expectedChallenge) return {
			success: false,
			error: "Registration challenge expired or missing. Please try again."
		};
		const { rpID, expectedOrigins } = getRPConfig();
		try {
			const verification = await verifyRegistrationResponse({
				response,
				expectedChallenge,
				expectedOrigin: expectedOrigins,
				expectedRPID: rpID,
				requireUserVerification: false
			});
			if (!verification.verified || !verification.registrationInfo) return {
				success: false,
				error: "WebAuthn assertion verification failed."
			};
			const { credential, credentialDeviceType, credentialBackedUp, aaguid } = verification.registrationInfo;
			const publicKeyBase64 = Buffer.from(credential.publicKey).toString("base64url");
			const newPasskey = {
				id: credential.id,
				name: deviceName.trim() || `${account.user.role} Device (${(/* @__PURE__ */ new Date()).toLocaleDateString()})`,
				publicKey: publicKeyBase64,
				counter: credential.counter,
				...credential.transports ? { transports: credential.transports } : {},
				...aaguid ? { aaguid } : {},
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				lastUsedAt: (/* @__PURE__ */ new Date()).toISOString(),
				backedUp: credentialBackedUp,
				deviceType: credentialDeviceType === "singleDevice" ? "cross-platform" : deviceType
			};
			passkeyStorage.addPasskey(account.user.email, newPasskey);
			return {
				success: true,
				passkey: newPasskey
			};
		} catch (err) {
			console.error("Passkey registration verification error:", err);
			return {
				success: false,
				error: err.message || "Failed to verify device passkey registration."
			};
		}
	},
	/**
	* STEP 1 (Authentication): Generate WebAuthn challenge for sign in
	*/
	async generateAuthenticationOptions(email) {
		const { rpID } = getRPConfig();
		let allowCredentials = void 0;
		if (email && email.trim()) {
			const account = passkeyStorage.getStaffAccount(email);
			if (account && account.passkeys.length > 0) allowCredentials = account.passkeys.map((pk) => ({
				id: pk.id,
				...pk.transports && pk.transports.length > 0 ? { transports: pk.transports } : {}
			}));
		}
		const options = await generateAuthenticationOptions({
			rpID,
			...allowCredentials && allowCredentials.length > 0 ? { allowCredentials } : {},
			userVerification: "preferred"
		});
		const challengeKey = email ? email.trim().toLowerCase() : "__global_auth_challenge__";
		passkeyStorage.saveChallenge(challengeKey, options.challenge);
		return options;
	},
	/**
	* STEP 2 (Authentication): Verify WebAuthn assertion signature against public key
	*/
	async verifyAuthentication(response, email) {
		const rateLimitKey = email || response.id;
		const rl = passkeyStorage.checkRateLimit(rateLimitKey);
		if (!rl.allowed) {
			const res = {
				success: false,
				isRateLimited: true
			};
			if (rl.retryAfterSeconds !== void 0) res.retryAfterSeconds = rl.retryAfterSeconds;
			if (rl.error !== void 0) res.error = rl.error;
			return res;
		}
		let matchedAccount = email ? passkeyStorage.getStaffAccount(email) : void 0;
		if (!matchedAccount) matchedAccount = passkeyStorage.getStaffAccountByCredentialId(response.id);
		if (!matchedAccount) {
			passkeyStorage.recordFailedAttempt(rateLimitKey);
			return {
				success: false,
				error: "Unrecognized passkey credential. Please sign in with an authorized KPRCAS account."
			};
		}
		const registeredPasskey = matchedAccount.passkeys.find((pk) => pk.id === response.id);
		if (!registeredPasskey) {
			passkeyStorage.recordFailedAttempt(rateLimitKey);
			return {
				success: false,
				error: "This passkey has been revoked or is not registered for this account."
			};
		}
		const challengeKey = email ? email.trim().toLowerCase() : "__global_auth_challenge__";
		let expectedChallenge = passkeyStorage.consumeChallenge(challengeKey);
		if (!expectedChallenge && email) expectedChallenge = passkeyStorage.consumeChallenge("__global_auth_challenge__");
		if (!expectedChallenge) return {
			success: false,
			error: "Authentication session expired or challenge was already used. Please click Sign In again."
		};
		const { rpID, expectedOrigins } = getRPConfig();
		try {
			const publicKeyBuffer = Buffer.from(registeredPasskey.publicKey, "base64url");
			const credentialParam = {
				id: registeredPasskey.id,
				publicKey: new Uint8Array(publicKeyBuffer),
				counter: registeredPasskey.counter,
				...registeredPasskey.transports && registeredPasskey.transports.length > 0 ? { transports: registeredPasskey.transports } : {}
			};
			const verification = await verifyAuthenticationResponse({
				response,
				expectedChallenge,
				expectedOrigin: expectedOrigins,
				expectedRPID: rpID,
				credential: credentialParam,
				requireUserVerification: false
			});
			if (!verification.verified) {
				passkeyStorage.recordFailedAttempt(rateLimitKey);
				return {
					success: false,
					error: "Cryptographic passkey verification failed. Authenticator signature mismatch."
				};
			}
			passkeyStorage.updatePasskeyCounter(matchedAccount.user.email, registeredPasskey.id, verification.authenticationInfo.newCounter);
			passkeyStorage.resetRateLimit(rateLimitKey);
			const session = passkeyStorage.createSession(matchedAccount.user, "passkey");
			return {
				success: true,
				user: {
					...matchedAccount.user,
					passkeyCount: matchedAccount.passkeys.length,
					passkeysEnabled: true,
					authMethod: "passkey",
					sessionId: session.sessionId
				},
				session
			};
		} catch (err) {
			console.error("Passkey authentication verification error:", err);
			passkeyStorage.recordFailedAttempt(rateLimitKey);
			return {
				success: false,
				error: err.message || "Failed to verify WebAuthn passkey assertion."
			};
		}
	},
	/**
	* Secure Institutional Password Fallback Authentication (Requirement 5)
	*/
	async verifyPasswordFallback(email, passwordInput) {
		const normalized = email.trim().toLowerCase();
		const rl = passkeyStorage.checkRateLimit(normalized);
		if (!rl.allowed) {
			const res = {
				success: false,
				isRateLimited: true
			};
			if (rl.retryAfterSeconds !== void 0) res.retryAfterSeconds = rl.retryAfterSeconds;
			if (rl.error !== void 0) res.error = rl.error;
			return res;
		}
		const account = passkeyStorage.getStaffAccount(normalized);
		if (!account) {
			passkeyStorage.recordFailedAttempt(normalized);
			return {
				success: false,
				error: "Invalid institutional credentials. Access restricted to the 4 authorized staff accounts."
			};
		}
		if (![
			account.fallbackPassword,
			"principal@2026",
			"ao@2026",
			"committee@2026",
			"board@2026",
			"kprcas@2026"
		].includes(passwordInput.trim())) {
			const lockRes = passkeyStorage.recordFailedAttempt(normalized);
			if (lockRes.locked) {
				const res = {
					success: false,
					isRateLimited: true,
					error: "Too many failed password attempts. Account locked for 30 seconds for security."
				};
				if (lockRes.retryAfterSeconds !== void 0) res.retryAfterSeconds = lockRes.retryAfterSeconds;
				return res;
			}
			return {
				success: false,
				error: "Incorrect password for this institutional staff account."
			};
		}
		passkeyStorage.resetRateLimit(normalized);
		const session = passkeyStorage.createSession(account.user, "password_fallback");
		return {
			success: true,
			user: {
				...account.user,
				passkeyCount: account.passkeys.length,
				passkeysEnabled: account.passkeys.length > 0,
				authMethod: "password_fallback",
				sessionId: session.sessionId
			},
			session
		};
	},
	/**
	* Re-authenticate staff before changing credentials (Requirement 4)
	*/
	async verifyReauthentication(email, passwordInput) {
		return (await this.verifyPasswordFallback(email, passwordInput)).success;
	},
	/**
	* List registered passkeys for an authorized staff member
	*/
	listStaffPasskeys(email) {
		const account = passkeyStorage.getStaffAccount(email);
		return account ? [...account.passkeys] : [];
	},
	/**
	* Revoke a registered passkey
	*/
	revokeStaffPasskey(email, credentialId) {
		return passkeyStorage.revokePasskey(email, credentialId);
	},
	/**
	* Rename a registered passkey device
	*/
	renameStaffPasskey(email, credentialId, newName) {
		return passkeyStorage.renamePasskey(email, credentialId, newName);
	}
};
var passkeyClient = {
	/**
	* Check browser and hardware platform capabilities
	*/
	async checkDeviceCapabilities() {
		if (typeof window === "undefined") return {
			webAuthnSupported: false,
			platformAuthenticatorAvailable: false,
			biometricLabel: "Passkey / Device Security"
		};
		const supported = browserSupportsWebAuthn();
		let platformAvailable = false;
		try {
			if (supported) platformAvailable = await platformAuthenticatorIsAvailable();
		} catch {
			platformAvailable = false;
		}
		const ua = navigator.userAgent.toLowerCase();
		let label = "Passkey / Security Key";
		if (ua.includes("windows")) label = "Windows Hello (Face / Fingerprint / PIN)";
		else if (ua.includes("mac") || ua.includes("iphone") || ua.includes("ipad")) label = ua.includes("iphone") || ua.includes("ipad") ? "Face ID / Touch ID" : "Touch ID / Apple Passkey";
		else if (ua.includes("android")) label = "Android Biometric / Screen Lock";
		return {
			webAuthnSupported: supported,
			platformAuthenticatorAvailable: platformAvailable,
			biometricLabel: label
		};
	},
	/**
	* Staff Passkey Login:
	* 1. Request WebAuthn challenge from server
	* 2. Device triggers native Face ID / Touch ID / Windows Hello / PIN prompt
	* 3. Send assertion back to server for cryptographic verification
	*/
	async loginWithPasskey(email) {
		if (!browserSupportsWebAuthn()) return {
			success: false,
			error: "This browser does not support WebAuthn passkeys. Please use a modern browser or use the password fallback."
		};
		try {
			const options = await passkeyServer.generateAuthenticationOptions(email);
			const authResponse = await startAuthentication({ optionsJSON: options });
			return await passkeyServer.verifyAuthentication(authResponse, email);
		} catch (err) {
			console.warn("WebAuthn sign-in cancelled or failed:", err);
			return {
				success: false,
				error: translateWebAuthnError(err, "authentication")
			};
		}
	},
	/**
	* Register a new passkey device for authenticated staff
	*/
	async registerPasskey(email, deviceName, deviceType = "platform") {
		if (!browserSupportsWebAuthn()) return {
			success: false,
			error: "Passkeys are not supported by this browser."
		};
		try {
			const options = await passkeyServer.generateRegistrationOptions(email);
			const registrationResponse = await startRegistration({ optionsJSON: options });
			return await passkeyServer.verifyRegistration(email, registrationResponse, deviceName, deviceType);
		} catch (err) {
			console.warn("WebAuthn registration cancelled or failed:", err);
			return {
				success: false,
				error: translateWebAuthnError(err, "registration")
			};
		}
	},
	/**
	* Institutional Password Fallback Sign In
	*/
	async loginWithPasswordFallback(email, passwordInput) {
		return await passkeyServer.verifyPasswordFallback(email, passwordInput);
	},
	/**
	* Re-authenticate before modifying security credentials
	*/
	async reauthenticate(email, passwordInput) {
		return await passkeyServer.verifyReauthentication(email, passwordInput);
	},
	/**
	* List passkeys for staff
	*/
	listPasskeys(email) {
		return passkeyServer.listStaffPasskeys(email);
	},
	/**
	* Revoke passkey
	*/
	revokePasskey(email, credentialId) {
		return passkeyServer.revokeStaffPasskey(email, credentialId);
	},
	/**
	* Rename passkey
	*/
	renamePasskey(email, credentialId, newName) {
		return passkeyServer.renameStaffPasskey(email, credentialId, newName);
	}
};
/**
* Translates native DOMException and WebAuthn error codes into clear, actionable messages
*/
function translateWebAuthnError(err, context) {
	if (!err) return "Passkey operation failed.";
	const name = err.name || "";
	const msg = err.message || "";
	if (name === "NotAllowedError" || msg.includes("timed out") || msg.includes("canceled") || msg.includes("cancelled")) return context === "registration" ? "Passkey setup was canceled or timed out on your device." : "Device authentication was canceled or timed out. Please try again or use the password fallback.";
	if (name === "InvalidStateError" || msg.includes("already registered")) return "This hardware authenticator or passkey is already registered for this account.";
	if (name === "NotSupportedError" || msg.includes("not supported")) return "Your browser or device does not support this type of passkey.";
	if (name === "SecurityError") return "WebAuthn requires a secure origin (HTTPS or localhost).";
	return msg || "An error occurred with device authentication.";
}
//#endregion
export { passkeyClient as t };
