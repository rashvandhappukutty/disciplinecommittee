import { describe, it, expect, beforeEach } from "vitest";
import { passkeyServer, getRPConfig } from "@/lib/dsim/passkeyServer";
import { passkeyStorage } from "@/lib/dsim/passkeyStorage";
import { passkeyClient } from "@/lib/dsim/passkeyClient";
import { twoFactorService } from "@/lib/dsim/twoFactorService";
import {
  MOCK_ACCOUNTS,
  COMMITTEE_ROLES,
  ROLE_PERMISSIONS,
  hasPermission,
  isCommitteeUser,
  isStudent,
  canAccessCase,
} from "@/lib/dsim/auth";

describe("Staff Passkey Authentication & FIDO2 System", () => {
  beforeEach(() => {
    // Reset rate limits
    passkeyStorage.resetRateLimit("principal@kprcas.ac.in");
    passkeyStorage.resetRateLimit("ao@kprcas.ac.in");
    passkeyStorage.resetRateLimit("discipline.head@kprcas.ac.in");
    passkeyStorage.resetRateLimit("committee.member@kprcas.ac.in");
  });

  describe("1. Exactly Four Authorized Staff Accounts (Requirement 3)", () => {
    it("should retain exactly the four approved staff accounts and no other staff accounts", () => {
      const staffEmails = [
        "principal@kprcas.ac.in",
        "ao@kprcas.ac.in",
        "discipline.head@kprcas.ac.in",
        "committee.member@kprcas.ac.in",
      ];

      // Verify each exists in MOCK_ACCOUNTS
      staffEmails.forEach((email) => {
        const acc = MOCK_ACCOUNTS[email];
        expect(acc).toBeDefined();
        expect(acc?.email).toBe(email);
        expect(isCommitteeUser(acc!)).toBe(true);
      });

      // Verify exactly 4 staff roles in COMMITTEE_ROLES
      expect(COMMITTEE_ROLES).toHaveLength(4);
      expect(COMMITTEE_ROLES).toEqual([
        "Principal",
        "Administrative Officer",
        "Committee Head",
        "Disciplinary Board Member",
      ]);

      // Verify non-staff cannot pass committee check
      const studentAcc = MOCK_ACCOUNTS["arun.cs23@kprcas.ac.in"];
      expect(isCommitteeUser(studentAcc!)).toBe(false);
      expect(isStudent(studentAcc!)).toBe(true);
    });

    it("rejects unauthorized email addresses from passkey challenge generation", async () => {
      await expect(
        passkeyServer.generateRegistrationOptions("intruder@external.com")
      ).rejects.toThrow(/Unauthorized/);
    });
  });

  describe("2. WebAuthn Challenge & RP Configuration (Requirement 2 & 6)", () => {
    it("generates cryptographic registration options for authorized staff", async () => {
      const email = "discipline.head@kprcas.ac.in";
      const options = await passkeyServer.generateRegistrationOptions(email);

      expect(options.challenge).toBeDefined();
      expect(options.challenge.length).toBeGreaterThan(10);
      expect(options.rp.name).toContain("KPRCAS");
      expect(options.user.name).toBe(email);
      expect(options.authenticatorSelection?.userVerification).toBe("preferred");
    });

    it("generates authentication options for staff sign-in", async () => {
      const email = "discipline.head@kprcas.ac.in";
      const options = await passkeyServer.generateAuthenticationOptions(email);

      expect(options.challenge).toBeDefined();
      expect(options.allowCredentials).toBeDefined();
      expect(options.allowCredentials?.length).toBeGreaterThan(0);
      expect(options.userVerification).toBe("preferred");
    });

    it("correctly identifies RP ID and origins", () => {
      const config = getRPConfig();
      expect(config.rpID).toBeDefined();
      expect(config.expectedOrigins).toContain("https://kprcas.ac.in");
      expect(config.expectedOrigins).toContain("https://dsim.kprcas.ac.in");
    });
  });

  describe("3. Passkey Device Management & Enrollment (Requirement 4)", () => {
    const testEmail = "discipline.head@kprcas.ac.in";

    it("lists registered passkeys for staff account", () => {
      const list = passkeyClient.listPasskeys(testEmail);
      expect(Array.isArray(list)).toBe(true);
      expect(list.length).toBeGreaterThan(0);

      const firstKey = list[0]!;
      expect(firstKey.id).toBeDefined();
      expect(firstKey.name).toBeDefined();
      expect(firstKey.publicKey).toBeDefined();
      expect(firstKey.counter).toBeTypeOf("number");
      // Never store private keys or biometrics
      expect((firstKey as any).privateKey).toBeUndefined();
      expect((firstKey as any).biometricTemplate).toBeUndefined();
    });

    it("allows renaming a registered passkey", () => {
      const list = passkeyClient.listPasskeys(testEmail);
      const targetKey = list[0]!;
      const newName = "Head Laptop (Updated Workstation Hello)";

      const renamed = passkeyClient.renamePasskey(testEmail, targetKey.id, newName);
      expect(renamed).toBe(true);

      const updatedList = passkeyClient.listPasskeys(testEmail);
      const updatedKey = updatedList.find((p) => p.id === targetKey.id);
      expect(updatedKey?.name).toBe(newName);
    });

    it("allows revoking a lost or compromised passkey", () => {
      const initialList = passkeyClient.listPasskeys(testEmail);
      const keyToRevoke = initialList[0]!;

      const res = passkeyClient.revokePasskey(testEmail, keyToRevoke.id);
      expect(res.success).toBe(true);

      const updatedList = passkeyClient.listPasskeys(testEmail);
      expect(updatedList.some((p) => p.id === keyToRevoke.id)).toBe(false);

      // Re-adding the key for clean test state
      passkeyStorage.addPasskey(testEmail, keyToRevoke);
    });

    it("requires re-authentication password before changing security credentials", async () => {
      const valid = await passkeyClient.reauthenticate(testEmail, "committee@2026");
      expect(valid).toBe(true);

      const invalid = await passkeyClient.reauthenticate(testEmail, "wrong-password");
      expect(invalid).toBe(false);
    });
  });

  describe("4. Secure Fallback & Lost-Device Recovery (Requirement 5)", () => {
    it("authenticates all 4 staff roles via institutional password fallback", async () => {
      const testCases = [
        { email: "principal@kprcas.ac.in", password: "principal@2026", role: "Principal" },
        { email: "ao@kprcas.ac.in", password: "ao@2026", role: "Administrative Officer" },
        { email: "discipline.head@kprcas.ac.in", password: "committee@2026", role: "Committee Head" },
        { email: "committee.member@kprcas.ac.in", password: "board@2026", role: "Disciplinary Board Member" },
      ];

      for (const tc of testCases) {
        const res = await passkeyClient.loginWithPasswordFallback(tc.email, tc.password);
        expect(res.success).toBe(true);
        expect(res.user?.role).toBe(tc.role);
        expect(res.user?.authMethod).toBe("password_fallback");
        expect(res.session?.sessionId).toBeDefined();
      }
    });

    it("rejects invalid passwords and enforces rate limiting", async () => {
      const targetEmail = "ao@kprcas.ac.in";
      passkeyStorage.resetRateLimit(targetEmail);

      // 4 wrong attempts
      for (let i = 0; i < 4; i++) {
        const res = await passkeyClient.loginWithPasswordFallback(targetEmail, "bad-password");
        expect(res.success).toBe(false);
      }

      // 5th attempt triggers rate limit lock
      const lockedRes = await passkeyClient.loginWithPasswordFallback(targetEmail, "bad-password");
      expect(lockedRes.success).toBe(false);
      expect(lockedRes.isRateLimited).toBe(true);
      expect(lockedRes.retryAfterSeconds).toBeGreaterThan(0);

      passkeyStorage.resetRateLimit(targetEmail);
    });
  });

  describe("5. Zero TOTP / OTP for Staff (Requirement 1)", () => {
    it("ensures twoFactorService rejects any staff attempt and requires WebAuthn passkey", async () => {
      const staffEmails = [
        "principal@kprcas.ac.in",
        "ao@kprcas.ac.in",
        "discipline.head@kprcas.ac.in",
        "committee.member@kprcas.ac.in",
      ];

      for (const email of staffEmails) {
        const res = await twoFactorService.loginCredentials(email, "any-password");
        expect(res.success).toBe(false);
        expect(res.requiresTwoFactor).toBe(false);
        expect(res.error).toMatch(/Staff members must authenticate via WebAuthn Passkey/);
      }
    });

    it("verifies staff accounts in MOCK_ACCOUNTS use passkeys and not TOTP", () => {
      const head = MOCK_ACCOUNTS["discipline.head@kprcas.ac.in"]!;
      expect(head.passkeysEnabled).toBe(true);
      expect(head.passkeyCount).toBeGreaterThan(0);
      expect(head.twoFactorEnabled).toBeUndefined();
    });
  });

  describe("6. Role-Based Permissions & Access Control (Requirement 7)", () => {
    it("verifies Committee Head has full investigative permissions", () => {
      const head = MOCK_ACCOUNTS["discipline.head@kprcas.ac.in"]!;
      expect(hasPermission(head, "RECORD_INVESTIGATION_AUDIO")).toBe(true);
      expect(hasPermission(head, "GENERATE_AI_SYNOPSIS")).toBe(true);
      expect(hasPermission(head, "ISSUE_DECISION")).toBe(true);
      expect(hasPermission(head, "MANAGE_SUSPENSION")).toBe(true);
    });

    it("verifies Principal has institutional oversight permissions but not case tampering", () => {
      const principal = MOCK_ACCOUNTS["principal@kprcas.ac.in"]!;
      expect(hasPermission(principal, "VIEW_CASE")).toBe(true);
      expect(hasPermission(principal, "VIEW_AUDIT")).toBe(true);
      expect(hasPermission(principal, "EXPORT_CASE")).toBe(true);
      expect(hasPermission(principal, "RECORD_INVESTIGATION_AUDIO")).toBe(false);
    });

    it("verifies Disciplinary Board Member permissions are scoped to hearing/voting", () => {
      const member = MOCK_ACCOUNTS["committee.member@kprcas.ac.in"]!;
      expect(hasPermission(member, "SUBMIT_VOTE")).toBe(true);
      expect(hasPermission(member, "PARTICIPATE_HEARING")).toBe(true);
      expect(hasPermission(member, "VIEW_TRANSCRIPT")).toBe(true);
      expect(hasPermission(member, "MANAGE_SETTINGS")).toBe(false);
    });

    it("correctly enforces canAccessCase for board members vs institutional leaders", () => {
      const head = MOCK_ACCOUNTS["discipline.head@kprcas.ac.in"]!;
      const boardMember = MOCK_ACCOUNTS["committee.member@kprcas.ac.in"]!;

      // Head can access any case
      expect(canAccessCase(head, { id: "CASE-999" })).toBe(true);

      // Board member cannot access unassigned case
      expect(
        canAccessCase(boardMember, {
          id: "CASE-999",
          assignedBoardMemberEmail: "other@kprcas.ac.in",
        })
      ).toBe(false);

      // Board member can access assigned case
      expect(
        canAccessCase(boardMember, {
          id: "CASE-999",
          assignedBoardMemberEmail: "committee.member@kprcas.ac.in",
        })
      ).toBe(true);
    });
  });

  describe("7. Session Invalidation & Expiration (Requirement 6)", () => {
    it("creates, validates, and revokes server sessions", () => {
      const user = MOCK_ACCOUNTS["discipline.head@kprcas.ac.in"]!;
      const session = passkeyStorage.createSession(user, "passkey", 1000); // 1 sec expiry

      expect(session.sessionId).toBeDefined();
      expect(passkeyStorage.getSession(session.sessionId)).not.toBeNull();

      // Explicit revocation
      passkeyStorage.revokeSession(session.sessionId);
      expect(passkeyStorage.getSession(session.sessionId)).toBeNull();
    });
  });
});
