import { useState, useRef } from "react";
import { FileUp, FileText, Upload, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { EvidenceType } from "@/lib/dsim/types";
import { toast } from "sonner";

interface DocumentUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseId: string;
  onUploadDocument: (data: {
    type: EvidenceType;
    fileName: string;
    fileSize: string;
    description: string;
    capturedBy: string;
  }) => void;
}

export function DocumentUploadModal({
  open,
  onOpenChange,
  caseId,
  onUploadDocument,
}: DocumentUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
    type: EvidenceType;
  } | null>(null);
  const [docType, setDocType] = useState<EvidenceType>("document");
  const [description, setDescription] = useState("");
  const [capturedBy, setCapturedBy] = useState("Dr. S. Ramanathan");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      let detectedType: EvidenceType = "document";
      if (file.type.startsWith("image/")) detectedType = "photo";
      else if (file.type.startsWith("video/")) detectedType = "video";
      else if (file.type.startsWith("audio/")) detectedType = "audio";

      const sizeFormatted =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.max(1, Math.round(file.size / 1024))} KB`;

      setSelectedFile({
        name: file.name,
        size: sizeFormatted,
        type: detectedType,
      });
      setDocType(detectedType);
    }
  };

  const handleSimulateSelect = (name: string, size: string, type: EvidenceType) => {
    setSelectedFile({ name, size, type });
    setDocType(type);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a document or attachment file.");
      return;
    }
    if (!description.trim()) {
      toast.error("Please add a brief description of the document.");
      return;
    }

    onUploadDocument({
      type: docType,
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      description: description.trim(),
      capturedBy: capturedBy.trim() || "Discipline Committee Head",
    });

    toast.success(`Attached ${selectedFile.name} to Case ${caseId}`);
    setSelectedFile(null);
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
              <FileUp className="size-5" />
            </span>
            <div>
              <DialogTitle className="text-base font-bold">Upload Supporting Document</DialogTitle>
              <DialogDescription className="text-xs">
                Attach official memos, lab logs, scanned undertaking letters, or CCTV export files.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* File Picker Area */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webm,.mp4,.txt"
            onChange={handleFileChange}
          />

          {!selectedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/60 hover:bg-muted/30 transition-all space-y-2"
            >
              <Upload className="size-8 mx-auto text-muted-foreground" />
              <div className="text-xs font-semibold text-foreground">Click to browse or drop file here</div>
              <p className="text-[0.68rem] text-muted-foreground">
                Supported formats: PDF, DOC/DOCX, PNG/JPG, MP4, WebM (Max 25MB)
              </p>

              {/* Fast Simulated Presets */}
              <div className="pt-2 flex flex-wrap justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => handleSimulateSelect("Lab_Register_Log_Oct04.pdf", "1.4 MB", "document")}
                  className="rounded bg-secondary px-2 py-0.5 text-[0.65rem] text-muted-foreground hover:text-foreground"
                >
                  + Sample Lab Log (PDF)
                </button>
                <button
                  type="button"
                  onClick={() => handleSimulateSelect("Parent_Undertaking_Letter.pdf", "890 KB", "document")}
                  className="rounded bg-secondary px-2 py-0.5 text-[0.65rem] text-muted-foreground hover:text-foreground"
                >
                  + Parent Undertaking (PDF)
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <FileText className="size-5" />
                </span>
                <div>
                  <div className="font-semibold text-xs text-foreground truncate max-w-[200px]">
                    {selectedFile.name}
                  </div>
                  <div className="text-[0.68rem] text-muted-foreground">
                    {selectedFile.size} · {selectedFile.type.toUpperCase()}
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7 text-muted-foreground hover:text-destructive"
                onClick={() => setSelectedFile(null)}
              >
                <X className="size-4" />
              </Button>
            </div>
          )}

          {/* Classification / Category */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Document Category</Label>
            <Select value={docType} onValueChange={(v) => setDocType(v as EvidenceType)}>
              <SelectTrigger className="text-xs h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="document" className="text-xs">Official Document / PDF / Scan</SelectItem>
                <SelectItem value="photo" className="text-xs">Photographic Exhibit (JPG/PNG)</SelectItem>
                <SelectItem value="video" className="text-xs">Video Surveillance / Footage (MP4)</SelectItem>
                <SelectItem value="audio" className="text-xs">Supplemental Audio Recording</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Uploaded By */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Uploaded By (Custodian)</Label>
            <Input
              value={capturedBy}
              onChange={(e) => setCapturedBy(e.target.value)}
              className="text-xs h-9"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">
              Description & Context <span className="text-destructive">*</span>
            </Label>
            <Textarea
              rows={3}
              placeholder="E.g., Signed acknowledgment from student regarding equipment handling policy..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-xs leading-relaxed"
            />
          </div>

          <DialogFooter className="flex justify-between sm:justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={!selectedFile}
              className="bg-primary hover:bg-primary/90 text-xs gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="size-3.5" /> Save to Case Dossier
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
