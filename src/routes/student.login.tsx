import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { OtpInput } from "@/components/dsim/OtpInput";
import { twoFactorService } from "@/lib/dsim/twoFactorService";
import { useDsim } from "@/lib/dsim/store";
import { INSTITUTION } from "@/lib/dsim/institution";
import type { AuthUser } from "@/lib/dsim/types";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Shield,
  FileCheck,
  HelpCircle,
  AlertCircle,
  KeyRound,
  GraduationCap,
  Smartphone,
  ArrowLeft,
  LifeBuoy,
  Building2,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/student/login")({
  head: () => ({
    meta: [
      { title: `${INSTITUTION.shortName} Student Portal — ${INSTITUTION.systemName} Grievance & Reporting` },
      { name: "description", content: `Submit and track disciplinary complaints securely through the ${INSTITUTION.shortName} student portal.` },
      { property: "og:title", content: `${INSTITUTION.shortName} Student Portal — DSIM` },
      { property: "og:description", content: `Submit and track disciplinary complaints securely through the ${INSTITUTION.shortName} student portal.` },
    ],
  }),
  component: StudentLoginPage,
});

function StudentLoginPage() {
  const { studentLogin } = useDsim();
  const navigate = useNavigate();

  // Stage: "credentials" | "otp" | "recovery"
  const [stage, setStage] = useState<"credentials" | "otp" | "recovery">("credentials");

  const [identifier, setIdentifier] = useState("22CS089"); // Roll number or email
  const [password, setPassword] = useState("student@kpr");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [trustDevice, setTrustDevice] = useState(false);

  // OTP state
  const [otpCode, setOtpCode] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [tempUser, setTempUser] = useState<AuthUser | null>(null);
  const [tempToken, setTempToken] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState<number | null>(null);
  const [forgotModal, setForgotModal] = useState(false);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = identifier.trim();
    if (!trimmed) {
      setError("Please enter your College Email or Student Roll Number.");
      return;
    }
    if (password.length < 4) {
      setError("Password must contain at least 4 characters.");
      return;
    }

    setLoading(true);

    const res = await twoFactorService.loginCredentials(trimmed, password);
    setLoading(false);

    if (res.success && res.user && res.tempToken) {
      setTempUser(res.user);
      setTempToken(res.tempToken);
      setOtpCode("");
      setStage("otp");
      toast.info("Password Verified", {
        description: "Please enter the 6-digit code from your authenticator app.",
      });
    } else {
      setError(res.error || "Invalid student credentials.");
    }
  };

  const handleOtpSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!tempUser || !tempToken) return;

    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    setError("");
    setLoading(true);

    const res = await twoFactorService.verifyTotp(tempToken, otpCode, tempUser);
    setLoading(false);

    if (res.success && res.user) {
      studentLogin(tempUser.email || identifier);
      toast.success("Welcome back!", {
        description: `Two-Factor Identity Verified: ${res.user.displayName}`,
      });
      navigate({ to: "/student/dashboard" });
    } else {
      setError(res.error || "Invalid verification code.");
      if (res.isRateLimited && res.retryAfterSeconds) {
        setCooldown(res.retryAfterSeconds);
        const timer = setInterval(() => {
          setCooldown((prev) => {
            if (!prev || prev <= 1) {
              clearInterval(timer);
              return null;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }
  };

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempUser || !tempToken) return;

    if (recoveryCode.trim().length < 6) {
      setError("Please enter a valid 8-character recovery code (e.g. A8K2-P7Q9).");
      return;
    }

    setError("");
    setLoading(true);

    const res = await twoFactorService.verifyRecoveryCode(tempToken, recoveryCode, tempUser);
    setLoading(false);

    if (res.success && res.user) {
      studentLogin(tempUser.email || identifier);
      toast.success("Welcome back!", {
        description: "Authenticated via single-use emergency recovery code.",
      });
      navigate({ to: "/student/dashboard" });
    } else {
      setError(res.error || "Invalid or previously used recovery code.");
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const res = await twoFactorService.loginCredentials("kavitha.cs22@kprcas.ac.in", "google-sso");
    setLoading(false);

    if (res.success && res.user && res.tempToken) {
      setTempUser(res.user);
      setTempToken(res.tempToken);
      setStage("otp");
      toast.info("Google Identity Authenticated", {
        description: "Two-Factor Verification code required.",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel / Hero */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-sidebar p-12 text-sidebar-foreground border-r border-sidebar-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div>
          <img
            src={INSTITUTION.logoUrl}
            alt={INSTITUTION.name}
            className="h-16 w-auto object-contain brightness-0 invert mb-8"
          />
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-6">
            <GraduationCap className="size-3.5" />
            <span>{INSTITUTION.shortName} Student Disciplinary & Grievance Portal</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A safe, confidential voice for every {INSTITUTION.shortName} student.
          </h1>
          <p className="mt-4 text-sm text-sidebar-foreground/80 leading-relaxed max-w-md">
            {INSTITUTION.description} Submit confidential complaints, track investigation milestones in real-time, communicate directly with the Discipline Committee, and protect your student profile with 2FA authenticator security.
          </p>


          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-4">
              <ShieldCheck className="size-5 text-primary mb-2" />
              <div className="text-xs font-semibold text-white">Full Confidentiality</div>
              <div className="text-[0.7rem] text-sidebar-foreground/70 mt-0.5">
                Optional anonymous mode protected by strict institutional firewalls
              </div>
            </div>
            <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-4">
              <FileCheck className="size-5 text-primary mb-2" />
              <div className="text-xs font-semibold text-white">Live Tracking & 2FA</div>
              <div className="text-[0.7rem] text-sidebar-foreground/70 mt-0.5">
                Multi-factor authentication protecting your sensitive grievance records
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-sidebar-foreground/60 border-t border-sidebar-border/40 pt-4 font-mono">
          <span>{INSTITUTION.shortName} {INSTITUTION.systemName} Student Gateway v2.6.4</span>
          <a
            href={INSTITUTION.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            {INSTITUTION.website.replace("https://", "").replace("/", "")} <ExternalLink className="size-3" />
          </a>
        </div>
      </div>

      {/* Right panel / Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="lg:hidden flex items-center gap-3 mb-4">
            <img src={INSTITUTION.logoUrl} alt={INSTITUTION.shortName} className="h-10 w-auto" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {INSTITUTION.shortName} Student Portal
            </span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              {INSTITUTION.shortName} Student Portal
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {stage === "credentials" ? "Student Sign In" : "Verify Your Identity"}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              {stage === "credentials"
                ? `Submit and track student complaints securely through the ${INSTITUTION.shortName} disciplinary and grievance management system.`
                : stage === "otp"
                ? "Enter the 6-digit verification code from your authenticator app."
                : "Enter an unused emergency recovery code."}
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {cooldown !== null && (
            <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300">
              <AlertCircle className="size-4 shrink-0" />
              <span>Rate limit active: Please wait <strong>{cooldown}s</strong> before retrying.</span>
            </div>
          )}

          {/* STAGE 1: CREDENTIALS */}
          {stage === "credentials" && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="space-y-1.5">
                <Label htmlFor="stu-ident" className="text-xs font-semibold">
                  College Email or Student Roll Number
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="stu-ident"
                    type="text"
                    placeholder="e.g. 22CS089 or student@kprcas.ac.in"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="pl-9 text-xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="stu-pw" className="text-xs font-semibold">
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={() => setForgotModal(true)}
                    className="text-[0.7rem] text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="stu-pw"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-9 text-xs"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="stu-rem"
                    checked={rememberMe}
                    onCheckedChange={(c) => setRememberMe(!!c)}
                  />
                  <label htmlFor="stu-rem" className="text-xs text-muted-foreground cursor-pointer">
                    Remember my credentials
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full text-xs bg-primary hover:bg-primary/90 font-semibold"
              >
                {loading ? "Verifying Credentials..." : "Continue to 2FA Verification →"}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-[0.65rem] uppercase">
                  <span className="bg-card px-2 text-muted-foreground font-mono">
                    Or sign in with
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full text-xs gap-2"
              >
                <svg className="size-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Institutional Google SSO
              </Button>
            </form>
          )}

          {/* STAGE 2: TOTP OTP CODE */}
          {stage === "otp" && (
            <div className="space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-primary flex items-center gap-3">
                <Smartphone className="size-5 shrink-0" />
                <div className="min-w-0 flex-1 text-[0.72rem]">
                  Signing in as Student <strong className="text-foreground">{tempUser?.displayName || identifier}</strong> ({tempUser?.studentId || identifier})
                </div>
              </div>

              <div className="space-y-2 text-center">
                <Label className="text-xs font-semibold block text-foreground">
                  6-Digit Authenticator Code
                </Label>
                <p className="text-[0.72rem] text-muted-foreground">
                  Open your authenticator app (Google Authenticator, Authy, etc.) to view your current verification code.
                </p>

                <div className="py-2">
                  <OtpInput
                    value={otpCode}
                    onChange={setOtpCode}
                    onComplete={() => handleOtpSubmit()}
                    disabled={loading || cooldown !== null}
                    hasError={Boolean(error)}
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <Checkbox
                  id="stu-trust"
                  checked={trustDevice}
                  onCheckedChange={(checked) => setTrustDevice(!!checked)}
                />
                <label
                  htmlFor="stu-trust"
                  className="text-xs font-medium leading-none cursor-pointer text-muted-foreground"
                >
                  Trust this device for 30 days
                </label>
              </div>

              <Button
                type="button"
                onClick={() => handleOtpSubmit()}
                className="w-full text-xs font-semibold bg-primary hover:bg-primary/90 mt-1"
                disabled={loading || otpCode.length !== 6 || cooldown !== null}
              >
                {loading ? "Verifying Authenticator Code..." : "Verify Code & Sign In"}
              </Button>

              <div className="rounded-lg bg-muted/40 p-2.5 text-[0.7rem] text-muted-foreground text-center">
                💡 Development Demo TOTP Code: <strong className="text-foreground">123456</strong>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-border text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setStage("credentials");
                  }}
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="size-3.5" /> Back to Login
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setRecoveryCode("");
                    setStage("recovery");
                  }}
                  className="text-primary hover:underline font-medium text-[0.72rem]"
                >
                  Can't access your authenticator?
                </button>
              </div>
            </div>
          )}

          {/* STAGE 2 ALTERNATIVE: RECOVERY CODE */}
          {stage === "recovery" && (
            <form onSubmit={handleRecoverySubmit} className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2.5">
                <KeyRound className="size-4 shrink-0 mt-0.5" />
                <div className="text-[0.72rem] leading-relaxed">
                  Enter one of your 8-character single-use emergency recovery codes (e.g. <strong>A8K2-P7Q9</strong>).
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="stu-rec-code" className="text-xs font-semibold">
                  Emergency Recovery Code
                </Label>
                <Input
                  id="stu-rec-code"
                  type="text"
                  placeholder="A8K2-P7Q9"
                  value={recoveryCode}
                  onChange={(e) => setRecoveryCode(e.target.value.toUpperCase())}
                  className="font-mono text-center tracking-widest text-sm"
                  autoFocus
                  required
                />
                <p className="text-[0.68rem] text-muted-foreground">
                  Each recovery code can be used only once to sign in.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full text-xs font-semibold bg-primary hover:bg-primary/90 mt-2"
                disabled={loading || recoveryCode.trim().length < 6}
              >
                {loading ? "Validating Recovery Code..." : "Verify Recovery Code & Sign In"}
              </Button>

              <div className="rounded-lg bg-muted/40 p-2.5 text-[0.7rem] text-muted-foreground text-center">
                💡 Demo Recovery Code: <strong className="text-foreground">A8K2-P7Q9</strong>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setStage("otp");
                  }}
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="size-3.5" /> Back to Authenticator
                </button>

                <button
                  type="button"
                  onClick={() => toast.info("Contact student support at studentaffairs@kprcas.ac.in for identity assistance.")}
                  className="inline-flex items-center gap-1 text-primary hover:underline text-[0.72rem]"
                >
                  <LifeBuoy className="size-3.5" /> Contact Support
                </button>
              </div>
            </form>
          )}

          {/* Quick Mock Credentials for easy testing */}
          <div className="rounded-xl border border-border bg-card/60 p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between text-[0.72rem] font-semibold text-muted-foreground">
              <span>Quick Test Student Account</span>
              <span className="font-mono text-[0.65rem] px-1.5 py-0.5 rounded bg-secondary">Demo</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/80 bg-background/80 p-2">
              <div>
                <span className="font-bold text-foreground block">Kavitha S (22CS089)</span>
                <span className="text-[0.68rem] text-muted-foreground">kavitha.cs22@kprcas.ac.in</span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIdentifier("22CS089");
                  setPassword("student@kpr");
                  toast.success("Loaded test student credentials (22CS089). Click Continue.");
                }}
                className="h-7 text-xs font-medium"
              >
                Autofill
              </Button>
            </div>
          </div>

          <div className="border-t border-border pt-4 text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Are you a member of the Discipline Committee?
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              Access Committee Workspace <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <KeyRound className="size-5 text-primary" />
              <h3 className="text-base font-bold text-foreground">Password Reset</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              For security reasons, password resets are processed via your student portal administrator or college ERP account.
            </p>
            <div className="rounded-lg bg-muted/40 p-3 text-xs space-y-1">
              <span className="font-semibold text-foreground block">Student Support Desk</span>
              <span className="text-muted-foreground block">Email: studentaffairs@kprcas.ac.in</span>
              <span className="text-muted-foreground block">Phone: 0422-2635600 (Ext. 204)</span>
            </div>
            <Button
              className="w-full text-xs"
              onClick={() => {
                setForgotModal(false);
                toast.info("Password assistance instructions dispatched to institutional desk.");
              }}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
