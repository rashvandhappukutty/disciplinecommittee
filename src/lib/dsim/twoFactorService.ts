import type { AuthUser, TwoFactorSetupData, UserRole } from "./types";
import { MOCK_ACCOUNTS } from "./auth";

export interface LoginAttemptResult {
  success: boolean;
  tempToken?: string;
  requiresTwoFactor: boolean;
  user?: AuthUser;
  error?: string;
}

export interface VerificationResult {
  success: boolean;
  sessionToken?: string;
  user?: AuthUser;
  error?: string;
  isRateLimited?: boolean;
  retryAfterSeconds?: number;
}

// In-memory rate limiting tracker (frontend prototype level)
interface RateLimitState {
  failedAttempts: number;
  lockedUntil: number | null;
}

const rateLimitMap = new Map<string, RateLimitState>();
const usedCodesSet = new Set<string>();
const userRecoveryCodesMap = new Map<string, string[]>();
const userSecretMap = new Map<string, string>();

// Initialize default recovery codes for mock accounts
const DEFAULT_RECOVERY_CODES = [
  "A8K2-P7Q9",
  "M4T8-X1R6",
  "W9Q3-L2N5",
  "F7B1-C4V8",
  "D3H6-J9K2",
  "Z5P8-Y1X4",
  "E2N7-U9M3",
  "R6T1-S8W4",
];

// Initialize default recovery codes ONLY for student accounts
// Staff accounts use WebAuthn Passkeys and do not use TOTP or recovery codes
Object.values(MOCK_ACCOUNTS)
  .filter((acc) => acc.role === "STUDENT")
  .forEach((acc) => {
    userRecoveryCodesMap.set(acc.id, [...DEFAULT_RECOVERY_CODES]);
    userSecretMap.set(acc.id, "JBSWY3DPEHPK3PXP24X7");
  });

export const twoFactorService = {
  /**
   * Step 1 of Student Login: Verify student credentials and issue temp token
   */
  async loginCredentials(identifier: string, passwordInput: string): Promise<LoginAttemptResult> {
    // Artificial slight delay to mimic credential verification
    await new Promise((res) => setTimeout(res, 250));

    const trimmed = identifier.trim().toLowerCase();

    // Explicit rejection for staff accounts trying to use student TOTP flow
    const staffEmails = [
      "principal@kprcas.ac.in",
      "ao@kprcas.ac.in",
      "discipline.head@kprcas.ac.in",
      "committee.member@kprcas.ac.in",
    ];
    if (
      staffEmails.includes(trimmed) ||
      trimmed.includes("principal") ||
      trimmed.includes("discipline.head") ||
      trimmed.includes("committee.member") ||
      trimmed === "ao"
    ) {
      return {
        success: false,
        requiresTwoFactor: false,
        error: "Staff members must authenticate via WebAuthn Passkey at the Staff Portal (/login). Authenticator OTP has been decommissioned for staff.",
      };
    }
    
    // Find matching mock student account
    let matchedUser: AuthUser | undefined = Object.values(MOCK_ACCOUNTS).find(
      (u) =>
        u.role === "STUDENT" &&
        (u.email.toLowerCase() === trimmed ||
          (u.studentId && u.studentId.toLowerCase() === trimmed) ||
          trimmed === "22cs089")
    );

    // Fallback matching for student demo
    if (!matchedUser && (trimmed.startsWith("22") || trimmed.startsWith("23") || trimmed.startsWith("stu") || trimmed.includes("arun") || trimmed === "student")) {
      matchedUser = MOCK_ACCOUNTS["arun.cs23@kprcas.ac.in"];
    }

    if (!matchedUser) {
      return { success: false, requiresTwoFactor: false, error: "Invalid student credentials." };
    }

    const tempToken = `tmp_${matchedUser.id}_${Date.now()}`;

    return {
      success: true,
      tempToken,
      requiresTwoFactor: true,
      user: {
        ...matchedUser,
        twoFactorEnabled: true,
        twoFactorRequired: false,
      },
    };
  },

  /**
   * Step 2 of Login: Verify 6-digit TOTP Authenticator Code
   */
  async verifyTotp(tempToken: string, code: string, user: AuthUser): Promise<VerificationResult> {
    await new Promise((res) => setTimeout(res, 200));

    const cleanCode = code.replace(/\s+/g, "").trim();

    // Check rate limit
    const key = user.id;
    const rl = rateLimitMap.get(key) || { failedAttempts: 0, lockedUntil: null };
    const now = Date.now();

    if (rl.lockedUntil && rl.lockedUntil > now) {
      const remainingSec = Math.ceil((rl.lockedUntil - now) / 1000);
      return {
        success: false,
        isRateLimited: true,
        retryAfterSeconds: remainingSec,
        error: `Too many verification attempts. Please wait ${remainingSec} seconds before trying again.`,
      };
    }

    // Standard 6-digit validation
    if (!/^\d{6}$/.test(cleanCode)) {
      return { success: false, error: "Invalid verification code. Enter a 6-digit numerical code." };
    }

    // In development mode: accept standard demo code "123456", or code matching the last 6 digits of current minute
    const isDemoCode = cleanCode === "123456" || cleanCode === "000000";
    
    // Also accept a calculated dynamic TOTP-like window for testing
    const validDynamicCode = String(Math.floor(Date.now() / 30000) % 1000000).padStart(6, "0");
    const isDynamicMatch = cleanCode === validDynamicCode;

    // Reject replay of identical code within same 15 seconds if already used
    const codeId = `${user.id}:${cleanCode}:${Math.floor(Date.now() / 15000)}`;
    if (usedCodesSet.has(codeId)) {
      return {
        success: false,
        error: "Verification code expired or already used. Please enter the current code from your authenticator app.",
      };
    }

    if (isDemoCode || isDynamicMatch) {
      usedCodesSet.add(codeId);
      // Reset rate limit on success
      rateLimitMap.delete(key);

      const sessionToken = `dsim_sess_${user.id}_${Date.now()}`;
      return {
        success: true,
        sessionToken,
        user,
      };
    }

    // Record failure
    rl.failedAttempts += 1;
    if (rl.failedAttempts >= 5) {
      rl.lockedUntil = now + 30000; // 30 seconds cooldown
      rateLimitMap.set(key, rl);
      return {
        success: false,
        isRateLimited: true,
        retryAfterSeconds: 30,
        error: "Too many failed attempts. Account temporarily throttled for 30 seconds.",
      };
    }

    rateLimitMap.set(key, rl);
    return {
      success: false,
      error: "Invalid verification code. Check your authenticator app and try again.",
    };
  },

  /**
   * Verify using Single-Use Recovery Code
   */
  async verifyRecoveryCode(tempToken: string, recoveryCode: string, user: AuthUser): Promise<VerificationResult> {
    await new Promise((res) => setTimeout(res, 200));

    const clean = recoveryCode.trim().toUpperCase();
    const existing = userRecoveryCodesMap.get(user.id) || DEFAULT_RECOVERY_CODES;

    const idx = existing.indexOf(clean);
    if (idx !== -1) {
      // Consume the code
      existing.splice(idx, 1);
      userRecoveryCodesMap.set(user.id, existing);

      const sessionToken = `dsim_sess_${user.id}_${Date.now()}`;
      return {
        success: true,
        sessionToken,
        user,
      };
    }

    return {
      success: false,
      error: "Invalid or previously used recovery code. Please enter an unused code.",
    };
  },

  /**
   * Generate Two-Factor Enrollment Setup Data (QR Code URI + Manual Key + Recovery Codes)
   */
  generateSetupData(user: AuthUser): TwoFactorSetupData {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let secret = "";
    for (let i = 0; i < 24; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Format with spaces for easier manual typing: "JBSW Y3DP EH..."
    const manualSetupKey = secret.match(/.{1,4}/g)?.join(" ") || secret;
    const issuer = "DSIM Institutional Portal";
    const account = user.email || `${user.role.toLowerCase().replace(/\s+/g, ".")}@kprcas.ac.in`;
    const qrCodeUri = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(account)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;

    // Generate fresh recovery codes
    const recoveryCodes = Array.from({ length: 8 }, () => {
      const p1 = Math.random().toString(36).substring(2, 6).toUpperCase();
      const p2 = Math.random().toString(36).substring(2, 6).toUpperCase();
      return `${p1}-${p2}`;
    });

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    return {
      secret,
      manualSetupKey,
      qrCodeUri,
      recoveryCodes,
      expiresAt,
    };
  },

  /**
   * Finalize and activate 2FA after user enters code from scanned app
   */
  async enableTwoFactor(userId: string, setupSecret: string, code: string, recoveryCodes: string[]): Promise<{ success: boolean; error?: string }> {
    await new Promise((res) => setTimeout(res, 200));

    if (!/^\d{6}$/.test(code.trim())) {
      return { success: false, error: "Please enter a valid 6-digit numerical code." };
    }

    // Save active secret and recovery codes
    userSecretMap.set(userId, setupSecret);
    userRecoveryCodesMap.set(userId, recoveryCodes);

    return { success: true };
  },

  /**
   * Disable 2FA (prohibited for mandatory roles, requires current password + OTP)
   */
  async disableTwoFactor(user: AuthUser, passwordConfirm: string, code: string): Promise<{ success: boolean; error?: string }> {
    await new Promise((res) => setTimeout(res, 200));

    if (user.twoFactorRequired) {
      return { success: false, error: "Two-Factor Authentication is mandatory for high-privilege institutional accounts and cannot be disabled." };
    }

    if (!passwordConfirm || passwordConfirm.length < 4) {
      return { success: false, error: "Current password is required to disable Two-Factor Authentication." };
    }

    if (!/^\d{6}$/.test(code.trim())) {
      return { success: false, error: "A valid 6-digit authenticator code is required to authorize this change." };
    }

    return { success: true };
  },

  /**
   * Get remaining recovery codes count for user
   */
  getRemainingRecoveryCodesCount(userId: string): number {
    const codes = userRecoveryCodesMap.get(userId);
    return codes ? codes.length : DEFAULT_RECOVERY_CODES.length;
  },
};
