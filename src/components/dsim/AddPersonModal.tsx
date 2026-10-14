import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEPARTMENTS } from "@/lib/dsim/mock-data";
import type { Person } from "@/lib/dsim/types";

interface AddPersonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (person: Omit<Person, "id">) => void;
}

export function AddPersonModal({ open, onOpenChange, onAdd }: AddPersonModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Witness");
  const [department, setDepartment] = useState<string>(DEPARTMENTS[0] || "");
  const [rollNumber, setRollNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      name: name.trim(),
      role: role.trim(),
      department: department || DEPARTMENTS[0] || "",
      ...(rollNumber.trim() ? { rollNumber: rollNumber.trim() } : {}),
    });
    setName("");
    setRole("Witness");
    setRollNumber("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-secondary text-primary">
              <UserPlus className="size-4" />
            </span>
            <div>
              <DialogTitle>Add Involved Person</DialogTitle>
              <DialogDescription>
                Record witness, accomplice, or reporting faculty in case record.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="p-name" className="text-xs">Full Name *</Label>
            <Input
              id="p-name"
              placeholder="E.g., Sukesh R"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="p-role" className="text-xs">Role / Involvement *</Label>
            <Input
              id="p-role"
              placeholder="E.g., Present during incident / Eyewitness / Invigilator"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={d} value={d} className="text-xs">
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="p-roll" className="text-xs">Roll Number (Optional)</Label>
              <Input
                id="p-roll"
                placeholder="E.g., 21CS052"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="text-xs font-mono"
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button type="button" variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Add Person
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
