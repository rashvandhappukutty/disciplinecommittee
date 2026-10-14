import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useDsim, n as Button, u as cn } from "./button-C7ZpzBGx.mjs";
import { S as useParams, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ct as Eye, Ft as CircleAlert, Pt as CircleCheck, Rt as ChevronLeft, W as MessageSquare, a as User, bt as FileHeadphone, ht as File, i as Users, jt as CircleX, mt as Film, ot as History, ut as FolderPlus, x as ShieldCheck, yt as FileImage } from "../_libs/lucide-react.mjs";
import { j as fmtDateTime, u as ConfirmDialog } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { t as Protected } from "./Protected-DW_nWC7p.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Cd1zWcTd.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { t as Label } from "./label-Di2QZFiw.mjs";
import { t as Textarea } from "./textarea-DmMEYLpm.mjs";
import { i as REJECTION_REASONS, r as INFO_REQUEST_TYPES } from "./types-BJyJLv_7.mjs";
import { t as ComplaintStatusBadge } from "./student.dashboard-DTR9e2n-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/complaints._complaintId-D7vdtoJb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ComplaintReviewRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Protected, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintReviewPage, {}) });
}
function ComplaintReviewPage() {
	const { complaintId } = useParams({ from: "/complaints/$complaintId" });
	const { getComplaint, acceptComplaint, rejectComplaint, requestComplaintInfo, convertComplaintToCase } = useDsim();
	const navigate = useNavigate();
	const complaint = getComplaint(complaintId);
	const [showAcceptModal, setShowAcceptModal] = (0, import_react.useState)(false);
	const [showRejectModal, setShowRejectModal] = (0, import_react.useState)(false);
	const [selectedReason, setSelectedReason] = (0, import_react.useState)("Insufficient Information");
	const [customReason, setCustomReason] = (0, import_react.useState)("");
	const [rejectionRemarks, setRejectionRemarks] = (0, import_react.useState)("");
	const [showRequestInfoModal, setShowRequestInfoModal] = (0, import_react.useState)(false);
	const [requestType, setRequestType] = (0, import_react.useState)("Clarification");
	const [infoQuestion, setInfoQuestion] = (0, import_react.useState)("");
	const [showConvertModal, setShowConvertModal] = (0, import_react.useState)(false);
	const [convertRemarks, setConvertRemarks] = (0, import_react.useState)("");
	if (!complaint) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mx-auto size-10 text-muted-foreground mb-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-bold text-foreground",
				children: "Complaint Not Found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: [
					"The complaint ID (",
					complaintId,
					") could not be located in records."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => navigate({ to: "/complaints" }),
				className: "mt-4 text-xs",
				children: "Return to Incoming Complaints"
			})
		]
	});
	const primaryPerson = complaint.personsInvolved.find((p) => p.isPrimary) || complaint.personsInvolved[0];
	const handleAccept = () => {
		acceptComplaint(complaint.id);
		toast.success("Complaint Accepted", { description: `Complaint ${complaint.id} accepted for disciplinary proceedings.` });
		setShowAcceptModal(false);
	};
	const handleReject = () => {
		const finalReason = selectedReason === "Other" ? customReason.trim() || "Other" : selectedReason;
		if (selectedReason === "Other" && !customReason.trim()) {
			toast.error("Please specify the custom rejection explanation.");
			return;
		}
		rejectComplaint(complaint.id, finalReason, rejectionRemarks.trim() || void 0);
		setShowRejectModal(false);
	};
	const handleRequestInfo = () => {
		if (!infoQuestion.trim()) {
			toast.error("Please enter the specific inquiry or clarification requested.");
			return;
		}
		requestComplaintInfo(complaint.id, infoQuestion.trim(), requestType);
		setShowRequestInfoModal(false);
		setInfoQuestion("");
	};
	const handleConvert = () => {
		const newCase = convertComplaintToCase(complaint.id, convertRemarks.trim() || void 0);
		setShowConvertModal(false);
		if (newCase) navigate({
			to: "/cases/$caseId",
			params: { caseId: newCase.id }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl mx-auto space-y-6 pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/complaints",
						className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5" }), " Back to Incoming Complaints"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-bold tracking-tight text-foreground font-mono",
								children: complaint.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintStatusBadge, { status: complaint.status }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("rounded px-2 py-0.5 text-[0.68rem] font-bold uppercase", complaint.urgency === "immediate_safety" ? "bg-destructive/15 text-destructive" : complaint.urgency === "urgent" ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" : "bg-secondary text-secondary-foreground"),
								children: complaint.urgency.replace(/_/g, " ")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: complaint.title
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: complaint.convertedCaseId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cases/$caseId",
						params: { caseId: complaint.convertedCaseId },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "text-xs bg-purple-600 hover:bg-purple-700 text-white gap-2 font-semibold shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, { className: "size-4" }),
								" View Converted Case (",
								complaint.convertedCaseId,
								")"
							]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [complaint.status !== "Rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setShowRequestInfoModal(true),
							className: "text-xs gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3.5" }), " Request Info"]
						}),
						complaint.status !== "Accepted" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setShowAcceptModal(true),
							className: "text-xs gap-1.5 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), " Accept Complaint"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => setShowConvertModal(true),
							className: "text-xs bg-primary hover:bg-primary/90 gap-1.5 font-semibold shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, { className: "size-3.5" }), " Convert to Disciplinary Case"]
						})
					] }), complaint.status !== "Rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setShowRejectModal(true),
						className: "text-xs text-destructive hover:text-destructive hover:bg-destructive/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3.5 mr-1" }), " Reject"]
					})] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-border pb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
										children: "Reported Incident Details"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-secondary px-2 py-0.5 text-[0.7rem] font-medium text-secondary-foreground",
										children: complaint.category
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block text-[0.7rem]",
											children: "Date of Incident:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: complaint.incidentDate
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block text-[0.7rem]",
											children: "Approximate Time:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: complaint.incidentTime || "Not specified"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block text-[0.7rem]",
											children: "Campus Location:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: complaint.location
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground block text-[0.7rem] mb-1.5 font-medium",
										children: "Full Statement:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-lg bg-muted/20 border border-border/80 p-4 text-xs leading-relaxed text-foreground whitespace-pre-wrap",
										children: complaint.description
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-bold uppercase tracking-wider text-foreground",
										children: [
											"Persons Reported / Involved (",
											complaint.personsInvolved.length,
											")"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.68rem] text-muted-foreground",
									children: "Neutral pre-investigation classification"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: complaint.personsInvolved.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("rounded-xl border p-4 text-xs space-y-2 bg-card", p.isPrimary ? "border-primary/40 ring-1 ring-primary/20" : "border-border"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-foreground text-sm",
													children: p.unknownDetails ? "Unidentified Person" : p.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded bg-secondary px-2 py-0.5 text-[0.68rem] font-semibold text-secondary-foreground",
													children: p.relationship
												})]
											}), p.isPrimary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-primary/10 text-primary font-bold text-[0.65rem] px-2 py-0.5 uppercase",
												children: "Primary Person Reported"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 sm:grid-cols-3 gap-2 text-muted-foreground text-[0.72rem] pt-1",
											children: [p.rollNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Roll Number: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-foreground",
												children: p.rollNumber
											})] }), p.department && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Department: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-foreground",
												children: p.department
											})] })]
										}),
										p.details && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded bg-muted/30 p-2.5 text-[0.72rem] text-muted-foreground border border-border/60 mt-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-foreground",
													children: "Details / Description:"
												}),
												" ",
												p.details
											]
										})
									]
								}, p.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold uppercase tracking-wider text-foreground",
										children: "Witness Information"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[0.68rem] text-muted-foreground",
									children: ["Reported presence: ", complaint.hasWitnesses]
								})]
							}), complaint.witnesses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground italic",
								children: "No specific witness names provided by complainant."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: complaint.witnesses.map((w, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border p-3 text-xs bg-muted/10 space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-foreground",
												children: w.name
											}), w.relationship && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[0.68rem] text-muted-foreground",
												children: w.relationship
											})]
										}),
										w.rollNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[0.7rem] text-muted-foreground font-mono",
											children: [
												"Roll: ",
												w.rollNumber,
												" · ",
												w.department
											]
										}),
										w.contactInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[0.7rem] text-primary",
											children: ["Contact: ", w.contactInfo]
										}),
										w.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[0.72rem] text-muted-foreground pt-1",
											children: w.description
										})
									]
								}, w.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-bold uppercase tracking-wider text-foreground",
									children: [
										"Submitted Supporting Evidence (",
										complaint.evidence.length,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[0.68rem] text-emerald-500 font-medium flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), " Vault Verified"]
								})]
							}), complaint.evidence.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground italic",
								children: "No evidence attachments included in initial report."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
								children: complaint.evidence.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-muted/20 p-3.5 flex flex-col justify-between gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid size-9 shrink-0 place-items-center rounded-lg bg-card text-primary ring-1 ring-border",
											children: ev.fileType.startsWith("image/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileImage, { className: "size-4" }) : ev.fileType.startsWith("video/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "size-4" }) : ev.fileType.startsWith("audio/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileHeadphone, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, { className: "size-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-foreground truncate",
												children: ev.fileName
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[0.68rem] text-muted-foreground font-mono",
												children: ev.fileSize
											})]
										})]
									}), ev.description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[0.7rem] text-muted-foreground bg-card/60 p-2 rounded border border-border/50",
										children: [
											"\"",
											ev.description,
											"\""
										]
									})]
								}, ev.id))
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 border-b border-border pb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs font-bold uppercase tracking-wider text-foreground",
										children: "Complainant Information"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block text-[0.7rem]",
											children: "Student Name:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground text-sm",
											children: complaint.studentName
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block text-[0.7rem]",
											children: "Roll Number:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-semibold text-foreground",
											children: complaint.studentRoll
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block text-[0.7rem]",
											children: "Department:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground",
											children: complaint.studentDepartment
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block text-[0.7rem]",
											children: "Academic Year / Year:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-foreground",
											children: [
												complaint.academicYear,
												" · ",
												complaint.yearOfStudy
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block text-[0.7rem]",
											children: "Institutional Email:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground truncate block",
											children: complaint.studentEmail
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-3 space-y-1 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground block text-[0.7rem]",
										children: "Confidentiality Request:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-primary/10 text-primary px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider block text-center",
										children: complaint.privacyPreference.replace(/_/g, " ")
									})]
								})
							]
						}),
						(complaint.infoRequests || []).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-amber-500/30 bg-card p-5 shadow-sm space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3.5" }), "Information Requests"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: complaint.infoRequests?.map((req) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border p-3 text-xs space-y-2 bg-muted/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[0.68rem] text-muted-foreground font-mono block",
										children: [
											"Sent on ",
											fmtDateTime(req.requestedAt),
											" by ",
											req.requestedBy,
											":"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-medium text-foreground mt-0.5",
										children: [
											"\"",
											req.question,
											"\""
										]
									})] }), req.response ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-border/60 pt-2 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[0.68rem] text-emerald-600 dark:text-emerald-400 font-semibold block",
											children: [
												"Student Replied (",
												fmtDateTime(req.respondedAt || ""),
												"):"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-foreground bg-card p-2 rounded border border-border/60 mt-0.5",
											children: req.response
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[0.68rem] text-amber-600 dark:text-amber-400 italic",
										children: "● Awaiting student response..."
									})]
								}, req.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 border-b border-border pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-bold uppercase tracking-wider text-foreground",
									children: "Submission Lifecycle"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative pl-5 space-y-4 text-xs before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border",
								children: complaint.timeline.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-[17px] top-1 size-2 rounded-full bg-primary ring-4 ring-background" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-foreground",
											children: ev.event
										}),
										ev.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[0.72rem] text-muted-foreground mt-0.5",
											children: ev.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[0.65rem] text-muted-foreground/70 font-mono mt-0.5",
											children: fmtDateTime(ev.timestamp)
										})
									]
								}, ev.id))
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: showAcceptModal,
				onOpenChange: setShowAcceptModal,
				title: `Accept Complaint ${complaint.id}?`,
				description: "Accepting indicates that the complaint has been preliminarily verified and is queued for formal disciplinary action or case conversion.",
				confirmLabel: "Accept Complaint",
				onConfirm: handleAccept
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: showRejectModal,
				onOpenChange: setShowRejectModal,
				title: `Reject / Close Complaint ${complaint.id}?`,
				description: "Provide a formal reason for closing or rejecting this complaint. This reason will be communicated to the student.",
				confirmLabel: "Confirm Rejection",
				onConfirm: handleReject,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 my-2 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-xs font-semibold",
								children: ["Rejection Ground / Category ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: selectedReason,
								onValueChange: (v) => setSelectedReason(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select formal reason" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: REJECTION_REASONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: r,
									className: "text-xs",
									children: r
								}, r)) })]
							})]
						}),
						selectedReason === "Other" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-xs font-semibold",
								children: ["Custom Explanation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Specify exact institutional grounds...",
								value: customReason,
								onChange: (e) => setCustomReason(e.target.value),
								className: "text-xs"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs font-semibold",
								children: "Committee Remarks & Guidance"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								placeholder: "Additional guidance, referral info, or formal remarks to complainant...",
								value: rejectionRemarks,
								onChange: (e) => setRejectionRemarks(e.target.value),
								rows: 3,
								className: "text-xs"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: showRequestInfoModal,
				onOpenChange: setShowRequestInfoModal,
				title: "Request Additional Information from Student",
				description: "Specify what supplementary details, witnesses, or evidence are needed from the complainant.",
				confirmLabel: "Send Request to Student",
				onConfirm: handleRequestInfo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 my-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							className: "text-xs font-semibold",
							children: ["Information Category ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: requestType,
							onValueChange: (v) => setRequestType(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select inquiry category" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: INFO_REQUEST_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: t,
								className: "text-xs",
								children: t
							}, t)) })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							className: "text-xs font-semibold",
							children: ["Specific Inquiry / Question ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							placeholder: "e.g. Please specify the exact laboratory bench number and any faculty present in the room.",
							value: infoQuestion,
							onChange: (e) => setInfoQuestion(e.target.value),
							rows: 4,
							className: "text-xs"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: showConvertModal,
				onOpenChange: setShowConvertModal,
				title: `Convert ${complaint.id} to Formal Disciplinary Case?`,
				description: "This will automatically initialize a new DSIM case, transfer all attached evidence, statements, and reported subjects, and initiate the formal investigation workspace.",
				confirmLabel: "Convert & Open Investigation",
				onConfirm: handleConvert,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-2 space-y-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-muted/40 border border-border p-3 space-y-1.5 font-mono text-[0.72rem]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground font-sans",
									children: "Source Complaint:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-foreground",
									children: complaint.id
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground font-sans",
									children: "Primary Subject:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: primaryPerson?.name || "Person Reported"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground font-sans",
									children: "Evidence Items to Transfer:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-primary font-bold",
									children: [complaint.evidence.length, " files"]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs font-semibold",
							children: "Case Conversion Remarks (Optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "e.g. Expedited due to academic integrity violation severity...",
							value: convertRemarks,
							onChange: (e) => setConvertRemarks(e.target.value),
							className: "text-xs"
						})]
					})]
				})
			})
		]
	});
}
//#endregion
export { ComplaintReviewRoute as component };
