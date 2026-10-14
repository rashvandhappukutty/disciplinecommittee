import { createFileRoute } from "@tanstack/react-router";
import { Protected } from "@/components/dsim/Protected";
import { PageHeader, SecureTag } from "@/components/dsim/common";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDsim } from "@/lib/dsim/store";
import {
  Bell,
  Mic,
  Sparkles,
  Shield,
  Layout,
  Save,
  CheckCircle2,
  Fingerprint,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PasskeyManager } from "@/components/dsim/PasskeyManager";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — DSIM" },
      { name: "description", content: "Workspace preferences and system configuration." },
      { property: "og:title", content: "Settings — DSIM" },
      { property: "og:description", content: "Workspace preferences and system configuration." },
    ],
  }),
  component: SettingsPage,
});

export function SettingsPage() {
  const { settings, setSetting, currentUser } = useDsim();

  const handleSaveAll = () => {
    toast.success("Preferences and system configurations saved.");
  };

  return (
    <Protected>
      <div className="mx-auto max-w-4xl space-y-6">
        <PageHeader
          eyebrow="System Configuration"
          title="Settings & Preferences"
          subtitle="Configure notification alerts, AI synopsis synthesis parameters, and audio recording fidelity."
          actions={
            <div className="flex items-center gap-2">
              <SecureTag>Workspace Controls</SecureTag>
              <Button size="sm" onClick={handleSaveAll} className="gap-1.5 text-xs bg-primary hover:bg-primary/90">
                <Save className="size-3.5" /> Save Preferences
              </Button>
            </div>
          }
        />

        <div className="space-y-6">
          {/* Section 1: Notifications */}
          <div className="surface overflow-hidden p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Bell className="size-4 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Notification Alerts</h3>
                <p className="text-[0.7rem] text-muted-foreground">Manage push and in-app alert dispatches</p>
              </div>
            </div>

            <div className="divide-y divide-border/60">
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-xs font-semibold text-foreground">Return Date Reminders</div>
                  <div className="text-[0.7rem] text-muted-foreground">
                    Receive automated alerts 3 days, 1 day, and on the morning of scheduled student return.
                  </div>
                </div>
                <Switch
                  checked={settings.returnReminders}
                  onCheckedChange={(v) => {
                    setSetting("returnReminders", v);
                    toast.success(`Return reminders ${v ? "enabled" : "disabled"}`);
                  }}
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-xs font-semibold text-foreground">Active Investigation Alerts</div>
                  <div className="text-[0.7rem] text-muted-foreground">
                    Notify when an investigation session has been active for more than 2 hours.
                  </div>
                </div>
                <Switch
                  checked={settings.investigationNotifications}
                  onCheckedChange={(v) => {
                    setSetting("investigationNotifications", v);
                    toast.success(`Investigation alerts ${v ? "enabled" : "disabled"}`);
                  }}
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-xs font-semibold text-foreground">Evidence Intake Notifications</div>
                  <div className="text-[0.7rem] text-muted-foreground">
                    Receive confirmation notifications whenever new photos, videos, or documents are filed.
                  </div>
                </div>
                <Switch
                  checked={settings.evidenceNotifications}
                  onCheckedChange={(v) => {
                    setSetting("evidenceNotifications", v);
                    toast.success(`Evidence notifications ${v ? "enabled" : "disabled"}`);
                  }}
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-xs font-semibold text-foreground">AI Synopsis Readiness</div>
                  <div className="text-[0.7rem] text-muted-foreground">
                    Notify immediately when an audio recording finishes processing and is ready for review.
                  </div>
                </div>
                <Switch
                  checked={settings.synopsisNotifications}
                  onCheckedChange={(v) => {
                    setSetting("synopsisNotifications", v);
                    toast.success(`Synopsis notifications ${v ? "enabled" : "disabled"}`);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Recording Preferences */}
          <div className="surface overflow-hidden p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Mic className="size-4 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Investigation Interview & Hearing Audio</h3>
                <p className="text-[0.7rem] text-muted-foreground">Configure microphone sampling and encoding standards</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Recording Quality Preset</label>
                <Select
                  value={settings.recordingQuality}
                  onValueChange={(v) => setSetting("recordingQuality", v as "standard" | "high")}
                >
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high" className="text-xs">High Fidelity (Lossless 48kHz, Noise Gate)</SelectItem>
                    <SelectItem value="standard" className="text-xs">Standard (Compact Opus 24kHz)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <div className="text-xs font-semibold text-foreground">Automatic AI Pipeline on Stop</div>
                  <div className="text-[0.7rem] text-muted-foreground">Auto-transcribe as soon as recording ends</div>
                </div>
                <Switch
                  checked={settings.autoSynopsis}
                  onCheckedChange={(v) => setSetting("autoSynopsis", v)}
                />
              </div>
            </div>
          </div>

          {/* Section 3: AI Synopsis Synthesis Preferences */}
          <div className="surface overflow-hidden p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Sparkles className="size-4 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">AI Synopsis Engine Parameters</h3>
                <p className="text-[0.7rem] text-muted-foreground">Control summary verbosity and legal formatting style</p>
              </div>
            </div>

            <div className="space-y-1.5 max-w-sm">
              <label className="text-xs font-semibold text-foreground">Synopsis Detail Level</label>
              <Select
                value={settings.synopsisLength}
                onValueChange={(v) => setSetting("synopsisLength", v as "concise" | "detailed")}
              >
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="detailed" className="text-xs">Detailed (Includes statements, contradictions, next steps)</SelectItem>
                  <SelectItem value="concise" className="text-xs">Executive Summary (Key finding bullet points only)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Section 4: Passkeys & Biometric Security (Requirement 4) */}
          <div className="surface overflow-hidden p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Fingerprint className="size-5 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Passkeys & Hardware Authentication</h3>
                <p className="text-[0.7rem] text-muted-foreground">Manage enrolled biometric devices, Windows Hello, and hardware security keys</p>
              </div>
            </div>

            {currentUser && <PasskeyManager user={currentUser} />}
          </div>

          {/* Section 5: Security & Appearance */}
          <div className="surface overflow-hidden p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Shield className="size-4 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Security & Interface Density</h3>
                <p className="text-[0.7rem] text-muted-foreground">Session protection and table spacing</p>
              </div>
            </div>

            <div className="divide-y divide-border/60">
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-xs font-semibold text-foreground">Require Device User Verification</div>
                  <div className="text-[0.7rem] text-muted-foreground">
                    Enforce biometric check (Face ID / Windows Hello) or device PIN on every passkey sign-in.
                  </div>
                </div>
                <Switch
                  checked={settings.requireUserVerification}
                  onCheckedChange={(v) => {
                    setSetting("requireUserVerification", v);
                    toast.success(`User verification requirement ${v ? "enabled" : "disabled"}`);
                  }}
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-xs font-semibold text-foreground">Compact Case Tables</div>
                  <div className="text-[0.7rem] text-muted-foreground">
                    Reduce vertical padding to display higher information density on laptop screens.
                  </div>
                </div>
                <Switch
                  checked={settings.compactTables}
                  onCheckedChange={(v) => setSetting("compactTables", v)}
                />
              </div>
            </div>
          </div>

          {/* Production Readiness & Architecture Notice (Requirement 24) */}
          <div className="rounded-xl border border-border bg-card/60 p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <Shield className="size-4 text-primary" />
              <span>System Architecture & Deployment Notice</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Frontend prototype with local persistence. Production deployment requires backend authentication, authorization, database persistence, secure evidence storage, server-side audit integrity, and production AI/STT services.
            </p>
          </div>
        </div>
      </div>
    </Protected>
  );
}
