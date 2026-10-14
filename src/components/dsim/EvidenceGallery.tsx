import { useState } from "react";
import {
  Camera,
  Video,
  Music,
  FileText,
  Upload,
  Plus,
  MoreVertical,
  Trash2,
  Download,
  Eye,
  FileBox,
  Image as ImageIcon,
  FileUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState, ConfirmDialog } from "./common";
import { EvidenceCaptureModal } from "./EvidenceCaptureModal";
import { EvidenceDetailModal } from "./EvidenceDetailModal";
import { DocumentUploadModal } from "./DocumentUploadModal";
import { evLabel } from "@/lib/dsim/store";
import { fmtDateTime } from "@/lib/dsim/format";
import type { Evidence, EvidenceType } from "@/lib/dsim/types";
import { toast } from "sonner";

interface EvidenceGalleryProps {
  caseId: string;
  evidence: Evidence[];
  onAddEvidence: (e: Omit<Evidence, "id" | "number" | "caseId" | "timestamp">) => void;
  onUpdateEvidence?: (evId: string, patch: Partial<Evidence>, custodyAction?: string) => void;
  onRemoveEvidence: (evId: string) => void;
  onViewTranscript?: (evId: string) => void;
  onGenerateTranscript?: (evId: string) => void;
}

export function EvidenceGallery({
  caseId,
  evidence,
  onAddEvidence,
  onUpdateEvidence,
  onRemoveEvidence,
  onViewTranscript,
  onGenerateTranscript,
}: EvidenceGalleryProps) {
  const [tab, setTab] = useState<string>("all");
  const [captureType, setCaptureType] = useState<"photo" | "video" | null>(null);
  const [showDocUpload, setShowDocUpload] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredEvidence = evidence.filter((e) => {
    if (tab === "all") return true;
    return e.type === tab;
  });

  const handleCaptureSave = (data: {
    type: "photo" | "video";
    fileName: string;
    fileSize?: string;
    description: string;
    capturedBy?: string;
    durationSec?: number;
    url?: string;
  }) => {
    onAddEvidence(data);
    toast.success(`Added ${data.type === "photo" ? "photographic" : "video"} evidence to ${caseId}`);
  };

  const getTypeIcon = (type: EvidenceType) => {
    switch (type) {
      case "audio":
        return <Music className="size-4 text-indigo-500" />;
      case "photo":
        return <ImageIcon className="size-4 text-emerald-500" />;
      case "video":
        return <Video className="size-4 text-rose-500" />;
      case "document":
        return <FileText className="size-4 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={tab} onValueChange={setTab} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-5 w-full sm:w-auto">
            <TabsTrigger value="all" className="text-xs">
              All ({evidence.length})
            </TabsTrigger>
            <TabsTrigger value="audio" className="text-xs">
              Audio ({evidence.filter((e) => e.type === "audio").length})
            </TabsTrigger>
            <TabsTrigger value="photo" className="text-xs">
              Photos ({evidence.filter((e) => e.type === "photo").length})
            </TabsTrigger>
            <TabsTrigger value="video" className="text-xs">
              Videos ({evidence.filter((e) => e.type === "video").length})
            </TabsTrigger>
            <TabsTrigger value="document" className="text-xs">
              Docs ({evidence.filter((e) => e.type === "document").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCaptureType("photo")}
            className="text-xs gap-1.5"
          >
            <Camera className="size-3.5" /> Capture Photo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCaptureType("video")}
            className="text-xs gap-1.5"
          >
            <Video className="size-3.5" /> Capture Video
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDocUpload(true)}
            className="text-xs gap-1.5"
          >
            <FileUp className="size-3.5" /> Upload Document
          </Button>
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredEvidence.length === 0 ? (
        <EmptyState
          icon={FileBox}
          title="No evidence collected yet"
          description="Capture photos, videos, or upload official documents to build case documentation."
          action={
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setCaptureType("photo")} className="gap-1.5 text-xs">
                <Camera className="size-3.5" /> Capture Photo
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowDocUpload(true)} className="gap-1.5 text-xs">
                <FileUp className="size-3.5" /> Upload Document
              </Button>
            </div>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEvidence.map((e) => (
            <div
              key={e.id}
              className="surface group relative flex flex-col justify-between overflow-hidden p-3.5 transition-all hover:shadow-md hover:border-border/90"
            >
              <div>
                {/* Thumbnail / Media placeholder */}
                <div
                  onClick={() => setSelectedEvidence(e)}
                  className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg bg-muted/60 flex items-center justify-center transition-colors group-hover:bg-muted"
                >
                  <div className="grid size-10 place-items-center rounded-xl bg-card shadow-xs">
                    {getTypeIcon(e.type)}
                  </div>
                  <span className="absolute bottom-2 left-2 rounded bg-background/90 px-1.5 py-0.5 font-mono text-[0.65rem] text-foreground backdrop-blur">
                    {evLabel(e.number)}
                  </span>
                  {e.durationSec && (
                    <span className="absolute bottom-2 right-2 rounded bg-background/90 px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground backdrop-blur">
                      {Math.floor(e.durationSec / 60)}:
                      {String(e.durationSec % 60).padStart(2, "0")}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="mt-3">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
                      {e.type} {e.fileSize ? `· ${e.fileSize}` : ""}
                    </span>
                    <span className="text-[0.68rem] text-muted-foreground">
                      {fmtDateTime(e.timestamp)}
                    </span>
                  </div>
                  <h4
                    onClick={() => setSelectedEvidence(e)}
                    className="mt-1 line-clamp-1 cursor-pointer font-medium text-xs text-foreground hover:underline"
                    title={e.description}
                  >
                    {e.description || e.fileName}
                  </h4>
                  <p className="mt-0.5 line-clamp-1 font-mono text-[0.65rem] text-muted-foreground">
                    {e.fileName}
                  </p>
                </div>
              </div>

              {/* Action row */}
              <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2 text-xs">
                <button
                  onClick={() => setSelectedEvidence(e)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <Eye className="size-3" /> Inspect & Custody
                </button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-7">
                      <MoreVertical className="size-3.5" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => setSelectedEvidence(e)}>
                      <Eye className="size-3.5 mr-2" /> Inspect Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        const blob = new Blob([`Evidence: ${e.fileName}`], { type: "text/plain" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = e.fileName;
                        a.click();
                      }}
                    >
                      <Download className="size-3.5 mr-2" /> Download
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onSelect={() => setDeletingId(e.id)}
                    >
                      <Trash2 className="size-3.5 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Capture Modal */}
      {captureType && (
        <EvidenceCaptureModal
          open={!!captureType}
          onOpenChange={(open) => !open && setCaptureType(null)}
          type={captureType}
          caseId={caseId}
          onSave={handleCaptureSave}
        />
      )}

      {/* Document Upload Modal (35.11) */}
      <DocumentUploadModal
        open={showDocUpload}
        onOpenChange={setShowDocUpload}
        caseId={caseId}
        onUploadDocument={(doc) => {
          onAddEvidence({
            type: doc.type,
            fileName: doc.fileName,
            fileSize: doc.fileSize,
            description: doc.description,
            capturedBy: doc.capturedBy,
          });
        }}
      />

      {/* Evidence Detail Modal */}
      <EvidenceDetailModal
        evidence={selectedEvidence}
        open={!!selectedEvidence}
        onOpenChange={(open) => !open && setSelectedEvidence(null)}
        onUpdateEvidence={onUpdateEvidence}
        onViewTranscript={onViewTranscript}
        onGenerateTranscript={onGenerateTranscript}
        onDelete={(id) => {
          onRemoveEvidence(id);
          setSelectedEvidence(null);
          toast.success("Evidence item removed");
        }}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deletingId}
        onOpenChange={(open) => !open && setDeletingId(null)}
        title="Delete Evidence Record?"
        description="This action cannot be undone. The evidence file and hash record will be permanently purged from the case file."
        destructive
        confirmLabel="Delete Evidence"
        onConfirm={() => {
          if (deletingId) {
            onRemoveEvidence(deletingId);
            setDeletingId(null);
            toast.success("Evidence deleted successfully");
          }
        }}
      />
    </div>
  );
}
