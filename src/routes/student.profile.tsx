import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { StudentProtected } from "@/components/dsim/StudentProtected";
import { useDsim } from "@/lib/dsim/store";
import {
  User,
  Shield,
  Bell,
  Lock,
  Mail,
  Phone,
  GraduationCap,
  Building,
  KeyRound,
  LogOut,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, ConfirmDialog } from "@/components/dsim/common";
import { TwoFactorSetupModal } from "@/components/dsim/TwoFactorSetupModal";
import type { AuthUser } from "@/lib/dsim/types";
import { toast } from "sonner";

export const Route = createFileRoute("/student/profile")({
  head: () => ({
    meta: [
      { title: "Student Profile & Security — DSIM" },
      { name: "description", content: "Manage your student profile, privacy safeguards, and notification preferences." },
      { property: "og:title", content: "Student Profile — DSIM" },
      { property: "og:description", content: "Manage your student profile, privacy safeguards, and notification preferences." },
    ],
  }),
  component: StudentProfileRoute,
});

function StudentProfileRoute() {
  return (
    <StudentProtected>
      <StudentProfilePage />
    </StudentProtected>
  );
}

function StudentProfilePage() {
  const { studentProfile, updateStudentProfile, studentLogout } = useDsim();
  const navigate = useNavigate();

  const [phone, setPhone] = useState(studentProfile.phone);
  const [emailUpdates, setEmailUpdates] = useState(studentProfile.notificationPreferences?.emailUpdates ?? true);
  const [smsAlerts, setSmsAlerts] = useState(studentProfile.notificationPreferences?.smsAlerts ?? true);
  const [hearingReminders, setHearingReminders] = useState(studentProfile.notificationPreferences?.hearingReminders ?? true);

  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({
      phone,
      notificationPreferences: {
        emailUpdates,
        smsAlerts,
        hearingReminders,
      },
    });
    toast.success("Profile Preferences Saved", {
      description: "Your contact details and notification settings were updated.",
    });
  };

  const handleChangePassword = () => {
    if (newPass.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (newPass !== confirmPass) {
      toast.error("New passwords do not match.");
      return;
    }

    toast.success("Password Updated", {
      description: "Your student portal password has been changed securely.",
    });
    setShowPasswordModal(false);
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Student Profile & Settings</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          View your institutional records, adjust contact preferences, and manage security settings.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Profile Overview */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-5 text-center shadow-sm space-y-4">
            <div className="mx-auto grid size-20 place-items-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
              <Avatar name={studentProfile.name} size="lg" tone="ink" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">{studentProfile.name}</h3>
              <div className="font-mono text-xs font-semibold text-primary">{studentProfile.rollNumber}</div>
              <p className="text-xs text-muted-foreground mt-0.5">{studentProfile.department}</p>
            </div>

            <div className="border-t border-border pt-3 text-xs space-y-1.5 text-left text-muted-foreground">
              <div className="flex justify-between">
                <span>Academic Year:</span>
                <span className="text-foreground font-medium">{studentProfile.academicYear}</span>
              </div>
              <div className="flex justify-between">
                <span>Year of Study:</span>
                <span className="text-foreground font-medium">{studentProfile.yearOfStudy}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-emerald-500 font-semibold">Active Student</span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setConfirmLogout(true)}
              className="w-full text-xs text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
            >
              <LogOut className="size-3.5 mr-1.5" /> Sign Out
            </Button>
          </div>
        </div>

        {/* Right Form & Preferences */}
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Personal Information */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <User className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Full Name (Official Record)</Label>
                  <Input value={studentProfile.name} disabled className="bg-muted text-xs cursor-not-allowed" />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">College Roll Number</Label>
                  <Input value={studentProfile.rollNumber} disabled className="bg-muted text-xs font-mono cursor-not-allowed" />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Institutional Email</Label>
                  <Input value={studentProfile.email} disabled className="bg-muted text-xs cursor-not-allowed" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="studentPhone" className="text-xs font-semibold">
                    Contact Phone Number
                  </Label>
                  <Input
                    id="studentPhone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-xs"
                    placeholder="+91 94400 00000"
                  />
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <Bell className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Notification Preferences</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1">
                  <div>
                    <div className="font-semibold text-foreground">Email Status Notifications</div>
                    <div className="text-[0.7rem] text-muted-foreground">
                      Receive email alerts whenever your complaint status transitions.
                    </div>
                  </div>
                  <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
                </div>

                <div className="flex items-center justify-between py-1 border-t border-border/60">
                  <div>
                    <div className="font-semibold text-foreground">SMS & Urgent Alerts</div>
                    <div className="text-[0.7rem] text-muted-foreground">
                      Receive immediate SMS notifications when the committee requests additional details.
                    </div>
                  </div>
                  <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
                </div>

                <div className="flex items-center justify-between py-1 border-t border-border/60">
                  <div>
                    <div className="font-semibold text-foreground">Hearing & Meeting Reminders</div>
                    <div className="text-[0.7rem] text-muted-foreground">
                      Reminders regarding scheduled committee meetings or inquiry hearings.
                    </div>
                  </div>
                  <Switch checked={hearingReminders} onCheckedChange={setHearingReminders} />
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <ShieldCheck className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Security & Multi-Factor Access</h3>
              </div>

              {/* Two-Factor Authenticator Card */}
              <div className="rounded-lg border border-border p-3.5 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground flex items-center gap-1.5">
                      <Smartphone className="size-3.5 text-primary" />
                      Two-Factor Authentication (TOTP)
                    </div>
                    <div className="text-muted-foreground text-[0.7rem]">
                      Protects your confidential grievance history with an authenticator app.
                    </div>
                  </div>
                  <span className="rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-[0.65rem] font-bold text-emerald-600">
                    ● ENABLED
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTwoFactorSetup(true)}
                    className="h-7 text-xs gap-1"
                  >
                    <Smartphone className="size-3" /> Reconfigure Authenticator
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTwoFactorSetup(true)}
                    className="h-7 text-xs gap-1"
                  >
                    <KeyRound className="size-3" /> Recovery Codes
                  </Button>
                </div>
              </div>

              {/* Account Password Card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs pt-1">
                <div>
                  <div className="font-semibold text-foreground">Account Password</div>
                  <div className="text-[0.7rem] text-muted-foreground">
                    Protect your student complaint submissions with a secure password.
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPasswordModal(true)}
                  className="text-xs shrink-0"
                >
                  <KeyRound className="size-3.5 mr-1.5" /> Change Password
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="text-xs bg-primary hover:bg-primary/90 gap-1.5 font-semibold">
                <Save className="size-3.5" /> Save Preferences
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Change Password Dialog */}
      <ConfirmDialog
        open={showPasswordModal}
        onOpenChange={setShowPasswordModal}
        title="Change Student Password"
        description="Enter your current password and your new secure credentials."
        confirmLabel="Update Password"
        onConfirm={handleChangePassword}
      >
        <div className="space-y-3 my-2 text-xs">
          <div className="space-y-1">
            <Label className="text-xs">Current Password</Label>
            <Input
              type={showPass ? "text" : "password"}
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              className="text-xs"
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">New Password</Label>
            <Input
              type={showPass ? "text" : "password"}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="text-xs"
              placeholder="At least 6 characters"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Confirm New Password</Label>
            <Input
              type={showPass ? "text" : "password"}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="text-xs"
              placeholder="Repeat new password"
            />
          </div>
        </div>
      </ConfirmDialog>

      {/* Two-Factor Authentication Setup Modal */}
      <TwoFactorSetupModal
        open={showTwoFactorSetup}
        onOpenChange={setShowTwoFactorSetup}
        user={{
          id: studentProfile.id,
          role: "STUDENT",
          displayName: studentProfile.name,
          email: studentProfile.email,
          studentId: studentProfile.rollNumber,
          department: studentProfile.department,
          permissions: ["SUBMIT_COMPLAINT", "VIEW_OWN_COMPLAINT", "RESPOND_INFO"],
          twoFactorEnabled: true,
        }}
        onSuccess={() => toast.success("Student 2FA credentials updated.")}
      />

      {/* Logout Confirmation */}
      <ConfirmDialog
        open={confirmLogout}
        onOpenChange={setConfirmLogout}
        title="Sign out of Student Portal?"
        description="You will be returned to the student login page."
        confirmLabel="Sign out"
        onConfirm={() => {
          studentLogout();
          navigate({ to: "/student/login" });
        }}
      />
    </div>
  );
}
