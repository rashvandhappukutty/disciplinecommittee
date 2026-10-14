import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useDsim, n as Button, u as cn } from "./button-C7ZpzBGx.mjs";
import { S as useParams, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ft as CircleAlert, J as Lock, Pt as CircleCheck, Rt as ChevronLeft, S as ShieldAlert, W as MessageSquare, ht as File, l as Upload, w as Send, yt as FileImage } from "../_libs/lucide-react.mjs";
import { A as fmtDate, j as fmtDateTime, k as UnauthorizedPage } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { t as Label } from "./label-Di2QZFiw.mjs";
import { t as Textarea } from "./textarea-DmMEYLpm.mjs";
import { t as ComplaintStatusBadge } from "./student.dashboard-DTR9e2n-.mjs";
import { t as StudentProtected } from "./StudentProtected-BxPSUqrJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.complaints._complaintId-C-Alebn7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudentComplaintDetailRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentProtected, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentComplaintDetailPage, {}) });
}
var LIFECYCLE_STEPS = [
	{
		key: "submitted",
		label: "Submitted",
		match: (s) => s !== "Rejected" ? "done" : "done"
	},
	{
		key: "review",
		label: "Under Review",
		match: (s) => {
			if (s === "Submitted") return "todo";
			if (s === "Under Review" || s === "Additional Information Requested") return "active";
			if (s === "Rejected") return "done";
			return "done";
		}
	},
	{
		key: "accepted",
		label: "Accepted",
		match: (s) => {
			if (s === "Submitted" || s === "Under Review" || s === "Additional Information Requested") return "todo";
			if (s === "Accepted") return "active";
			if (s === "Rejected") return "todo";
			return "done";
		}
	},
	{
		key: "investigation",
		label: "Investigation",
		match: (s) => {
			if (s === "Investigation in Progress" || s === "Converted to Case") return "active";
			if (s === "Decision Made" || s === "Resolved" || s === "Closed") return "done";
			return "todo";
		}
	},
	{
		key: "decision",
		label: "Decision",
		match: (s) => {
			if (s === "Decision Made") return "active";
			if (s === "Resolved" || s === "Closed") return "done";
			return "todo";
		}
	},
	{
		key: "resolved",
		label: "Resolved",
		match: (s) => {
			if (s === "Resolved" || s === "Closed") return "done";
			return "todo";
		}
	}
];
function StudentComplaintDetailPage() {
	const { complaintId } = useParams({ from: "/student/complaints/$complaintId" });
	const { getComplaint, studentProfile, currentUser, respondComplaintInfo } = useDsim();
	const navigate = useNavigate();
	const complaint = getComplaint(complaintId);
	const [responseText, setResponseText] = (0, import_react.useState)("");
	const [responseFiles, setResponseFiles] = (0, import_react.useState)([]);
	const [isSubmittingResponse, setIsSubmittingResponse] = (0, import_react.useState)(false);
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
					"The requested complaint ID (",
					complaintId,
					") could not be found."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => navigate({ to: "/student/dashboard" }),
				className: "mt-4 text-xs",
				children: "Return to Dashboard"
			})
		]
	});
	const studentOwnerId = currentUser?.studentId || studentProfile.rollNumber;
	if (!(complaint.studentId === studentOwnerId || complaint.studentRoll === studentOwnerId || currentUser?.email && complaint.studentEmail === currentUser.email || complaint.studentRoll === studentProfile.rollNumber)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnauthorizedPage, {
		portal: "student",
		customMessage: "You do not have authorization to view this complaint dossier. Access is strictly confined to the originating student."
	});
	const pendingInfoRequest = (complaint.infoRequests || []).find((r) => !r.response);
	const handleFileUpload = (e) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;
		Array.from(files).forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				const item = {
					id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
					fileName: file.name,
					fileType: file.type || "application/octet-stream",
					fileSize: `${(file.size / 1048576).toFixed(1)} MB`,
					url: reader.result,
					description: "Attached in response to committee info request",
					uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
				};
				setResponseFiles((prev) => [...prev, item]);
			};
			reader.readAsDataURL(file);
		});
		e.target.value = "";
	};
	const handleSendResponse = (requestId) => {
		if (!responseText.trim()) {
			toast.error("Please provide a response before submitting.");
			return;
		}
		setIsSubmittingResponse(true);
		setTimeout(() => {
			respondComplaintInfo(complaint.id, requestId, responseText.trim(), responseFiles);
			setIsSubmittingResponse(false);
			setResponseText("");
			setResponseFiles([]);
			toast.success("Response submitted successfully.");
		}, 600);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl mx-auto space-y-6 pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/student/dashboard",
						className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5" }), " Back to My Complaints"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl sm:text-2xl font-bold tracking-tight text-foreground font-mono",
							children: complaint.id
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintStatusBadge, { status: complaint.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground font-sans",
						children: complaint.title
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-left sm:text-right text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Submitted: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground font-medium",
						children: fmtDate(complaint.submittedAt)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Last Updated: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground font-medium",
						children: fmtDate(complaint.updatedAt)
					})] })]
				})]
			}),
			complaint.status === "Rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-destructive/30 bg-destructive/5 p-5 space-y-3 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-5 text-destructive shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-bold text-destructive",
									children: "Complaint Review Outcome: Closed / Not Accepted"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[0.7rem] font-mono text-muted-foreground",
									children: ["Reviewed: ", complaint.rejectedAt ? fmtDate(complaint.rejectedAt) : fmtDate(complaint.updatedAt)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-muted-foreground",
									children: "Grounds for Closure: "
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-destructive",
									children: complaint.rejectionReason || "No formal investigation initiated"
								})]
							}),
							complaint.rejectionRemarks && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground bg-card/60 p-3 rounded-lg border border-border/70 mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground block mb-1",
									children: "Committee Remarks & Guidance:"
								}), complaint.rejectionRemarks]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[0.7rem] text-muted-foreground flex items-center gap-2 pt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Reviewed By: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground",
									children: complaint.reviewerRole || "Discipline Committee Board"
								})] })
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold text-foreground uppercase tracking-wider",
						children: "Complaint Progress"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.7rem] text-muted-foreground",
						children: "Real-time status updates"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto pb-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between min-w-[550px] px-2",
						children: LIFECYCLE_STEPS.map((st, idx) => {
							const state = st.match(complaint.status);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center flex-1 last:flex-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center gap-1.5 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("grid size-8 place-items-center rounded-full text-xs font-bold transition-all", state === "done" ? "bg-emerald-500 text-white shadow-sm" : state === "active" ? "border-2 border-primary bg-primary/10 text-primary animate-pulse" : "border border-border bg-muted text-muted-foreground/60"),
										children: state === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }) : state === "active" ? "●" : "○"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("text-[0.68rem] whitespace-nowrap font-medium", state === "active" ? "text-primary font-bold" : state === "done" ? "text-foreground font-semibold" : "text-muted-foreground"),
										children: st.label
									})]
								}), idx < LIFECYCLE_STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-0.5 flex-1 mx-2 transition-colors", state === "done" ? "bg-emerald-500" : "bg-border") })]
							}, st.key);
						})
					})
				})]
			}),
			pendingInfoRequest && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-amber-500/40 bg-amber-500/10 p-5 space-y-4 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200",
									children: "The Discipline Committee Requires Additional Information"
								}), pendingInfoRequest.requestType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-amber-500/20 px-1.5 py-0.5 text-[0.65rem] font-semibold text-amber-800 dark:text-amber-300",
									children: pendingInfoRequest.requestType
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-amber-800 dark:text-amber-300",
								children: [
									"\"",
									pendingInfoRequest.question,
									"\""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[0.68rem] text-muted-foreground font-mono",
								children: [
									"Requested on ",
									fmtDateTime(pendingInfoRequest.requestedAt),
									" by ",
									pendingInfoRequest.requestedBy
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 pt-2 bg-card p-4 rounded-lg border border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs font-semibold text-foreground",
							children: "Your Response / Clarification"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							placeholder: "Provide the requested details or answers here...",
							value: responseText,
							onChange: (e) => setResponseText(e.target.value),
							rows: 4,
							className: "text-xs bg-background"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										id: "respFileInput",
										multiple: true,
										onChange: handleFileUpload,
										className: "hidden"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: "respFileInput",
										className: "inline-flex items-center gap-1.5 text-xs text-primary border border-primary/30 rounded-md px-2.5 py-1.5 hover:bg-primary/5 cursor-pointer font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }), " Attach Supplementary File"]
									}),
									responseFiles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[0.7rem] text-muted-foreground font-mono",
										children: [responseFiles.length, " file(s) attached"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => handleSendResponse(pendingInfoRequest.id),
								disabled: isSubmittingResponse || !responseText.trim(),
								className: "text-xs bg-primary hover:bg-primary/90 gap-1.5 font-semibold",
								children: [isSubmittingResponse ? "Transmitting..." : "Submit Additional Information", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" })]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
									children: "Reported Incident Particulars"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block text-[0.7rem]",
											children: "Category:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: complaint.category
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block text-[0.7rem]",
											children: "Incident Date:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-foreground",
											children: [
												complaint.incidentDate,
												" ",
												complaint.incidentTime
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block text-[0.7rem]",
											children: "Location:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: complaint.location
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground block text-[0.7rem] mb-1.5",
										children: "Detailed Description:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs leading-relaxed text-foreground whitespace-pre-wrap bg-muted/20 p-3 rounded-lg border border-border/60",
										children: complaint.description
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: "Persons & Witnesses Reported"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-foreground block mb-2",
									children: "Subject(s) of Complaint:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: complaint.personsInvolved.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border/70 p-3 bg-muted/10 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-foreground",
													children: p.unknownDetails ? "Unidentified Person" : p.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[0.68rem] bg-secondary px-2 py-0.5 rounded text-secondary-foreground font-medium",
													children: p.relationship
												})]
											}),
											p.rollNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[0.7rem] text-muted-foreground font-mono mt-0.5",
												children: [
													"Roll Number: ",
													p.rollNumber,
													" · ",
													p.department
												]
											}),
											p.details && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[0.72rem] text-muted-foreground mt-1 bg-background p-2 rounded border border-border/50",
												children: p.details
											})
										]
									}, p.id))
								})] }), complaint.witnesses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-foreground block mb-2",
										children: "Witnesses Identified:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-2",
										children: complaint.witnesses.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border/70 p-2.5 bg-muted/10 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-semibold text-foreground",
												children: [
													w.name,
													" ",
													w.relationship && `(${w.relationship})`
												]
											}), w.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[0.7rem] text-muted-foreground mt-0.5",
												children: w.description
											})]
										}, w.id))
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: [
									"Submitted Supporting Evidence (",
									complaint.evidence.length,
									")"
								]
							}), complaint.evidence.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground italic",
								children: "No evidence files were attached to this complaint."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
								children: complaint.evidence.map((ev, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-muted/20 p-3 flex flex-col justify-between gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid size-8 shrink-0 place-items-center rounded bg-card text-primary ring-1 ring-border",
											children: ev.fileType.startsWith("image/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileImage, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, { className: "size-4" })
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
									}), ev.description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[0.7rem] text-muted-foreground italic line-clamp-2",
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3.5 text-primary" }), "Authorized Updates"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: (complaint.authorizedUpdates || []).map((update, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/80 bg-muted/30 p-3 text-xs space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-[0.68rem] font-semibold text-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }),
										" Update #",
										idx + 1
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-foreground leading-relaxed",
									children: update
								})]
							}, idx))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 shadow-sm space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: "Privacy & Safeguards"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-[0.7rem]",
									children: "Confidentiality Tier:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground capitalize",
									children: complaint.privacyPreference.replace(/_/g, " ")
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-[0.7rem]",
									children: "Assessed Urgency:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground capitalize",
									children: complaint.urgency.replace(/_/g, " ")
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded bg-muted/40 p-2.5 text-[0.7rem] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3 inline-block mr-1 text-emerald-500" }), "Internal deliberations and investigator notes are confidential to the committee."]
							})
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { StudentComplaintDetailRoute as component };
