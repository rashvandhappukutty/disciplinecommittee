import { useState, useEffect } from "react";
import { Edit3, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEPARTMENTS, ACADEMIC_YEARS, YEARS_OF_STUDY } from "@/lib/dsim/mock-data";
import { ALL_STATUSES } from "@/lib/dsim/types";
import type { CaseRecord, CaseStatus } from "@/lib/dsim/types";
import { toast } from "sonner";

interface EditCaseModalProps {
  caseRecord: CaseRecord;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (patch: Partial<CaseRecord>) => void;
}

export function EditCaseModal({
  caseRecord,
  open,
  onOpenChange,
  onSave,
}: EditCaseModalProps) {
  const [caseName, setCaseName] = useState(caseRecord.caseName);
  const [description, setDescription] = useState(caseRecord.description);
  const [accusedStudent, setAccusedStudent] = useState(caseRecord.accusedStudent);
  const [rollNumber, setRollNumber] = useState(caseRecord.rollNumber);
  const [department, setDepartment] = useState(caseRecord.department);
  const [academicYear, setAcademicYear] = useState(caseRecord.academicYear);
  const [yearOfStudy, setYearOfStudy] = useState(caseRecord.yearOfStudy);
  const [status, setStatus] = useState<CaseStatus>(caseRecord.status);

  useEffect(() => {
    setCaseName(caseRecord.caseName);
    setDescription(caseRecord.description);
    setAccusedStudent(caseRecord.accusedStudent);
    setRollNumber(caseRecord.rollNumber);
    setDepartment(caseRecord.department);
    setAcademicYear(caseRecord.academicYear);
    setYearOfStudy(caseRecord.yearOfStudy);
    setStatus(caseRecord.status);
  }, [caseRecord, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      caseName: caseName.trim(),
      description: description.trim(),
      accusedStudent: accusedStudent.trim(),
      rollNumber: rollNumber.trim(),
      department,
      academicYear,
      yearOfStudy,
      status,
    });
    onOpenChange(false);
    toast.success(`Updated Case details for ${caseRecord.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-secondary text-primary">
              <Edit3 className="size-4" />
            </span>
            <div>
              <DialogTitle>Edit Case Details — {caseRecord.id}</DialogTitle>
              <DialogDescription>
                Modify case particulars, allegations, or student record references.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="edit-title" className="text-xs">Case Title *</Label>
            <Input
              id="edit-title"
              value={caseName}
              onChange={(e) => setCaseName(e.target.value)}
              required
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-desc" className="text-xs">Case Incident Description *</Label>
            <Textarea
              id="edit-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
              className="text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="edit-accused" className="text-xs">Main Accused Student *</Label>
              <Input
                id="edit-accused"
                value={accusedStudent}
                onChange={(e) => setAccusedStudent(e.target.value)}
                required
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-roll" className="text-xs">Roll Number *</Label>
              <Input
                id="edit-roll"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
                className="text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Department</Label>
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
              <Label className="text-xs">Academic Year</Label>
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
              <Label className="text-xs">Year of Study</Label>
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

          <div className="space-y-1.5">
            <Label className="text-xs">Investigation Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as CaseStatus)}>
              <SelectTrigger className="text-xs font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ALL_STATUSES.map((st) => (
                  <SelectItem key={st} value={st} className="text-xs">{st}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-4">
            <Button type="button" variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" className="gap-1.5">
              <Check className="size-3.5" /> Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
