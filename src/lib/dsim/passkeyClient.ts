import {
  startRegistration,
  startAuthentication,
  browserSupportsWebAuthn,
  platformAuthenticatorIsAvailable,
} from "@simplewebauthn/browser";
import { passkeyServer, type ServerPasskeyResult } from "./passkeyServer";
import type { AuthUser, RegisteredPasskey } from "./types";

export interface DeviceBiometricStatus {
  webAuthnSupported: boolean;
  platformAuthenticatorAvailable: boolean;
  biometricLabel: string; // e.g. "Windows Hello / Touch ID / Face ID"
}

export const passkeyClient = {
  /**
   * Check browser and hardware platform capabilities
   */
  async checkDeviceCapabilities(): Promise<DeviceBiometricStatus> {
    if (typeof window === "undefined") {
      return {
        webAuthnSupported: false,
        platformAuthenticatorAvailable: false,
        biometricLabel: "Passkey / Device Security",
      };
    }

    const supported = browserSupportsWebAuthn();
    let platformAvailable = false;
    try {
      if (supported) {
        platformAvailable = await platformAuthenticatorIsAvailable();
      }
    } catch {
      platformAvailable = false;
    }

    // Determine user-friendly biometric label based on OS
    const ua = navigator.userAgent.toLowerCase();
    let label = "Passkey / Security Key";
    if (ua.includes("windows")) {
      label = "Windows Hello (Face / Fingerprint / PIN)";
    } else if (ua.includes("mac") || ua.includes("iphone") || ua.includes("ipad")) {
      label = ua.includes("iphone") || ua.includes("ipad") ? "Face ID / Touch ID" : "Touch ID / Apple Passkey";
    } else if (ua.includes("android")) {
      label = "Android Biometric / Screen Lock";
    }

    return {
      webAuthnSupported: supported,
      platformAuthenticatorAvailable: platformAvailable,
      biometricLabel: label,
    };
  },

  /**
   * Staff Passkey Login:
   * 1. Request WebAuthn challenge from server
   * 2. Device triggers native Face ID / Touch ID / Windows Hello / PIN prompt
   * 3. Send assertion back to server for cryptographic verification
   */
  async loginWithPasskey(email?: string): Promise<ServerPasskeyResult> {
    if (!browserSupportsWebAuthn()) {
      return {
        success: false,
        error: "This browser does not support WebAuthn passkeys. Please use a modern browser or use the password fallback.",
      };
    }

    try {
      // 1. Get authentication options (challenge + allowed credentials) from server
      const options = await passkeyServer.generateAuthenticationOptions(email);

      // 2. Invoke native browser/OS authenticator
      const authResponse = await startAuthentication({
        optionsJSON: options,
      });

      // 3. Send assertion to server for verification
      const verifyRes = await passkeyServer.verifyAuthentication(authResponse, email);
      return verifyRes;
    } catch (err: any) {
      console.warn("WebAuthn sign-in cancelled or failed:", err);
      return {
        success: false,
        error: translateWebAuthnError(err, "authentication"),
      };
    }
  },

  /**
   * Register a new passkey device for authenticated staff
   */
  async registerPasskey(
    email: string,
    deviceName: string,
    deviceType: "platform" | "cross-platform" = "platform"
  ): Promise<{ success: boolean; passkey?: RegisteredPasskey; error?: string }> {
    if (!browserSupportsWebAuthn()) {
      return {
        success: false,
        error: "Passkeys are not supported by this browser.",
      };
    }

    try {
      // 1. Get registration options from server
      const options = await passkeyServer.generateRegistrationOptions(email);

      // 2. Invoke native device registration prompt
      const registrationResponse = await startRegistration({
        optionsJSON: options,
      });

      // 3. Cryptographically verify registration on server
      const verifyRes = await passkeyServer.verifyRegistration(
        email,
        registrationResponse,
        deviceName,
        deviceType
      );

      return verifyRes;
    } catch (err: any) {
      console.warn("WebAuthn registration cancelled or failed:", err);
      return {
        success: false,
        error: translateWebAuthnError(err, "registration"),
      };
    }
  },

  /**
   * Institutional Password Fallback Sign In
   */
  async loginWithPasswordFallback(email: string, passwordInput: string): Promise<ServerPasskeyResult> {
    return await passkeyServer.verifyPasswordFallback(email, passwordInput);
  },

  /**
   * Re-authenticate before modifying security credentials
   */
  async reauthenticate(email: string, passwordInput: string): Promise<boolean> {
    return await passkeyServer.verifyReauthentication(email, passwordInput);
  },

  /**
   * List passkeys for staff
   */
  listPasskeys(email: string): RegisteredPasskey[] {
    return passkeyServer.listStaffPasskeys(email);
  },

  /**
   * Revoke passkey
   */
  revokePasskey(email: string, credentialId: string): { success: boolean; error?: string } {
    return passkeyServer.revokeStaffPasskey(email, credentialId);
  },

  /**
   * Rename passkey
   */
  renamePasskey(email: string, credentialId: string, newName: string): boolean {
    return passkeyServer.renameStaffPasskey(email, credentialId, newName);
  },
};

/**
 * Translates native DOMException and WebAuthn error codes into clear, actionable messages
 */
function translateWebAuthnError(err: any, context: "registration" | "authentication"): string {
  if (!err) return "Passkey operation failed.";

  const name = err.name || "";
  const msg = err.message || "";

  if (name === "NotAllowedError" || msg.includes("timed out") || msg.includes("canceled") || msg.includes("cancelled")) {
    return context === "registration"
      ? "Passkey setup was canceled or timed out on your device."
      : "Device authentication was canceled or timed out. Please try again or use the password fallback.";
  }

  if (name === "InvalidStateError" || msg.includes("already registered")) {
    return "This hardware authenticator or passkey is already registered for this account.";
  }

  if (name === "NotSupportedError" || msg.includes("not supported")) {
    return "Your browser or device does not support this type of passkey.";
  }

  if (name === "SecurityError") {
    return "WebAuthn requires a secure origin (HTTPS or localhost).";
  }

  return msg || "An error occurred with device authentication.";
}
