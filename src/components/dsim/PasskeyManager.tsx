import { useState, useEffect } from "react";
import {
  Fingerprint,
  KeyRound,
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  Smartphone,
  Laptop,
  Key,
  AlertTriangle,
  Lock,
  CheckCircle2,
  Clock,
  Shield,
  RotateCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { passkeyClient, type DeviceBiometricStatus } from "@/lib/dsim/passkeyClient";
import type { AuthUser, RegisteredPasskey } from "@/lib/dsim/types";
import { fmtDateTime } from "@/lib/dsim/format";
import { toast } from "sonner";

interface PasskeyManagerProps {
  user: AuthUser;
  onPasskeyCountChange?: (count: number) => void;
}

export function PasskeyManager({ user, onPasskeyCountChange }: PasskeyManagerProps) {
  const [passkeys, setPasskeys] = useState<RegisteredPasskey[]>([]);
  const [capabilities, setCapabilities] = useState<DeviceBiometricStatus | null>(null);
  const [loading, setLoading] = useState(false);

  // Registration modal state
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isBackupDevice, setIsBackupDevice] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [reauthPassword, setReauthPassword] = useState("");
  const [regStep, setRegStep] = useState<"reauth" | "device_prompt" | "success">("reauth");
  const [regError, setRegError] = useState("");
  const [registering, setRegistering] = useState(false);

  // Rename modal state
  const [editingPasskey, setEditingPasskey] = useState<RegisteredPasskey | null>(null);
  const [newDeviceName, setNewDeviceName] = useState("");

  // Revoke modal state
  const [revokingPasskey, setRevokingPasskey] = useState<RegisteredPasskey | null>(null);
  const [revokePassword, setRevokePassword] = useState("");
  const [revokeError, setRevokeError] = useState("");

  const refreshPasskeys = () => {
    const list = passkeyClient.listPasskeys(user.email);
    setPasskeys(list);
    onPasskeyCountChange?.(list.length);
  };

  useEffect(() => {
    refreshPasskeys();
    passkeyClient.checkDeviceCapabilities().then(setCapabilities);
  }, [user.email]);

  const handleOpenRegister = (asBackup = false) => {
    setIsBackupDevice(asBackup);
    setRegStep("reauth");
    setReauthPassword("");
    setRegError("");
    setDeviceName(
      asBackup
        ? "Backup Hardware Security Key (FIDO2)"
        : capabilities?.biometricLabel || "Institutional Workstation Passkey"
    );
    setShowRegisterModal(true);
  };

  const handleReauthSubmit = async (e: React.FormEvent) => {
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

    // Proceed to native device registration prompt
    setRegStep("device_prompt");
    triggerNativeRegistration();
  };

  const triggerNativeRegistration = async () => {
    setRegistering(true);
    setRegError("");

    const res = await passkeyClient.registerPasskey(
      user.email,
      deviceName.trim(),
      isBackupDevice ? "cross-platform" : "platform"
    );

    setRegistering(false);

    if (res.success && res.passkey) {
      setRegStep("success");
      refreshPasskeys();
      toast.success("Passkey Registered Successfully!", {
        description: `Enrolled "${res.passkey.name}". You can now sign in using Face ID, Windows Hello, or PIN.`,
      });
    } else {
      setRegError(res.error || "Device passkey registration failed. Please try again.");
    }
  };

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPasskey || !newDeviceName.trim()) return;

    passkeyClient.renamePasskey(user.email, editingPasskey.id, newDeviceName.trim());
    toast.success("Passkey device name updated.");
    setEditingPasskey(null);
    refreshPasskeys();
  };

  const handleRevokeSubmit = async (e: React.FormEvent) => {
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
      toast.success("Passkey Revoked", {
        description: `Successfully revoked "${revokingPasskey.name}". This device can no longer access this account.`,
      });
      setRevokingPasskey(null);
      setRevokePassword("");
      setRevokeError("");
      refreshPasskeys();
    } else {
      setRevokeError(res.error || "Failed to revoke passkey.");
    }
  };

  const getDeviceIcon = (pk: RegisteredPasskey) => {
    const n = pk.name.toLowerCase();
    if (n.includes("yubi") || n.includes("usb") || n.includes("key") || pk.deviceType === "cross-platform") {
      return <Key className="size-4 text-amber-600 dark:text-amber-400" />;
    }
    if (n.includes("iphone") || n.includes("phone") || n.includes("android")) {
      return <Smartphone className="size-4 text-primary" />;
    }
    return <Laptop className="size-4 text-primary" />;
  };

  return (
    <div className="space-y-4">
      {/* Platform & Biometric Capability Banner */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
            <Fingerprint className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs text-foreground">
                Native Biometric & Passkey Engine
              </span>
              <span className="inline-flex items-center gap-1 rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[0.62rem] font-bold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="size-2.5" /> FIDO2 / WebAuthn Active
              </span>
            </div>
            <p className="text-[0.72rem] text-muted-foreground mt-0.5">
              Detected platform capability:{" "}
              <strong className="text-foreground">
                {capabilities?.biometricLabel || "Windows Hello / Touch ID / Face ID"}
              </strong>
              . Cryptographic credentials are securely bound to your physical device hardware.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            size="sm"
            onClick={() => handleOpenRegister(false)}
            className="text-xs gap-1.5 bg-primary hover:bg-primary/90 h-8"
          >
            <Plus className="size-3.5" /> Register Passkey
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleOpenRegister(true)}
            className="text-xs gap-1.5 h-8"
          >
            <Key className="size-3.5" /> Add Backup Key
          </Button>
        </div>
      </div>

      {/* Registered Passkeys List */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between bg-muted/20">
          <div>
            <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" />
              Registered Passkeys ({passkeys.length})
            </h4>
            <p className="text-[0.68rem] text-muted-foreground">
              Devices authorized to sign into {user.displayName}'s {user.role} workspace without OTP.
            </p>
          </div>
        </div>

        {passkeys.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <div className="grid size-12 place-items-center rounded-full bg-muted mx-auto text-muted-foreground">
              <KeyRound className="size-6" />
            </div>
            <div className="space-y-1">
              <h5 className="text-xs font-semibold text-foreground">No passkeys enrolled yet</h5>
              <p className="text-[0.72rem] text-muted-foreground max-w-sm mx-auto">
                Register your current device with Windows Hello, Touch ID, Face ID, or a hardware security key for instantaneous passwordless sign-in.
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              onClick={() => handleOpenRegister(false)}
              className="text-xs gap-1.5 bg-primary hover:bg-primary/90"
            >
              <Plus className="size-3.5" /> Enroll Your First Passkey
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {passkeys.map((pk) => (
              <div
                key={pk.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/15 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary border border-border">
                    {getDeviceIcon(pk)}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-xs text-foreground truncate">
                        {pk.name}
                      </span>
                      {pk.deviceType === "cross-platform" ? (
                        <span className="rounded bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.2 font-mono text-[0.62rem] text-amber-700 dark:text-amber-300">
                          External Key
                        </span>
                      ) : (
                        <span className="rounded bg-primary/10 border border-primary/20 px-1.5 py-0.2 font-mono text-[0.62rem] text-primary font-medium">
                          Platform Biometric
                        </span>
                      )}
                      {pk.backedUp && (
                        <span className="rounded bg-emerald-500/10 px-1.5 py-0.2 font-mono text-[0.62rem] text-emerald-600">
                          Synced
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-[0.68rem] text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" /> Registered: {fmtDateTime(pk.createdAt)}
                      </span>
                      {pk.lastUsedAt && (
                        <span>· Last used: {fmtDateTime(pk.lastUsedAt)}</span>
                      )}
                      <span className="font-mono">
                        · Credential ID: {pk.id.slice(0, 12)}...
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingPasskey(pk);
                      setNewDeviceName(pk.name);
                    }}
                    className="h-7 text-xs px-2 gap-1"
                    title="Rename device"
                  >
                    <Edit2 className="size-3" /> Rename
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setRevokingPasskey(pk);
                      setRevokePassword("");
                      setRevokeError("");
                    }}
                    className="h-7 text-xs px-2 text-destructive hover:bg-destructive/10 gap-1"
                    title="Revoke passkey"
                  >
                    <Trash2 className="size-3" /> Revoke
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security Guidance Note */}
      <div className="rounded-lg bg-muted/40 p-3.5 border border-border/70 text-[0.72rem] text-muted-foreground space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-foreground text-xs">
          <Shield className="size-3.5 text-primary" /> Institutional Passkey Architecture
        </div>
        <p className="leading-relaxed">
          Passkey authentication relies on asymmetric public-key cryptography (W3C WebAuthn). Your device generates a unique private key stored inside its Secure Enclave / TPM chip, and only the corresponding public key is registered with KPRCAS DSIM. Biometric templates never leave your personal device.
        </p>
      </div>

      {/* ==================== MODAL: REGISTER PASSKEY ==================== */}
      <Dialog open={showRegisterModal} onOpenChange={setShowRegisterModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                <Fingerprint className="size-5" />
              </span>
              <DialogTitle className="text-base">
                {isBackupDevice ? "Enroll Backup Security Key" : "Register Passkey / Device Unlock"}
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs">
              {regStep === "reauth" && "Confirm your identity before adding a new authentication passkey."}
              {regStep === "device_prompt" && "Complete the biometric or device challenge on your hardware."}
              {regStep === "success" && "Your passkey has been verified and enrolled."}
            </DialogDescription>
          </DialogHeader>

          {regError && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive flex items-start gap-2">
              <AlertTriangle className="size-4 shrink-0 mt-0.5" />
              <span>{regError}</span>
            </div>
          )}

          {regStep === "reauth" && (
            <form onSubmit={handleReauthSubmit} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="pk-name" className="text-xs font-semibold">
                  Device / Authenticator Name
                </Label>
                <Input
                  id="pk-name"
                  type="text"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  placeholder="e.g. Work Laptop (Windows Hello)"
                  className="text-xs"
                  required
                />
                <p className="text-[0.68rem] text-muted-foreground">
                  Give this device an identifiable name to easily manage it later.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pk-pw" className="text-xs font-semibold">
                  Re-enter Account Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 size-3.5 text-muted-foreground" />
                  <Input
                    id="pk-pw"
                    type="password"
                    value={reauthPassword}
                    onChange={(e) => setReauthPassword(e.target.value)}
                    placeholder="Enter password to authorize"
                    className="pl-9 text-xs"
                    autoFocus
                    required
                  />
                </div>
                <p className="text-[0.68rem] text-muted-foreground">
                  Security policy requires step-up re-authentication before registering new credentials.
                </p>
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowRegisterModal(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={registering}
                  className="text-xs bg-primary hover:bg-primary/90"
                >
                  {registering ? "Authorizing..." : "Continue to Device Prompt →"}
                </Button>
              </DialogFooter>
            </form>
          )}

          {regStep === "device_prompt" && (
            <div className="space-y-4 py-4 text-center">
              <div className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary mx-auto animate-pulse">
                <Fingerprint className="size-8" />
              </div>
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-foreground">Waiting for device response</h5>
                <p className="text-[0.72rem] text-muted-foreground max-w-xs mx-auto">
                  When prompted by your operating system, scan your face (Face ID / Windows Hello), touch your fingerprint sensor, or enter your device security PIN.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => triggerNativeRegistration()}
                  disabled={registering}
                  className="text-xs gap-1.5"
                >
                  <RotateCw className="size-3" /> Retry Device Prompt
                </Button>
              </div>
            </div>
          )}

          {regStep === "success" && (
            <div className="space-y-4 py-4 text-center">
              <div className="grid size-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 mx-auto">
                <CheckCircle2 className="size-8" />
              </div>
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-foreground">Passkey Enrolled!</h5>
                <p className="text-[0.72rem] text-muted-foreground">
                  "{deviceName}" is now configured for your {user.role} institutional account.
                </p>
              </div>

              <DialogFooter className="pt-2 justify-center sm:justify-center">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setShowRegisterModal(false)}
                  className="text-xs bg-primary hover:bg-primary/90"
                >
                  Done
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ==================== MODAL: RENAME PASSKEY ==================== */}
      <Dialog open={Boolean(editingPasskey)} onOpenChange={(v) => !v && setEditingPasskey(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm">Rename Passkey Device</DialogTitle>
            <DialogDescription className="text-xs">
              Update the friendly label for this passkey device.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRenameSubmit} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Device Name</Label>
              <Input
                type="text"
                value={newDeviceName}
                onChange={(e) => setNewDeviceName(e.target.value)}
                className="text-xs"
                autoFocus
                required
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setEditingPasskey(null)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="text-xs bg-primary hover:bg-primary/90">
                Save Name
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ==================== MODAL: REVOKE PASSKEY ==================== */}
      <Dialog open={Boolean(revokingPasskey)} onOpenChange={(v) => !v && setRevokingPasskey(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 text-destructive mb-1">
              <AlertTriangle className="size-5" />
              <DialogTitle className="text-sm">Revoke Passkey Credential?</DialogTitle>
            </div>
            <DialogDescription className="text-xs">
              Are you sure you want to revoke <strong>"{revokingPasskey?.name}"</strong>?
            </DialogDescription>
          </DialogHeader>

          {revokeError && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive">
              {revokeError}
            </div>
          )}

          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-[0.72rem] text-amber-700 dark:text-amber-300">
            Once revoked, this device will no longer be able to authenticate. If you lose all passkeys, you must use the institutional password fallback or contact the DSIM administrator.
          </div>

          <form onSubmit={handleRevokeSubmit} className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                Confirm Account Password to Revoke
              </Label>
              <Input
                type="password"
                value={revokePassword}
                onChange={(e) => setRevokePassword(e.target.value)}
                placeholder="Enter password"
                className="text-xs"
                autoFocus
                required
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setRevokingPasskey(null)}
                className="text-xs"
              >
                Keep Passkey
              </Button>
              <Button
                type="submit"
                variant="destructive"
                size="sm"
                disabled={loading}
                className="text-xs"
              >
                {loading ? "Revoking..." : "Permanently Revoke Passkey"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
