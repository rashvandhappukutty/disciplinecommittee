import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useDsim, d as evLabel, n as Button, s as SAMPLE_SYNOPSIS, u as cn } from "./button-C7ZpzBGx.mjs";
import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { At as Circle, B as Pause, Bt as Check, Ct as Eye, D as RotateCw, Dt as Download, E as Save, Et as EllipsisVertical, F as Play, H as Mic, It as ChevronUp, Ot as Copy, P as Plus, Pt as CircleCheck, R as Pen, S as ShieldAlert, St as FileBox, T as Search, V as Music, Vt as Camera, W as MessageSquare, _ as Sparkles, _t as FileText, a as User, at as Image, b as Shield, ct as Gavel, d as Trash2, ft as Flag, g as Square, gt as FileUp, h as StickyNote, k as RefreshCw, kt as Clock, l as Upload, m as SwitchCamera, n as Volume2, ot as History, p as Tag, r as Video, s as UserPlus, t as X, u as TriangleAlert, x as ShieldCheck, z as PenLine, zt as ChevronDown } from "../_libs/lucide-react.mjs";
import { _ as EmptyState, d as DropdownMenu, f as DropdownMenuContent, g as DropdownMenuTrigger, h as DropdownMenuSeparator, j as fmtDateTime, p as DropdownMenuItem, u as ConfirmDialog } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BB0Q0GUL.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Cd1zWcTd.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { t as Label } from "./label-Di2QZFiw.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-Ce6ny-d0.mjs";
import { t as Textarea } from "./textarea-DmMEYLpm.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/InvestigationTimeline-CxZExNmK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./cases._caseId-rXKVbNyW.mjs");
var Route = createFileRoute("/cases/$caseId")({
	head: ({ params }) => ({ meta: [
		{ title: `${params.caseId} — Case Details — DSIM` },
		{
			name: "description",
			content: "Confidential case workspace and evidence dossier."
		},
		{
			property: "og:title",
			content: `${params.caseId} — Case Details — DSIM`
		},
		{
			property: "og:description",
			content: "Confidential case workspace and evidence dossier."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
function EvidenceCaptureModal({ open, onOpenChange, type, caseId, onSave }) {
	const [captured, setCaptured] = (0, import_react.useState)(false);
	const [description, setDescription] = (0, import_react.useState)("");
	const [capturedBy, setCapturedBy] = (0, import_react.useState)("Dr. S. Ramanathan");
	const [isRecordingVideo, setIsRecordingVideo] = (0, import_react.useState)(false);
	const [videoDuration, setVideoDuration] = (0, import_react.useState)(0);
	const [flash, setFlash] = (0, import_react.useState)(false);
	const [facingMode, setFacingMode] = (0, import_react.useState)("environment");
	const [hasCameraStream, setHasCameraStream] = (0, import_react.useState)(false);
	const [previewUrl, setPreviewUrl] = (0, import_react.useState)(null);
	const videoRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const mediaRecorderRef = (0, import_react.useRef)(null);
	const recordedChunksRef = (0, import_react.useRef)([]);
	const videoTimerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (open) {
			setCaptured(false);
			setDescription("");
			setIsRecordingVideo(false);
			setVideoDuration(0);
			setFlash(false);
			setPreviewUrl(null);
			startCamera(facingMode);
		} else stopCamera();
		return () => {
			stopCamera();
		};
	}, [
		open,
		type,
		facingMode
	]);
	const startCamera = async (mode) => {
		stopCamera();
		try {
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: {
						facingMode: mode,
						width: { ideal: 1280 },
						height: { ideal: 720 }
					},
					audio: type === "video"
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
	(0, import_react.useEffect)(() => {
		if (isRecordingVideo) videoTimerRef.current = window.setInterval(() => {
			setVideoDuration((d) => d + 1);
		}, 1e3);
		else if (videoTimerRef.current) clearInterval(videoTimerRef.current);
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
		if (videoRef.current && hasCameraStream) {
			const canvas = document.createElement("canvas");
			canvas.width = videoRef.current.videoWidth || 1280;
			canvas.height = videoRef.current.videoHeight || 720;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
				const dataUrl = canvas.toDataURL("image/jpeg", .92);
				setPreviewUrl(dataUrl);
			}
		}
		setCaptured(true);
		if (!description) setDescription(`Laboratory inspection snapshot for ${caseId} (${facingMode === "environment" ? "Rear Lens" : "Front Lens"})`);
		toast.success("Photographic evidence captured");
	};
	const handleStartVideo = () => {
		if (streamRef.current) try {
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
		setIsRecordingVideo(true);
		setVideoDuration(0);
	};
	const handleStopVideo = () => {
		if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") mediaRecorderRef.current.stop();
		setIsRecordingVideo(false);
		setCaptured(true);
		if (!description) setDescription(`Physical walkthrough and evidence recording for ${caseId}`);
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
		const timeStr = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
		onSave({
			type,
			fileName: type === "photo" ? `evidence-photo-${caseId}-${timeStr}.jpg` : `evidence-video-${caseId}-${timeStr}.mp4`,
			fileSize: type === "photo" ? "2.4 MB" : `${Math.max(1, Math.round(videoDuration * 1.2 * 10) / 10)} MB`,
			capturedBy: capturedBy.trim() || "Discipline Committee Head",
			description: description.trim() || (type === "photo" ? "Evidence Photograph" : "Evidence Video Recording"),
			...type === "video" ? { durationSec: videoDuration } : {},
			...previewUrl ? { url: previewUrl } : {}
		});
		stopCamera();
		onOpenChange(false);
	};
	const formatVideoTimer = (s) => {
		const mins = Math.floor(s / 60);
		const secs = s % 60;
		return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (val) => {
			if (!val) stopCamera();
			onOpenChange(val);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-8 place-items-center rounded-lg bg-primary/10 text-primary",
							children: type === "photo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "text-base font-bold",
							children: type === "photo" ? "Capture Photographic Evidence" : "Record Video Evidence"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							className: "text-xs",
							children: ["Confidential visual evidence intake for Case ", caseId]
						})] })]
					}), !captured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: toggleCameraFacing,
						className: "h-8 text-xs gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchCamera, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: facingMode === "environment" ? "Rear Lens" : "Front Lens"
						})]
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-inner",
						children: [
							flash && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-30 bg-white transition-opacity duration-150" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								ref: videoRef,
								playsInline: true,
								muted: true,
								className: `absolute inset-0 h-full w-full object-cover ${hasCameraStream && !captured ? "block" : "hidden"}`
							}),
							captured && previewUrl && type === "photo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: previewUrl,
								alt: "Captured Evidence Preview",
								className: "absolute inset-0 h-full w-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 z-10 flex flex-col justify-between p-3.5 pointer-events-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-[0.65rem] font-mono text-emerald-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5 bg-black/70 px-2 py-0.5 rounded backdrop-blur",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3" }),
												" ",
												hasCameraStream ? "LIVE CAMERA STREAM" : "SIMULATED SENSOR",
												" · ",
												facingMode.toUpperCase()
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bg-black/70 px-2 py-0.5 rounded backdrop-blur",
											children: (/* @__PURE__ */ new Date()).toLocaleTimeString()
										})]
									}),
									!captured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-3 grid-rows-3 h-full w-full border border-white/10 opacity-30 my-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-r border-b border-white/10" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-r border-b border-white/10" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-b border-white/10" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-r border-b border-white/10" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-r border-b border-white/10" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-b border-white/10" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-r border-b border-white/10" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-r border-b border-white/10" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-[0.65rem] font-mono text-neutral-300",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "bg-black/70 px-2 py-0.5 rounded backdrop-blur",
											children: ["CASE: ", caseId]
										}), isRecordingVideo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5 bg-red-600 text-white font-bold px-2.5 py-0.5 rounded backdrop-blur animate-pulse",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-white" }),
												" REC ",
												formatVideoTimer(videoDuration)
											]
										})]
									})
								]
							}),
							!hasCameraStream && !captured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-full place-items-center bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 text-neutral-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-center space-y-2 p-4",
									children: type === "photo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-10 mx-auto opacity-40 text-neutral-300" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs font-mono text-neutral-300",
											children: [
												"Camera Feed Ready (",
												facingMode,
												")"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[0.7rem] text-neutral-500 max-w-xs",
											children: "Align the item or laboratory scene and click capture."
										})
									] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-10 mx-auto opacity-40 text-neutral-300" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-mono text-neutral-300",
											children: isRecordingVideo ? "Recording Video Feed..." : "Video Standby"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[0.7rem] text-neutral-500 max-w-xs",
											children: "Capture physical walkthroughs, scene conditions, or confiscated equipment."
										})
									] })
								})
							}),
							captured && !previewUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative grid h-full place-items-center bg-neutral-900 text-emerald-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center space-y-2 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid size-12 mx-auto place-items-center rounded-full bg-emerald-500/20 text-emerald-400",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-6" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-semibold text-white",
											children: type === "photo" ? "Photo Captured Successfully" : `Video Recorded (${formatVideoTimer(videoDuration)})`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-neutral-400 font-mono",
											children: "Watermarked · Timestamped · Hash Verified"
										})
									]
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "ev-captured-by",
									className: "text-xs font-semibold",
									children: "Captured By (Investigator)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "ev-captured-by",
									value: capturedBy,
									onChange: (e) => setCapturedBy(e.target.value),
									className: "text-xs h-8.5"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Lens / Capture Device"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs font-mono bg-muted/30 p-2 rounded border border-border/60 text-muted-foreground flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: facingMode === "environment" ? "Rear Ultra-Wide Lens" : "Front TrueDepth Lens" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.65rem] text-emerald-600 font-bold",
										children: "12MP HDR"
									})]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								htmlFor: "ev-desc",
								className: "text-xs font-semibold",
								children: ["Evidence Description / Location Notes ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "ev-desc",
								placeholder: "E.g., Front view of damaged circuit board showing cracked housing in Lab B-204...",
								value: description,
								onChange: (e) => setDescription(e.target.value),
								rows: 2,
								className: "text-xs leading-relaxed"
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => onOpenChange(false),
						className: "text-xs",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						children: !captured ? type === "photo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: handleCapturePhoto,
							className: "gap-2 text-xs bg-primary hover:bg-primary/90 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }), " Capture Photo"]
						}) : !isRecordingVideo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: handleStartVideo,
							className: "gap-2 text-xs bg-red-600 hover:bg-red-700 text-white shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "size-3.5 fill-current" }), " Start Recording"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: handleStopVideo,
							variant: "destructive",
							className: "gap-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3.5 fill-current" }), " Stop & Capture"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: handleRetake,
							className: "gap-1.5 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" }), " Retake"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: handleSave,
							className: "gap-1.5 text-xs bg-primary hover:bg-primary/90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " Save Evidence"]
						})] })
					})]
				})
			]
		})
	});
}
function EvidenceDetailModal({ evidence, open, onOpenChange, onDelete, onUpdateEvidence, onViewTranscript, onGenerateTranscript }) {
	const [isEditingDesc, setIsEditingDesc] = (0, import_react.useState)(false);
	const [descDraft, setDescDraft] = (0, import_react.useState)(evidence?.description || "");
	const [activeTab, setActiveTab] = (0, import_react.useState)("preview");
	const [isPlayingAudio, setIsPlayingAudio] = (0, import_react.useState)(false);
	const [audioPlayTime, setAudioPlayTime] = (0, import_react.useState)(0);
	const [audioDuration, setAudioDuration] = (0, import_react.useState)(evidence?.durationSec || 120);
	const audioElemRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (evidence) {
			setDescDraft(evidence.description || "");
			setAudioDuration(evidence.durationSec || 120);
			setIsPlayingAudio(false);
			setAudioPlayTime(0);
		}
	}, [evidence]);
	const toggleModalAudio = () => {
		if (!evidence) return;
		if (evidence.url) {
			if (!audioElemRef.current) {
				const a = new Audio(evidence.url);
				audioElemRef.current = a;
				a.ontimeupdate = () => setAudioPlayTime(Math.floor(a.currentTime));
				a.onloadedmetadata = () => setAudioDuration(Math.floor(a.duration));
				a.onended = () => {
					setIsPlayingAudio(false);
					setAudioPlayTime(0);
				};
			}
			if (isPlayingAudio) {
				audioElemRef.current.pause();
				setIsPlayingAudio(false);
			} else {
				audioElemRef.current.play().catch(() => {});
				setIsPlayingAudio(true);
			}
		} else setIsPlayingAudio((prev) => !prev);
	};
	const handleVerifyEvidence = () => {
		if (!evidence || !onUpdateEvidence) return;
		onUpdateEvidence(evidence.id, { status: "Verified" }, "Evidence formally verified by Discipline Committee");
		toast.success("Evidence integrity officially verified.");
	};
	if (!evidence) return null;
	const getIcon = () => {
		switch (evidence.type) {
			case "audio": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "size-5 text-indigo-500" });
			case "photo": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-5 text-emerald-500" });
			case "video": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-5 text-rose-500" });
			case "document": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5 text-amber-500" });
		}
	};
	const handleSaveDescription = () => {
		if (!descDraft.trim()) return;
		onUpdateEvidence?.(evidence.id, { description: descDraft.trim() }, `Description updated to: "${descDraft.trim()}"`);
		setIsEditingDesc(false);
		toast.success("Evidence description updated and logged in Chain of Custody.");
	};
	const custodyHistory = evidence.custodyHistory || [
		{
			id: "cust-1",
			timestamp: evidence.timestamp,
			action: "Evidence captured",
			performedBy: evidence.capturedBy || "Dr. S. Ramanathan",
			details: "Initial intake on site"
		},
		{
			id: "cust-2",
			timestamp: evidence.timestamp,
			action: "Evidence uploaded",
			performedBy: "System (Auto-Sync)",
			details: "AES-256 encrypted vault storage"
		},
		{
			id: "cust-3",
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			action: "Evidence reviewed",
			performedBy: "Discipline Committee Head",
			details: "Integrity verified"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-lg bg-secondary",
						children: getIcon()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
									className: "font-mono text-base font-bold",
									children: evLabel(evidence.number)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-secondary px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground",
									children: evidence.type
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-600",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }),
										" ",
										evidence.status || "Verified"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							className: "truncate text-xs text-muted-foreground mt-0.5",
							children: [
								"Case: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground font-mono",
									children: evidence.caseId
								}),
								" · ",
								evidence.fileName
							]
						})]
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					value: activeTab,
					onValueChange: setActiveTab,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid grid-cols-2 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "preview",
								className: "text-xs gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5" }), " Evidence Preview & Metadata"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "custody",
								className: "text-xs gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-3.5" }),
									" Chain of Custody (",
									custodyHistory.length,
									")"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "preview",
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted/40 flex items-center justify-center p-4 shadow-inner",
									children: [
										evidence.type === "photo" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center justify-center text-center space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid size-16 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-8" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-semibold text-foreground",
												children: "High-Resolution Photographic Record"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-mono text-xs text-muted-foreground mt-0.5",
												children: [
													evidence.fileName,
													" · ",
													evidence.fileSize || "2.4 MB",
													" · SHA-256 Verified"
												]
											})] })]
										}),
										evidence.type === "audio" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center justify-center text-center space-y-3 w-full max-w-md p-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid size-14 place-items-center rounded-2xl bg-indigo-500/10 text-indigo-600",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "size-7" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-sm font-semibold text-foreground",
													children: "Recorded Statement Audio Track"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "font-mono text-xs text-muted-foreground mt-0.5",
													children: [
														"Duration: ",
														evidence.durationSec ? `${Math.floor(evidence.durationSec / 60)}m ${evidence.durationSec % 60}s` : "Recorded audio",
														" · ",
														evidence.mimeType || "WebM Opus"
													]
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "w-full bg-card/90 rounded-lg p-3 border border-border/80 space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															size: "icon",
															variant: "outline",
															className: "size-8 rounded-full shrink-0",
															onClick: toggleModalAudio,
															"aria-label": isPlayingAudio ? "Pause audio" : "Play audio",
															children: isPlayingAudio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5 text-signal" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5 ml-0.5 text-primary" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex-1 space-y-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
																value: [audioPlayTime],
																max: audioDuration || 100,
																step: 1,
																onValueChange: (val) => {
																	setAudioPlayTime(val[0] ?? 0);
																	if (audioElemRef.current) audioElemRef.current.currentTime = val[0] ?? 0;
																},
																className: "w-full",
																"aria-label": "Seek audio"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex justify-between font-mono text-[0.65rem] text-muted-foreground",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
																	Math.floor(audioPlayTime / 60),
																	":",
																	String(audioPlayTime % 60).padStart(2, "0")
																] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
																	Math.floor(audioDuration / 60),
																	":",
																	String(audioDuration % 60).padStart(2, "0")
																] })]
															})]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-wrap items-center justify-between gap-1.5 pt-1 border-t border-border/50 text-xs",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-1.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[0.68rem] text-muted-foreground",
																children: "Transcript:"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-semibold text-[0.68rem] text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded",
																children: evidence.transcriptStatus || "Completed"
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex gap-1.5",
															children: [onViewTranscript && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
																size: "sm",
																variant: "ghost",
																onClick: () => {
																	onViewTranscript(evidence.id);
																	onOpenChange(false);
																},
																className: "h-6 text-[0.68rem] gap-1 px-2 text-primary",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3" }), " View Transcript"]
															}), onGenerateTranscript && (!evidence.transcriptStatus || evidence.transcriptStatus === "Not Generated") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
																size: "sm",
																variant: "ghost",
																onClick: () => {
																	onGenerateTranscript(evidence.id);
																	onOpenChange(false);
																},
																className: "h-6 text-[0.68rem] gap-1 px-2 text-primary",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), " Generate Transcript"]
															})]
														})]
													})]
												})
											]
										}),
										evidence.type === "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center justify-center text-center space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid size-16 place-items-center rounded-2xl bg-rose-500/10 text-rose-600",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-8" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-semibold text-foreground",
												children: "Surveillance & Inspection Video"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-mono text-xs text-muted-foreground mt-0.5",
												children: [
													evidence.fileName,
													" · ",
													evidence.fileSize || "14.2 MB",
													" · Timestamp Embedded"
												]
											})] })]
										}),
										evidence.type === "document" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center justify-center text-center space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid size-16 place-items-center rounded-2xl bg-amber-500/10 text-amber-600",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-8" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-semibold text-foreground",
												children: "Official Case Attachment / Scan"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-mono text-xs text-muted-foreground mt-0.5",
												children: [
													evidence.fileName,
													" · ",
													evidence.fileSize || "1.1 MB",
													" · Verified PDF"
												]
											})] })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border bg-card p-2.5 space-y-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[0.68rem] text-muted-foreground flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "size-3" }), " Evidence ID"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono font-semibold text-foreground block",
												children: [
													evidence.id,
													" (",
													evLabel(evidence.number),
													")"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border bg-card p-2.5 space-y-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[0.68rem] text-muted-foreground flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3" }), " Captured By"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground truncate block",
												children: evidence.capturedBy || "Dr. S. Ramanathan"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border bg-card p-2.5 space-y-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[0.68rem] text-muted-foreground flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), " Captured Date/Time"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-foreground truncate block",
												children: fmtDateTime(evidence.timestamp)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border bg-card p-2.5 space-y-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[0.68rem] text-muted-foreground flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" }), " Security Level"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-emerald-600 block",
												children: "Strictly Confidential"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-card p-3 space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-foreground",
											children: "Description & Context"
										}), !isEditingDesc && onUpdateEvidence && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ghost",
											size: "sm",
											onClick: () => {
												setDescDraft(evidence.description);
												setIsEditingDesc(true);
											},
											className: "h-6 text-[0.7rem] gap-1 text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-3" }), " Edit Description"]
										})]
									}), isEditingDesc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											value: descDraft,
											onChange: (e) => setDescDraft(e.target.value),
											rows: 2,
											className: "text-xs bg-background"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-end gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "outline",
												size: "sm",
												onClick: () => setIsEditingDesc(false),
												className: "h-7 text-xs",
												children: "Cancel"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												onClick: handleSaveDescription,
												className: "h-7 text-xs gap-1 bg-primary",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3" }), " Save & Log"]
											})]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground leading-relaxed",
										children: evidence.description
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "custody",
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-muted/30 p-3 border border-border/70 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 font-semibold text-foreground mb-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-primary" }), " Chain of Custody"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[0.68rem] text-muted-foreground leading-relaxed",
									children: "Tracks evidence handling events including capture, verification, transfer, and updates. Production deployments should enforce evidence integrity and access controls at the backend/storage layer."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2.5 max-h-[360px] overflow-y-auto pr-1",
								children: custodyHistory.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border/80 bg-card p-3 flex items-start justify-between gap-3 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "grid size-6 place-items-center rounded-full bg-primary/10 text-primary font-mono text-[0.65rem] font-bold shrink-0 mt-0.5",
											children: ["#", index + 1]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-foreground",
											children: item.action
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-muted-foreground text-[0.68rem]",
											children: [
												"Performed by: ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground font-normal",
													children: item.performedBy
												}),
												item.details && ` · ${item.details}`
											]
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[0.68rem] text-muted-foreground whitespace-nowrap",
										children: fmtDateTime(item.timestamp)
									})]
								}, item.id || index))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "flex justify-between sm:justify-between items-center pt-2",
					children: [onDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						className: "text-destructive hover:bg-destructive/10 text-xs gap-1.5 h-8",
						onClick: () => {
							onDelete(evidence.id);
							onOpenChange(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), " Remove Evidence"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							evidence.status !== "Verified" && onUpdateEvidence && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								className: "text-xs gap-1.5 h-8 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/10",
								onClick: handleVerifyEvidence,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), " Verify Evidence"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								className: "text-xs gap-1.5 h-8",
								onClick: () => {
									const blob = new Blob([`Official DSIM evidence export for ${evidence.fileName}`], { type: "text/plain" });
									const url = URL.createObjectURL(blob);
									const a = document.createElement("a");
									a.href = url;
									a.download = evidence.fileName;
									a.click();
									toast.success(`Downloaded ${evidence.fileName}`);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), " Download File"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								className: "text-xs h-8",
								onClick: () => onOpenChange(false),
								children: "Close"
							})
						]
					})]
				})
			]
		})
	});
}
function DocumentUploadModal({ open, onOpenChange, caseId, onUploadDocument }) {
	const [selectedFile, setSelectedFile] = (0, import_react.useState)(null);
	const [docType, setDocType] = (0, import_react.useState)("document");
	const [description, setDescription] = (0, import_react.useState)("");
	const [capturedBy, setCapturedBy] = (0, import_react.useState)("Dr. S. Ramanathan");
	const fileInputRef = (0, import_react.useRef)(null);
	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			let detectedType = "document";
			if (file.type.startsWith("image/")) detectedType = "photo";
			else if (file.type.startsWith("video/")) detectedType = "video";
			else if (file.type.startsWith("audio/")) detectedType = "audio";
			const sizeFormatted = file.size > 1048576 ? `${(file.size / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`;
			setSelectedFile({
				name: file.name,
				size: sizeFormatted,
				type: detectedType
			});
			setDocType(detectedType);
		}
	};
	const handleSimulateSelect = (name, size, type) => {
		setSelectedFile({
			name,
			size,
			type
		});
		setDocType(type);
	};
	const handleSubmit = (e) => {
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
			capturedBy: capturedBy.trim() || "Discipline Committee Head"
		});
		toast.success(`Attached ${selectedFile.name} to Case ${caseId}`);
		setSelectedFile(null);
		setDescription("");
		onOpenChange(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-9 place-items-center rounded-lg bg-amber-500/10 text-amber-600",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-base font-bold",
					children: "Upload Supporting Document"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "text-xs",
					children: "Attach official memos, lab logs, scanned undertaking letters, or CCTV export files."
				})] })]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-4 pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileInputRef,
						type: "file",
						className: "hidden",
						accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png,.webm,.mp4,.txt",
						onChange: handleFileChange
					}),
					!selectedFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => fileInputRef.current?.click(),
						className: "border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/60 hover:bg-muted/30 transition-all space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-8 mx-auto text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold text-foreground",
								children: "Click to browse or drop file here"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.68rem] text-muted-foreground",
								children: "Supported formats: PDF, DOC/DOCX, PNG/JPG, MP4, WebM (Max 25MB)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 flex flex-wrap justify-center gap-1.5",
								onClick: (e) => e.stopPropagation(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => handleSimulateSelect("Lab_Register_Log_Oct04.pdf", "1.4 MB", "document"),
									className: "rounded bg-secondary px-2 py-0.5 text-[0.65rem] text-muted-foreground hover:text-foreground",
									children: "+ Sample Lab Log (PDF)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => handleSimulateSelect("Parent_Undertaking_Letter.pdf", "890 KB", "document"),
									className: "rounded bg-secondary px-2 py-0.5 text-[0.65rem] text-muted-foreground hover:text-foreground",
									children: "+ Parent Undertaking (PDF)"
								})]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-primary/30 bg-primary/5 p-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-xs text-foreground truncate max-w-[200px]",
								children: selectedFile.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[0.68rem] text-muted-foreground",
								children: [
									selectedFile.size,
									" · ",
									selectedFile.type.toUpperCase()
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							className: "size-7 text-muted-foreground hover:text-destructive",
							onClick: () => setSelectedFile(null),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs font-semibold",
							children: "Document Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: docType,
							onValueChange: (v) => setDocType(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "text-xs h-9",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "document",
									className: "text-xs",
									children: "Official Document / PDF / Scan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "photo",
									className: "text-xs",
									children: "Photographic Exhibit (JPG/PNG)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "video",
									className: "text-xs",
									children: "Video Surveillance / Footage (MP4)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "audio",
									className: "text-xs",
									children: "Supplemental Audio Recording"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs font-semibold",
							children: "Uploaded By (Custodian)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: capturedBy,
							onChange: (e) => setCapturedBy(e.target.value),
							className: "text-xs h-9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							className: "text-xs font-semibold",
							children: ["Description & Context ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
							placeholder: "E.g., Signed acknowledgment from student regarding equipment handling policy...",
							value: description,
							onChange: (e) => setDescription(e.target.value),
							className: "text-xs leading-relaxed"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "flex justify-between sm:justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => onOpenChange(false),
							className: "text-xs",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							size: "sm",
							disabled: !selectedFile,
							className: "bg-primary hover:bg-primary/90 text-xs gap-1.5 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), " Save to Case Dossier"]
						})]
					})
				]
			})]
		})
	});
}
function EvidenceGallery({ caseId, evidence, onAddEvidence, onUpdateEvidence, onRemoveEvidence, onViewTranscript, onGenerateTranscript }) {
	const [tab, setTab] = (0, import_react.useState)("all");
	const [captureType, setCaptureType] = (0, import_react.useState)(null);
	const [showDocUpload, setShowDocUpload] = (0, import_react.useState)(false);
	const [selectedEvidence, setSelectedEvidence] = (0, import_react.useState)(null);
	const [deletingId, setDeletingId] = (0, import_react.useState)(null);
	const filteredEvidence = evidence.filter((e) => {
		if (tab === "all") return true;
		return e.type === tab;
	});
	const handleCaptureSave = (data) => {
		onAddEvidence(data);
		toast.success(`Added ${data.type === "photo" ? "photographic" : "video"} evidence to ${caseId}`);
	};
	const getTypeIcon = (type) => {
		switch (type) {
			case "audio": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "size-4 text-indigo-500" });
			case "photo": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-4 text-emerald-500" });
			case "video": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-4 text-rose-500" });
			case "document": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-amber-500" });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					value: tab,
					onValueChange: setTab,
					className: "w-full sm:w-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "grid grid-cols-5 w-full sm:w-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "all",
								className: "text-xs",
								children: [
									"All (",
									evidence.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "audio",
								className: "text-xs",
								children: [
									"Audio (",
									evidence.filter((e) => e.type === "audio").length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "photo",
								className: "text-xs",
								children: [
									"Photos (",
									evidence.filter((e) => e.type === "photo").length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "video",
								className: "text-xs",
								children: [
									"Videos (",
									evidence.filter((e) => e.type === "video").length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "document",
								className: "text-xs",
								children: [
									"Docs (",
									evidence.filter((e) => e.type === "document").length,
									")"
								]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setCaptureType("photo"),
							className: "text-xs gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-3.5" }), " Capture Photo"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setCaptureType("video"),
							className: "text-xs gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-3.5" }), " Capture Video"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setShowDocUpload(true),
							className: "text-xs gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "size-3.5" }), " Upload Document"]
						})
					]
				})]
			}),
			filteredEvidence.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: FileBox,
				title: "No evidence collected yet",
				description: "Capture photos, videos, or upload official documents to build case documentation.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => setCaptureType("photo"),
						className: "gap-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-3.5" }), " Capture Photo"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setShowDocUpload(true),
						className: "gap-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "size-3.5" }), " Upload Document"]
					})]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: filteredEvidence.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface group relative flex flex-col justify-between overflow-hidden p-3.5 transition-all hover:shadow-md hover:border-border/90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => setSelectedEvidence(e),
						className: "relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg bg-muted/60 flex items-center justify-center transition-colors group-hover:bg-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-10 place-items-center rounded-xl bg-card shadow-xs",
								children: getTypeIcon(e.type)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute bottom-2 left-2 rounded bg-background/90 px-1.5 py-0.5 font-mono text-[0.65rem] text-foreground backdrop-blur",
								children: evLabel(e.number)
							}),
							e.durationSec && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "absolute bottom-2 right-2 rounded bg-background/90 px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground backdrop-blur",
								children: [
									Math.floor(e.durationSec / 60),
									":",
									String(e.durationSec % 60).padStart(2, "0")
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
									children: [
										e.type,
										" ",
										e.fileSize ? `· ${e.fileSize}` : ""
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.68rem] text-muted-foreground",
									children: fmtDateTime(e.timestamp)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								onClick: () => setSelectedEvidence(e),
								className: "mt-1 line-clamp-1 cursor-pointer font-medium text-xs text-foreground hover:underline",
								title: e.description,
								children: e.description || e.fileName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 line-clamp-1 font-mono text-[0.65rem] text-muted-foreground",
								children: e.fileName
							})
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between border-t border-border/60 pt-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSelectedEvidence(e),
							className: "inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3" }), " Inspect & Custody"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "icon",
								className: "size-7",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "Actions"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onSelect: () => setSelectedEvidence(e),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5 mr-2" }), " Inspect Details"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onSelect: () => {
										const blob = new Blob([`Evidence: ${e.fileName}`], { type: "text/plain" });
										const url = URL.createObjectURL(blob);
										const a = document.createElement("a");
										a.href = url;
										a.download = e.fileName;
										a.click();
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5 mr-2" }), " Download"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									className: "text-destructive focus:text-destructive",
									onSelect: () => setDeletingId(e.id),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5 mr-2" }), " Delete"]
								})
							]
						})] })]
					})]
				}, e.id))
			}),
			captureType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceCaptureModal, {
				open: !!captureType,
				onOpenChange: (open) => !open && setCaptureType(null),
				type: captureType,
				caseId,
				onSave: handleCaptureSave
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentUploadModal, {
				open: showDocUpload,
				onOpenChange: setShowDocUpload,
				caseId,
				onUploadDocument: (doc) => {
					onAddEvidence({
						type: doc.type,
						fileName: doc.fileName,
						fileSize: doc.fileSize,
						description: doc.description,
						capturedBy: doc.capturedBy
					});
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceDetailModal, {
				evidence: selectedEvidence,
				open: !!selectedEvidence,
				onOpenChange: (open) => !open && setSelectedEvidence(null),
				onUpdateEvidence,
				onViewTranscript,
				onGenerateTranscript,
				onDelete: (id) => {
					onRemoveEvidence(id);
					setSelectedEvidence(null);
					toast.success("Evidence item removed");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!deletingId,
				onOpenChange: (open) => !open && setDeletingId(null),
				title: "Delete Evidence Record?",
				description: "This action cannot be undone. The evidence file and hash record will be permanently purged from the case file.",
				destructive: true,
				confirmLabel: "Delete Evidence",
				onConfirm: () => {
					if (deletingId) {
						onRemoveEvidence(deletingId);
						setDeletingId(null);
						toast.success("Evidence deleted successfully");
					}
				}
			})
		]
	});
}
function SynopsisEditor({ initialSynopsis, aiSynopsis, isGenerating = false, onSaveSynopsis, caseId, caseName, studentName }) {
	const { verifySynopsis, currentUser } = useDsim();
	const [content, setContent] = (0, import_react.useState)(initialSynopsis || "");
	const [isEditing, setIsEditing] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [generatingLocal, setGeneratingLocal] = (0, import_react.useState)(isGenerating);
	const [generationStep, setGenerationStep] = (0, import_react.useState)(0);
	const [hasFailed, setHasFailed] = (0, import_react.useState)(false);
	const [verifiedState, setVerifiedState] = (0, import_react.useState)(aiSynopsis?.reviewed || false);
	const steps = [
		"Transcribing investigation audio stream...",
		"Performing speaker diarization & role tagging...",
		"Extracting key statements & timeline inconsistencies...",
		"Formatting AI-assisted investigation synopsis draft..."
	];
	(0, import_react.useEffect)(() => {
		if (initialSynopsis) setContent(initialSynopsis);
	}, [initialSynopsis]);
	(0, import_react.useEffect)(() => {
		if (aiSynopsis?.reviewed) setVerifiedState(true);
	}, [aiSynopsis]);
	(0, import_react.useEffect)(() => {
		if (!isGenerating && !generatingLocal) return;
		setHasFailed(false);
		setGenerationStep(0);
		const interval = setInterval(() => {
			setGenerationStep((prev) => {
				if (prev >= steps.length - 1) {
					clearInterval(interval);
					setGeneratingLocal(false);
					if (!content) {
						setContent(SAMPLE_SYNOPSIS);
						onSaveSynopsis(SAMPLE_SYNOPSIS);
					}
					toast.success("AI Investigation Synopsis generated. Review and verification required.");
					return prev;
				}
				return prev + 1;
			});
		}, 900);
		return () => clearInterval(interval);
	}, [isGenerating, generatingLocal]);
	const handleRegenerate = () => {
		setHasFailed(false);
		setGeneratingLocal(true);
	};
	const handleCopy = () => {
		navigator.clipboard.writeText(content);
		setCopied(true);
		toast.success("Synopsis copied to clipboard");
		setTimeout(() => setCopied(false), 2e3);
	};
	const handleSave = () => {
		onSaveSynopsis(content);
		setIsEditing(false);
		toast.success("Investigation synopsis updated.");
	};
	const handleVerify = () => {
		if (caseId) verifySynopsis(caseId);
		setVerifiedState(true);
		toast.success("Synopsis officially marked as Reviewed & Verified by Committee.");
	};
	if (generatingLocal) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "surface p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center py-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mb-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary animate-pulse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							className: "size-7 animate-spin",
							style: { animationDuration: "3s" }
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-base font-semibold text-foreground",
					children: "Processing Hearing Audio (Assistive AI)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-xs text-primary transition-all duration-300",
					children: steps[generationStep]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex w-full max-w-xs gap-1.5",
					children: steps.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1 flex-1 rounded-full transition-all duration-300 ${i <= generationStep ? "bg-primary" : "bg-secondary"}` }, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[0.7rem] text-muted-foreground",
					children: "Assistive draft generation only. Human verification mandatory."
				})
			]
		})
	});
	if (hasFailed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "surface p-6 space-y-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-8 mx-auto text-destructive" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-base font-semibold text-foreground",
					children: "AI Processing Could Not Be Completed"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground max-w-md mx-auto",
					children: "Automated speech synthesis or transcript parsing encountered low-confidence audio segments. The investigation must not be delayed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-center gap-2 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: handleRegenerate,
							className: "text-xs gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "size-3.5" }), " Retry AI Processing"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => {
								setHasFailed(false);
								setIsEditing(true);
							},
							className: "text-xs gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-3.5" }), " Draft Synopsis Manually"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setHasFailed(false),
							className: "text-xs",
							children: "Continue Investigation"
						})
					]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface overflow-hidden p-5 sm:p-6 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 flex-wrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-semibold",
							children: "AI-Assisted Investigation Synopsis"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-md bg-indigo-500/10 px-2 py-0.5 text-[0.68rem] font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), " Assistive Draft"]
						}),
						verifiedState ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[0.68rem] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Reviewed & Verified"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[0.68rem] font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-3" }), " Verification Required"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-muted-foreground",
					children: "AI-assisted synopsis. Committee review and verification required before formal finding adoption."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [content && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						!verifiedState && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: handleVerify,
							className: "gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), " Mark as Reviewed & Verified"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: handleCopy,
							className: "gap-1.5 text-xs h-8",
							children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copied ? "Copied" : "Copy"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: handleRegenerate,
							className: "gap-1.5 text-xs h-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "size-3.5" }), " Regenerate"]
						})
					] }), !isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setIsEditing(true),
						className: "gap-1.5 text-xs h-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-3.5" }), " Edit Synopsis"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setIsEditing(false),
							className: "gap-1 text-xs h-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), " Cancel"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: handleSave,
							className: "gap-1.5 text-xs bg-primary h-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" }), " Save Changes"]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-amber-500/30 bg-amber-500/5 p-3.5 text-xs text-amber-800 dark:text-amber-300 space-y-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4 text-amber-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AI-assisted synopsis" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.72rem] text-muted-foreground leading-relaxed pl-6",
						children: "AI-generated content must be reviewed and verified by the Committee before use in the case record. The AI synopsis synthesizes verified transcripts, evidence metadata, investigation notes, and relevant witness accounts without determining guilt or disciplinary punishment."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 pl-6 pt-1 text-[0.68rem] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "Synthesis Inputs:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-secondary px-2 py-0.5",
								children: "🎙 Audio Transcript"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-secondary px-2 py-0.5",
								children: "📁 Evidence Metadata"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-secondary px-2 py-0.5",
								children: "📝 Investigation Notes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-secondary px-2 py-0.5",
								children: "👥 Witness Statements"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: content,
						onChange: (e) => setContent(e.target.value),
						rows: 12,
						className: "font-sans text-xs sm:text-sm leading-relaxed",
						placeholder: "Enter official investigation synopsis..."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Committee member direct edit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [content.length, " characters"] })]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-border/80 bg-background/50 p-4 sm:p-5",
					children: content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "whitespace-pre-line text-xs sm:text-sm leading-relaxed text-foreground font-sans",
						children: content
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-8 text-center text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-6 mx-auto mb-2 opacity-40 text-primary" }),
							"No synopsis generated yet. Start an investigation recording or draft an initial summary.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: handleRegenerate,
									className: "text-xs",
									children: "Generate Sample Synopsis"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setIsEditing(true),
									className: "text-xs",
									children: "Draft Manually"
								})]
							})
						]
					})
				})
			})
		]
	});
}
function TranscriptViewer({ transcript = [], caseId, caseName, studentName, audioEvidenceId, audioUrl, transcriptStatus = "Completed", onRegenerateTranscript, onUpdateEntry, onVerifyTranscript, onGenerateAiSynopsis, onSeekAudio }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [currentMatchIndex, setCurrentMatchIndex] = (0, import_react.useState)(0);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [isRegenerating, setIsRegenerating] = (0, import_react.useState)(false);
	const [showOriginalComparison, setShowOriginalComparison] = (0, import_react.useState)(false);
	const [editingEntry, setEditingEntry] = (0, import_react.useState)(null);
	const [editDraftText, setEditDraftText] = (0, import_react.useState)("");
	const [editDraftNotes, setEditDraftNotes] = (0, import_react.useState)("");
	const [editDraftFlagged, setEditDraftFlagged] = (0, import_react.useState)(false);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [currentTimeSec, setCurrentTimeSec] = (0, import_react.useState)(0);
	const [audioDurationSec, setAudioDurationSec] = (0, import_react.useState)(300);
	const [volume, setVolume] = (0, import_react.useState)(85);
	const [playbackRate, setPlaybackRate] = (0, import_react.useState)(1);
	const audioElementRef = (0, import_react.useRef)(null);
	const searchMatches = (0, import_react.useMemo)(() => {
		if (!search.trim()) return [];
		const q = search.toLowerCase();
		const matches = [];
		transcript.forEach((entry, idx) => {
			if (`${entry.text} ${entry.speaker} ${entry.speakerName || ""} ${entry.timestamp}`.toLowerCase().includes(q)) matches.push({
				entryId: entry.id,
				index: idx
			});
		});
		return matches;
	}, [transcript, search]);
	const handleNextMatch = () => {
		if (searchMatches.length === 0) return;
		const nextIdx = (currentMatchIndex + 1) % searchMatches.length;
		setCurrentMatchIndex(nextIdx);
		const targetMatch = searchMatches[nextIdx];
		if (targetMatch) document.getElementById(`segment-${targetMatch.entryId}`)?.scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
	};
	const handlePrevMatch = () => {
		if (searchMatches.length === 0) return;
		const prevIdx = (currentMatchIndex - 1 + searchMatches.length) % searchMatches.length;
		setCurrentMatchIndex(prevIdx);
		const targetMatch = searchMatches[prevIdx];
		if (targetMatch) document.getElementById(`segment-${targetMatch.entryId}`)?.scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
	};
	const jumpToTimestamp = (seconds) => {
		setCurrentTimeSec(seconds);
		onSeekAudio?.(seconds);
		if (audioElementRef.current) {
			audioElementRef.current.currentTime = seconds;
			if (!isPlaying) {
				audioElementRef.current.playbackRate = playbackRate;
				audioElementRef.current.play().catch(() => {});
				setIsPlaying(true);
			}
		}
		toast.info(`Audio player synchronized to ${formatTime(seconds)}`);
	};
	const handleSpeedChange = (speed) => {
		setPlaybackRate(speed);
		if (audioElementRef.current) audioElementRef.current.playbackRate = speed;
	};
	const toggleAudio = () => {
		if (!audioUrl) {
			setIsPlaying((prev) => !prev);
			return;
		}
		if (!audioElementRef.current) {
			const audio = new Audio(audioUrl);
			audioElementRef.current = audio;
			audio.volume = volume / 100;
			audio.playbackRate = playbackRate;
			audio.ontimeupdate = () => {
				setCurrentTimeSec(Math.floor(audio.currentTime));
			};
			audio.onloadedmetadata = () => {
				setAudioDurationSec(Math.floor(audio.duration));
			};
			audio.onended = () => {
				setIsPlaying(false);
				setCurrentTimeSec(0);
			};
		}
		if (isPlaying) {
			audioElementRef.current.pause();
			setIsPlaying(false);
		} else {
			audioElementRef.current.playbackRate = playbackRate;
			audioElementRef.current.play().catch(() => {});
			setIsPlaying(true);
		}
	};
	const formatTime = (secs) => {
		const mins = Math.floor(secs / 60);
		const s = Math.floor(secs % 60);
		return `${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
	};
	const openEditModal = (entry) => {
		setEditingEntry(entry);
		setEditDraftText(entry.text);
		setEditDraftNotes(entry.notes || "");
		setEditDraftFlagged(entry.flaggedUnclear || false);
	};
	const handleSaveEdit = () => {
		if (!editingEntry) return;
		if (!editDraftText.trim()) {
			toast.error("Transcript text cannot be empty.");
			return;
		}
		onUpdateEntry?.(editingEntry.id, {
			text: editDraftText.trim(),
			notes: editDraftNotes.trim() || void 0,
			flaggedUnclear: editDraftFlagged,
			isEdited: true,
			originalText: editingEntry.originalText || editingEntry.text,
			reviewed: true
		});
		setEditingEntry(null);
		toast.success("Transcript statement updated and marked as reviewed.");
	};
	const handleCopy = () => {
		const text = transcript.map((t) => `[${t.timestamp}] ${t.speakerName ? `${t.speakerName} (${t.speaker})` : t.speaker}:\n"${t.text}"` + (t.notes ? `\n[Reviewer Note: ${t.notes}]` : "")).join("\n\n");
		navigator.clipboard.writeText(text);
		setCopied(true);
		toast.success("Transcript copied to clipboard");
		setTimeout(() => setCopied(false), 2e3);
	};
	const handleDownload = () => {
		const text = `================================================================================
DSIM OFFICIAL INVESTIGATION AUDIO TRANSCRIPT
Case Reference: ${caseId} — ${caseName || "Disciplinary Hearing"}
Subject: ${studentName || "Accused Student"}
Connected Evidence: ${audioEvidenceId || "Primary Investigation Recording"}
Generated: ${(/* @__PURE__ */ new Date()).toLocaleString()}
Verification Status: ${transcriptStatus}
Classification: CONFIDENTIAL / DISCIPLINE COMMITTEE RECORD ONLY
================================================================================

${transcript.map((t) => `[${t.timestamp}] ${t.speakerName ? `${t.speakerName} (${t.speaker})` : t.speaker}${t.confidence ? ` [Confidence: ${Math.round(t.confidence * 100)}%]` : ""}:
${t.text}${t.isEdited ? `\n(Original AI Draft: "${t.originalText}")` : ""}${t.notes ? `\n(Committee Note: ${t.notes})` : ""}`).join("\n\n")}

================================================================================
END OF RECORDED TRANSCRIPT
Human verification by Discipline Committee required before disciplinary sanction.
================================================================================`;
		const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `Transcript-${caseId}-${Date.now()}.txt`;
		a.click();
		toast.success(`Downloaded transcript for ${caseId}`);
	};
	const handleRegenerate = () => {
		setIsRegenerating(true);
		setTimeout(() => {
			setIsRegenerating(false);
			onRegenerateTranscript?.();
			toast.success("Transcript re-indexed and aligned with voice recording audio tracks.");
		}, 1500);
	};
	const renderHighlightedText = (text, query) => {
		if (!query.trim()) return text;
		return text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")).map((part, i) => part.toLowerCase() === query.toLowerCase() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", {
			className: "bg-amber-300 dark:bg-amber-500/40 text-foreground px-0.5 rounded font-medium",
			children: part
		}, i) : part);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface overflow-hidden p-5 sm:p-6 space-y-5",
		role: "region",
		"aria-label": "Investigation Voice Transcript",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 place-items-center rounded-lg bg-indigo-500/10 text-indigo-600",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
							className: "size-4",
							"aria-hidden": "true"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-bold text-foreground",
								children: "Speech-to-Text Voice Transcript"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-indigo-500/10 px-2 py-0.5 text-[0.68rem] font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20",
								children: "AI-generated transcript. Review for accuracy."
							}),
							transcriptStatus === "Verified" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[0.68rem] font-semibold text-emerald-600 border border-emerald-500/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Committee Verified"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-[0.68rem] font-semibold text-amber-600 border border-amber-500/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3" }), " Under Review"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: [
							"Connected Audio Evidence:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground font-mono",
								children: audioEvidenceId || "Case Recording (AUD-Primary)"
							}),
							" · ",
							"AI-generated transcript. Review for accuracy before official verification."
						]
					})] })]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						onVerifyTranscript && transcriptStatus !== "Verified" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: onVerifyTranscript,
							disabled: transcript.length === 0,
							className: "text-xs gap-1.5 h-8 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), " Verify Transcript"]
						}),
						onGenerateAiSynopsis && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: onGenerateAiSynopsis,
							disabled: transcript.length === 0,
							className: "text-xs gap-1.5 h-8 border-primary/30 text-primary hover:bg-primary/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Generate AI Synopsis →"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: handleCopy,
							disabled: transcript.length === 0,
							className: "text-xs gap-1.5 h-8",
							"aria-label": "Copy entire transcript to clipboard",
							children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copied ? "Copied" : "Copy"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: handleDownload,
							disabled: transcript.length === 0,
							className: "text-xs gap-1.5 h-8",
							"aria-label": "Download official transcript text file",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), " Export"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: handleRegenerate,
							disabled: isRegenerating,
							className: "text-xs gap-1.5 h-8 text-primary",
							"aria-label": "Re-align transcript with audio tracks",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5", isRegenerating && "animate-spin") }), isRegenerating ? "Re-aligning..." : "Re-align"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card/80 p-3 sm:p-4 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 w-full sm:w-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "outline",
								className: "size-9 rounded-full shrink-0",
								onClick: toggleAudio,
								"aria-label": isPlaying ? "Pause synchronized audio" : "Play synchronized audio",
								children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4 text-signal" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 ml-0.5 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs font-mono tabular-nums text-foreground",
								children: [
									formatTime(currentTimeSec),
									" / ",
									formatTime(audioDurationSec)
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 w-full space-y-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								value: [currentTimeSec],
								max: audioDurationSec,
								step: 1,
								onValueChange: (val) => jumpToTimestamp(val[0] ?? 0),
								className: "w-full",
								"aria-label": "Audio scrubber slider"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden items-center gap-2 sm:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
								className: "size-3.5 text-muted-foreground",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								value: [volume],
								max: 100,
								step: 5,
								onValueChange: (val) => {
									setVolume(val[0] ?? 80);
									if (audioElementRef.current) audioElementRef.current.volume = (val[0] ?? 80) / 100;
								},
								className: "w-16",
								"aria-label": "Playback volume"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between border-t border-border/50 pt-1.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.7rem]",
							children: "Click any statement timestamp to seek audio"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.68rem]",
							children: "Speed:"
						}), [
							.75,
							1,
							1.25,
							1.5,
							2
						].map((spd) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => handleSpeedChange(spd),
							className: cn("rounded px-1.5 py-0.5 font-mono text-[0.68rem] transition-colors cursor-pointer", playbackRate === spd ? "bg-primary text-primary-foreground font-bold" : "bg-muted text-muted-foreground hover:bg-muted/80"),
							children: [spd, "x"]
						}, spd))]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-muted/20 px-3.5 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "AI-Assisted Investigation Transcript:" }), " Generated from voice recording. Statements must be verified and edited by Discipline Committee officers before disciplinary determinations."] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setShowOriginalComparison((v) => !v),
						className: "text-[0.72rem] text-primary hover:underline flex items-center gap-1 font-medium cursor-pointer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3" }),
							" ",
							showOriginalComparison ? "Hide AI Drafts" : "Compare Original AI"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[0.7rem] text-muted-foreground",
						children: "Model: Mock STT 48kHz"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 max-w-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							className: "absolute left-2.5 top-2.5 size-3.5 text-muted-foreground",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Search keywords, admissions, inconsistencies, speakers...",
							value: search,
							onChange: (e) => {
								setSearch(e.target.value);
								setCurrentMatchIndex(0);
							},
							className: "h-8.5 pl-8 text-xs bg-card",
							"aria-label": "Search transcript"
						})]
					}),
					search.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-muted-foreground",
							children: [
								searchMatches.length,
								" ",
								searchMatches.length === 1 ? "match" : "matches",
								" found"
							]
						}), searchMatches.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[0.7rem] text-muted-foreground",
									children: [
										"(",
										currentMatchIndex + 1,
										"/",
										searchMatches.length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "outline",
									className: "size-6 text-xs",
									onClick: handlePrevMatch,
									"aria-label": "Previous match",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-3" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "outline",
									className: "size-6 text-xs",
									onClick: handleNextMatch,
									"aria-label": "Next match",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3" })
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground font-mono self-end sm:self-auto",
						children: [
							transcript.length,
							" ",
							transcript.length === 1 ? "statement" : "statements"
						]
					})
				]
			}),
			transcript.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-dashed border-border p-8 text-center space-y-2 bg-muted/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-8 mx-auto text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-foreground",
						children: "No transcript entries available"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground max-w-sm mx-auto",
						children: "Save a voice recording from the Investigation studio and click \"Generate Transcript\" to produce a verbatim dialogue record."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3 max-h-[560px] overflow-y-auto pr-1",
				children: transcript.map((item, idx) => {
					const isInvestigator = item.speaker === "Investigator" || item.speaker.includes("Committee");
					const isStudent = item.speaker === "Student";
					const isLowConfidence = item.confidence !== void 0 && item.confidence < .8 || item.flaggedUnclear;
					const timeOffset = item.timeOffsetSec ?? idx * 15;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: `segment-${item.id}`,
						className: cn("rounded-xl border p-4 transition-all space-y-2 relative group", isInvestigator ? "border-primary/20 bg-primary/5 ml-0 mr-4 sm:mr-10" : isStudent ? "border-signal/20 bg-signal/5 ml-4 sm:ml-10 mr-0" : "border-border bg-card/70 ml-2 sm:ml-6 mr-2", isLowConfidence && "ring-1 ring-amber-500/40 border-amber-500/30"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("grid size-6 place-items-center rounded-full text-xs font-bold shrink-0", isInvestigator ? "bg-primary text-primary-foreground" : isStudent ? "bg-signal text-white" : "bg-secondary text-foreground"),
											children: item.speaker[0]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-xs text-foreground",
											children: item.speakerName || item.speaker
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[0.65rem] text-muted-foreground px-1.5 py-0.5 rounded bg-secondary font-mono",
											children: item.speaker
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => jumpToTimestamp(timeOffset),
											className: "inline-flex items-center gap-1 font-mono text-[0.7rem] text-primary hover:underline hover:bg-primary/10 px-1.5 py-0.5 rounded transition-colors cursor-pointer",
											title: "Seek audio to this timestamp",
											"aria-label": `Jump audio to ${item.timestamp}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-2.5 fill-current" }), item.timestamp]
										}),
										item.isEdited && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[0.65rem] font-medium text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20",
											children: "Edited & Reviewed"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [isLowConfidence && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded bg-amber-500/15 px-2 py-0.5 text-[0.65rem] font-semibold text-amber-600 border border-amber-500/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3" }), " ⚠ Low Confidence Audio"]
									}), onUpdateEntry && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										size: "sm",
										onClick: () => openEditModal(item),
										className: "h-6 text-[0.7rem] gap-1 px-2 text-muted-foreground hover:text-foreground",
										"aria-label": "Edit transcript statement",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-3" }), " Edit"]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-foreground leading-relaxed pl-8 font-sans",
								children: [
									"\"",
									renderHighlightedText(item.text, search),
									"\""
								]
							}),
							showOriginalComparison && item.isEdited && item.originalText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-8 mt-1.5 rounded-lg border border-dashed border-border/80 bg-muted/30 p-2 text-[0.7rem] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: "Original AI Draft: "
									}),
									"\"",
									item.originalText,
									"\""
								]
							}),
							item.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-8 mt-1 rounded bg-secondary/50 px-2.5 py-1 text-[0.7rem] text-muted-foreground border-l-2 border-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: "Committee Note: "
									}),
									" ",
									item.notes
								]
							})
						]
					}, item.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!editingEntry,
				onOpenChange: (open) => !open && setEditingEntry(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "text-base font-bold flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-4 text-primary" }), " Review & Edit Transcript Statement"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-xs text-muted-foreground",
							children: "Correct transcription errors, add committee notes, or flag unclear speech segments. The original AI transcript remains preserved in the audit trail."
						})] }),
						editingEntry && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-muted/30 p-2.5 border border-border/70 space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-muted-foreground text-[0.7rem]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Speaker: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: editingEntry.speakerName || editingEntry.speaker
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Timestamp: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground font-mono",
											children: editingEntry.timestamp
										})] })]
									}), editingEntry.originalText && editingEntry.isEdited && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[0.68rem] text-muted-foreground border-t border-border/50 pt-1 mt-1",
										children: [
											"Original Draft: \"",
											editingEntry.originalText,
											"\""
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-semibold text-foreground text-xs",
										children: "Statement Text"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										value: editDraftText,
										onChange: (e) => setEditDraftText(e.target.value),
										rows: 4,
										className: "text-xs bg-background",
										placeholder: "Accurate spoken statement..."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-semibold text-foreground text-xs",
										children: "Internal Committee Note (Optional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: editDraftNotes,
										onChange: (e) => setEditDraftNotes(e.target.value),
										className: "text-xs bg-background h-8",
										placeholder: "e.g. Verified against audio at 00:01:24; student hesitation noted."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-lg border border-border p-2.5 bg-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-semibold text-foreground text-xs flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-3 text-amber-500" }), " Flag Section as Unclear"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[0.68rem] text-muted-foreground",
											children: "Marks audio segment as low-confidence or requiring further hearing clarification."
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: editDraftFlagged,
										onChange: (e) => setEditDraftFlagged(e.target.checked),
										className: "size-4 rounded border-border text-primary cursor-pointer",
										"aria-label": "Flag section as unclear audio"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "flex justify-between sm:justify-between items-center pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setEditingEntry(null),
								className: "text-xs h-8",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: handleSaveEdit,
								className: "text-xs h-8 bg-primary gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " Save Correction"]
							})]
						})
					]
				})
			})
		]
	});
}
function InvestigationNotesView({ caseId, notes = [], onAddNote, onUpdateNote, onDeleteNote }) {
	const [isAdding, setIsAdding] = (0, import_react.useState)(false);
	const [newContent, setNewContent] = (0, import_react.useState)("");
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [editContent, setEditContent] = (0, import_react.useState)("");
	const handleSaveNew = () => {
		if (!newContent.trim()) {
			toast.error("Please enter note content");
			return;
		}
		onAddNote(newContent.trim());
		setNewContent("");
		setIsAdding(false);
		toast.success("Investigation note recorded in case record.");
	};
	const handleStartEdit = (note) => {
		setEditingId(note.id);
		setEditContent(note.content);
	};
	const handleSaveEdit = (noteId) => {
		if (!editContent.trim()) return;
		onUpdateNote(noteId, editContent.trim());
		setEditingId(null);
		setEditContent("");
		toast.success("Note updated");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface overflow-hidden p-5 sm:p-6 space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 place-items-center rounded-lg bg-amber-500/10 text-amber-600",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyNote, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-bold text-foreground",
						children: "Ongoing Investigation Notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Investigator impressions, field observations, and interview logs separate from formal transcripts and synopsis."
					})] })]
				}) }), !isAdding && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => setIsAdding(true),
					className: "gap-1.5 text-xs bg-primary hover:bg-primary/90 shadow-sm self-start sm:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Add Note"]
				})]
			}),
			isAdding && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-primary/40 bg-primary/5 p-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold text-xs text-foreground flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyNote, { className: "size-3.5 text-primary" }), " New Investigator Note"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.68rem] text-muted-foreground",
							children: "Logged with timestamp"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 3,
						placeholder: "Record real-time inquiry observation, witness behavior, cross-verification findings...",
						value: newContent,
						onChange: (e) => setNewContent(e.target.value),
						className: "text-xs bg-card",
						autoFocus: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => {
								setIsAdding(false);
								setNewContent("");
							},
							className: "text-xs h-8",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: handleSaveNew,
							className: "text-xs h-8 gap-1.5 bg-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " Save Note"]
						})]
					})
				]
			}),
			notes.length === 0 && !isAdding ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-dashed border-border p-8 text-center bg-muted/20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyNote, { className: "size-8 mx-auto text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-foreground mt-2",
						children: "No investigation notes recorded yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground max-w-sm mx-auto mt-1",
						children: "Committee members can document confidential observations, witness lead pointers, and deliberation notes here."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setIsAdding(true),
						className: "mt-3 text-xs",
						children: "+ Add First Note"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3 max-h-[500px] overflow-y-auto pr-1",
				children: notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card/70 p-4 transition-all hover:border-border/90 hover:bg-card space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-6 place-items-center rounded-full bg-secondary text-foreground text-xs font-semibold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-xs text-foreground",
									children: note.author
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.68rem] text-muted-foreground font-mono",
									children: fmtDateTime(note.timestamp)
								}),
								note.updatedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.65rem] text-muted-foreground italic",
									children: "(edited)"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "size-7 text-muted-foreground hover:text-foreground",
								onClick: () => handleStartEdit(note),
								"aria-label": "Edit note",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-3.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "size-7 text-destructive hover:bg-destructive/10",
								onClick: () => {
									onDeleteNote(note.id);
									toast.success("Note removed");
								},
								"aria-label": "Delete note",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
							})]
						})]
					}), editingId === note.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
							value: editContent,
							onChange: (e) => setEditContent(e.target.value),
							className: "text-xs bg-background"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setEditingId(null),
								className: "text-xs h-7",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => handleSaveEdit(note.id),
								className: "text-xs h-7 bg-primary",
								children: "Update Note"
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-foreground/90 leading-relaxed font-sans whitespace-pre-wrap pl-8",
						children: note.content
					})]
				}, note.id))
			})
		]
	});
}
function InvestigationTimeline({ timeline, onAddNote, caseId }) {
	const [showAddNote, setShowAddNote] = (0, import_react.useState)(false);
	const [noteText, setNoteText] = (0, import_react.useState)("");
	const sortedTimeline = [...timeline].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
	const getEventIcon = (kind) => {
		switch (kind) {
			case "start": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5 text-blue-500" });
			case "audio": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-3.5 text-indigo-500" });
			case "transcript": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3.5 text-indigo-500" });
			case "photo": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-3.5 text-emerald-500" });
			case "video": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-3.5 text-rose-500" });
			case "person": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-3.5 text-amber-500" });
			case "synopsis": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-purple-500" });
			case "decision": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, { className: "size-3.5 text-red-500" });
			case "created": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-slate-500" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyNote, { className: "size-3.5 text-teal-500" });
		}
	};
	const handleSubmitNote = (e) => {
		e.preventDefault();
		if (!noteText.trim()) return;
		onAddNote?.(noteText.trim());
		setNoteText("");
		setShowAddNote(false);
		toast.success("Investigation note recorded in timeline");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface p-5 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-semibold",
					children: "Investigation Chronology"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Chronological record of proceedings, statements, and evidence intake."
				})] }), onAddNote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => setShowAddNote((v) => !v),
					className: "text-xs gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Add Note"]
				})]
			}),
			showAddNote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmitNote,
				className: "my-4 flex gap-2 rounded-lg border border-border bg-card p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Record quick observation or investigator note...",
						value: noteText,
						onChange: (e) => setNoteText(e.target.value),
						className: "text-xs",
						autoFocus: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						size: "sm",
						className: "text-xs gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " Save"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: () => setShowAddNote(false),
						className: "text-xs",
						children: "Cancel"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-border space-y-6",
				children: sortedTimeline.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-4 text-xs text-muted-foreground",
					children: "No events recorded yet."
				}) : sortedTimeline.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -left-6 top-0.5 grid size-5 place-items-center rounded-full bg-card border border-border shadow-xs",
						children: getEventIcon(item.kind)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-xs text-foreground",
									children: item.event
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[0.65rem] text-muted-foreground",
									children: fmtDateTime(item.timestamp)
								}),
								item.evidenceRef && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-secondary px-1.5 py-0.2 font-mono text-[0.62rem] text-primary",
									children: item.evidenceRef
								})
							]
						}), item.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground leading-relaxed",
							children: item.description
						})]
					})]
				}, item.id))
			})
		]
	});
}
//#endregion
export { Slider as a, Route as i, InvestigationNotesView as n, SynopsisEditor as o, InvestigationTimeline as r, TranscriptViewer as s, EvidenceGallery as t };
