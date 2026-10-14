import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { StudentProtected } from "@/components/dsim/StudentProtected";
import { useDsim } from "@/lib/dsim/store";
import {
  COMPLAINT_CATEGORIES,
  type ComplaintCategory,
  type PrivacyPreference,
  type UrgencyLevel,
  type InvolvedSubject,
  type WitnessItem,
  type ComplaintEvidence,
} from "@/lib/dsim/types";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  User,
  FileText,
  Users,
  Eye,
  Upload,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Info,
  Trash2,
  Plus,
  FileImage,
  Film,
  FileAudio,
  File,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { fmtDateTime } from "@/lib/dsim/format";
import {
  INSTITUTION,
  kprcasSchools,
  kprcasComplaintCategories,
  kprcasComplaintLocations,
} from "@/lib/dsim/institution";

export const Route = createFileRoute("/student/complaints/new")({
  head: () => ({
    meta: [
      { title: "Raise a Complaint — DSIM Student Portal" },
      { name: "description", content: "Submit a new confidential disciplinary complaint." },
      { property: "og:title", content: "Raise a Complaint — DSIM" },
      { property: "og:description", content: "Submit a new confidential disciplinary complaint." },
    ],
  }),
  component: NewComplaintRoute,
});

function NewComplaintRoute() {
  return (
    <StudentProtected>
      <NewComplaintWizard />
    </StudentProtected>
  );
}

const STEPS = [
  { id: 1, name: "Student Info", icon: User },
  { id: 2, name: "Incident", icon: FileText },
  { id: 3, name: "Person Involved", icon: Users },
  { id: 4, name: "Witnesses", icon: Eye },
  { id: 5, name: "Evidence", icon: Upload },
  { id: 6, name: "Privacy & Urgency", icon: ShieldCheck },
  { id: 7, name: "Review & Submit", icon: CheckCircle2 },
];

function NewComplaintWizard() {
  const { studentProfile, addComplaint } = useDsim();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [submittedComplaintId, setSubmittedComplaintId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ComplaintCategory>("Misconduct");
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().slice(0, 10));
  const [incidentTime, setIncidentTime] = useState("14:30");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  // Persons Involved
  const [persons, setPersons] = useState<InvolvedSubject[]>([
    {
      id: "p-1",
      name: "",
      rollNumber: "",
      department: "",
      relationship: "Student",
      isPrimary: true,
      unknownDetails: false,
      details: "",
    },
  ]);

  // Witnesses
  const [hasWitnesses, setHasWitnesses] = useState<"yes" | "no" | "not_sure">("not_sure");
  const [witnesses, setWitnesses] = useState<WitnessItem[]>([]);

  // Evidence
  const [evidenceList, setEvidenceList] = useState<ComplaintEvidence[]>([]);

  // Confidentiality & Urgency
  const [privacyPreference, setPrivacyPreference] = useState<PrivacyPreference>("confidential");
  const [urgency, setUrgency] = useState<UrgencyLevel>("normal");

  // Confirmation
  const [confirmedAccuracy, setConfirmedAccuracy] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle Person Add / Remove / Update
  const addPerson = () => {
    setPersons((prev) => [
      ...prev,
      {
        id: `p-${Date.now()}`,
        name: "",
        rollNumber: "",
        department: "",
        relationship: "Student",
        isPrimary: false,
        unknownDetails: false,
        details: "",
      },
    ]);
  };

  const removePerson = (id: string) => {
    if (persons.length <= 1) return;
    setPersons((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePerson = (id: string, patch: Partial<InvolvedSubject>) => {
    setPersons((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  // Handle Witness Add / Remove / Update
  const addWitness = () => {
    setWitnesses((prev) => [
      ...prev,
      {
        id: `w-${Date.now()}`,
        name: "",
        rollNumber: "",
        department: "",
        relationship: "Student",
        contactInfo: "",
        description: "",
        unknownDetails: false,
      },
    ]);
  };

  const removeWitness = (id: string) => {
    setWitnesses((prev) => prev.filter((w) => w.id !== id));
  };

  const updateWitness = (id: string, patch: Partial<WitnessItem>) => {
    setWitnesses((prev) => prev.map((w) => (w.id === id ? { ...w, ...patch } : w)));
  };

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (file.size > 25 * 1024 * 1024) {
        toast.error(`File "${file.name}" exceeds maximum allowed limit of 25MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const item: ComplaintEvidence = {
          id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          fileName: file.name,
          fileType: file.type || "application/octet-stream",
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          url: reader.result as string,
          description: "",
          uploadedAt: new Date().toISOString(),
        };
        setEvidenceList((prev) => [...prev, item]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const removeEvidence = (id: string) => {
    setEvidenceList((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEvidenceDesc = (id: string, desc: string) => {
    setEvidenceList((prev) => prev.map((e) => (e.id === id ? { ...e, description: desc } : e)));
  };

  // Step Validation
  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 2) {
      if (!title.trim()) errs["title"] = "Please provide an incident title or summary.";
      if (!location.trim()) errs["location"] = "Please enter the specific location on campus.";
      if (!description.trim() || description.trim().length < 20) {
        errs["description"] = "Please enter a detailed description of what occurred (min 20 characters).";
      }
      if (!incidentDate) errs["incidentDate"] = "Please specify the date of the incident.";
    }

    if (step === 3) {
      persons.forEach((p, idx) => {
        if (!p.unknownDetails && !p.name.trim()) {
          errs[`person_${p.id}`] = `Please enter the name or check "I don't know this person's complete details".`;
        }
        if (p.unknownDetails && !p.details?.trim()) {
          errs[`person_details_${p.id}`] = `Please provide a visual or circumstantial description of Person #${idx + 1}.`;
        }
      });
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((s) => Math.min(STEPS.length, s + 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("Please fill in the required fields before proceeding.");
    }
  };

  const prevStep = () => {
    setCurrentStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = () => {
    if (!confirmedAccuracy) {
      toast.error("Please confirm the accuracy declaration before submitting.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const newRec = addComplaint({
        studentId: studentProfile.id,
        studentName: studentProfile.name,
        studentRoll: studentProfile.rollNumber,
        studentEmail: studentProfile.email,
        studentDepartment: studentProfile.department,
        academicYear: studentProfile.academicYear,
        yearOfStudy: studentProfile.yearOfStudy,
        title,
        category,
        incidentDate,
        incidentTime,
        location,
        description,
        personsInvolved: persons,
        hasWitnesses,
        witnesses,
        evidence: evidenceList,
        privacyPreference,
        urgency,
      });

      setSubmitting(false);
      setSubmittedComplaintId(newRec.id);
      toast.success("Complaint Submitted Successfully!", {
        description: `Your complaint ID is ${newRec.id}. Tracking active.`,
      });
    }, 750);
  };

  // Section 36.14 Submission Confirmation Screen
  if (submittedComplaintId) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="rounded-2xl border border-emerald-500/30 bg-card p-8 text-center shadow-lg space-y-6">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5">
            <CheckCircle2 className="size-9" />
          </div>

          <div className="space-y-2">
            <span className="rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold px-3 py-1 text-xs uppercase tracking-wider">
              Status: Submitted (Awaiting Institutional Review)
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Complaint Submitted Successfully
            </h2>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Your complaint has been registered. Authorized institutional personnel (Principal, Administrative Officer, and Discipline Committee Head) have been notified according to institutional policy.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4 text-left max-w-md mx-auto space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center py-1 border-b border-border/60">
              <span className="text-muted-foreground font-sans">Complaint ID:</span>
              <span className="text-sm font-bold text-primary">{submittedComplaintId}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-border/60">
              <span className="text-muted-foreground font-sans">Submitted On:</span>
              <span className="text-foreground">{fmtDateTime(new Date().toISOString())}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-border/60">
              <span className="text-muted-foreground font-sans">Category:</span>
              <span className="text-foreground font-sans">{category}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-border/60">
              <span className="text-muted-foreground font-sans">Confidentiality:</span>
              <span className="text-foreground font-sans capitalize">{privacyPreference.replace(/_/g, " ")}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground font-sans">Notification Status:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-sans font-medium flex items-center gap-1">
                <Check className="size-3" /> Officers Notified
              </span>
            </div>
          </div>

          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-xs text-primary max-w-md mx-auto flex items-center gap-2 text-left">
            <Info className="size-4 shrink-0" />
            <span>Keep your Complaint ID ({submittedComplaintId}) for reference. You will receive updates as your grievance progresses through committee review.</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              onClick={() => navigate({ to: "/student/complaints/$complaintId", params: { complaintId: submittedComplaintId } })}
              className="w-full sm:w-auto text-xs bg-primary hover:bg-primary/90 gap-2"
            >
              <FileText className="size-4" /> View Complaint
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/student/dashboard" })}
              className="w-full sm:w-auto text-xs"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <Link
          to="/student/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2"
        >
          <ChevronLeft className="size-3.5" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Raise a Complaint / Report Incident</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Provide detailed information to assist the Discipline Committee in reviewing the incident safely and promptly.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center justify-between min-w-[580px] px-2">
          {STEPS.map((step, idx) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <button
                  type="button"
                  onClick={() => {
                    if (isCompleted) setCurrentStep(step.id);
                  }}
                  disabled={!isCompleted && !isCurrent}
                  className="flex flex-col items-center gap-1 group text-center"
                >
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-full text-xs font-semibold transition-all",
                      isCompleted
                        ? "bg-primary text-primary-foreground"
                        : isCurrent
                        ? "border-2 border-primary bg-primary/10 text-primary"
                        : "border border-border bg-muted text-muted-foreground",
                    )}
                  >
                    {isCompleted ? <Check className="size-4" /> : step.id}
                  </span>
                  <span
                    className={cn(
                      "text-[0.68rem] whitespace-nowrap font-medium",
                      isCurrent
                        ? "text-primary font-bold"
                        : isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {step.name}
                  </span>
                </button>
                {idx < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 mx-2 transition-colors",
                      currentStep > step.id ? "bg-primary" : "bg-border",
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content Card */}
      <div className="rounded-xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6">
        {/* STEP 1: Student Information */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div className="border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">1. Student Information</h3>
              <p className="text-xs text-muted-foreground">
                These details are taken from your authenticated college account and verify your status as a student.
              </p>
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3.5 text-xs text-primary flex items-start gap-2.5">
              <ShieldCheck className="size-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Auto-Populated Profile:</span> These details are taken from your college account.
                You can choose your confidentiality preferences in Step 6 before final submission.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Student Full Name</Label>
                <Input value={studentProfile.name} disabled className="bg-muted text-xs font-semibold cursor-not-allowed" />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Student ID / Roll Number</Label>
                <Input value={studentProfile.rollNumber} disabled className="bg-muted text-xs font-mono font-semibold cursor-not-allowed" />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">College Email Address</Label>
                <Input value={studentProfile.email} disabled className="bg-muted text-xs cursor-not-allowed" />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Department</Label>
                <Input value={studentProfile.department} disabled className="bg-muted text-xs cursor-not-allowed" />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Academic Year</Label>
                <Input value={studentProfile.academicYear} disabled className="bg-muted text-xs cursor-not-allowed" />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Year of Study</Label>
                <Input value={studentProfile.yearOfStudy} disabled className="bg-muted text-xs cursor-not-allowed" />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Incident Details */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div className="border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">2. Incident Information</h3>
              <p className="text-xs text-muted-foreground">
                Describe the nature, date, and location of the incident clearly.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="incidentTitle" className="text-xs font-semibold flex items-center justify-between">
                  <span>Complaint / Incident Title <span className="text-destructive">*</span></span>
                  <span className="text-[0.68rem] text-muted-foreground font-normal">Brief summary title</span>
                </Label>
                <Input
                  id="incidentTitle"
                  placeholder="e.g. Unscheduled lab access and equipment damage"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={cn("text-xs", errors["title"] && "border-destructive")}
                />
                {errors["title"] && <p className="text-[0.7rem] text-destructive">{errors["title"]}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Category <span className="text-destructive">*</span></Label>
                  <Select value={category} onValueChange={(v) => setCategory(v as ComplaintCategory)}>
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {kprcasComplaintCategories.map((cat) => (
                        <SelectItem key={cat} value={cat} className="text-xs">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="incidentDate" className="text-xs font-semibold">
                    Date of Incident <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="incidentDate"
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className={cn("text-xs", errors["incidentDate"] && "border-destructive")}
                  />
                  {errors["incidentDate"] && <p className="text-[0.7rem] text-destructive">{errors["incidentDate"]}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="incidentTime" className="text-xs font-semibold">
                    Approximate Time
                  </Label>
                  <Input
                    id="incidentTime"
                    type="time"
                    value={incidentTime}
                    onChange={(e) => setIncidentTime(e.target.value)}
                    className="text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="incidentLocation" className="text-xs font-semibold">
                    Location on Campus <span className="text-destructive">*</span>
                  </Label>
                  <span className="text-[0.68rem] text-muted-foreground">Select preset or type specific venue</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Select onValueChange={(v) => setLocation(v)}>
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Select KPRCAS Campus Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {kprcasComplaintLocations.map((loc) => (
                        <SelectItem key={loc} value={loc} className="text-xs">
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="incidentLocation"
                    placeholder="or specify room/block (e.g. Lab B-204)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={cn("text-xs", errors["location"] && "border-destructive")}
                  />
                </div>
                {errors["location"] && <p className="text-[0.7rem] text-destructive">{errors["location"]}</p>}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="incidentDesc" className="text-xs font-semibold">
                    Detailed Description <span className="text-destructive">*</span>
                  </Label>
                  <span className="text-[0.68rem] text-muted-foreground font-mono">
                    {description.length} characters
                  </span>
                </div>
                <Textarea
                  id="incidentDesc"
                  placeholder="Please describe what happened, including relevant details, dates, locations, and circumstances."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className={cn("text-xs leading-relaxed", errors["description"] && "border-destructive")}
                />
                {errors["description"] && <p className="text-[0.7rem] text-destructive">{errors["description"]}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Person Involved */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="border-b border-border pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-foreground">3. Person Reported / Involved</h3>
                <p className="text-xs text-muted-foreground">
                  Identify the individuals involved. Neutral terminology is used during the complaint review stage.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPerson}
                className="text-xs gap-1 self-start sm:self-auto"
              >
                <Plus className="size-3.5" /> Add Another Person
              </Button>
            </div>

            <div className="space-y-4">
              {persons.map((p, idx) => (
                <div
                  key={p.id}
                  className={cn(
                    "rounded-xl border p-4 space-y-3.5 transition-all bg-card",
                    p.isPrimary ? "border-primary/40 ring-1 ring-primary/20" : "border-border",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "rounded-md px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider",
                          p.isPrimary
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground",
                        )}
                      >
                        {p.isPrimary ? "Primary Person Reported" : `Person Involved #${idx + 1}`}
                      </span>
                      {p.isPrimary && (
                        <span className="text-[0.7rem] text-muted-foreground hidden sm:inline">
                          Main subject of this complaint
                        </span>
                      )}
                    </div>
                    {persons.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePerson(p.id)}
                        className="size-7 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <Checkbox
                      id={`unknown-${p.id}`}
                      checked={!!p.unknownDetails}
                      onCheckedChange={(checked) => updatePerson(p.id, { unknownDetails: !!checked })}
                    />
                    <label
                      htmlFor={`unknown-${p.id}`}
                      className="text-xs text-muted-foreground font-medium cursor-pointer"
                    >
                      I don't know this person's complete details (describe appearance/context below)
                    </label>
                  </div>

                  {!p.unknownDetails ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Full Name <span className="text-destructive">*</span></Label>
                        <Input
                          placeholder="e.g. Harish Kumar"
                          value={p.name}
                          onChange={(e) => updatePerson(p.id, { name: e.target.value })}
                          className="text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs">Student ID / Roll Number (if known)</Label>
                        <Input
                          placeholder="e.g. 21CS047"
                          value={p.rollNumber || ""}
                          onChange={(e) => updatePerson(p.id, { rollNumber: e.target.value })}
                          className="text-xs font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs">School / Department (if known)</Label>
                        <Select
                          value={p.department || ""}
                          onValueChange={(v) => updatePerson(p.id, { department: v })}
                        >
                          <SelectTrigger className="text-xs">
                            <SelectValue placeholder="Select School" />
                          </SelectTrigger>
                          <SelectContent>
                            {kprcasSchools.map((school) => (
                              <SelectItem key={school} value={school} className="text-xs">
                                {school}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs">Role / Relationship</Label>
                        <Select
                          value={p.relationship}
                          onValueChange={(v) => updatePerson(p.id, { relationship: v as any })}
                        >
                          <SelectTrigger className="text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Student" className="text-xs">Student</SelectItem>
                            <SelectItem value="Faculty" className="text-xs">Faculty</SelectItem>
                            <SelectItem value="Staff" className="text-xs">Staff</SelectItem>
                            <SelectItem value="Other" className="text-xs">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <Label className="text-xs">Description of Person (Physical appearance, clothes, location) <span className="text-destructive">*</span></Label>
                      <Textarea
                        placeholder="e.g. Senior male student, approx 5'10'', wearing blue jacket, was standing near the bench..."
                        value={p.details || ""}
                        onChange={(e) => updatePerson(p.id, { details: e.target.value, name: p.name || "Unidentified Person" })}
                        rows={3}
                        className="text-xs"
                      />
                    </div>
                  )}

                  {errors[`person_${p.id}`] && (
                    <p className="text-[0.7rem] text-destructive">{errors[`person_${p.id}`]}</p>
                  )}
                  {errors[`person_details_${p.id}`] && (
                    <p className="text-[0.7rem] text-destructive">{errors[`person_details_${p.id}`]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Witnesses */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div className="border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">4. Witness Information</h3>
              <p className="text-xs text-muted-foreground">
                Adding witnesses helps corroborate statements and accelerates the review process.
              </p>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-semibold">Were there any witnesses present during the incident?</Label>
              <RadioGroup
                value={hasWitnesses}
                onValueChange={(v) => {
                  setHasWitnesses(v as any);
                  if (v === "yes" && witnesses.length === 0) {
                    addWitness();
                  }
                }}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="wit-yes" />
                  <Label htmlFor="wit-yes" className="text-xs font-medium cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="wit-no" />
                  <Label htmlFor="wit-no" className="text-xs font-medium cursor-pointer">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not_sure" id="wit-notsure" />
                  <Label htmlFor="wit-notsure" className="text-xs font-medium cursor-pointer">Not sure</Label>
                </div>
              </RadioGroup>
            </div>

            {hasWitnesses === "yes" && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">Witness List</span>
                  <Button type="button" variant="outline" size="sm" onClick={addWitness} className="text-xs gap-1">
                    <Plus className="size-3.5" /> Add Witness
                  </Button>
                </div>

                {witnesses.map((w, idx) => (
                  <div key={w.id} className="rounded-xl border border-border p-4 bg-muted/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">Witness #{idx + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeWitness(w.id)}
                        className="size-7 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Witness Name</Label>
                        <Input
                          placeholder="e.g. Amit Sharma"
                          value={w.name}
                          onChange={(e) => updateWitness(w.id, { name: e.target.value })}
                          className="text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs">Roll Number / ID</Label>
                        <Input
                          placeholder="e.g. 21CS008"
                          value={w.rollNumber || ""}
                          onChange={(e) => updateWitness(w.id, { rollNumber: e.target.value })}
                          className="text-xs font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs">Relationship / Context</Label>
                        <Input
                          placeholder="e.g. Classmate / Lab Partner"
                          value={w.relationship || ""}
                          onChange={(e) => updateWitness(w.id, { relationship: e.target.value })}
                          className="text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs">Optional Contact Info (Email / Phone)</Label>
                        <Input
                          placeholder="e.g. amit.cs21@kprcas.ac.in"
                          value={w.contactInfo || ""}
                          onChange={(e) => updateWitness(w.id, { contactInfo: e.target.value })}
                          className="text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs">Description of What Witness Observed</Label>
                      <Input
                        placeholder="e.g. Was standing next to bench 3 and heard the verbal exchange."
                        value={w.description || ""}
                        onChange={(e) => updateWitness(w.id, { description: e.target.value })}
                        className="text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Evidence */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <div className="border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">5. Supporting Evidence</h3>
              <p className="text-xs text-muted-foreground">
                You can attach photos, videos, audio recordings, screenshots, or documents that may help the Discipline Committee understand the complaint.
              </p>
            </div>

            {/* Upload Zone */}
            <div className="rounded-xl border-2 border-dashed border-border p-6 text-center hover:border-primary/50 transition-colors bg-muted/10">
              <input
                type="file"
                id="evidenceFileInput"
                multiple
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="evidenceFileInput"
                className="cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                <div className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
                  <Upload className="size-6" />
                </div>
                <div className="text-xs font-semibold text-foreground">
                  Click to browse files or drag & drop here
                </div>
                <p className="text-[0.7rem] text-muted-foreground">
                  Supports Photos (PNG, JPG), Videos (MP4), Audio (MP3, WAV), PDF, and Word documents (Max 25MB each)
                </p>
              </label>
            </div>

            {/* Uploaded Evidence List */}
            {evidenceList.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">
                    Attached Files ({evidenceList.length})
                  </span>
                </div>

                <div className="space-y-2">
                  {evidenceList.map((ev, idx) => (
                    <div
                      key={ev.id}
                      className="rounded-lg border border-border bg-card p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-secondary text-primary">
                          {ev.fileType.startsWith("image/") ? (
                            <FileImage className="size-4" />
                          ) : ev.fileType.startsWith("video/") ? (
                            <Film className="size-4" />
                          ) : ev.fileType.startsWith("audio/") ? (
                            <FileAudio className="size-4" />
                          ) : (
                            <File className="size-4" />
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-foreground truncate">{ev.fileName}</div>
                          <div className="text-[0.68rem] text-muted-foreground font-mono">{ev.fileSize}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Input
                          placeholder="Optional note / description"
                          value={ev.description || ""}
                          onChange={(e) => updateEvidenceDesc(ev.id, e.target.value)}
                          className="h-8 text-xs max-w-xs"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeEvidence(ev.id)}
                          className="size-8 text-muted-foreground hover:text-destructive shrink-0"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-lg bg-muted/40 border border-border p-3 text-[0.7rem] text-muted-foreground flex items-center gap-2">
              <Lock className="size-3.5 text-emerald-500 shrink-0" />
              <span>Evidence files are stored in an encrypted vault and never exposed publicly.</span>
            </div>
          </div>
        )}

        {/* STEP 6: Confidentiality & Urgency */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">6. Privacy Preference & Urgency</h3>
              <p className="text-xs text-muted-foreground">
                Choose how your identity should be protected and let the committee know the urgency level.
              </p>
            </div>

            {/* Privacy Options */}
            <div className="space-y-3">
              <Label className="text-xs font-bold text-foreground">Confidentiality Preference</Label>
              <RadioGroup
                value={privacyPreference}
                onValueChange={(v) => setPrivacyPreference(v as PrivacyPreference)}
                className="space-y-2.5"
              >
                <div
                  className={cn(
                    "flex items-start space-x-3 rounded-xl border p-3.5 transition-colors cursor-pointer",
                    privacyPreference === "identify" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30",
                  )}
                  onClick={() => setPrivacyPreference("identify")}
                >
                  <RadioGroupItem value="identify" id="priv-identify" className="mt-0.5" />
                  <div className="space-y-0.5">
                    <Label htmlFor="priv-identify" className="text-xs font-bold cursor-pointer text-foreground">
                      Full Disclosure
                    </Label>
                    <p className="text-[0.72rem] text-muted-foreground">
                      Your identity is available to authorized committee members to assist in direct communication.
                    </p>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex items-start space-x-3 rounded-xl border p-3.5 transition-colors cursor-pointer",
                    privacyPreference === "confidential" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30",
                  )}
                  onClick={() => setPrivacyPreference("confidential")}
                >
                  <RadioGroupItem value="confidential" id="priv-conf" className="mt-0.5" />
                  <div className="space-y-0.5">
                    <Label htmlFor="priv-conf" className="text-xs font-bold cursor-pointer text-foreground flex items-center gap-1.5">
                      <span>Committee-Only</span>
                      <span className="rounded bg-primary/10 text-primary text-[0.65rem] px-1.5 py-0.2">Recommended</span>
                    </Label>
                    <p className="text-[0.72rem] text-muted-foreground">
                      Your identity is restricted to authorized committee members and is not disclosed to the reported person unless required by institutional process.
                    </p>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex items-start space-x-3 rounded-xl border p-3.5 transition-colors cursor-pointer",
                    privacyPreference === "anonymous_to_reported" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30",
                  )}
                  onClick={() => setPrivacyPreference("anonymous_to_reported")}
                >
                  <RadioGroupItem value="anonymous_to_reported" id="priv-anon" className="mt-0.5" />
                  <div className="space-y-0.5">
                    <Label htmlFor="priv-anon" className="text-xs font-bold cursor-pointer text-foreground">
                      Anonymous to Reported Person
                    </Label>
                    <p className="text-[0.72rem] text-muted-foreground">
                      Your identity is not shown to the person reported, subject to institutional policy and due-process requirements.
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Urgency Section */}
            <div className="space-y-3 pt-2">
              <Label className="text-xs font-bold text-foreground">How urgent is this issue?</Label>
              <RadioGroup
                value={urgency}
                onValueChange={(v) => setUrgency(v as UrgencyLevel)}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                <div
                  className={cn(
                    "flex items-center space-x-2 rounded-lg border p-3 cursor-pointer",
                    urgency === "normal" ? "border-primary bg-primary/5 font-semibold" : "border-border hover:bg-muted/30",
                  )}
                  onClick={() => setUrgency("normal")}
                >
                  <RadioGroupItem value="normal" id="urg-normal" />
                  <Label htmlFor="urg-normal" className="text-xs cursor-pointer">Normal</Label>
                </div>

                <div
                  className={cn(
                    "flex items-center space-x-2 rounded-lg border p-3 cursor-pointer",
                    urgency === "urgent" ? "border-amber-500 bg-amber-500/10 font-semibold" : "border-border hover:bg-muted/30",
                  )}
                  onClick={() => setUrgency("urgent")}
                >
                  <RadioGroupItem value="urgent" id="urg-urgent" />
                  <Label htmlFor="urg-urgent" className="text-xs cursor-pointer text-amber-600 dark:text-amber-400">Urgent</Label>
                </div>

                <div
                  className={cn(
                    "flex items-center space-x-2 rounded-lg border p-3 cursor-pointer",
                    urgency === "immediate_safety" ? "border-destructive bg-destructive/10 font-semibold" : "border-border hover:bg-muted/30",
                  )}
                  onClick={() => setUrgency("immediate_safety")}
                >
                  <RadioGroupItem value="immediate_safety" id="urg-safety" />
                  <Label htmlFor="urg-safety" className="text-xs cursor-pointer text-destructive">Immediate Safety Concern</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Section 36.12 Emergency Safety Warning */}
            {urgency === "immediate_safety" && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-destructive space-y-2">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="size-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      Emergency Warning: Immediate Danger
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed">
                      "If you are in immediate danger, contact the college's emergency/security services immediately ({INSTITUTION.phone} or {INSTITUTION.antiRaggingPhone}). Submitting this form should not be used as an emergency response channel."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 7: Review & Submit */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <div className="border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">7. Review Complaint Before Submission</h3>
              <p className="text-xs text-muted-foreground">
                Please double check all submitted details. You can edit any section before final transmission.
              </p>
            </div>

            {/* Summary Review Cards */}
            <div className="space-y-4">
              {/* Student Info Card */}
              <div className="rounded-lg border border-border p-4 bg-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground">Complainant Details</span>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} className="h-6 text-[0.7rem] text-primary">
                    Edit
                  </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div><span className="text-muted-foreground">Name:</span> {studentProfile.name}</div>
                  <div><span className="text-muted-foreground">Roll No:</span> {studentProfile.rollNumber}</div>
                  <div><span className="text-muted-foreground">Dept:</span> {studentProfile.department}</div>
                </div>
              </div>

              {/* Incident Details Card */}
              <div className="rounded-lg border border-border p-4 bg-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground">Incident Information</span>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)} className="h-6 text-[0.7rem] text-primary">
                    Edit
                  </Button>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div><span className="text-muted-foreground">Title:</span> <span className="font-semibold">{title || "Untitled"}</span></div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div><span className="text-muted-foreground">Category:</span> {category}</div>
                    <div><span className="text-muted-foreground">Date:</span> {incidentDate} {incidentTime}</div>
                    <div><span className="text-muted-foreground">Location:</span> {location}</div>
                  </div>
                  <div className="pt-1">
                    <span className="text-muted-foreground">Description:</span>
                    <p className="mt-0.5 text-foreground bg-card p-2.5 rounded border border-border/60 whitespace-pre-wrap">{description}</p>
                  </div>
                </div>
              </div>

              {/* Persons Reported Card */}
              <div className="rounded-lg border border-border p-4 bg-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground">Persons Reported ({persons.length})</span>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentStep(3)} className="h-6 text-[0.7rem] text-primary">
                    Edit
                  </Button>
                </div>
                <div className="space-y-2 text-xs">
                  {persons.map((p, idx) => (
                    <div key={p.id} className="bg-card p-2.5 rounded border border-border/60">
                      <div className="font-semibold text-foreground">
                        {p.unknownDetails ? "Unidentified Person" : p.name} ({p.relationship})
                      </div>
                      {p.rollNumber && <div className="text-muted-foreground text-[0.7rem]">Roll: {p.rollNumber} · {p.department}</div>}
                      {p.details && <div className="text-muted-foreground text-[0.7rem] mt-0.5">Details: {p.details}</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Witnesses & Evidence */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border p-4 bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-foreground">Witnesses</span>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(4)} className="h-6 text-[0.7rem] text-primary">
                      Edit
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {hasWitnesses === "yes" ? `${witnesses.length} witness(es) listed` : `Witness presence: ${hasWitnesses}`}
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4 bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-foreground">Evidence Files</span>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(5)} className="h-6 text-[0.7rem] text-primary">
                      Edit
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {evidenceList.length > 0 ? `${evidenceList.length} file(s) attached` : "No files attached"}
                  </div>
                </div>
              </div>

              {/* Privacy & Urgency */}
              <div className="rounded-lg border border-border p-4 bg-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground">Privacy & Urgency</span>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentStep(6)} className="h-6 text-[0.7rem] text-primary">
                    Edit
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-muted-foreground">Confidentiality:</span> <span className="capitalize font-semibold">{privacyPreference.replace(/_/g, " ")}</span></div>
                  <div><span className="text-muted-foreground">Urgency:</span> <span className="capitalize font-semibold">{urgency.replace(/_/g, " ")}</span></div>
                </div>
              </div>
            </div>

            {/* Confirmation Checkbox */}
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3">
              <div className="flex items-start space-x-2.5">
                <Checkbox
                  id="declarationConfirm"
                  checked={confirmedAccuracy}
                  onCheckedChange={(c) => setConfirmedAccuracy(!!c)}
                  className="mt-0.5"
                />
                <label
                  htmlFor="declarationConfirm"
                  className="text-xs font-medium leading-relaxed text-foreground cursor-pointer"
                >
                  "I confirm that the information I have provided is accurate to the best of my knowledge."
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Stepper Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || submitting}
            className="text-xs gap-1.5"
          >
            <ChevronLeft className="size-4" /> Previous
          </Button>

          {currentStep < 7 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="text-xs bg-primary hover:bg-primary/90 gap-1.5 font-semibold"
            >
              Continue <ChevronRight className="size-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!confirmedAccuracy || submitting}
              className="text-xs bg-primary hover:bg-primary/90 gap-2 font-semibold shadow-md px-6"
            >
              {submitting ? "Submitting to Discipline Committee..." : "Submit Complaint"}
              {!submitting && <Check className="size-4" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
