import type { AuthUser, RegisteredPasskey, UserRole } from "./types";
import { MOCK_ACCOUNTS } from "./auth";

export interface ServerSession {
  sessionId: string;
  userId: string;
  email: string;
  role: UserRole;
  authMethod: "passkey" | "password_fallback";
  createdAt: number;
  expiresAt: number;
  lastActivity: number;
}

export interface RateLimitEntry {
  failedAttempts: number;
  lockedUntil: number | null;
}

export interface StoredStaffAccount {
  user: AuthUser;
  passkeys: RegisteredPasskey[];
  fallbackPassword: string; // Institutional fallback credential
  currentChallenge?: string | undefined;
  challengeExpiresAt?: number | undefined;
}

const STORAGE_KEY_PASSKEYS = "dsim_staff_passkeys_v2";
const STORAGE_KEY_SESSIONS = "dsim_staff_sessions_v2";

// Default initial passkeys for the four authorized staff members
// (Pre-configured demonstration passkeys to allow immediate testing & verification)
const INITIAL_ACCOUNTS: Record<string, StoredStaffAccount> = {
  "principal@kprcas.ac.in": {
    user: MOCK_ACCOUNTS["principal@kprcas.ac.in"]!,
    fallbackPassword: "principal@2026",
    passkeys: [
      {
        id: "cred_principal_macbook_faceid",
        name: "Principal MacBook Pro (Touch ID / Face ID)",
        publicKey: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE4N2Y1qB8vZ6j5L3...",
        counter: 14,
        transports: ["internal", "hybrid"],
        deviceType: "platform",
        createdAt: "2026-09-01T10:00:00.000Z",
        lastUsedAt: "2026-10-10T14:20:00.000Z",
        backedUp: true,
      },
    ],
  },
  "ao@kprcas.ac.in": {
    user: MOCK_ACCOUNTS["ao@kprcas.ac.in"]!,
    fallbackPassword: "ao@2026",
    passkeys: [
      {
        id: "cred_ao_surface_hello",
        name: "AO Surface Pro (Windows Hello Face)",
        publicKey: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE7p9K2vM4xZ1j8Q6...",
        counter: 28,
        transports: ["internal"],
        deviceType: "platform",
        createdAt: "2026-08-15T09:30:00.000Z",
        lastUsedAt: "2026-10-11T09:15:00.000Z",
        backedUp: true,
      },
    ],
  },
  "discipline.head@kprcas.ac.in": {
    user: MOCK_ACCOUNTS["discipline.head@kprcas.ac.in"]!,
    fallbackPassword: "committee@2026",
    passkeys: [
      {
        id: "cred_head_workstation_hello",
        name: "Office Workstation (Windows Hello PIN & Biometric)",
        publicKey: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE3r8L5nP2wY9k1T4...",
        counter: 42,
        transports: ["internal"],
        deviceType: "platform",
        createdAt: "2026-07-10T11:00:00.000Z",
        lastUsedAt: "2026-10-12T18:40:00.000Z",
        backedUp: true,
      },
      {
        id: "cred_head_backup_yubikey",
        name: "Security Key (KPRCAS Hardware FIDO2 Backup)",
        publicKey: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE9t4N6qR1xW8j3V7...",
        counter: 7,
        transports: ["usb", "nfc"],
        deviceType: "cross-platform",
        createdAt: "2026-07-15T15:00:00.000Z",
        lastUsedAt: "2026-09-28T16:10:00.000Z",
        backedUp: false,
      },
    ],
  },
  "committee.member@kprcas.ac.in": {
    user: MOCK_ACCOUNTS["committee.member@kprcas.ac.in"]!,
    fallbackPassword: "board@2026",
    passkeys: [
      {
        id: "cred_member_laptop_touchid",
        name: "Board Member Laptop (Touch ID)",
        publicKey: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE1y7V9kP3wX5j2L8...",
        counter: 19,
        transports: ["internal"],
        deviceType: "platform",
        createdAt: "2026-08-20T14:00:00.000Z",
        lastUsedAt: "2026-10-09T11:45:00.000Z",
        backedUp: true,
      },
    ],
  },
};

// In-memory server state
let accountsState: Record<string, StoredStaffAccount> = { ...INITIAL_ACCOUNTS };
let activeSessions: Map<string, ServerSession> = new Map();
let rateLimitMap: Map<string, RateLimitEntry> = new Map();

// Helper to persist/hydrate when running in browser or node
function isBrowserEnvironment(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function loadPersistedState() {
  if (!isBrowserEnvironment()) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PASSKEYS);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure strictly the 4 staff accounts
      Object.keys(INITIAL_ACCOUNTS).forEach((email) => {
        const base = INITIAL_ACCOUNTS[email];
        if (base && parsed[email]) {
          accountsState[email] = {
            ...base,
            passkeys: parsed[email].passkeys || base.passkeys,
          };
        }
      });
    }
  } catch {
    // Keep initial accounts on read error
  }
}

function persistState() {
  if (!isBrowserEnvironment()) return;
  try {
    localStorage.setItem(STORAGE_KEY_PASSKEYS, JSON.stringify(accountsState));
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

// Initialize state
loadPersistedState();

export const passkeyStorage = {
  getStaffAccount(email: string): StoredStaffAccount | undefined {
    const normalized = email.trim().toLowerCase();
    return accountsState[normalized];
  },

  getAllStaffAccounts(): StoredStaffAccount[] {
    return Object.values(accountsState);
  },

  getStaffAccountByUserId(userId: string): StoredStaffAccount | undefined {
    return Object.values(accountsState).find((a) => a.user.id === userId);
  },

  getStaffAccountByCredentialId(credentialId: string): StoredStaffAccount | undefined {
    return Object.values(accountsState).find((a) =>
      a.passkeys.some((p) => p.id === credentialId)
    );
  },

  saveChallenge(email: string, challenge: string, ttlMs = 5 * 60 * 1000) {
    const account = this.getStaffAccount(email);
    if (account) {
      account.currentChallenge = challenge;
      account.challengeExpiresAt = Date.now() + ttlMs;
    }
  },

  consumeChallenge(email: string): string | null {
    const account = this.getStaffAccount(email);
    if (!account || !account.currentChallenge) return null;
    if (account.challengeExpiresAt && account.challengeExpiresAt < Date.now()) {
      account.currentChallenge = undefined;
      account.challengeExpiresAt = undefined;
      return null;
    }
    const challenge = account.currentChallenge;
    account.currentChallenge = undefined;
    account.challengeExpiresAt = undefined;
    return challenge;
  },

  addPasskey(email: string, passkey: RegisteredPasskey): boolean {
    const account = this.getStaffAccount(email);
    if (!account) return false;

    // Check if credential ID already exists
    const existingIndex = account.passkeys.findIndex((p) => p.id === passkey.id);
    if (existingIndex >= 0) {
      account.passkeys[existingIndex] = passkey;
    } else {
      account.passkeys.push(passkey);
    }

    account.user.passkeyCount = account.passkeys.length;
    account.user.passkeysEnabled = account.passkeys.length > 0;
    persistState();
    return true;
  },

  updatePasskeyCounter(email: string, credentialId: string, newCounter: number): boolean {
    const account = this.getStaffAccount(email);
    if (!account) return false;
    const pk = account.passkeys.find((p) => p.id === credentialId);
    if (!pk) return false;
    pk.counter = newCounter;
    pk.lastUsedAt = new Date().toISOString();
    persistState();
    return true;
  },

  renamePasskey(email: string, credentialId: string, newName: string): boolean {
    const account = this.getStaffAccount(email);
    if (!account) return false;
    const pk = account.passkeys.find((p) => p.id === credentialId);
    if (!pk) return false;
    pk.name = newName.trim();
    persistState();
    return true;
  },

  revokePasskey(email: string, credentialId: string): { success: boolean; error?: string } {
    const account = this.getStaffAccount(email);
    if (!account) return { success: false, error: "Staff account not found." };

    const initialLen = account.passkeys.length;
    account.passkeys = account.passkeys.filter((p) => p.id !== credentialId);

    if (account.passkeys.length === initialLen) {
      return { success: false, error: "Passkey credential not found." };
    }

    account.user.passkeyCount = account.passkeys.length;
    account.user.passkeysEnabled = account.passkeys.length > 0;
    persistState();
    return { success: true };
  },

  // ==================== Rate Limiting ====================
  checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds?: number; error?: string } {
    const entry = rateLimitMap.get(key);
    if (!entry) return { allowed: true };

    const now = Date.now();
    if (entry.lockedUntil && entry.lockedUntil > now) {
      const waitSec = Math.ceil((entry.lockedUntil - now) / 1000);
      return {
        allowed: false,
        retryAfterSeconds: waitSec,
        error: `Too many failed attempts. Security cooldown active: Please wait ${waitSec}s.`,
      };
    }

    if (entry.lockedUntil && entry.lockedUntil <= now) {
      // Cooldown expired, reset
      rateLimitMap.delete(key);
      return { allowed: true };
    }

    return { allowed: true };
  },

  recordFailedAttempt(key: string): { locked: boolean; retryAfterSeconds?: number } {
    const now = Date.now();
    const entry = rateLimitMap.get(key) || { failedAttempts: 0, lockedUntil: null };
    entry.failedAttempts += 1;

    if (entry.failedAttempts >= 5) {
      entry.lockedUntil = now + 30000; // 30 second cooldown
      rateLimitMap.set(key, entry);
      return { locked: true, retryAfterSeconds: 30 };
    }

    rateLimitMap.set(key, entry);
    return { locked: false };
  },

  resetRateLimit(key: string) {
    rateLimitMap.delete(key);
  },

  // ==================== Session Management ====================
  createSession(
    user: AuthUser,
    authMethod: "passkey" | "password_fallback",
    durationMs = 8 * 60 * 60 * 1000 // 8 hours institutional session
  ): ServerSession {
    const sessionId = `dsim_sess_${user.id}_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;
    const now = Date.now();
    const session: ServerSession = {
      sessionId,
      userId: user.id,
      email: user.email,
      role: user.role,
      authMethod,
      createdAt: now,
      expiresAt: now + durationMs,
      lastActivity: now,
    };
    activeSessions.set(sessionId, session);
    return session;
  },

  getSession(sessionId: string): ServerSession | null {
    const session = activeSessions.get(sessionId);
    if (!session) return null;
    if (session.expiresAt < Date.now()) {
      activeSessions.delete(sessionId);
      return null;
    }
    session.lastActivity = Date.now();
    return session;
  },

  revokeSession(sessionId: string) {
    activeSessions.delete(sessionId);
  },

  revokeAllSessionsForUser(userId: string) {
    for (const [id, s] of activeSessions.entries()) {
      if (s.userId === userId) {
        activeSessions.delete(id);
      }
    }
  },
};
