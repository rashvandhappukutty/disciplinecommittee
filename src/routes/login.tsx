import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useDsim } from "@/lib/dsim/store";
import { INSTITUTION } from "@/lib/dsim/institution";
import { passkeyClient, type DeviceBiometricStatus } from "@/lib/dsim/passkeyClient";
import type { AuthUser } from "@/lib/dsim/types";
import {
  Fingerprint,
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Shield,
  Mic,
  AlertCircle,
  KeyRound,
  ExternalLink,
  Laptop,
  CheckCircle2,
  LifeBuoy,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: `Sign in — ${INSTITUTION.shortName} ${INSTITUTION.systemName} Staff Portal` },
      { name: "description", content: `Confidential case workspace for ${INSTITUTION.name}.` },
      { property: "og:title", content: `${INSTITUTION.shortName} DSIM — Staff Portal` },
      { property: "og:description", content: `Confidential case workspace for ${INSTITUTION.name}.` },
    ],
  }),
  component: LoginPage,
});

// The exactly four authorized staff accounts
const STAFF_ACCOUNTS = [
  {
    role: "Principal",
    email: "principal@kprcas.ac.in",
    label: "🏛️ Principal",
    fallbackPassword: "principal@2026",
  },
  {
    role: "Administrative Officer",
    email: "ao@kprcas.ac.in",
    label: "📋 Administrative Officer (AO)",
    fallbackPassword: "ao@2026",
  },
  {
    role: "Committee Head",
    email: "discipline.head@kprcas.ac.in",
    label: "🎓 Discipline Committee Head",
    fallbackPassword: "committee@2026",
  },
  {
    role: "Disciplinary Board Member",
    email: "committee.member@kprcas.ac.in",
    label: "⚖️ Disciplinary Board Member",
    fallbackPassword: "board@2026",
  },
] as const;

function LoginPage() {
  const { login } = useDsim();
  const navigate = useNavigate();

  // Mode: "passkey" (primary) vs "fallback" (password-based fallback)
  const [authMode, setAuthMode] = useState<"passkey" | "fallback">("passkey");

  // Selected staff email (defaulting to Committee Head)
  const [email, setEmail] = useState("discipline.head@kprcas.ac.in");

  // Fallback credentials
  const [password, setPassword] = useState("committee@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Device capabilities state
  const [capabilities, setCapabilities] = useState<DeviceBiometricStatus | null>(null);

  // Status & error state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState<number | null>(null);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);

  useEffect(() => {
    passkeyClient.checkDeviceCapabilities().then(setCapabilities);
  }, []);

  // Update password field when selecting a quick role
  const handleSelectStaffRole = (staffEmail: string, defaultPw: string) => {
    setEmail(staffEmail);
    setPassword(defaultPw);
    setError("");
  };

  /**
   * PRIMARY LOGIN FLOW: WebAuthn Passkey Authentication (Requirement 2)
   */
  const handlePasskeyLogin = async (overrideEmail?: string) => {
    setError("");
    const targetEmail = overrideEmail || email.trim();

    if (!targetEmail || !targetEmail.includes("@")) {
      setError("Please enter a valid institutional staff email address.");
      return;
    }

    setLoading(true);

    try {
      // 1. Trigger WebAuthn authentication via device
      const res = await passkeyClient.loginWithPasskey(targetEmail);
      setLoading(false);

      if (res.success && res.user) {
        // 2. Load staff member's role and permissions into session
        login(res.user);
        toast.success(`Identity Verified: Welcome, ${res.user.displayName}`, {
          description: `Authenticated via WebAuthn Passkey. Active Role: ${res.user.role}`,
        });
        // 3. User enters the appropriate dashboard
        navigate({ to: "/dashboard" });
      } else {
        setError(res.error || "Passkey authentication failed.");
        if (res.isRateLimited && res.retryAfterSeconds) {
          triggerCooldown(res.retryAfterSeconds);
        }
      }
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || "Unexpected authentication error. Please try password fallback.");
    }
  };

  /**
   * 1-Click Discoverable Passkey Login (Usernameless)
   */
  const handleDiscoverablePasskeyLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await passkeyClient.loginWithPasskey(undefined);
      setLoading(false);

      if (res.success && res.user) {
        login(res.user);
        toast.success(`Identity Verified: Welcome, ${res.user.displayName}`, {
          description: `Authenticated via Passkey. Active Role: ${res.user.role}`,
        });
        navigate({ to: "/dashboard" });
      } else {
        setError(res.error || "Passkey authentication failed.");
        if (res.isRateLimited && res.retryAfterSeconds) {
          triggerCooldown(res.retryAfterSeconds);
        }
      }
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || "Passkey authentication error.");
    }
  };

  /**
   * SECURE FALLBACK: Password-based Sign-in (Requirement 5)
   */
  const handleFallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter your institutional email address.");
      return;
    }
    if (password.length < 4) {
      setError("Password must contain at least 4 characters.");
      return;
    }

    setLoading(true);
    const res = await passkeyClient.loginWithPasswordFallback(email, password);
    setLoading(false);

    if (res.success && res.user) {
      login(res.user);
      toast.info(`Signed in via Institutional Fallback`, {
        description: `Welcome ${res.user.displayName}. Please register a passkey in Security Settings when biometrics are restored.`,
      });
      navigate({ to: "/dashboard" });
    } else {
      setError(res.error || "Invalid institutional password.");
      if (res.isRateLimited && res.retryAfterSeconds) {
        triggerCooldown(res.retryAfterSeconds);
      }
    }
  };

  const triggerCooldown = (seconds: number) => {
    setCooldown(seconds);
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (!prev || prev <= 1) {
          clearInterval(interval);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left side: Premium KPRCAS DSIM Branding & Legal Graphics */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/70 p-10 lg:flex text-slate-900 border-r border-border">
        {/* Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

        <div className="relative z-10 flex items-center justify-between">
          <img
            src={INSTITUTION.logoUrl}
            alt={INSTITUTION.name}
            className="h-16 sm:h-20 w-auto object-contain"
          />
          <div className="flex items-center gap-1.5 rounded-full border border-blue-900/20 bg-blue-900/5 px-3.5 py-1.5 font-mono text-[0.72rem] text-blue-950 backdrop-blur shadow-sm">
            <span className="size-2 rounded-full bg-emerald-600 animate-pulse" /> {INSTITUTION.shortName} JUDICIAL ACCESS
          </div>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg my-auto py-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1 text-xs text-emerald-800 font-mono border border-emerald-300">
              <Shield className="size-3.5 text-emerald-600" /> {INSTITUTION.shortName} Official Disciplinary Workspace
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 leading-tight">
              Investigate, document, and track disciplinary cases securely.
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {INSTITUTION.description} {INSTITUTION.systemName} provides the Discipline Committee with high-fidelity investigation interview audio recording, AI-assisted voice synopsis generation, structured evidence custody, and hardware-bound WebAuthn passkey security.
            </p>
          </div>

          {/* Feature Highlights Card */}
          <div className="grid grid-cols-2 gap-3 pt-2 font-sans text-xs">
            <div className="rounded-xl border border-slate-200/90 bg-white/90 p-3.5 shadow-sm backdrop-blur">
              <Mic className="size-4 text-emerald-600 mb-2" />
              <div className="font-semibold text-slate-900">Hearing & Interview Audio</div>
              <div className="text-[0.7rem] text-slate-500 mt-0.5">Live audio capture & automated speech synopsis</div>
            </div>
            <div className="rounded-xl border border-slate-200/90 bg-white/90 p-3.5 shadow-sm backdrop-blur">
              <Fingerprint className="size-4 text-emerald-600 mb-2" />
              <div className="font-semibold text-slate-900">WebAuthn / Passkey Auth</div>
              <div className="text-[0.7rem] text-slate-500 mt-0.5">Native Face ID, Windows Hello & Fingerprint unlock</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500 font-mono">
          <span>{INSTITUTION.shortName} {INSTITUTION.systemName} Secure Core v3.0.0</span>
          <a
            href={INSTITUTION.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-primary transition-colors"
          >
            {INSTITUTION.website.replace("https://", "").replace("/", "")} <ExternalLink className="size-3" />
          </a>
        </div>
      </div>

      {/* Right side: Login Card */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
              {INSTITUTION.shortName} Staff Portal
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {authMode === "passkey" ? "Passkey Sign In" : "Institutional Password Fallback"}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {authMode === "passkey"
                ? "Authenticate using Face ID, Windows Hello, fingerprint, or device PIN."
                : "Secure fallback when biometric hardware is unavailable or in repair."}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 rounded-xl bg-muted/60 p-1 text-xs font-medium border border-border">
            <button
              type="button"
              onClick={() => {
                setAuthMode("passkey");
                setError("");
              }}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
                authMode === "passkey"
                  ? "bg-background text-foreground font-semibold shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Fingerprint className="size-4 text-primary" />
              <span>Passkey / Face Unlock</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("fallback");
                setError("");
              }}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
                authMode === "fallback"
                  ? "bg-background text-foreground font-semibold shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <KeyRound className="size-4 text-muted-foreground" />
              <span>Password Fallback</span>
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Rate Limit Cooldown Notice */}
          {cooldown !== null && (
            <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300">
              <AlertCircle className="size-4 shrink-0" />
              <span>Rate limit active: Please wait <strong>{cooldown}s</strong> before retrying.</span>
            </div>
          )}

          {/* 4 Staff Role Presets (Requirement 3: Exactly four staff accounts) */}
          <div className="space-y-1.5">
            <Label className="text-[0.72rem] font-semibold text-muted-foreground flex items-center justify-between">
              <span>Select Authorized Staff Account:</span>
              <span className="text-[0.65rem] font-mono text-primary">Exactly 4 Staff Roles</span>
            </Label>
            <div className="grid grid-cols-2 gap-1.5 text-[0.68rem]">
              {STAFF_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleSelectStaffRole(acc.email, acc.fallbackPassword)}
                  className={`rounded-md border p-2 text-left font-medium transition-colors ${
                    email === acc.email
                      ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/30"
                      : "border-border bg-card/60 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <div className="truncate">{acc.label}</div>
                  <div className="text-[0.62rem] font-mono text-muted-foreground truncate opacity-85">
                    {acc.email}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* MODE 1: PRIMARY PASSKEY / BIOMETRIC AUTHENTICATION (Requirement 2) */}
          {authMode === "passkey" && (
            <div className="surface p-6 sm:p-7 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="passkey-email" className="text-xs font-semibold">
                  Institutional Staff Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="passkey-email"
                    type="email"
                    placeholder="discipline.head@kprcas.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 text-xs"
                    required
                  />
                </div>
              </div>

              {/* Native Biometric Hardware Detection Badge */}
              <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-xs flex items-center gap-2.5">
                <div className="grid size-7 shrink-0 place-items-center rounded bg-primary/10 text-primary">
                  <Fingerprint className="size-4" />
                </div>
                <div className="min-w-0 text-[0.7rem] text-muted-foreground">
                  Detected hardware capability:{" "}
                  <strong className="text-foreground">
                    {capabilities?.biometricLabel || "Face ID / Windows Hello / Device PIN"}
                  </strong>
                </div>
              </div>

              {/* Primary Passkey Action Button */}
              <Button
                type="button"
                onClick={() => handlePasskeyLogin()}
                disabled={loading || cooldown !== null}
                className="w-full text-xs font-semibold bg-primary hover:bg-primary/90 h-10 gap-2 shadow-sm"
              >
                <Fingerprint className="size-4" />
                {loading ? "Authenticating Device..." : `Sign In with Passkey / Face Unlock`}
              </Button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-[0.65rem] uppercase">
                  <span className="bg-card px-2 text-muted-foreground font-mono">Or</span>
                </div>
              </div>

              {/* Instant Discoverable Passkey Button (Auto-detects credential on hardware) */}
              <Button
                type="button"
                variant="outline"
                onClick={handleDiscoverablePasskeyLogin}
                disabled={loading || cooldown !== null}
                className="w-full text-xs gap-2 h-9"
              >
                <Laptop className="size-3.5 text-muted-foreground" />
                Auto-Detect Enrolled Hardware Device
              </Button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("fallback");
                    setError("");
                  }}
                  className="text-[0.72rem] text-primary hover:underline font-medium inline-flex items-center gap-1"
                >
                  <KeyRound className="size-3" /> Biometrics not working? Switch to Password Fallback →
                </button>
              </div>
            </div>
          )}

          {/* MODE 2: SECURE INSTITUTIONAL FALLBACK (Requirement 5) */}
          {authMode === "fallback" && (
            <form onSubmit={handleFallbackSubmit} className="surface p-6 sm:p-7 space-y-4">
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-[0.72rem] text-amber-700 dark:text-amber-300 space-y-1">
                <div className="font-semibold flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="size-3.5" /> Institutional Fallback Policy
                </div>
                <p className="leading-relaxed">
                  Use this fallback only when your passkey device or biometric hardware is temporarily unavailable. Access is audited and rate-limited.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fb-email" className="text-xs font-semibold">
                  Institutional Staff Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="fb-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 text-xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="fb-pw" className="text-xs font-semibold">
                    Account Password
                  </Label>
                  <button
                    type="button"
                    onClick={() => setShowRecoveryModal(true)}
                    className="text-[0.7rem] text-primary hover:underline"
                  >
                    Lost passkey device?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="fb-pw"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-9 text-xs"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-xs font-medium leading-none cursor-pointer text-muted-foreground"
                  >
                    Remember my staff session
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || cooldown !== null}
                className="w-full text-xs font-semibold bg-primary hover:bg-primary/90 h-10 mt-1"
              >
                {loading ? "Verifying Credentials..." : "Sign In via Password Fallback →"}
              </Button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("passkey");
                    setError("");
                  }}
                  className="text-[0.72rem] text-muted-foreground hover:text-foreground font-medium inline-flex items-center gap-1"
                >
                  ← Return to Passkey Sign In
                </button>
              </div>
            </form>
          )}

          {/* Quick Mock Role Login Options for Development Testing */}
          <div className="rounded-xl border border-border bg-card/60 p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between text-[0.72rem] font-semibold text-muted-foreground">
              <span>Quick Development Passkey Test</span>
              <span className="font-mono text-[0.65rem] px-1.5 py-0.5 rounded bg-secondary">4 Staff Roles</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  handleSelectStaffRole("principal@kprcas.ac.in", "principal@2026");
                  handlePasskeyLogin("principal@kprcas.ac.in");
                }}
                className="h-7 text-[0.68rem] justify-start px-2 font-medium truncate"
              >
                🏛️ Principal Passkey
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  handleSelectStaffRole("ao@kprcas.ac.in", "ao@2026");
                  handlePasskeyLogin("ao@kprcas.ac.in");
                }}
                className="h-7 text-[0.68rem] justify-start px-2 font-medium truncate"
              >
                📋 AO Passkey
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  handleSelectStaffRole("discipline.head@kprcas.ac.in", "committee@2026");
                  handlePasskeyLogin("discipline.head@kprcas.ac.in");
                }}
                className="h-7 text-[0.68rem] justify-start px-2 font-medium truncate"
              >
                🎓 Head Passkey
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  handleSelectStaffRole("committee.member@kprcas.ac.in", "board@2026");
                  handlePasskeyLogin("committee.member@kprcas.ac.in");
                }}
                className="h-7 text-[0.68rem] justify-start px-2 font-medium truncate"
              >
                ⚖️ Board Member Passkey
              </Button>
            </div>
          </div>

          {/* Footer & Student Portal Link (Requirement 3: Keep student portal separate) */}
          <div className="text-center space-y-2 pt-2 border-t border-border">
            <p className="text-[0.72rem] text-muted-foreground">
              Institutional Access · Authorized credentials and FIDO2 passkeys required.
            </p>
            <div>
              <Link
                to="/student/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                Student Complaint & Reporting Portal →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lost Device / Passkey Recovery Dialog (Requirement 5) */}
      {showRecoveryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
                <LifeBuoy className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Lost Device & Passkey Recovery</h3>
                <p className="text-[0.68rem] text-muted-foreground">Institution-Approved Security Process</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              If your primary device (laptop, phone, or hardware security key) has been lost, damaged, or compromised, follow the institutional recovery workflow:
            </p>

            <div className="rounded-lg bg-muted/40 p-3 text-xs space-y-2 border border-border/70">
              <div className="flex items-start gap-2">
                <span className="font-mono text-primary font-bold">1.</span>
                <span className="text-[0.72rem] text-foreground">
                  Sign in using your institutional password on this secure terminal.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono text-primary font-bold">2.</span>
                <span className="text-[0.72rem] text-foreground">
                  Navigate to <strong>Profile → Security & Passkey Access</strong> and immediately <strong>Revoke</strong> the lost passkey.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono text-primary font-bold">3.</span>
                <span className="text-[0.72rem] text-foreground">
                  Enroll your replacement device or hardware security key.
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-primary/5 p-3 text-xs space-y-1 border border-primary/20">
              <span className="font-semibold text-foreground block text-[0.72rem]">Campus IT & Security Desk</span>
              <span className="text-[0.68rem] text-muted-foreground block">Email: security@kprcas.ac.in</span>
              <span className="text-[0.68rem] text-muted-foreground block">Emergency Hotline: 0422-2635600 (Ext. 101)</span>
            </div>

            <Button
              className="w-full text-xs"
              onClick={() => setShowRecoveryModal(false)}
            >
              Understood
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
