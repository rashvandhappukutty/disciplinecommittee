import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OtpInput } from "./OtpInput";
import { twoFactorService } from "@/lib/dsim/twoFactorService";
import type { AuthUser, TwoFactorSetupData } from "@/lib/dsim/types";
import {
  ShieldCheck,
  QrCode,
  Key,
  Copy,
  Check,
  Download,
  AlertTriangle,
  Lock,
  Smartphone,
  FileText,
  RotateCw,
} from "lucide-react";
import { toast } from "sonner";

interface TwoFactorSetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: AuthUser;
  onSuccess?: () => void;
}

export function TwoFactorSetupModal({
  open,
  onOpenChange,
  user,
  onSuccess,
}: TwoFactorSetupModalProps) {
  const [step, setStep] = useState<"password" | "scan" | "verify" | "recovery">("password");
  const [password, setPassword] = useState("");
  const [setupData, setSetupData] = useState<TwoFactorSetupData | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCodes, setCopiedCodes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = () => {
    setStep("password");
    setPassword("");
    setOtpCode("");
    setError("");
    setSetupData(null);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 4) {
      setError("Please enter your current account password to proceed.");
      return;
    }
    setError("");
    setLoading(true);

    setTimeout(() => {
      const data = twoFactorService.generateSetupData(user);
      setSetupData(data);
      setLoading(false);
      setStep("scan");
    }, 300);
  };

  const handleCopyKey = () => {
    if (setupData?.manualSetupKey) {
      navigator.clipboard.writeText(setupData.manualSetupKey.replace(/\s+/g, ""));
      setCopiedKey(true);
      toast.success("Setup key copied to clipboard");
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleVerifySetup = async () => {
    if (!setupData || otpCode.length !== 6) {
      setError("Please enter the 6-digit verification code from your authenticator app.");
      return;
    }

    setLoading(true);
    setError("");

    const res = await twoFactorService.enableTwoFactor(
      user.id,
      setupData.secret,
      otpCode,
      setupData.recoveryCodes
    );

    setLoading(false);

    if (res.success) {
      toast.success("Two-Factor Authentication Enabled Successfully!");
      setStep("recovery");
      onSuccess?.();
    } else {
      setError(res.error || "Invalid code. Please check your authenticator app.");
    }
  };

  const handleCopyRecoveryCodes = () => {
    if (setupData?.recoveryCodes) {
      navigator.clipboard.writeText(setupData.recoveryCodes.join("\n"));
      setCopiedCodes(true);
      toast.success("Recovery codes copied to clipboard");
      setTimeout(() => setCopiedCodes(false), 2000);
    }
  };

  const handleDownloadCodes = () => {
    if (!setupData?.recoveryCodes) return;
    const content = `DSIM INSTITUTIONAL PORTAL — TWO-FACTOR RECOVERY CODES\nAccount: ${user.email} (${user.role})\nGenerated: ${new Date().toLocaleString()}\n\nEach recovery code can be used ONLY ONCE to sign in if you lose access to your authenticator app:\n\n` +
      setupData.recoveryCodes.map((c: string, i: number) => `${i + 1}. ${c}`).join("\n") +
      `\n\nStore these codes in a secure, confidential place.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dsim-recovery-codes-${user.role.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Recovery codes file downloaded");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) handleReset();
        onOpenChange(v);
      }}
    >
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </span>
            <DialogTitle className="text-base sm:text-lg">
              {step === "recovery"
                ? "Save Your Recovery Codes"
                : "Set Up Two-Factor Authentication"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs">
            {step === "password" && "Confirm your password to initiate authenticator enrollment."}
            {step === "scan" && "Scan the QR code with Google Authenticator, Microsoft Authenticator, or Authy."}
            {step === "verify" && "Enter the 6-digit code shown in your authenticator app."}
            {step === "recovery" && "Save these single-use recovery codes in case you lose access to your device."}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive flex items-start gap-2">
            <AlertTriangle className="size-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: PASSWORD CONFIRMATION */}
        {step === "password" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs">Account Password</Label>
              <div className="relative">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="text-xs pl-8"
                  autoFocus
                />
                <Lock className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
              </div>
              <p className="text-[0.7rem] text-muted-foreground">
                Re-authenticating ensures only authorized personnel modify 2FA settings.
              </p>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={loading}
                className="text-xs bg-primary hover:bg-primary/90"
              >
                {loading ? "Verifying..." : "Continue →"}
              </Button>
            </DialogFooter>
          </form>
        )}

        {/* STEP 2: SCAN QR CODE & MANUAL KEY */}
        {step === "scan" && setupData && (
          <div className="space-y-4 py-2 text-xs">
            <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-border bg-card p-4">
              {/* Visual Simulated QR Code Box */}
              <div className="grid size-36 shrink-0 place-items-center rounded-xl bg-white p-2 shadow-inner border border-slate-200 text-slate-900">
                <div className="relative grid size-32 place-items-center bg-[radial-gradient(#0f172a_2px,transparent_2px)] [background-size:8px_8px] rounded-lg border-2 border-slate-900">
                  <div className="absolute top-1.5 left-1.5 size-7 rounded border-2 border-slate-900 bg-slate-900 flex items-center justify-center">
                    <div className="size-3 bg-white rounded-xs" />
                  </div>
                  <div className="absolute top-1.5 right-1.5 size-7 rounded border-2 border-slate-900 bg-slate-900 flex items-center justify-center">
                    <div className="size-3 bg-white rounded-xs" />
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 size-7 rounded border-2 border-slate-900 bg-slate-900 flex items-center justify-center">
                    <div className="size-3 bg-white rounded-xs" />
                  </div>
                  <Smartphone className="size-6 text-slate-900" />
                </div>
              </div>

              <div className="space-y-2 text-left min-w-0 flex-1">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <QrCode className="size-4 text-primary" />
                  <span>Scan using Authenticator App</span>
                </div>
                <p className="text-[0.72rem] text-muted-foreground leading-relaxed">
                  Open Google Authenticator, Microsoft Authenticator, or Authy on your mobile device and scan the QR code.
                </p>

                <div className="pt-1">
                  <span className="text-[0.68rem] text-muted-foreground block mb-1">
                    Can't scan QR? Enter setup key manually:
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[0.7rem] bg-muted px-2.5 py-1.5 rounded-lg border border-border/80">
                    <span className="truncate select-all text-foreground font-semibold">
                      {setupData.manualSetupKey}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyKey}
                      className="ml-auto text-muted-foreground hover:text-foreground shrink-0"
                      title="Copy Key"
                    >
                      {copiedKey ? (
                        <Check className="size-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setStep("password")}
                className="text-xs"
              >
                Back
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => setStep("verify")}
                className="text-xs bg-primary hover:bg-primary/90"
              >
                Next: Enter 6-Digit Code →
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* STEP 3: ENTER OTP CODE */}
        {step === "verify" && (
          <div className="space-y-4 py-3 text-center">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-foreground">
                Enter the 6-digit code shown in your app
              </span>
              <p className="text-[0.7rem] text-muted-foreground">
                Codes refresh every 30 seconds.
              </p>
            </div>

            <div className="py-2">
              <OtpInput
                value={otpCode}
                onChange={setOtpCode}
                onComplete={handleVerifySetup}
                hasError={Boolean(error)}
              />
            </div>

            <div className="rounded-lg bg-muted/40 p-2.5 text-[0.7rem] text-muted-foreground">
              💡 Development Demo Code: <strong className="text-foreground">123456</strong>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setStep("scan")}
                className="text-xs"
              >
                Back to QR Code
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={loading || otpCode.length !== 6}
                onClick={handleVerifySetup}
                className="text-xs bg-primary hover:bg-primary/90"
              >
                {loading ? "Verifying..." : "Verify & Enable 2FA"}
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* STEP 4: RECOVERY CODES */}
        {step === "recovery" && setupData && (
          <div className="space-y-4 py-2 text-xs">
            <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-[0.72rem] text-amber-700 dark:text-amber-300 flex items-start gap-2">
              <AlertTriangle className="size-4 shrink-0 mt-0.5" />
              <span>
                Save these 8 recovery codes in a safe place. If you lose access to your authenticator app, each code can be used once to access your account.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-xs p-3.5 rounded-xl border border-border bg-muted/40 text-center font-bold">
              {setupData.recoveryCodes.map((code: string, idx: number) => (
                <div key={idx} className="p-1.5 rounded bg-background border border-border/80 select-all">
                  {code}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopyRecoveryCodes}
                  className="text-xs gap-1.5 h-8"
                >
                  {copiedCodes ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                  Copy All
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadCodes}
                  className="text-xs gap-1.5 h-8"
                >
                  <Download className="size-3" /> Download .txt
                </Button>
              </div>

              <Button
                type="button"
                size="sm"
                onClick={() => {
                  onOpenChange(false);
                  handleReset();
                }}
                className="text-xs bg-primary hover:bg-primary/90 h-8 ml-auto"
              >
                I've Saved Them
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
