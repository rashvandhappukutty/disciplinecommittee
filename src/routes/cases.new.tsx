import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Protected } from "@/components/dsim/Protected";
import { PageHeader, SecureTag } from "@/components/dsim/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEPARTMENTS, ACADEMIC_YEARS, YEARS_OF_STUDY } from "@/lib/dsim/mock-data";
import { useDsim } from "@/lib/dsim/store";
import { AddPersonModal } from "@/components/dsim/AddPersonModal";
import { PersonCard } from "@/components/dsim/common";
import type { Person } from "@/lib/dsim/types";
import { FolderPlus, UserPlus, Save, CheckCircle2, ArrowLeft, Shield } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cases/new")({
  head: () => ({
    meta: [
      { title: "Create New Case — DSIM" },
      { name: "description", content: "Initiate a new confidential disciplinary investigation." },
      { property: "og:title", content: "Create New Case — DSIM" },
      { property: "og:description", content: "Initiate a new confidential disciplinary investigation." },
    ],
  }),
  component: CreateCasePage,
});

function CreateCasePage() {
  const navigate = useNavigate();
  const { addCase, pushNotification } = useDsim();

  // Section 1: Case Information
  const [caseName, setCaseName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState(
    new Date().toTimeString().slice(0, 5),
  );

  // Section 2: Accused Student
  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [department, setDepartment] = useState<string>(DEPARTMENTS[0] || "");
  const [academicYear, setAcademicYear] = useState<string>(ACADEMIC_YEARS[0] || "");
  const [yearOfStudy, setYearOfStudy] = useState<string>(YEARS_OF_STUDY[1] || "");

  // Section 3: Additional Persons Involved
  const [involvedPersons, setInvolvedPersons] = useState<Person[]>([]);
  const [showAddPerson, setShowAddPerson] = useState(false);

  // Section 4: Initial Notes
  const [initialNotes, setInitialNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddPerson = (p: Omit<Person, "id">) => {
    const newPerson: Person = {
      ...p,
      id: Math.random().toString(36).slice(2, 9),
    };
    setInvolvedPersons((prev) => [...prev, newPerson]);
    toast.success(`Added ${p.name} to involved persons`);
  };

  const handleRemovePerson = (id: string) => {
    setInvolvedPersons((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCreate = (asDraft = false) => {
    if (!caseName.trim() || !studentName.trim() || !rollNumber.trim()) {
      toast.error("Please fill in required fields (Case Name, Student Name, Roll Number)");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      const investigationStart = startDate ? `${startDate}T${startTime}:00.000Z` : undefined;

      const created = addCase({
        caseName: caseName.trim(),
        description: description.trim() || "Initial investigation initiated.",
        accusedStudent: studentName.trim(),
        rollNumber: rollNumber.trim(),
        department: department || DEPARTMENTS[0] || "",
        academicYear: academicYear || ACADEMIC_YEARS[0] || "",
        yearOfStudy: yearOfStudy || YEARS_OF_STUDY[1] || "",
        involvedPersons,
        status: asDraft ? "Draft" : "Under Investigation",
        ...(investigationStart ? { investigationStart } : {}),
        ...(initialNotes.trim() ? { notes: initialNotes.trim() } : {}),
      });

      pushNotification({
        type: "investigation",
        message: `New case ${created.id} (${created.caseName}) was initiated.`,
        caseId: created.id,
      });

      toast.success(`Case ${created.id} created successfully.`);
      navigate({ to: "/cases/$caseId", params: { caseId: created.id } });
    }, 400);
  };

  return (
    <Protected>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/cases" })}
            className="text-xs text-muted-foreground hover:text-foreground gap-1.5"
          >
            <ArrowLeft className="size-3.5" /> Back to Cases
          </Button>
          <SecureTag>Confidential Case Intake</SecureTag>
        </div>

        <PageHeader
          eyebrow="Case Intake Protocol"
          title="Create New Disciplinary Case"
          subtitle="Enter the initial details of the incident, accused student, and involved witnesses."
        />

        <div className="space-y-6">
          {/* Section 1: Case Information */}
          <div className="surface p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                1
              </span>
              <h3 className="font-semibold text-sm">Case Information</h3>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="c-name" className="text-xs font-medium">Case Title / Primary Allegation *</Label>
                <Input
                  id="c-name"
                  placeholder="E.g., Laboratory Equipment Damage, Exam Irregularity, Hostel Curfew Violation"
                  value={caseName}
                  onChange={(e) => setCaseName(e.target.value)}
                  className="text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="c-desc" className="text-xs font-medium">Case Description & Incident Background *</Label>
                <Textarea
                  id="c-desc"
                  placeholder="Provide detailed context regarding when the incident occurred, location, initial reporting officer, and damage or infraction observed..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <Label htmlFor="c-date" className="text-xs font-medium">Investigation Start Date</Label>
                  <Input
                    id="c-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-xs font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-time" className="text-xs font-medium">Investigation Start Time</Label>
                  <Input
                    id="c-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Accused Student */}
          <div className="surface p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                2
              </span>
              <h3 className="font-semibold text-sm">Accused Student Particulars</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="s-name" className="text-xs font-medium">Student Full Name *</Label>
                <Input
                  id="s-name"
                  placeholder="E.g., Harish Kumar"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="s-roll" className="text-xs font-medium">Roll / Registration Number *</Label>
                <Input
                  id="s-roll"
                  placeholder="E.g., 21CS047"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="text-xs font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d} value={d} className="text-xs">{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Academic Year</Label>
                <Select value={academicYear} onValueChange={setAcademicYear}>
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ACADEMIC_YEARS.map((y) => (
                      <SelectItem key={y} value={y} className="text-xs">{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Year of Study</Label>
                <Select value={yearOfStudy} onValueChange={setYearOfStudy}>
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS_OF_STUDY.map((s) => (
                      <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Section 3: Additional Persons Involved */}
          <div className="surface p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  3
                </span>
                <div>
                  <h3 className="font-semibold text-sm">Additional Persons Involved</h3>
                  <p className="text-[0.7rem] text-muted-foreground">Witnesses, reporting staff, and accomplices</p>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowAddPerson(true)}
                className="gap-1.5 text-xs"
              >
                <UserPlus className="size-3.5" /> + Add Person
              </Button>
            </div>

            {/* Accused preview card + Involved list */}
            <div className="grid gap-3 sm:grid-cols-2">
              {studentName ? (
                <PersonCard
                  main
                  person={{
                    id: "accused-main",
                    name: studentName,
                    role: `${yearOfStudy} Student`,
                    department: department || DEPARTMENTS[0] || "",
                    rollNumber: rollNumber || "Pending Roll #",
                  }}
                />
              ) : (
                <div className="flex items-center justify-center rounded-xl border border-dashed border-border p-4 text-xs text-muted-foreground">
                  Fill in section 2 to preview main accused
                </div>
              )}

              {involvedPersons.map((person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  onRemove={() => handleRemovePerson(person.id)}
                />
              ))}
            </div>
          </div>

          {/* Section 4: Initial Notes */}
          <div className="surface p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                4
              </span>
              <h3 className="font-semibold text-sm">Initial Investigation Notes</h3>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-notes" className="text-xs font-medium">Preliminary Findings & Intake Observations</Label>
              <Textarea
                id="c-notes"
                placeholder="Record any immediate instructions given to the student, confiscated materials, or initial committee remarks..."
                value={initialNotes}
                onChange={(e) => setInitialNotes(e.target.value)}
                rows={4}
                className="text-xs"
              />
            </div>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/cases" })}
              className="w-full sm:w-auto text-xs"
            >
              Cancel
            </Button>

            <div className="flex gap-2.5 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                disabled={submitting}
                onClick={() => handleCreate(true)}
                className="flex-1 sm:flex-initial text-xs gap-1.5"
              >
                <Save className="size-3.5" /> Save Draft
              </Button>
              <Button
                type="button"
                disabled={submitting}
                onClick={() => handleCreate(false)}
                className="flex-1 sm:flex-initial text-xs gap-1.5 bg-primary hover:bg-primary/90"
              >
                <CheckCircle2 className="size-3.5" /> Create Case & Begin Investigation
              </Button>
            </div>
          </div>
        </div>

        {/* Add Person Modal */}
        <AddPersonModal
          open={showAddPerson}
          onOpenChange={setShowAddPerson}
          onAdd={handleAddPerson}
        />
      </div>
    </Protected>
  );
}
