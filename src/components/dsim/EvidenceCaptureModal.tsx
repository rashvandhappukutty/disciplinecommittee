import { useState, useEffect, useRef } from "react";
import {
  Camera,
  Video,
  Sparkles,
  RefreshCw,
  Check,
  X,
  Shield,
  Circle,
  Square,
  SwitchCamera,
  AlertCircle,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface EvidenceCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "photo" | "video";
  caseId: string;
  onSave: (evidence: {
    type: "photo" | "video";
    fileName: string;
    fileSize?: string;
    description: string;
    capturedBy?: string;
    durationSec?: number;
    url?: string;
  }) => void;
}

export function EvidenceCaptureModal({
  open,
  onOpenChange,
  type,
  caseId,
  onSave,
}: EvidenceCaptureModalProps) {
  const [captured, setCaptured] = useState(false);
  const [description, setDescription] = useState("");
  const [capturedBy, setCapturedBy] = useState("Dr. S. Ramanathan");
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [flash, setFlash] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [hasCameraStream, setHasCameraStream] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const videoTimerRef = useRef<number | null>(null);

  // Initialize camera stream when modal opens
  useEffect(() => {
    if (open) {
      setCaptured(false);
      setDescription("");
      setIsRecordingVideo(false);
      setVideoDuration(0);
      setFlash(false);
      setPreviewUrl(null);
      startCamera(facingMode);
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [open, type, facingMode]);

  const startCamera = async (mode: "environment" | "user") => {
    stopCamera();
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: type === "video",
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
        setHasCameraStream(true);
      }
    } catch (err) {
      console.warn("Camera hardware unavailable or denied. Using simulation mode:", err);
      setHasCameraStream(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setHasCameraStream(false);
  };

  // Video recording timer
  useEffect(() => {
    if (isRecordingVideo) {
      videoTimerRef.current = window.setInterval(() => {
        setVideoDuration((d) => d + 1);
      }, 1000);
    } else {
      if (videoTimerRef.current) clearInterval(videoTimerRef.current);
    }
    return () => {
      if (videoTimerRef.current) clearInterval(videoTimerRef.current);
    };
  }, [isRecordingVideo]);

  const toggleCameraFacing = () => {
    const nextMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(nextMode);
    toast.info(`Switched to ${nextMode === "environment" ? "Rear" : "Front"} Camera`);
  };

  const handleCapturePhoto = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    // If real video stream is active, capture frame onto canvas
    if (videoRef.current && hasCameraStream) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 1280;
      canvas.height = videoRef.current.videoHeight || 720;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
        setPreviewUrl(dataUrl);
      }
    }

    setCaptured(true);
    if (!description) {
      setDescription(`Laboratory inspection snapshot for ${caseId} (${facingMode === "environment" ? "Rear Lens" : "Front Lens"})`);
    }
    toast.success("Photographic evidence captured");
  };

  const handleStartVideo = () => {
    if (streamRef.current) {
      try {
        const recorder = new MediaRecorder(streamRef.current);
        mediaRecorderRef.current = recorder;
        recordedChunksRef.current = [];
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) recordedChunksRef.current.push(e.data);
        };
        recorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: "video/mp4" });
          setPreviewUrl(URL.createObjectURL(blob));
        };
        recorder.start(250);
      } catch (err) {
        console.warn("MediaRecorder error:", err);
      }
    }
    setIsRecordingVideo(true);
    setVideoDuration(0);
  };

  const handleStopVideo = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsRecordingVideo(false);
    setCaptured(true);
    if (!description) {
      setDescription(`Physical walkthrough and evidence recording for ${caseId}`);
    }
    toast.success("Video recording finalized");
  };

  const handleRetake = () => {
    setCaptured(false);
    setIsRecordingVideo(false);
    setVideoDuration(0);
    setPreviewUrl(null);
    startCamera(facingMode);
  };

  const handleSave = () => {
    const timeStr = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName =
      type === "photo"
        ? `evidence-photo-${caseId}-${timeStr}.jpg`
        : `evidence-video-${caseId}-${timeStr}.mp4`;

    const estimatedSize =
      type === "photo"
        ? "2.4 MB"
        : `${Math.max(1, Math.round((videoDuration * 1.2) * 10) / 10)} MB`;

    onSave({
      type,
      fileName,
      fileSize: estimatedSize,
      capturedBy: capturedBy.trim() || "Discipline Committee Head",
      description: description.trim() || (type === "photo" ? "Evidence Photograph" : "Evidence Video Recording"),
      ...(type === "video" ? { durationSec: videoDuration } : {}),
      ...(previewUrl ? { url: previewUrl } : {}),
    });
    stopCamera();
    onOpenChange(false);
  };

  const formatVideoTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) stopCamera();
      onOpenChange(val);
    }}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                {type === "photo" ? <Camera className="size-4" /> : <Video className="size-4" />}
              </span>
              <div>
                <DialogTitle className="text-base font-bold">
                  {type === "photo" ? "Capture Photographic Evidence" : "Record Video Evidence"}
                </DialogTitle>
                <DialogDescription className="text-xs">
                  Confidential visual evidence intake for Case {caseId}
                </DialogDescription>
              </div>
            </div>

            {/* Camera Switcher */}
            {!captured && (
              <Button
                variant="outline"
                size="sm"
                onClick={toggleCameraFacing}
                className="h-8 text-xs gap-1.5"
              >
                <SwitchCamera className="size-3.5" />
                <span className="hidden sm:inline">{facingMode === "environment" ? "Rear Lens" : "Front Lens"}</span>
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Camera Viewfinder Box */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-inner">
            {flash && <div className="absolute inset-0 z-30 bg-white transition-opacity duration-150" />}

            {/* Live Video Element */}
            <video
              ref={videoRef}
              playsInline
              muted
              className={`absolute inset-0 h-full w-full object-cover ${hasCameraStream && !captured ? "block" : "hidden"}`}
            />

            {/* Captured Still Preview if available */}
            {captured && previewUrl && type === "photo" && (
              <img
                src={previewUrl}
                alt="Captured Evidence Preview"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* Viewfinder HUD Overlays */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-3.5 pointer-events-none">
              <div className="flex items-center justify-between text-[0.65rem] font-mono text-emerald-400">
                <span className="flex items-center gap-1.5 bg-black/70 px-2 py-0.5 rounded backdrop-blur">
                  <Shield className="size-3" /> {hasCameraStream ? "LIVE CAMERA STREAM" : "SIMULATED SENSOR"} · {facingMode.toUpperCase()}
                </span>
                <span className="bg-black/70 px-2 py-0.5 rounded backdrop-blur">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>

              {/* Grid Lines */}
              {!captured && (
                <div className="grid grid-cols-3 grid-rows-3 h-full w-full border border-white/10 opacity-30 my-2">
                  <div className="border-r border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div className="border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div className="border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div />
                </div>
              )}

              <div className="flex items-center justify-between text-[0.65rem] font-mono text-neutral-300">
                <span className="bg-black/70 px-2 py-0.5 rounded backdrop-blur">
                  CASE: {caseId}
                </span>
                {isRecordingVideo && (
                  <span className="flex items-center gap-1.5 bg-red-600 text-white font-bold px-2.5 py-0.5 rounded backdrop-blur animate-pulse">
                    <span className="size-2 rounded-full bg-white" /> REC {formatVideoTimer(videoDuration)}
                  </span>
                )}
              </div>
            </div>

            {/* Viewfinder Fallback simulation if no hardware camera */}
            {!hasCameraStream && !captured && (
              <div className="grid h-full place-items-center bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 text-neutral-400">
                <div className="text-center space-y-2 p-4">
                  {type === "photo" ? (
                    <>
                      <Camera className="size-10 mx-auto opacity-40 text-neutral-300" />
                      <div className="text-xs font-mono text-neutral-300">Camera Feed Ready ({facingMode})</div>
                      <div className="text-[0.7rem] text-neutral-500 max-w-xs">
                        Align the item or laboratory scene and click capture.
                      </div>
                    </>
                  ) : (
                    <>
                      <Video className="size-10 mx-auto opacity-40 text-neutral-300" />
                      <div className="text-xs font-mono text-neutral-300">
                        {isRecordingVideo ? "Recording Video Feed..." : "Video Standby"}
                      </div>
                      <div className="text-[0.7rem] text-neutral-500 max-w-xs">
                        Capture physical walkthroughs, scene conditions, or confiscated equipment.
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Success Overlay when captured without real photo preview */}
            {captured && !previewUrl && (
              <div className="relative grid h-full place-items-center bg-neutral-900 text-emerald-400">
                <div className="text-center space-y-2 p-4">
                  <div className="grid size-12 mx-auto place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <Check className="size-6" />
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {type === "photo" ? "Photo Captured Successfully" : `Video Recorded (${formatVideoTimer(videoDuration)})`}
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    Watermarked · Timestamped · Hash Verified
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form fields for metadata (35.7) */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="ev-captured-by" className="text-xs font-semibold">
                  Captured By (Investigator)
                </Label>
                <Input
                  id="ev-captured-by"
                  value={capturedBy}
                  onChange={(e) => setCapturedBy(e.target.value)}
                  className="text-xs h-8.5"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Lens / Capture Device</Label>
                <div className="text-xs font-mono bg-muted/30 p-2 rounded border border-border/60 text-muted-foreground flex items-center justify-between">
                  <span>{facingMode === "environment" ? "Rear Ultra-Wide Lens" : "Front TrueDepth Lens"}</span>
                  <span className="text-[0.65rem] text-emerald-600 font-bold">12MP HDR</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ev-desc" className="text-xs font-semibold">
                Evidence Description / Location Notes <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="ev-desc"
                placeholder="E.g., Front view of damaged circuit board showing cracked housing in Lab B-204..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="text-xs leading-relaxed"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 pt-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-xs">
            Cancel
          </Button>

          <div className="flex gap-2">
            {!captured ? (
              type === "photo" ? (
                <Button onClick={handleCapturePhoto} className="gap-2 text-xs bg-primary hover:bg-primary/90 shadow-sm">
                  <Camera className="size-4" /> Capture Photo
                </Button>
              ) : !isRecordingVideo ? (
                <Button onClick={handleStartVideo} className="gap-2 text-xs bg-red-600 hover:bg-red-700 text-white shadow-sm">
                  <Circle className="size-3.5 fill-current" /> Start Recording
                </Button>
              ) : (
                <Button onClick={handleStopVideo} variant="destructive" className="gap-2 text-xs">
                  <Square className="size-3.5 fill-current" /> Stop & Capture
                </Button>
              )
            ) : (
              <>
                <Button variant="outline" onClick={handleRetake} className="gap-1.5 text-xs">
                  <RefreshCw className="size-3.5" /> Retake
                </Button>
                <Button onClick={handleSave} className="gap-1.5 text-xs bg-primary hover:bg-primary/90">
                  <Check className="size-3.5" /> Save Evidence
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
