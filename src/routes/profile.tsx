import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Protected } from "@/components/dsim/Protected";
import { PageHeader, Avatar, SecureTag, ConfirmDialog } from "@/components/dsim/common";
import { useDsim } from "@/lib/dsim/store";
import { fmtDate } from "@/lib/dsim/format";
import {
  UserCircle,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Lock,
  Edit3,
  KeyRound,
  LogOut,
  Building,
  CheckCircle2,
  FileCheck,
  Smartphone,
  Fingerprint,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { PasskeyManager } from "@/components/dsim/PasskeyManager";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Discipline Committee Head — DSIM" },
      { name: "description", content: "Official profile and security credentials." },
      { property: "og:title", content: "Profile — Discipline Committee Head — DSIM" },
      { property: "og:description", content: "Official profile and security credentials." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { profile, setProfile, logout, cases, currentUser, login } = useDsim();
  const navigate = useNavigate();

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Edit profile state
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [committee, setCommittee] = useState(profile.committee);

  // Password state
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      ...profile,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      committee: committee.trim(),
    });
    setShowEditProfile(false);
    toast.success("Profile details updated successfully.");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }
    if (newPw !== confirmPw) {
      toast.error("New passwords do not match.");
      return;
    }
    setShowPasswordModal(false);
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    toast.success("Security credentials updated successfully.");
  };

  const doLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <Protected>
      <div className="mx-auto max-w-4xl space-y-6">
        <PageHeader
          eyebrow="Staff Profile"
          title={currentUser?.role || "Discipline Committee Head"}
          subtitle="Official credential ledger, security clearance, and contact records."
          actions={
            <div className="flex items-center gap-2">
              <SecureTag>{currentUser?.role || "Committee Access"}</SecureTag>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEditProfile(true)}
                className="gap-1.5 text-xs"
              >
                <Edit3 className="size-3.5" /> Edit Profile
              </Button>
            </div>
          }
        />

        {/* Primary Profile Card */}
        <div className="surface p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Avatar name={currentUser?.displayName || profile.name} size="lg" tone="ink" />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">{currentUser?.displayName || profile.name}</h2>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[0.68rem] font-bold text-emerald-700 dark:text-emerald-300">
                  Active Tenure
                </span>
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {currentUser?.role || "Committee Head"} · {currentUser?.department || profile.committee}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1.5 font-mono">
                  <Mail className="size-3.5" /> {currentUser?.email || profile.email}
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Phone className="size-3.5" /> {profile.phone}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4 text-xs">
            <div>
              <span className="text-muted-foreground block">Committee Branch</span>
              <span className="font-semibold text-foreground mt-0.5 block">{profile.committee}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Total Cases Overseen</span>
              <span className="font-mono text-foreground font-semibold mt-0.5 block">{cases.length} cases</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Appointment Date</span>
              <span className="font-mono text-foreground mt-0.5 block">{fmtDate(profile.createdAt)}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Clearance Level</span>
              <span className="font-semibold text-emerald-600 mt-0.5 block">Level 4 (Full Audit Access)</span>
            </div>
          </div>
        </div>

        {/* Security & Credentials Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Security Card */}
          <div className="surface p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <ShieldCheck className="size-5 text-primary" />
              <h3 className="font-semibold text-sm">Security & Passkey Access</h3>
            </div>

            <div className="space-y-4 text-xs">
              {currentUser && (
                <PasskeyManager user={currentUser} />
              )}

              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <div className="font-medium text-foreground">Institutional Fallback Password</div>
                  <div className="text-muted-foreground text-[0.7rem]">Used when biometric hardware is unavailable</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPasswordModal(true)}
                  className="h-7 text-xs gap-1"
                >
                  <KeyRound className="size-3" /> Change
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <div className="font-medium text-foreground">Active Session</div>
                  <div className="text-muted-foreground text-[0.7rem]">Encrypted TLS 1.3 · WebAuthn Passkey Verified</div>
                </div>
                <span className="font-mono text-[0.68rem] text-muted-foreground">Expires in 8h</span>
              </div>
            </div>
          </div>

          {/* Authority & Delegation */}
          <div className="surface p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <FileCheck className="size-5 text-primary" />
              <h3 className="font-semibold text-sm">Authority & Case Jurisdiction</h3>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Authorized role: <strong className="text-foreground">{currentUser?.role || "Committee Head"}</strong>. Access is governed by institutional RBAC policies.
            </p>

            <div className="rounded-lg bg-muted/40 p-3.5 border border-border/60 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <CheckCircle2 className="size-4 text-emerald-600" /> Active Role & Permissions
                </div>
                <span className="font-mono text-[0.68rem] text-primary font-bold">
                  {currentUser?.permissions.length || 0} granted
                </span>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {(currentUser?.permissions || []).map((perm: string) => (
                  <span key={perm} className="rounded bg-secondary/80 border border-border px-1.5 py-0.5 font-mono text-[0.62rem] text-muted-foreground">
                    {perm}
                  </span>
                ))}
              </div>
            </div>

            {/* Development Role Switcher */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3.5 space-y-2 text-xs">
              <div className="font-semibold text-primary">Development Role Switcher</div>
              <p className="text-[0.7rem] text-muted-foreground">
                Switch between committee roles to evaluate role-based permission gates:
              </p>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {["Principal", "Administrative Officer", "Committee Head", "Disciplinary Board Member"].map((r) => (
                  <Button
                    key={r}
                    variant={currentUser?.role === r ? "default" : "outline"}
                    size="sm"
                    className="h-7 text-[0.68rem] justify-start truncate"
                    onClick={() => {
                      login(r);
                      toast.success(`Switched role to: ${r}`);
                    }}
                  >
                    {r}
                  </Button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full text-xs text-destructive hover:bg-destructive/10 gap-1.5"
              >
                <LogOut className="size-3.5" /> Sign Out of All Sessions
              </Button>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profile Information</DialogTitle>
              <DialogDescription>
                Update your Committee Head administrative contact details.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="prof-name" className="text-xs">Full Name</Label>
                <Input
                  id="prof-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="prof-email" className="text-xs">Official Email</Label>
                <Input
                  id="prof-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-xs font-mono"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="prof-phone" className="text-xs">Direct Emergency Phone</Label>
                <Input
                  id="prof-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-xs font-mono"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="prof-comm" className="text-xs">Committee / Body Title</Label>
                <Input
                  id="prof-comm"
                  value={committee}
                  onChange={(e) => setCommittee(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>

              <DialogFooter className="mt-4">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowEditProfile(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm">Save Profile</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Change Password Modal */}
        <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Change Security Password</DialogTitle>
              <DialogDescription>
                Update your primary authentication passphrase. Minimum 8 characters.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="curr-pw" className="text-xs">Current Password</Label>
                <Input
                  id="curr-pw"
                  type="password"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="new-pw" className="text-xs">New Password</Label>
                <Input
                  id="new-pw"
                  type="password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="conf-pw" className="text-xs">Confirm New Password</Label>
                <Input
                  id="conf-pw"
                  type="password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>

              <DialogFooter className="mt-4">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm">Update Password</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Logout Confirmation */}
        <ConfirmDialog
          open={showLogoutConfirm}
          onOpenChange={setShowLogoutConfirm}
          title="Sign out of DSIM session?"
          description="Are you sure you want to end your current session? Unsaved investigation recordings will be sealed."
          confirmLabel="Sign Out"
          onConfirm={doLogout}
        />
      </div>
    </Protected>
  );
}
