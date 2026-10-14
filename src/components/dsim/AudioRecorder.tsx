import { useState, useEffect, useRef, useCallback } from "react";
import {
  Mic,
  MicOff,
  Square,
  Play,
  Pause,
  RotateCcw,
  Download,
  Trash2,
  Volume2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Radio,
  Save,
  MessageSquare,
  Info,
  Sliders,
  ShieldCheck,
  Users,
  FileCheck,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { RecordingParticipant } from "@/lib/dsim/types";

export interface AudioRecordingPayload {
  recordingId: string;
  sessionId: string;
  durationSec: number;
  fileName: string;
  url?: string | undefined;
  rawBlob?: Blob | undefined;
  mimeType: string;
  fileSize: string;
  recordedAt: string;
  recordedBy: string;
  recordedByRole: string;
  recordingType: string;
  participants: RecordingParticipant[];
  audioHash?: string | undefined;
}

interface AudioRecorderProps {
  caseId?: string | undefined;
  caseName?: string | undefined;
  accusedStudent?: string | undefined;
  recordedBy?: string | undefined;
  recordedByRole?: string | undefined;
  onRecordingComplete?: ((recording: AudioRecordingPayload) => void) | undefined;
  onSaveRecording?: ((recording: AudioRecordingPayload) => void) | undefined;
  onGenerateTranscript?: (() => void) | undefined;
  onStartRecording?: (() => void) | undefined;
  isProcessing?: boolean | undefined;
}

type MicPermissionState = "prompt" | "granted" | "denied" | "unavailable" | "unsupported";

export function AudioRecorder({
  caseId = "DSIM-2026-00001",
  caseName = "Investigation Hearing",
  accusedStudent = "Student Respondent",
  recordedBy = "Discipline Committee Head",
  recordedByRole = "Discipline Committee Head",
  onRecordingComplete,
  onSaveRecording,
  onGenerateTranscript,
  onStartRecording,
  isProcessing: externalProcessing = false,
}: AudioRecorderProps) {
  // Session & Metadata State
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    return `INV-AUD-${new Date().getFullYear()}-${randomSuffix}`;
  });
  const [recordingType, setRecordingType] = useState<string>("Investigation Interview");
  const [participantsList, setParticipantsList] = useState<RecordingParticipant[]>([
    { name: recordedBy, role: recordedByRole },
    { name: accusedStudent, role: "Student / Respondent" },
  ]);
  const [newWitnessName, setNewWitnessName] = useState<string>("");

  // Permission & Hardware
  const [micPermission, setMicPermission] = useState<MicPermissionState>("prompt");
  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("default");

  // Recording Lifecycle
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedMimeType, setSelectedMimeType] = useState<string>("audio/webm;codecs=opus");

  // Audio Playback & Speed
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [savedDuration, setSavedDuration] = useState(0);
  const [volume, setVolume] = useState(85);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  // Live Microphone Monitoring & Web Audio API
  const [micAudioLevel, setMicAudioLevel] = useState(0); // 0 to 100
  const [frequencyData, setFrequencyData] = useState<number[]>(new Array(32).fill(12));
  const [showLiveTranscription, setShowLiveTranscription] = useState(false);

  // Modals
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showStopConfirm, setShowStopConfirm] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // 1. Detect dynamic MIME type supported by browser
  const getSupportedMimeType = useCallback((): string => {
    if (typeof window === "undefined" || typeof MediaRecorder === "undefined") {
      return "audio/webm";
    }
    const preferredTypes = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg;codecs=opus",
      "audio/ogg",
      "audio/mp4",
      "audio/aac",
    ];
    for (const mime of preferredTypes) {
      if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(mime)) {
        return mime;
      }
    }
    return "audio/webm";
  }, []);

  // 2. Query permissions & list available input devices
  useEffect(() => {
    if (typeof window === "undefined" || !navigator.mediaDevices) {
      setMicPermission("unsupported");
      return;
    }

    const mime = getSupportedMimeType();
    setSelectedMimeType(mime);

    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "microphone" as PermissionName })
        .then((status) => {
          setMicPermission(status.state as MicPermissionState);
          status.onchange = () => {
            setMicPermission(status.state as MicPermissionState);
          };
        })
        .catch(() => {
          setMicPermission("prompt");
        });
    }

    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const audioInputs = devices.filter((d) => d.kind === "audioinput");
        setAvailableDevices(audioInputs);
      })
      .catch((err) => {
        console.warn("Could not enumerate audio devices:", err);
      });
  }, [getSupportedMimeType]);

  // 3. Prevent accidental unsaved page leave
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasRecording && !isSaved) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasRecording, isSaved]);

  // 4. Recording duration timer (accurate pause/resume behavior)
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, isPaused]);

  // 5. Cleanup streams & audio context
  const cleanupAudioPipeline = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      try {
        audioContextRef.current.close();
      } catch {}
      audioContextRef.current = null;
    }
    setMicAudioLevel(0);
    setFrequencyData(new Array(32).fill(12));
  };

  useEffect(() => {
    return () => {
      cleanupAudioPipeline();
    };
  }, []);

  // 6. Test/Request real mic access
  const requestMicAccess = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMicPermission("unsupported");
        toast.error("Browser does not support microphone recording.");
        return;
      }
      const testStream = await navigator.mediaDevices.getUserMedia({
        audio: selectedDeviceId !== "default" ? { deviceId: { exact: selectedDeviceId } } : true,
      });
      setMicPermission("granted");
      testStream.getTracks().forEach((track) => track.stop());
      toast.success("Microphone access authorized for investigation recording.");

      const devices = await navigator.mediaDevices.enumerateDevices();
      setAvailableDevices(devices.filter((d) => d.kind === "audioinput"));
    } catch (err: any) {
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setMicPermission("denied");
        toast.error("Microphone access denied. Please grant permission in browser settings.");
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setMicPermission("unavailable");
        toast.error("No microphone device was detected on this workstation.");
      } else {
        setMicPermission("denied");
        toast.error("Unable to access microphone: " + (err.message || "Unknown error"));
      }
    }
  };

  // 7. Open Notice Modal before starting recording
  const handleInitiateRecording = () => {
    if (micPermission === "denied") {
      toast.error("Microphone access is required to record an investigation.");
      return;
    }
    // Generate new Session ID for this recording
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    setCurrentSessionId(`INV-AUD-${new Date().getFullYear()}-${randomSuffix}`);
    setShowNoticeModal(true);
  };

  // 8. Confirm notice and activate real microphone MediaRecorder
  const handleConfirmNoticeAndStart = async () => {
    setShowNoticeModal(false);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMicPermission("unsupported");
        toast.error("Browser does not support audio recording.");
        return;
      }

      const constraints: MediaStreamConstraints = {
        audio:
          selectedDeviceId !== "default"
            ? {
                deviceId: { exact: selectedDeviceId },
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true,
              }
            : {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true,
              },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      setMicPermission("granted");

      // Setup Web Audio API Analyser for real-time dynamic waveform and VU meter
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const audioCtx = new AudioCtx();
          audioContextRef.current = audioCtx;
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          analyser.smoothingTimeConstant = 0.8;
          analyserRef.current = analyser;

          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          const updateMeter = () => {
            if (!analyserRef.current || !streamRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);

            let sum = 0;
            const bars: number[] = [];
            for (let i = 0; i < 32; i++) {
              const val = dataArray[i] ?? 0;
              sum += val;
              bars.push(Math.max(10, Math.min(95, (val / 255) * 100)));
            }
            const avg = sum / (dataArray.length || 1);
            const normalizedLevel = Math.min(100, Math.round((avg / 128) * 100));

            setMicAudioLevel(normalizedLevel);
            setFrequencyData(bars);

            animationFrameRef.current = requestAnimationFrame(updateMeter);
          };

          updateMeter();
        }
      } catch (audioCtxErr) {
        console.warn("Web Audio Analyser not available:", audioCtxErr);
      }

      // Initialize MediaRecorder
      const mime = getSupportedMimeType();
      setSelectedMimeType(mime);
      const mediaRecorder = new MediaRecorder(stream, { mimeType: mime });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: mime });
        const url = URL.createObjectURL(blob);
        setRecordedBlob(blob);
        setAudioUrl(url);
        cleanupAudioPipeline();
      };

      mediaRecorder.start(250); // Slice chunks every 250ms
    } catch (err: any) {
      console.warn("Failed to initiate MediaRecorder:", err);
      if (err.name === "NotAllowedError") {
        setMicPermission("denied");
        toast.error("Microphone access was denied.");
        return;
      }
      toast.error("Failed to start recording: " + (err.message || "Unknown error"));
      return;
    }

    setIsRecording(true);
    setIsPaused(false);
    setElapsedSeconds(0);
    setHasRecording(false);
    setIsSaved(false);
    setIsPlaying(false);
    setAudioUrl(null);
    setRecordedBlob(null);

    onStartRecording?.();
    toast.info("Audio recording session started. Recording testimony.");
  };

  // 9. Pause / Resume MediaRecorder
  const handlePauseResume = () => {
    if (!mediaRecorderRef.current) return;
    if (mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      setMicAudioLevel(0);
      toast.info("Recording paused.");
    } else if (mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      toast.info("Recording resumed.");
    }
  };

  // 10. Stop Recording with confirmation dialog
  const confirmStop = () => {
    setShowStopConfirm(false);

    const finalDuration = elapsedSeconds || 1;
    setSavedDuration(finalDuration);
    setIsRecording(false);
    setIsPaused(false);
    setHasRecording(true);
    setIsSaved(false);
    setPlaybackTime(0);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    } else {
      cleanupAudioPipeline();
    }

    toast.success("Recording finalized. Ready for review and evidence vaulting.");
  };

  // 11. Save Recording as Case Evidence Item
  const handleSaveToEvidence = () => {
    const finalDuration = savedDuration || elapsedSeconds || 1;
    const nowIso = new Date().toISOString();
    const fileName = `${currentSessionId}.webm`;
    const approximateSizeMb = (finalDuration * 0.035).toFixed(2);
    const fileSize = `${approximateSizeMb} MB`;
    const recordingId = `REC-${Date.now().toString().slice(-6)}`;

    const payload: AudioRecordingPayload = {
      recordingId,
      sessionId: currentSessionId,
      durationSec: finalDuration,
      fileName,
      url: audioUrl || undefined,
      rawBlob: recordedBlob || undefined,
      mimeType: selectedMimeType,
      fileSize,
      recordedAt: nowIso,
      recordedBy,
      recordedByRole,
      recordingType,
      participants: participantsList,
    };

    setIsSaved(true);
    if (onSaveRecording) {
      onSaveRecording(payload);
    } else if (onRecordingComplete) {
      onRecordingComplete(payload);
    }

    toast.success("Audio recording permanently saved to case evidence.");
  };

  // 12. Discard / Reset
  const handleDiscard = () => {
    setShowDiscardConfirm(false);
    cleanupAudioPipeline();
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
    setIsRecording(false);
    setIsPaused(false);
    setElapsedSeconds(0);
    setHasRecording(false);
    setIsSaved(false);
    setIsPlaying(false);
    setPlaybackTime(0);
    setAudioUrl(null);
    setRecordedBlob(null);
    toast.info("Unsaved recording discarded.");
  };

  // 13. Playback handling using HTMLAudioElement & speed controls
  const togglePlayback = () => {
    if (!audioUrl) return;
    if (!audioElementRef.current) {
      const audio = new Audio(audioUrl);
      audioElementRef.current = audio;
      audio.volume = volume / 100;
      audio.playbackRate = playbackRate;

      audio.ontimeupdate = () => {
        setPlaybackTime(Math.floor(audio.currentTime));
      };
      audio.onended = () => {
        setIsPlaying(false);
        setPlaybackTime(0);
      };
    }

    if (isPlaying) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElementRef.current.playbackRate = playbackRate;
      audioElementRef.current.play().catch((err) => {
        console.warn("Audio play error:", err);
      });
      setIsPlaying(true);
    }
  };

  const handleSeek = (newTimeSec: number) => {
    setPlaybackTime(newTimeSec);
    if (audioElementRef.current) {
      audioElementRef.current.currentTime = newTimeSec;
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (audioElementRef.current) {
      audioElementRef.current.volume = newVol / 100;
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (audioElementRef.current) {
      audioElementRef.current.playbackRate = speed;
    }
  };

  const formatTime = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // 10-bar microphone level visualization
  const activeSegments = Math.round((micAudioLevel / 100) * 10);

  const toggleParticipantRole = (roleName: string, defaultName: string) => {
    if (participantsList.some((p) => p.role === roleName)) {
      setParticipantsList(participantsList.filter((p) => p.role !== roleName));
    } else {
      setParticipantsList([...participantsList, { name: defaultName, role: roleName }]);
    }
  };

  const handleAddCustomWitness = () => {
    if (!newWitnessName.trim()) return;
    setParticipantsList([
      ...participantsList,
      { name: newWitnessName.trim(), role: "Witness" },
    ]);
    setNewWitnessName("");
  };

  const removeParticipant = (index: number) => {
    setParticipantsList(participantsList.filter((_, i) => i !== index));
  };

  return (
    <div className="surface overflow-hidden p-5 sm:p-6 space-y-4" role="region" aria-label="Investigation Audio Recorder">
      {/* Studio Banner / Metadata Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-3.5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Mic className="size-4 text-primary" aria-hidden="true" />
              INVESTIGATION AUDIO RECORDER
            </h3>
            <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 font-mono text-[0.68rem] text-muted-foreground border border-border/60">
              <Radio className="size-3 text-signal" aria-hidden="true" /> MediaRecorder ({selectedMimeType.split(";")[0]})
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
            <span>Case: <strong className="font-mono text-foreground">{caseId}</strong></span>
            <span>·</span>
            <span>Session: <strong className="font-mono text-foreground">{currentSessionId}</strong></span>
            <span>·</span>
            <span>Microphone: <strong className="text-foreground">{availableDevices.find((d) => d.deviceId === selectedDeviceId)?.label || "Default Microphone"}</strong></span>
          </div>
        </div>

        {/* Live Status Badge */}
        <div>
          {isRecording ? (
            <div
              className={cn(
                "flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold ring-1 transition-all",
                isPaused
                  ? "bg-amber-500/15 text-amber-600 ring-amber-500/30 dark:text-amber-400"
                  : "bg-signal/15 text-signal ring-signal/30"
              )}
              role="status"
              aria-live="polite"
            >
              <span className={cn("size-2.5 rounded-full", isPaused ? "bg-amber-500" : "bg-signal rec-pulse")} />
              <span>{isPaused ? "PAUSED" : "● RECORDING LIVE"}</span>
              <span className="font-mono tabular-nums">{formatTime(elapsedSeconds)}</span>
            </div>
          ) : hasRecording ? (
            <div className="flex items-center gap-2" role="status">
              {isSaved ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-500/30">
                  <CheckCircle2 className="size-3.5" /> Recording Saved as Evidence
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-600 ring-1 ring-amber-500/30">
                  <AlertCircle className="size-3.5" /> Unsaved Recording in Memory
                </span>
              )}
            </div>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground border border-border/70">
              <span className="size-2 rounded-full bg-muted-foreground/50" /> Ready to Record
            </span>
          )}
        </div>
      </div>

      {/* Permission Warning Banner if Denied */}
      {micPermission === "denied" && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-xs space-y-2">
          <div className="flex items-center gap-2 font-semibold text-destructive">
            <MicOff className="size-4" /> Microphone Access Blocked
          </div>
          <p className="text-muted-foreground">
            Microphone access is required to record investigation hearings. Please allow microphone access in your browser bar.
          </p>
          <div className="flex gap-2 pt-1">
            <Button size="sm" onClick={requestMicAccess} className="text-xs h-7 gap-1.5">
              <Mic className="size-3.5" /> Try Again / Allow Microphone
            </Button>
          </div>
        </div>
      )}

      {/* Microphone Selector & Live Transcription Switch */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/20 px-3.5 py-2 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <span className="text-muted-foreground shrink-0 flex items-center gap-1">
            <Sliders className="size-3.5" /> Microphone Input:
          </span>
          <select
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            disabled={isRecording}
            className="h-7 rounded border border-border bg-card px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-full max-w-xs"
            aria-label="Select microphone device"
          >
            <option value="default">Default System Microphone</option>
            {availableDevices.map((d, idx) => (
              <option key={d.deviceId || idx} value={d.deviceId}>
                {d.label || `Microphone ${idx + 1}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="live-stt-toggle" className="text-xs text-muted-foreground cursor-pointer select-none">
            Live Transcription Stream
          </label>
          <Switch
            id="live-stt-toggle"
            checked={showLiveTranscription}
            onCheckedChange={setShowLiveTranscription}
            aria-label="Toggle live transcription display"
          />
        </div>
      </div>

      {/* Main Studio Frame */}
      <div className="rounded-xl border border-border/80 bg-background/50 p-4 sm:p-6">
        {/* STATE 1: Idle - Ready to record */}
        {!isRecording && !hasRecording && (
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
            <div className="relative">
              <button
                onClick={handleInitiateRecording}
                className="grid size-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-primary/20"
                aria-label="Start recording investigation audio"
              >
                <Mic className="size-8" />
              </button>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">Ready to Record Investigation Statement</p>
              <p className="mt-1 max-w-md text-xs text-muted-foreground mx-auto">
                Direct browser recording with Web Audio API. Displays live frequency waveform, precise timer, and converts directly into DSIM case evidence.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <Button onClick={handleInitiateRecording} size="lg" className="gap-2 px-6 shadow-sm">
                <Mic className="size-4" /> 🎙 Start Recording
              </Button>
              {micPermission === "prompt" && (
                <Button variant="outline" size="lg" onClick={requestMicAccess} className="text-xs">
                  Test Microphone Access
                </Button>
              )}
            </div>
          </div>
        )}

        {/* STATE 2: Active Recording / Paused */}
        {isRecording && (
          <div className="space-y-6 py-2">
            <div className={cn("grid gap-4", showLiveTranscription ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1")}>
              {/* Left Column: Waveform & Level Meter */}
              <div className="space-y-4">
                {/* Real-time Dynamic Waveform visualizer */}
                <div
                  className="flex h-24 items-center justify-center gap-1 rounded-xl bg-card/90 px-4 border border-border/60 shadow-inner"
                  role="img"
                  aria-label="Live audio waveform visualizer"
                >
                  {frequencyData.map((heightPercent, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-1.5 rounded-full transition-all duration-75",
                        isPaused ? "bg-muted-foreground/30" : "bg-signal"
                      )}
                      style={{
                        height: isPaused ? "12%" : `${heightPercent}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Microphone Level Indicator (VU Meter) */}
                <div className="rounded-lg border border-border/60 bg-card p-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground flex items-center gap-1.5">
                      <Radio className="size-3 text-signal" /> Microphone Level
                    </span>
                    <span className="font-mono text-[0.68rem] text-muted-foreground">
                      {isPaused ? "Paused" : `${micAudioLevel}%`}
                    </span>
                  </div>

                  {/* 10-Segment VU Meter */}
                  <div
                    className="flex items-center gap-1 h-3"
                    role="progressbar"
                    aria-valuenow={micAudioLevel}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Microphone input level"
                  >
                    {Array.from({ length: 10 }).map((_, idx) => {
                      const isActive = !isPaused && idx < activeSegments;
                      const isHigh = idx >= 8;
                      const isMid = idx >= 6 && idx < 8;
                      return (
                        <div
                          key={idx}
                          className={cn(
                            "flex-1 h-full rounded-xs transition-colors duration-100",
                            !isActive
                              ? "bg-secondary"
                              : isHigh
                              ? "bg-rose-500"
                              : isMid
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Transcription Stream panel */}
              {showLiveTranscription && (
                <div className="rounded-xl border border-dashed border-border bg-card/60 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-border/60 pb-2 mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                        <MessageSquare className="size-3.5 text-indigo-500" /> Live Transcript Stream
                      </div>
                      <span className="text-[0.65rem] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        STT Service Pending
                      </span>
                    </div>

                    <div className="py-6 text-center space-y-2">
                      <Info className="size-6 text-muted-foreground mx-auto" />
                      <p className="text-xs font-semibold text-foreground">Live speech-to-text service not configured</p>
                      <p className="text-[0.72rem] text-muted-foreground max-w-xs mx-auto">
                        Real-time streaming transcription requires an external WebSocket STT service. Full transcript generation is available once recording is saved to evidence.
                      </p>
                    </div>
                  </div>

                  <div className="text-[0.65rem] font-mono text-muted-foreground border-t border-border/50 pt-2 flex justify-between">
                    <span>Active Participants: {participantsList.length}</span>
                    <span>Status: Offline STT</span>
                  </div>
                </div>
              )}
            </div>

            {/* Recording Controls & Timer HUD */}
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 font-mono text-2xl sm:text-3xl font-bold tracking-tight text-foreground tabular-nums">
                  <span className={cn("size-3 rounded-full", isPaused ? "bg-amber-500" : "bg-signal rec-pulse")} />
                  {formatTime(elapsedSeconds)}
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {isPaused ? "(Paused)" : "(Recording)"}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handlePauseResume}
                  className="gap-1.5 text-xs h-9"
                  aria-label={isPaused ? "Resume recording" : "Pause recording"}
                >
                  {isPaused ? <Play className="size-3.5 text-signal" /> : <Pause className="size-3.5" />}
                  {isPaused ? "Resume" : "Pause"}
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => setShowStopConfirm(true)}
                  className="gap-1.5 text-xs h-9 shadow-sm"
                  aria-label="Stop recording"
                >
                  <Square className="size-3.5 fill-current" /> Stop Recording
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* STATE 3: Recording Complete & Audio Player */}
        {hasRecording && !isRecording && (
          <div className="space-y-5">
            {/* Summary Statistics Card */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-border/80 bg-card p-4">
              <div className="flex items-start gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
                  <CheckCircle2 className="size-6" />
                </span>
                <div>
                  <div className="text-sm font-bold text-foreground">Recording Complete</div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-mono mt-0.5">
                    <span>Duration: <strong className="text-foreground">{formatTime(savedDuration)}</strong></span>
                    <span>·</span>
                    <span>Format: <strong className="text-foreground">{selectedMimeType}</strong></span>
                    <span>·</span>
                    <span>Size: <strong className="text-foreground">{(savedDuration * 0.035).toFixed(2)} MB</strong></span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Participants: {participantsList.map((p) => p.name).join(", ")}
                  </div>
                </div>
              </div>

              <div>
                {isSaved ? (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5" /> Saved as Evidence
                  </span>
                ) : (
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center gap-1.5">
                    <AlertCircle className="size-3.5" /> Unsaved Track
                  </span>
                )}
              </div>
            </div>

            {/* Audio Evidence Player with Playback Speeds */}
            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  className="size-11 rounded-full shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  onClick={togglePlayback}
                  aria-label={isPlaying ? "Pause audio playback" : "Play audio recording"}
                >
                  {isPlaying ? <Pause className="size-5" /> : <Play className="size-5 ml-0.5" />}
                </Button>

                <div className="flex-1 w-full space-y-1">
                  <Slider
                    value={[playbackTime]}
                    max={savedDuration || 100}
                    step={1}
                    onValueChange={(val) => handleSeek(val[0] ?? 0)}
                    className="w-full"
                    aria-label="Seek audio timeline"
                  />
                  <div className="flex justify-between font-mono text-[0.68rem] text-muted-foreground">
                    <span>{formatTime(playbackTime)}</span>
                    <span>{formatTime(savedDuration)}</span>
                  </div>
                </div>

                {/* Volume Slider */}
                <div className="hidden items-center gap-2 sm:flex">
                  <Volume2 className="size-4 text-muted-foreground" aria-hidden="true" />
                  <Slider
                    value={[volume]}
                    max={100}
                    step={5}
                    onValueChange={(val) => handleVolumeChange(val[0] ?? 80)}
                    className="w-16"
                    aria-label="Playback volume"
                  />
                </div>
              </div>

              {/* Playback Speed Selectors */}
              <div className="flex items-center justify-between border-t border-border/50 pt-2 text-xs">
                <span className="text-muted-foreground text-[0.72rem]">Playback speed:</span>
                <div className="flex items-center gap-1">
                  {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => handleSpeedChange(spd)}
                      className={cn(
                        "rounded px-2 py-0.5 font-mono text-[0.7rem] transition-colors cursor-pointer",
                        playbackRate === spd
                          ? "bg-primary text-primary-foreground font-bold"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Post-Stopping Action Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDiscardConfirm(true)}
                  className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="size-3.5" /> Re-record
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDiscardConfirm(true)}
                  className="gap-1.5 text-xs text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="size-3.5" /> Discard
                </Button>

                {audioUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => {
                      const a = document.createElement("a");
                      a.href = audioUrl;
                      a.download = `${currentSessionId}.webm`;
                      a.click();
                      toast.success("Downloaded recording file for audit backup");
                    }}
                  >
                    <Download className="size-3.5" /> Download
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {!isSaved ? (
                  <Button
                    size="sm"
                    onClick={handleSaveToEvidence}
                    className="gap-1.5 text-xs bg-primary shadow-sm"
                  >
                    <Save className="size-3.5" /> Save as Evidence
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled
                    className="gap-1.5 text-xs text-emerald-600 border-emerald-500/30"
                  >
                    <CheckCircle2 className="size-3.5" /> Saved as Evidence
                  </Button>
                )}

                {onGenerateTranscript && (
                  <Button
                    size="sm"
                    variant={isSaved ? "default" : "outline"}
                    onClick={() => {
                      if (!isSaved) {
                        handleSaveToEvidence();
                      }
                      onGenerateTranscript();
                    }}
                    disabled={externalProcessing}
                    className="gap-1.5 text-xs"
                  >
                    <Sparkles className="size-3.5 text-indigo-400" />
                    {externalProcessing ? "Transcribing..." : "Generate Transcript"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 1. INSTITUTIONAL PRE-RECORDING NOTICE MODAL */}
      <Dialog open={showNoticeModal} onOpenChange={setShowNoticeModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2 text-foreground">
              <ShieldCheck className="size-5 text-primary" />
              AUDIO RECORDING NOTICE
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              KPR College of Arts, Science and Research — Disciplinary Investigation Hearing
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            {/* Legal Notice */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Institutional Recording Policy: </strong>
              This session will be audio recorded for authorized institutional investigation and disciplinary proceedings under KPRCAS regulations. The recorded audio will be cataloged into the confidential case evidence dossier.
            </div>

            {/* Case & Session Details */}
            <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted/40 p-3 font-mono text-[0.72rem]">
              <div>
                <span className="text-muted-foreground">Case ID:</span>
                <div className="font-bold text-foreground">{caseId}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Session ID:</span>
                <div className="font-bold text-foreground">{currentSessionId}</div>
              </div>
            </div>

            {/* Recording Purpose / Type Selection */}
            <div className="space-y-1.5">
              <label className="font-semibold text-foreground text-xs">Recording Purpose / Type:</label>
              <div className="grid grid-cols-3 gap-2">
                {["Investigation Interview", "Hearing Statement", "Witness Deposition"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setRecordingType(type)}
                    className={cn(
                      "rounded-lg border p-2 text-center text-xs font-medium transition-colors cursor-pointer",
                      recordingType === type
                        ? "border-primary bg-primary text-primary-foreground shadow-xs"
                        : "border-border bg-card text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Participants Roster */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                  <Users className="size-3.5 text-primary" /> Present Participants:
                </label>
                <span className="text-[0.68rem] text-muted-foreground">Verify all persons in attendance</span>
              </div>

              {/* Toggle preset roles */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => toggleParticipantRole("Discipline Committee Head", "Dr. S. Ramanathan")}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs border transition-colors cursor-pointer",
                    participantsList.some((p) => p.role.includes("Committee Head"))
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 font-medium"
                      : "border-border bg-card text-muted-foreground"
                  )}
                >
                  ✓ Committee Head
                </button>

                <button
                  type="button"
                  onClick={() => toggleParticipantRole("Disciplinary Board Member", "Board Member")}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs border transition-colors cursor-pointer",
                    participantsList.some((p) => p.role.includes("Board Member"))
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 font-medium"
                      : "border-border bg-card text-muted-foreground"
                  )}
                >
                  + Board Member
                </button>

                <button
                  type="button"
                  onClick={() => toggleParticipantRole("Student / Respondent", accusedStudent)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs border transition-colors cursor-pointer",
                    participantsList.some((p) => p.role.includes("Student"))
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 font-medium"
                      : "border-border bg-card text-muted-foreground"
                  )}
                >
                  ✓ Student / Respondent
                </button>
              </div>

              {/* Participant List Tags */}
              <div className="rounded-lg border border-border bg-card p-2 space-y-1.5 max-h-32 overflow-y-auto">
                {participantsList.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-0.5 border-b border-border/40 last:border-0">
                    <span className="text-foreground font-medium">{p.name} <span className="text-muted-foreground font-mono text-[0.68rem]">({p.role})</span></span>
                    <button
                      type="button"
                      onClick={() => removeParticipant(idx)}
                      className="text-muted-foreground hover:text-destructive text-[0.7rem]"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Custom Witness Input */}
              <div className="flex gap-2">
                <Input
                  value={newWitnessName}
                  onChange={(e) => setNewWitnessName(e.target.value)}
                  placeholder="Add additional witness name..."
                  className="h-8 text-xs bg-background"
                />
                <Button type="button" size="sm" variant="outline" onClick={handleAddCustomWitness} className="h-8 text-xs">
                  Add Witness
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-between sm:justify-between items-center pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowNoticeModal(false)} className="text-xs h-8">
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleConfirmNoticeAndStart}
              className="text-xs h-8 bg-primary gap-1.5 shadow-sm"
            >
              <FileCheck className="size-3.5" /> I Understand and Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2. STOP CONFIRMATION MODAL */}
      <AlertDialog open={showStopConfirm} onOpenChange={setShowStopConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold">Finalize Investigation Audio Track?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground">
              Stopping will finalize the current audio stream ({formatTime(elapsedSeconds)}). You can review playback, adjust speed, save it to the case evidence vault, and generate speech-to-text transcripts.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs">Continue Recording</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStop} className="text-xs bg-destructive text-destructive-foreground">
              Stop Recording
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 3. RE-RECORD / DISCARD PROTECTION MODAL */}
      <AlertDialog open={showDiscardConfirm} onOpenChange={setShowDiscardConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-destructive">Discard Unsaved Recording?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground">
              Current recording has not been saved. Re-recording will discard it from memory. If you need this testimony, save it as case evidence first.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDiscard} className="text-xs bg-destructive text-destructive-foreground">
              Discard & Re-record
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
