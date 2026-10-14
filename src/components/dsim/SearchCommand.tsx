import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { FileText, FolderOpen, Search, User } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useDsim, evLabel } from "@/lib/dsim/store";

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const { cases } = useDsim();
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (caseId: string) => {
    setOpen(false);
    navigate({ to: "/cases/$caseId", params: { caseId } });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 w-full max-w-sm items-center gap-2 rounded-lg border border-input bg-card px-3 text-sm text-muted-foreground transition-colors hover:border-ring/40"
        aria-label="Search cases, students, evidence"
      >
        <Search className="size-4" />
        <span className="hidden truncate sm:inline">Search cases, students, roll no…</span>
        <kbd className="ml-auto hidden rounded border border-border bg-muted px-1.5 font-mono text-[0.65rem] lg:inline">
          ⌘K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search by case ID, name, student, roll number, department…" />
        <CommandList>
          <CommandEmpty>No matching records.</CommandEmpty>
          <CommandGroup heading="Cases">
            {cases.map((c) => (
              <CommandItem key={c.id} value={`${c.id} ${c.caseName} ${c.department}`} onSelect={() => go(c.id)}>
                <FolderOpen className="size-4" />
                <span className="font-mono text-xs">{c.id}</span> — {c.caseName}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Students">
            {cases.map((c) => (
              <CommandItem
                key={c.id + "s"}
                value={`${c.accusedStudent} ${c.rollNumber} ${c.department} student`}
                onSelect={() => go(c.id)}
              >
                <User className="size-4" />
                {c.accusedStudent}
                <span className="ml-auto font-mono text-xs text-muted-foreground">{c.rollNumber}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Evidence">
            {cases.flatMap((c) =>
              c.evidence.map((e) => (
                <CommandItem key={e.id} value={`${evLabel(e.number)} ${e.description} ${c.id} evidence`} onSelect={() => go(c.id)}>
                  <FileText className="size-4" />
                  {evLabel(e.number)} — {e.description}
                  <span className="ml-auto font-mono text-xs text-muted-foreground">{c.id}</span>
                </CommandItem>
              )),
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
