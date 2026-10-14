import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useDsim, a as INSTITUTION, c as YEARS_OF_STUDY, d as evLabel, n as Button, r as DEPARTMENTS, t as ACADEMIC_YEARS } from "./button-C7ZpzBGx.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Layers, Bt as Check, Dt as Download, E as Save, Ft as CircleAlert, Gt as Award, H as Mic, Ht as Calendar, J as Lock, Jt as ArrowLeft, N as Printer, Pt as CircleCheck, S as ShieldAlert, St as FileBox, T as Search, W as MessageSquare, _ as Sparkles, _t as FileText, a as User, at as Image, c as UserCheck, ct as Gavel, d as Trash2, dt as FolderOpen, h as StickyNote, i as Users, j as Radar, k as RefreshCw, kt as Clock, lt as FolderX, ot as History, s as UserPlus, u as TriangleAlert, ut as FolderPlus, x as ShieldCheck, xt as FileCheck, z as PenLine } from "../_libs/lucide-react.mjs";
import { a as isValid, i as differenceInDays, t as parseISO } from "../_libs/date-fns.mjs";
import { A as fmtDate, _ as EmptyState, b as PersonCard, j as fmtDateTime, u as ConfirmDialog, w as SecureTag } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BB0Q0GUL.mjs";
import { t as Protected } from "./Protected-DW_nWC7p.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Cd1zWcTd.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { t as Label } from "./label-Di2QZFiw.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-Ce6ny-d0.mjs";
import { t as Textarea } from "./textarea-DmMEYLpm.mjs";
import { i as Route, n as InvestigationNotesView, o as SynopsisEditor, r as InvestigationTimeline, s as TranscriptViewer, t as EvidenceGallery } from "./InvestigationTimeline-CxZExNmK.mjs";
import { t as AddPersonModal } from "./AddPersonModal-CXLUEoDX.mjs";
import { t as StatusBadge } from "./StatusBadge-CQBA8eKM.mjs";
import { n as RadioGroupItem, t as RadioGroup } from "./radio-group-OWjO5u3n.mjs";
import { t as ALL_STATUSES } from "./types-BJyJLv_7.mjs";
import { t as Checkbox } from "./checkbox-_AGMNU8u.mjs";
import { n as RescheduleModal, t as MarkReturnedModal } from "./RescheduleModal-BQUeEBk1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cases._caseId-rXKVbNyW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FinalDecisionSection({ caseRecord, onSaveDecision }) {
	const [action, setAction] = (0, import_react.useState)(caseRecord.disciplinaryAction || "Suspension");
	const [decisionDate, setDecisionDate] = (0, import_react.useState)(caseRecord.decisionDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [startDate, setStartDate] = (0, import_react.useState)(caseRecord.suspensionStartDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [returnDate, setReturnDate] = (0, import_react.useState)(caseRecord.returnDate || new Date(Date.now() + 24192e5).toISOString().slice(0, 10));
	const [reason, setReason] = (0, import_react.useState)(caseRecord.actionReason || "");
	const [committeeRemarks, setCommitteeRemarks] = (0, import_react.useState)(caseRecord.committeeRemarks || "");
	const [finalDecisionNotes, setFinalDecisionNotes] = (0, import_react.useState)(caseRecord.finalDecisionNotes || "");
	(0, import_react.useEffect)(() => {
		if (caseRecord.disciplinaryAction) setAction(caseRecord.disciplinaryAction);
		if (caseRecord.decisionDate) setDecisionDate(caseRecord.decisionDate);
		if (caseRecord.suspensionStartDate) setStartDate(caseRecord.suspensionStartDate);
		if (caseRecord.returnDate) setReturnDate(caseRecord.returnDate);
		if (caseRecord.actionReason) setReason(caseRecord.actionReason);
		if (caseRecord.committeeRemarks) setCommitteeRemarks(caseRecord.committeeRemarks);
		if (caseRecord.finalDecisionNotes) setFinalDecisionNotes(caseRecord.finalDecisionNotes);
	}, [caseRecord]);
	const getDurationDays = () => {
		try {
			if (!startDate || !returnDate) return 0;
			const start = parseISO(startDate);
			const end = parseISO(returnDate);
			if (isValid(start) && isValid(end)) {
				const diff = differenceInDays(end, start);
				return Math.max(0, diff);
			}
		} catch {
			return 0;
		}
		return 0;
	};
	const durationDays = getDurationDays();
	const handleSave = () => {
		let nextStatus = caseRecord.status;
		if (caseRecord.status !== "Closed") {
			if (action === "Suspension") nextStatus = "Suspended";
			else if (action === "Warning" || action === "No Action") nextStatus = "Decision Pending";
		}
		onSaveDecision({
			disciplinaryAction: action,
			decisionDate,
			actionReason: reason,
			committeeRemarks,
			finalDecisionNotes,
			status: nextStatus,
			...action === "Suspension" && startDate ? { suspensionStartDate: startDate } : {},
			...action === "Suspension" && returnDate ? { returnDate } : {}
		});
		toast.success(`Official Final Disciplinary Decision saved: ${action}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface overflow-hidden p-5 sm:p-6 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-bold text-foreground",
						children: "Official Final Disciplinary Decision"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Authoritative ruling of the College Discipline Committee. Distinguished from notes & temporary drafts."
					})] })]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleSave,
					size: "sm",
					className: "gap-1.5 text-xs bg-primary hover:bg-primary/90 shadow-sm self-start sm:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" }), " Save Official Decision"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-amber-500/30 bg-amber-500/5 p-3.5 text-xs text-amber-800 dark:text-amber-300 space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-amber-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Human Authority & Decision Governance" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.72rem] text-muted-foreground leading-relaxed pl-6",
					children: "AI systems are assistive only. Disciplinary responsibility, sanctions, suspensions, expulsions, or case closures must be manually determined, approved, and enacted exclusively by authorized Discipline Committee members."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-2.5 sm:grid-cols-3 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-primary/20 bg-primary/5 p-3 flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground block",
							children: "Binding Disciplinary Verdict"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground text-[0.68rem]",
							children: "Official outcome recorded in institutional registry"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card/60 p-3 flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { className: "size-4 text-emerald-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground block",
							children: "Committee Consensus"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground text-[0.68rem]",
							children: "Reviewed against institutional disciplinary code"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card/60 p-3 flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-signal shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground block",
							children: "Enforcement Schedule"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground text-[0.68rem]",
							children: "Automatic reminders & readmission checks linked"
						})] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "text-xs font-semibold",
					children: "1. Decision Type (Sanction Category)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
					value: action,
					onValueChange: (v) => setAction(v),
					className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						{
							id: "Suspension",
							label: "Suspension",
							desc: "Formal term of academic suspension",
							icon: TriangleAlert,
							color: "text-red-500"
						},
						{
							id: "Warning",
							label: "Official Warning",
							desc: "Formal written reprimand on dossier",
							icon: CircleAlert,
							color: "text-amber-500"
						},
						{
							id: "No Action",
							label: "No Action / Exonerated",
							desc: "Cleared of violation charges",
							icon: CircleCheck,
							color: "text-emerald-500"
						},
						{
							id: "Other",
							label: "Other Sanction",
							desc: "Community service / lab restriction",
							icon: Award,
							color: "text-indigo-500"
						}
					].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						htmlFor: opt.id,
						className: `relative flex cursor-pointer flex-col rounded-xl border p-3.5 transition-all ${action === opt.id ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary/30" : "border-border hover:bg-muted/40"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-xs text-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(opt.icon, { className: `size-3.5 ${opt.color}` }), opt.label]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
								value: opt.id,
								id: opt.id
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 text-[0.68rem] text-muted-foreground",
							children: opt.desc
						})]
					}, opt.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "dec-date",
						className: "text-xs font-semibold",
						children: "Decision Pronouncement Date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "dec-date",
						type: "date",
						value: decisionDate,
						onChange: (e) => setDecisionDate(e.target.value),
						className: "text-xs font-mono h-9 bg-card"
					})]
				}), action === "Suspension" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "susp-start",
						className: "text-xs font-semibold",
						children: "Suspension Start Date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "susp-start",
						type: "date",
						value: startDate,
						onChange: (e) => setStartDate(e.target.value),
						className: "text-xs font-mono h-9 bg-card"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "susp-return",
							className: "text-xs font-semibold",
							children: "Scheduled Return Date"
						}), durationDays > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[0.68rem] font-bold text-signal",
							children: [durationDays, " Days Term"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "susp-return",
						type: "date",
						value: returnDate,
						onChange: (e) => setReturnDate(e.target.value),
						className: "text-xs font-mono h-9 bg-card"
					})]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								htmlFor: "dec-reason",
								className: "text-xs font-semibold",
								children: ["2. Decision Reason & Specific Findings ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "dec-reason",
								placeholder: "E.g., Unauthorized access to Laboratory B-204 and careless handling resulting in equipment damage.",
								value: reason,
								onChange: (e) => setReason(e.target.value),
								className: "text-xs h-9"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[0.68rem] text-muted-foreground",
								children: "Clear statement of proven facts and violations established during investigation."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "comm-remarks",
							className: "text-xs font-semibold",
							children: "3. Discipline Committee Remarks & Deliberation Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "comm-remarks",
							placeholder: "E.g., Committee noted first-time infraction, student's cooperation during inquiry, and prompt admission of responsibility...",
							value: committeeRemarks,
							onChange: (e) => setCommitteeRemarks(e.target.value),
							rows: 3,
							className: "text-xs leading-relaxed"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "final-notes",
							className: "text-xs font-semibold",
							children: "4. Final Decision Notes & Readmission Prerequisites"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "final-notes",
							placeholder: "E.g., Parent acknowledgment undertaking signed; equipment repair reimbursement deposited; counseling session scheduled upon return.",
							value: finalDecisionNotes,
							onChange: (e) => setFinalDecisionNotes(e.target.value),
							rows: 3,
							className: "text-xs leading-relaxed"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card/70 p-4 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-xs font-bold text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary" }), " Disciplinary Board Member Deliberation & Voting"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.7rem] text-muted-foreground",
								children: "Formal participation of Disciplinary Board Members in judicial decision-making."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.68rem] px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium",
									children: caseRecord.assignedBoardMember ? `Assigned: ${caseRecord.assignedBoardMember}` : "Assigned: Disciplinary Board Member"
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[0.68rem] font-bold text-muted-foreground uppercase tracking-wider",
								children: [
									"Recorded Board Member Votes (",
									caseRecord.boardVotes?.length || 0,
									")"
								]
							}), caseRecord.boardVotes && caseRecord.boardVotes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: caseRecord.boardVotes.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border/80 bg-background p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-foreground",
												children: v.voter
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `px-2 py-0.5 rounded text-[0.65rem] font-bold ${v.vote === "Agree" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : v.vote === "Disagree" ? "bg-red-500/15 text-red-700 dark:text-red-300" : "bg-muted text-muted-foreground"}`,
												children: v.vote
											})]
										}), v.remarks && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-muted-foreground text-[0.7rem] italic",
											children: [
												"\"",
												v.remarks,
												"\""
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.65rem] text-muted-foreground font-mono self-end sm:self-auto",
										children: v.timestamp.slice(0, 10)
									})]
								}, v.id))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-lg border border-dashed border-border/80 p-3 text-center text-xs text-muted-foreground",
								children: "No formal board member votes recorded yet for this case docket."
							})]
						})]
					})
				]
			})
		]
	});
}
function AuditLogView({ auditLog = [], caseId }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("all");
	const sortedAndFiltered = (0, import_react.useMemo)(() => {
		return [...auditLog].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).filter((entry) => {
			if (categoryFilter !== "all" && entry.category !== categoryFilter) return false;
			if (search.trim()) {
				const q = search.toLowerCase();
				return entry.event.toLowerCase().includes(q) || entry.user.toLowerCase().includes(q) || entry.description.toLowerCase().includes(q) || entry.timestamp.toLowerCase().includes(q);
			}
			return true;
		});
	}, [
		auditLog,
		search,
		categoryFilter
	]);
	const getEventIcon = (event, cat) => {
		const e = event.toLowerCase();
		if (e.includes("close")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5 text-slate-500" });
		if (e.includes("record") || e.includes("audio")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-3.5 text-indigo-500" });
		if (e.includes("evidence") || e.includes("photo") || e.includes("document")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-3.5 text-emerald-500" });
		if (e.includes("decision") || e.includes("suspension") || e.includes("sanction")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, { className: "size-3.5 text-signal" });
		if (e.includes("person") || e.includes("witness")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-3.5 text-amber-500" });
		if (e.includes("synopsis") || e.includes("transcript")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5 text-primary" });
		if (e.includes("created")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, { className: "size-3.5 text-primary" });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5 text-muted-foreground" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface overflow-hidden p-5 sm:p-6 space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 place-items-center rounded-lg bg-secondary text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-bold text-foreground",
						children: "Audit History"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Chronological record of significant case actions. Production integrity and tamper protection are enforced by backend controls."
					})] })]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary text-foreground text-[0.68rem] font-mono font-medium self-start sm:self-auto border border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-3 text-primary" }), " Session Audited"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Search audit trail by actor, event, description...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "h-8.5 pl-8 text-xs bg-card"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0",
					children: [
						"all",
						"case",
						"investigation",
						"evidence",
						"synopsis",
						"suspension",
						"closure"
					].map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setCategoryFilter(cat),
						className: `px-2.5 py-1 rounded-md capitalize font-medium transition-colors text-[0.7rem] ${categoryFilter === cat ? "bg-primary text-primary-foreground" : "bg-secondary/60 text-muted-foreground hover:text-foreground"}`,
						children: cat
					}, cat))
				})]
			}),
			sortedAndFiltered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-dashed border-border p-8 text-center bg-muted/20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-8 mx-auto text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-foreground mt-2",
						children: "No audit records found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Adjust filters or record new investigation actions."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative border-l border-border ml-3 sm:ml-4 pl-4 sm:pl-6 space-y-4 max-h-[550px] overflow-y-auto pr-1",
				children: sortedAndFiltered.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -left-[27px] sm:-left-[35px] top-1 grid size-6 place-items-center rounded-full bg-card border border-border group-hover:border-primary transition-colors",
						children: getEventIcon(log.event, log.category)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border/80 bg-card/60 p-3.5 hover:bg-card transition-all space-y-1.5 shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-xs text-foreground",
									children: log.event
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-secondary px-1.5 py-0.5 text-[0.65rem] font-medium text-muted-foreground",
									children: log.user
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[0.68rem] text-muted-foreground",
								children: fmtDateTime(log.timestamp)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: log.description
						})]
					})]
				}, log.id))
			})
		]
	});
}
function EditCaseModal({ caseRecord, open, onOpenChange, onSave }) {
	const [caseName, setCaseName] = (0, import_react.useState)(caseRecord.caseName);
	const [description, setDescription] = (0, import_react.useState)(caseRecord.description);
	const [accusedStudent, setAccusedStudent] = (0, import_react.useState)(caseRecord.accusedStudent);
	const [rollNumber, setRollNumber] = (0, import_react.useState)(caseRecord.rollNumber);
	const [department, setDepartment] = (0, import_react.useState)(caseRecord.department);
	const [academicYear, setAcademicYear] = (0, import_react.useState)(caseRecord.academicYear);
	const [yearOfStudy, setYearOfStudy] = (0, import_react.useState)(caseRecord.yearOfStudy);
	const [status, setStatus] = (0, import_react.useState)(caseRecord.status);
	(0, import_react.useEffect)(() => {
		setCaseName(caseRecord.caseName);
		setDescription(caseRecord.description);
		setAccusedStudent(caseRecord.accusedStudent);
		setRollNumber(caseRecord.rollNumber);
		setDepartment(caseRecord.department);
		setAcademicYear(caseRecord.academicYear);
		setYearOfStudy(caseRecord.yearOfStudy);
		setStatus(caseRecord.status);
	}, [caseRecord, open]);
	const handleSubmit = (e) => {
		e.preventDefault();
		onSave({
			caseName: caseName.trim(),
			description: description.trim(),
			accusedStudent: accusedStudent.trim(),
			rollNumber: rollNumber.trim(),
			department,
			academicYear,
			yearOfStudy,
			status
		});
		onOpenChange(false);
		toast.success(`Updated Case details for ${caseRecord.id}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-xl max-h-[85vh] overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-8 place-items-center rounded-lg bg-secondary text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Edit Case Details — ", caseRecord.id] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Modify case particulars, allegations, or student record references." })] })]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "edit-title",
							className: "text-xs",
							children: "Case Title *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "edit-title",
							value: caseName,
							onChange: (e) => setCaseName(e.target.value),
							required: true,
							className: "text-xs"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "edit-desc",
							className: "text-xs",
							children: "Case Incident Description *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "edit-desc",
							value: description,
							onChange: (e) => setDescription(e.target.value),
							rows: 3,
							required: true,
							className: "text-xs"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "edit-accused",
								className: "text-xs",
								children: "Main Accused Student *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "edit-accused",
								value: accusedStudent,
								onChange: (e) => setAccusedStudent(e.target.value),
								required: true,
								className: "text-xs"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "edit-roll",
								className: "text-xs",
								children: "Roll Number *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "edit-roll",
								value: rollNumber,
								onChange: (e) => setRollNumber(e.target.value),
								required: true,
								className: "text-xs font-mono"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Department"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: department,
									onValueChange: setDepartment,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DEPARTMENTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: d,
										className: "text-xs",
										children: d
									}, d)) })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Academic Year"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: academicYear,
									onValueChange: setAcademicYear,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ACADEMIC_YEARS.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: y,
										className: "text-xs",
										children: y
									}, y)) })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Year of Study"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: yearOfStudy,
									onValueChange: setYearOfStudy,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: YEARS_OF_STUDY.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: s,
										className: "text-xs",
										children: s
									}, s)) })]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Investigation Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: status,
							onValueChange: (v) => setStatus(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "text-xs font-medium",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ALL_STATUSES.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: st,
								className: "text-xs",
								children: st
							}, st)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							onClick: () => onOpenChange(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							size: "sm",
							className: "gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " Save Changes"]
						})]
					})
				]
			})]
		})
	});
}
function ExportCaseModal({ caseRecord, open, onOpenChange }) {
	const handlePrint = () => {
		window.print();
	};
	const handleDownload = () => {
		const reportText = `================================================================================
KPR COLLEGE OF ARTS, SCIENCE AND RESEARCH
DISCIPLINARY & STUDENT INCIDENT MANAGEMENT SYSTEM
CONFIDENTIAL CASE REPORT
================================================================================
CASE IDENTIFIER:      ${caseRecord.id}
SOURCE COMPLAINT:     ${caseRecord.sourceComplaintId || "N/A (Direct Case Intake)"}
CASE TITLE:           ${caseRecord.caseName}
INSTITUTION:          ${INSTITUTION.name} (${INSTITUTION.shortName})
CLASSIFICATION:       CONFIDENTIAL · DISCIPLINE COMMITTEE DOSSIER
CURRENT STATUS:       ${caseRecord.status.toUpperCase()}
DATE GENERATED:       ${(/* @__PURE__ */ new Date()).toLocaleString()}
REPORT HASH:          SHA256-${Math.random().toString(36).substring(2, 14).toUpperCase()}

--------------------------------------------------------------------------------
1. ACCUSED STUDENT PARTICULAR DETAILS
--------------------------------------------------------------------------------
Name:                 ${caseRecord.accusedStudent}
Roll Number:          ${caseRecord.rollNumber}
School / Department:  ${caseRecord.department}
Academic Year:        ${caseRecord.academicYear}
Year of Study:        ${caseRecord.yearOfStudy}
Intake Date:          ${fmtDate(caseRecord.createdAt)}

--------------------------------------------------------------------------------
2. INCIDENT & ALLEGATION SUMMARY
--------------------------------------------------------------------------------
${caseRecord.description}

--------------------------------------------------------------------------------
3. INVOLVED PERSONS & WITNESSES (${caseRecord.involvedPersons.length})
--------------------------------------------------------------------------------
${caseRecord.involvedPersons.length === 0 ? "No additional persons registered." : caseRecord.involvedPersons.map((p, i) => `  ${i + 1}. ${p.name} | Role: ${p.role} | Dept: ${p.department} ${p.rollNumber ? `[${p.rollNumber}]` : ""}`).join("\n")}

--------------------------------------------------------------------------------
4. INVESTIGATION SESSION PARTICULARS
--------------------------------------------------------------------------------
Investigation Commenced: ${caseRecord.investigationStart ? fmtDateTime(caseRecord.investigationStart) : "N/A"}
Investigation Concluded: ${caseRecord.investigationEnd ? fmtDateTime(caseRecord.investigationEnd) : "In Progress"}
Inquiry Room:            Discipline Committee Chamber Room 102
Presiding Authority:     Discipline Committee Head, ${INSTITUTION.shortName}

--------------------------------------------------------------------------------
5. CHRONOLOGICAL INVESTIGATION TIMELINE (${caseRecord.timeline.length} Events)
--------------------------------------------------------------------------------
${caseRecord.timeline.map((t) => `  [${fmtDateTime(t.timestamp)}] ${t.event} ${t.evidenceRef ? `(${t.evidenceRef})` : ""}: ${t.description || ""}`).join("\n")}

--------------------------------------------------------------------------------
6. EVIDENCE REPOSITORY & CHAIN-OF-CUSTODY INVENTORY (${caseRecord.evidence.length} Items)
--------------------------------------------------------------------------------
${caseRecord.evidence.length === 0 ? "No evidence exhibits recorded." : caseRecord.evidence.map((e) => `  - ${evLabel(e.number)} [${e.type.toUpperCase()}]: ${e.fileName} (${e.fileSize || "Vault Item"})
    Captured by: ${e.capturedBy || "Investigator"} on ${fmtDateTime(e.timestamp)}
    Description: ${e.description}`).join("\n")}

--------------------------------------------------------------------------------
7. RECORDED SPEECH TRANSCRIPT EXCERPT (${caseRecord.transcript?.length || 0} Dialogue Items)
--------------------------------------------------------------------------------
${!caseRecord.transcript || caseRecord.transcript.length === 0 ? "No voice recording transcript available." : caseRecord.transcript.map((tr) => `  [${tr.timestamp}] ${tr.speakerName || tr.speaker} (${tr.speaker}):\n  "${tr.text}"`).join("\n\n")}

--------------------------------------------------------------------------------
8. AI-SYNTHESIZED INVESTIGATION SYNOPSIS
--------------------------------------------------------------------------------
${caseRecord.synopsis || "No AI synopsis synthesized."}

--------------------------------------------------------------------------------
9. OFFICIAL FINAL DISCIPLINARY DECISION
--------------------------------------------------------------------------------
Sanction Ruling:     ${caseRecord.disciplinaryAction || "Pending Final Committee Hearing"}
Pronouncement Date:  ${caseRecord.decisionDate || fmtDate(caseRecord.updatedAt)}
Official Findings:   ${caseRecord.actionReason || "Under formal review."}
Committee Remarks:   ${caseRecord.committeeRemarks || "Deliberation finalized in quorum."}
Readmission Terms:   ${caseRecord.finalDecisionNotes || caseRecord.actionNotes || "Standard reinstatement criteria apply."}

--------------------------------------------------------------------------------
10. SUSPENSION ENFORCEMENT & DURATION DETAILS
--------------------------------------------------------------------------------
Effective Date:      ${caseRecord.suspensionStartDate || "N/A"}
Scheduled Return:    ${caseRecord.returnDate || "N/A"}
Campus Debarment:    Hostel & Laboratory Restrictions Active

--------------------------------------------------------------------------------
11. STUDENT READMISSION & CLEARANCE VERIFICATION
--------------------------------------------------------------------------------
Return Status:       ${caseRecord.status === "Returned" || caseRecord.returned ? "CLEARED AND REINSTATED" : "AWAITING RETURN"}
Actual Return Date:  ${caseRecord.actualReturnDate || (caseRecord.returned ? caseRecord.returnDate : "Pending")}
Readmission Notes:   ${caseRecord.returnRemarks || "Subject to final verification upon return."}

--------------------------------------------------------------------------------
12. CASE CLOSURE & ARCHIVE ATTESTATION
--------------------------------------------------------------------------------
Closure Status:      ${caseRecord.status === "Closed" ? "OFFICIALLY CLOSED AND ARCHIVED" : "ACTIVE / OPEN WORKSPACE"}
${caseRecord.closureInfo ? `Closed At:           ${fmtDateTime(caseRecord.closureInfo.closedAt)}
Closed By:           ${caseRecord.closureInfo.closedBy}
Final Resolution:    ${caseRecord.closureInfo.finalDecision}
Closure Outcome:     ${caseRecord.closureInfo.outcome}
Closing Remarks:     ${caseRecord.closureInfo.finalRemarks}` : "Case has not yet been sealed."}

================================================================================
COMMITTEE HEAD ATTESTATION & DIGITAL SEAL
Dr. S. Ramanathan
Discipline Committee Head
${INSTITUTION.name}
================================================================================
`;
		const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${INSTITUTION.shortName}-DSIM-Report-${caseRecord.id}.txt`;
		a.click();
		toast.success(`Exported complete official investigation dossier for ${caseRecord.id}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-3xl max-h-[88vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "text-base font-bold",
							children: "Export Official Case Investigation Report"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							className: "text-xs",
							children: [
								INSTITUTION.name,
								" · ",
								INSTITUTION.systemFullName
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden sm:block font-mono text-[0.68rem] bg-secondary px-2.5 py-1 rounded font-bold text-foreground",
						children: caseRecord.id
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-6 text-xs space-y-5 shadow-sm font-sans printable-dossier",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-primary pb-4 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: INSTITUTION.logoUrl,
									alt: INSTITUTION.name,
									className: "h-12 w-auto object-contain brightness-0 invert"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-[0.68rem] font-bold uppercase tracking-widest text-primary",
										children: INSTITUTION.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-[0.7rem] text-foreground uppercase tracking-wider",
										children: INSTITUTION.systemFullName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[0.68rem] font-bold text-muted-foreground uppercase tracking-wider mt-0.5",
										children: "CONFIDENTIAL CASE REPORT"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg font-bold text-foreground mt-1",
										children: caseRecord.caseName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground mt-0.5 font-mono",
										children: [
											"Case ID: ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-foreground",
												children: caseRecord.id
											}),
											caseRecord.sourceComplaintId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "ml-2",
												children: ["· Source Complaint: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground",
													children: caseRecord.sourceComplaintId
												})]
											})
										]
									})
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-left sm:text-right shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "inline-block rounded-md bg-primary/10 border border-primary/20 px-3 py-1 font-mono text-xs font-bold text-primary",
									children: caseRecord.status.toUpperCase()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[0.68rem] text-muted-foreground mt-1.5 font-mono",
									children: ["Generated: ", fmtDate((/* @__PURE__ */ new Date()).toISOString())]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-muted/40 p-3.5 border border-border/70 space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[0.68rem] font-bold uppercase tracking-wider text-muted-foreground font-mono flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3 text-primary" }), " 1. Accused Student Particulars"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-bold text-foreground",
										children: caseRecord.accusedStudent
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-mono text-xs text-muted-foreground",
										children: [
											"Roll No: ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: caseRecord.rollNumber
											}),
											" · ",
											caseRecord.department
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [
											"Academic Standing: ",
											caseRecord.academicYear,
											" (",
											caseRecord.yearOfStudy,
											")"
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-muted/40 p-3.5 border border-border/70 space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[0.68rem] font-bold uppercase tracking-wider text-muted-foreground font-mono flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3 text-signal" }), " 2. Incident Description"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: caseRecord.description
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-semibold text-xs text-foreground mb-1.5 font-mono",
							children: [
								"3. Involved Persons & Witness Roster (",
								caseRecord.involvedPersons.length,
								")"
							]
						}), caseRecord.involvedPersons.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground italic text-xs",
							children: "No additional witnesses registered."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
							children: caseRecord.involvedPersons.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded border border-border/60 bg-muted/20 p-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: p.name
									}),
									" ·",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: p.role
									}),
									" (",
									p.department,
									")"
								]
							}, p.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border p-3 space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-xs font-mono",
										children: "4. Investigation Details"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: ["Session Started: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-foreground",
											children: caseRecord.investigationStart ? fmtDateTime(caseRecord.investigationStart) : "N/A"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: ["Session Concluded: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-foreground",
											children: caseRecord.investigationEnd ? fmtDateTime(caseRecord.investigationEnd) : "In Progress"
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border p-3 space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-semibold text-xs font-mono",
									children: [
										"5. Chronological Timeline (",
										caseRecord.timeline.length,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-1 max-h-24 overflow-y-auto pr-1",
									children: caseRecord.timeline.slice(-4).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[0.68rem]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground",
											children: t.event
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-muted-foreground",
											children: fmtDate(t.timestamp)
										})]
									}, t.id))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-semibold text-xs text-foreground mb-1.5 font-mono",
							children: [
								"6. Evidence Exhibits Inventory (",
								caseRecord.evidence.length,
								" items)"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
							children: caseRecord.evidence.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded border border-border/70 p-2 text-xs flex justify-between items-center bg-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-bold text-foreground",
										children: evLabel(e.number)
									}),
									" [",
									e.type.toUpperCase(),
									"]",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[0.68rem] text-muted-foreground truncate max-w-[200px]",
										children: e.description
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.65rem] font-mono text-muted-foreground",
									children: e.fileSize || "Verified"
								})]
							}, e.id))
						})] }),
						caseRecord.synopsis && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold text-xs text-foreground mb-1.5 font-mono",
							children: "7 & 8. Investigation Synopsis & Key Findings"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-line text-muted-foreground bg-muted/20 p-3 rounded-lg border border-border/60 text-xs leading-relaxed",
							children: caseRecord.synopsis
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-primary/20 pb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-bold text-xs text-primary font-mono flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, { className: "size-3.5" }), " 9, 10 & 11. Final Decision & Sanction Execution"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground",
										children: caseRecord.disciplinaryAction || "Pending"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Official Finding: "
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground font-medium",
										children: caseRecord.actionReason || "Violation established during hearing."
									})] }), caseRecord.returnDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Suspension Period: "
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono font-bold text-foreground",
										children: [
											caseRecord.suspensionStartDate || "—",
											" → ",
											caseRecord.returnDate
										]
									})] })]
								}),
								caseRecord.committeeRemarks && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[0.7rem] text-muted-foreground pt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Committee Remarks: " }),
										" ",
										caseRecord.committeeRemarks
									]
								})
							]
						}),
						caseRecord.closureInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3.5 text-xs space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-bold text-emerald-700 dark:text-emerald-300 font-mono flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3" }), " 12. Case Closure & Archive Record"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-muted-foreground",
									children: [
										"Closed by: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: caseRecord.closureInfo.closedBy
										}),
										" on ",
										fmtDateTime(caseRecord.closureInfo.closedAt)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-muted-foreground",
									children: [
										"Resolution: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: caseRecord.closureInfo.finalDecision
										}),
										" — ",
										caseRecord.closureInfo.finalRemarks
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border pt-4 flex items-center justify-between text-[0.68rem] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-foreground",
								children: "Dr. S. Ramanathan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Discipline Committee Head" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right font-mono",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-emerald-600 font-bold",
									children: "DIGITALLY ATTESTED · DSIM VAULT"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									"Ref: ",
									caseRecord.id,
									"-SECURE"
								] })]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "mt-4 flex sm:justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => onOpenChange(false),
						children: "Close"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: handlePrint,
							className: "gap-1.5 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-3.5" }), " Print Report"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: handleDownload,
							className: "gap-1.5 text-xs bg-primary hover:bg-primary/90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), " Export Official Report (.txt)"]
						})]
					})]
				})
			]
		})
	});
}
function CloseCaseModal({ caseRecord, open, onOpenChange, onCloseCase }) {
	const [finalDecision, setFinalDecision] = (0, import_react.useState)(caseRecord.disciplinaryAction === "Suspension" ? "Suspension Completed" : caseRecord.disciplinaryAction === "Warning" ? "Warning Issued" : "No Further Action");
	const [decisionDate, setDecisionDate] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [outcome, setOutcome] = (0, import_react.useState)(caseRecord.actionReason || "Disciplinary procedure concluded with committee concurrence.");
	const [finalRemarks, setFinalRemarks] = (0, import_react.useState)(caseRecord.committeeRemarks || "All statements recorded, evidence preserved in secure archive, and disciplinary sanctions executed in full compliance with college regulations.");
	const [confirmed, setConfirmed] = (0, import_react.useState)(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!confirmed) {
			toast.error("Please confirm the completion statement before closing the case.");
			return;
		}
		if (!finalRemarks.trim()) {
			toast.error("Final remarks are required for official case closure.");
			return;
		}
		onCloseCase({
			finalDecision,
			finalRemarks,
			outcome
		});
		toast.success(`Case ${caseRecord.id} has been closed successfully.`);
		onOpenChange(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-9 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-base font-bold",
					children: "Close Disciplinary Case"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
					className: "text-xs",
					children: [
						"Permanently archive ",
						caseRecord.id,
						" (",
						caseRecord.caseName,
						") with official committee closure findings."
					]
				})] })]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-4 pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-muted/40 p-3 border border-border/70 text-xs space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Main Accused:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-foreground",
								children: [
									caseRecord.accusedStudent,
									" (",
									caseRecord.rollNumber,
									")"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Department:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								caseRecord.department,
								" · ",
								caseRecord.academicYear
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "final-decision",
							className: "text-xs font-semibold",
							children: ["Final Disciplinary Decision ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: finalDecision,
							onValueChange: (val) => setFinalDecision(val),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "final-decision",
								className: "text-xs h-9",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select final verdict" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "No Further Action",
									className: "text-xs",
									children: "No Further Action"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Warning Issued",
									className: "text-xs",
									children: "Warning Issued"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Suspension Completed",
									className: "text-xs",
									children: "Suspension Completed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Other",
									className: "text-xs",
									children: "Other Sanction Concluded"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "decision-date",
							className: "text-xs font-semibold",
							children: "Closure & Decision Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "decision-date",
							type: "date",
							value: decisionDate,
							onChange: (e) => setDecisionDate(e.target.value),
							className: "text-xs font-mono h-9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "closure-outcome",
							className: "text-xs font-semibold",
							children: "Official Outcome Summary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "closure-outcome",
							value: outcome,
							onChange: (e) => setOutcome(e.target.value),
							placeholder: "E.g. Restitution paid; Undertaking signed; Suspension satisfied.",
							className: "text-xs h-9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "final-remarks",
							className: "text-xs font-semibold",
							children: ["Final Committee Remarks & Closing Notes ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "final-remarks",
							rows: 4,
							value: finalRemarks,
							onChange: (e) => setFinalRemarks(e.target.value),
							placeholder: "Enter comprehensive closing remarks, compliance verification, and archive justification...",
							className: "text-xs leading-relaxed"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-muted/20 p-3 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[0.72rem] font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-primary" }), " Case Closure Mandatory Verification Checklist"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-muted-foreground text-[0.72rem] cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										defaultChecked: true,
										className: "rounded border-border size-3.5 text-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Investigation inquiry completed" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-muted-foreground text-[0.72rem] cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										defaultChecked: true,
										className: "rounded border-border size-3.5 text-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Evidence dossier reviewed & preserved" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-muted-foreground text-[0.72rem] cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										defaultChecked: caseRecord.transcriptStatus === "Verified",
										className: "rounded border-border size-3.5 text-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hearing transcripts verified" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-muted-foreground text-[0.72rem] cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										defaultChecked: !!caseRecord.aiSynopsis?.verifiedBy,
										className: "rounded border-border size-3.5 text-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AI synopsis reviewed by committee" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-muted-foreground text-[0.72rem] cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										defaultChecked: !!caseRecord.disciplinaryAction,
										className: "rounded border-border size-3.5 text-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Disciplinary decision finalized" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-muted-foreground text-[0.72rem] cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										defaultChecked: true,
										className: "rounded border-border size-3.5 text-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Student notified of decision" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-muted-foreground text-[0.72rem] cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										defaultChecked: caseRecord.returned || !caseRecord.returnDate,
										className: "rounded border-border size-3.5 text-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Suspension/return handled if applicable" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-muted-foreground text-[0.72rem] cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										defaultChecked: true,
										className: "rounded border-border size-3.5 text-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Formal case documents generated" })]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-3 flex items-start space-x-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							id: "confirm-closure",
							checked: confirmed,
							onCheckedChange: (c) => setConfirmed(!!c),
							className: "mt-0.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							htmlFor: "confirm-closure",
							className: "text-xs text-foreground cursor-pointer select-none leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "I confirm" }), " as authorized Discipline Committee Head that the above verification checklist has been satisfied, all records are sealed, and the case is ready for permanent closure."]
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
							disabled: !confirmed,
							className: "bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), " Close Case"]
						})]
					})
				]
			})]
		})
	});
}
function CaseDetail() {
	const { caseId } = Route.useParams();
	const navigate = useNavigate();
	const { getCase, updateCase, deleteCase, closeCase, changeCaseStatus, addEvidence, updateEvidence, removeEvidence, addTimeline, addInvestigationNote, updateInvestigationNote, deleteInvestigationNote, setTranscript, updateTranscriptEntry, verifyTranscript, pushNotification } = useDsim();
	const caseRecord = getCase(caseId);
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	const [showAddPerson, setShowAddPerson] = (0, import_react.useState)(false);
	const [showEditModal, setShowEditModal] = (0, import_react.useState)(false);
	const [showExportModal, setShowExportModal] = (0, import_react.useState)(false);
	const [showCloseModal, setShowCloseModal] = (0, import_react.useState)(false);
	const [showReturnModal, setShowReturnModal] = (0, import_react.useState)(false);
	const [showRescheduleModal, setShowRescheduleModal] = (0, import_react.useState)(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = (0, import_react.useState)(false);
	const [statusConfirmTarget, setStatusConfirmTarget] = (0, import_react.useState)(null);
	if (!caseRecord) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Protected, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: FolderX,
		title: "Case file not found",
		description: "The requested disciplinary case record does not exist or has been removed.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/cases",
				children: "Return to Cases"
			})
		})
	}) });
	const handleAddPerson = (p) => {
		const newPerson = {
			...p,
			id: Math.random().toString(36).slice(2, 9)
		};
		updateCase(caseId, { involvedPersons: [...caseRecord.involvedPersons, newPerson] });
		addTimeline(caseId, {
			event: "Additional person added",
			kind: "person",
			description: `${p.name} added as ${p.role} (${p.department})`
		});
		toast.success(`Added ${p.name} to involved persons`);
	};
	const handleRemovePerson = (id) => {
		const person = caseRecord.involvedPersons.find((p) => p.id === id);
		updateCase(caseId, { involvedPersons: caseRecord.involvedPersons.filter((p) => p.id !== id) });
		if (person) addTimeline(caseId, {
			event: "Involved person removed",
			kind: "person",
			description: `${person.name} removed from case roster`
		});
		toast.success("Person removed from case");
	};
	const handleSaveDecision = (decision) => {
		updateCase(caseId, decision);
		addTimeline(caseId, {
			event: `Disciplinary Decision: ${decision.disciplinaryAction}`,
			kind: "decision",
			description: decision.actionReason || "Sanction recorded by Committee Head."
		});
		if (decision.disciplinaryAction === "Suspension" && decision.returnDate) pushNotification({
			type: "return",
			message: `${caseRecord.accusedStudent} suspension scheduled until ${decision.returnDate}.`,
			caseId
		});
	};
	const handleCloseCase = (closure) => {
		closeCase(caseId, closure);
	};
	const handleMarkReturned = (caseId, notes) => {
		updateCase(caseId, {
			status: "Returned",
			returned: true,
			actualReturnDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			actualReturnTime: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
			returnRemarks: notes
		});
		addTimeline(caseId, {
			event: "Student reinstated / returned",
			kind: "return",
			description: notes || "Suspension period completed. Student readmitted to campus."
		});
		toast.success(`${caseRecord.accusedStudent} marked as returned and readmitted.`);
	};
	const handleReschedule = (caseId, newDate, reason) => {
		const oldDate = caseRecord.returnDate;
		updateCase(caseId, { returnDate: newDate });
		addTimeline(caseId, {
			event: `Return date adjusted to ${newDate}`,
			kind: "decision",
			description: `Return date changed from ${oldDate || "N/A"} to ${newDate}. Reason: ${reason}`
		});
		pushNotification({
			type: "return",
			message: `${caseRecord.accusedStudent} return rescheduled to ${newDate}.`,
			caseId
		});
		toast.success(`Return date rescheduled to ${newDate}`);
	};
	const handleDeleteCase = () => {
		deleteCase(caseId);
		toast.success(`Case ${caseId} deleted permanently.`);
		navigate({ to: "/cases" });
	};
	const handleStatusTransition = (targetStatus) => {
		if (targetStatus === "Returned" && !caseRecord.returnDate && !caseRecord.suspensionStartDate) {
			toast.error("Cannot mark Returned: No suspension term configured on this case.");
			return;
		}
		if (targetStatus === "Closed") {
			setShowCloseModal(true);
			return;
		}
		changeCaseStatus(caseId, targetStatus);
		toast.success(`Case status changed to ${targetStatus}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Protected, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					className: "text-xs text-muted-foreground hover:text-foreground gap-1.5 self-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/cases",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " All Disciplinary Cases"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-600 text-[0.68rem] font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-3" }), " Confidential Investigation Record"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecureTag, { children: "Restricted Access · Authorized Personnel Only" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface p-6 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-sm font-bold text-foreground bg-secondary px-2.5 py-0.5 rounded-md",
											children: caseRecord.id
										}),
										caseRecord.sourceComplaintId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/complaints/$complaintId",
											params: { complaintId: caseRecord.sourceComplaintId },
											className: "inline-flex items-center gap-1 font-mono text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 px-2 py-0.5 rounded-md transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "size-3" }),
												" Source Complaint: ",
												caseRecord.sourceComplaintId
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: caseRecord.status }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted-foreground",
											children: [
												"Created ",
												fmtDate(caseRecord.createdAt),
												" · Updated ",
												fmtDateTime(caseRecord.updatedAt)
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl sm:text-3xl font-bold tracking-tight text-foreground",
									children: caseRecord.caseName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed",
									children: caseRecord.description
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2 shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "sm",
									className: "gap-1.5 text-xs bg-primary hover:bg-primary/90 shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/cases/$caseId/investigation",
										params: { caseId },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "size-3.5" }), " Open Investigation"]
									})
								}),
								caseRecord.status !== "Closed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setShowCloseModal(true),
									className: "gap-1.5 text-xs border-emerald-500/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5" }), " Close Case"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/15 text-emerald-600 text-xs font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), " Case Closed"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setShowEditModal(true),
									className: "gap-1.5 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-3.5" }), " Edit"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setShowExportModal(true),
									className: "gap-1.5 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), " Export Report"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setShowDeleteConfirm(true),
									className: "text-xs text-destructive hover:bg-destructive/10",
									"aria-label": "Delete case",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 border-t border-border pt-4 sm:grid-cols-3 lg:grid-cols-6 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground block text-[0.68rem] uppercase font-mono",
								children: "Main Accused"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground truncate block",
								children: caseRecord.accusedStudent
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground block text-[0.68rem] uppercase font-mono",
								children: "Roll Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-foreground font-medium block",
								children: caseRecord.rollNumber
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground block text-[0.68rem] uppercase font-mono",
								children: "Department"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground font-medium truncate block",
								children: caseRecord.department
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground block text-[0.68rem] uppercase font-mono",
								children: "Academic Year"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-foreground font-medium block",
								children: [
									caseRecord.academicYear,
									" (",
									caseRecord.yearOfStudy,
									")"
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground block text-[0.68rem] uppercase font-mono",
								children: "Evidence Vault"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-foreground font-semibold block",
								children: [caseRecord.evidence.length, " items"]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground block text-[0.68rem] uppercase font-mono",
								children: "Sanction Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-primary block",
								children: caseRecord.disciplinaryAction || "Pending Verdict"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/80 bg-muted/20 p-3 text-xs space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-muted-foreground text-[0.68rem] uppercase tracking-wider font-mono",
								children: "Lifecycle Stage"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[0.68rem] text-muted-foreground",
								children: "Click step to transition"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center gap-1.5 sm:gap-2",
							children: [
								{
									status: "Draft",
									label: "1. Draft"
								},
								{
									status: "Under Investigation",
									label: "2. Investigation"
								},
								{
									status: "Decision Pending",
									label: "3. Decision Pending"
								},
								{
									status: "Suspended",
									label: "4. Suspended / Active"
								},
								{
									status: "Returned",
									label: "5. Returned"
								},
								{
									status: "Closed",
									label: "6. Closed"
								}
							].map((step, idx) => {
								const isCurrent = caseRecord.status === step.status;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => handleStatusTransition(step.status),
									className: `px-2.5 py-1 rounded-md text-[0.7rem] font-medium transition-all flex items-center gap-1 cursor-pointer ${isCurrent ? "bg-primary text-primary-foreground font-bold shadow-xs ring-2 ring-primary/30" : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-secondary"}`,
									children: [isCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), step.label]
								}, step.status);
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: activeTab,
				onValueChange: setActiveTab,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto pb-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "flex w-max min-w-full justify-start sm:w-auto h-auto p-1 bg-muted/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "overview",
									className: "text-xs gap-1.5 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }), " Overview"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "people",
									className: "text-xs gap-1.5 py-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }),
										" People (",
										caseRecord.involvedPersons.length + 1,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "evidence",
									className: "text-xs gap-1.5 py-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileBox, { className: "size-3.5" }),
										" Evidence (",
										caseRecord.evidence.length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "transcript",
									className: "text-xs gap-1.5 py-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3.5" }),
										" Transcript (",
										caseRecord.transcript?.length || 0,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "synopsis",
									className: "text-xs gap-1.5 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " AI Synopsis"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "notes",
									className: "text-xs gap-1.5 py-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyNote, { className: "size-3.5" }),
										" Notes (",
										caseRecord.investigationNotes?.length || 0,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "decision",
									className: "text-xs gap-1.5 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, { className: "size-3.5" }), " Final Decision"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "suspension",
									className: "text-xs gap-1.5 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3.5" }), " Suspension & Return"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "timeline",
									className: "text-xs gap-1.5 py-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
										" Timeline (",
										caseRecord.timeline.length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "audit",
									className: "text-xs gap-1.5 py-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-3.5" }),
										" Audit History (",
										caseRecord.auditLog?.length || 0,
										")"
									]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "overview",
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface p-5 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-semibold text-sm",
											children: "Investigation AI Synopsis"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										onClick: () => setActiveTab("synopsis"),
										className: "text-xs text-primary h-7",
										children: "Open Editor →"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "line-clamp-4 text-xs text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-lg border border-border/50",
									children: caseRecord.synopsis || "No AI synopsis generated yet. Open the Investigation workspace to record statements and synthesize facts."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface p-5 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, { className: "size-4 text-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-semibold text-sm",
											children: "Official Disciplinary Verdict"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										onClick: () => setActiveTab("decision"),
										className: "text-xs text-primary h-7",
										children: "Manage Ruling →"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-muted/20 p-3 border border-border/50 text-xs space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Action Type:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "font-semibold text-foreground",
												children: caseRecord.disciplinaryAction || "None recorded"
											})]
										}),
										caseRecord.returnDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Expected Return Date:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "font-mono text-foreground",
												children: caseRecord.returnDate
											})]
										}),
										caseRecord.actionReason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-1 text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground",
												children: "Findings: "
											}), caseRecord.actionReason]
										})
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface p-5 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "font-semibold text-sm flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileBox, { className: "size-4 text-primary" }),
										" Key Evidence Exhibits (",
										caseRecord.evidence.length,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => setActiveTab("evidence"),
									className: "text-xs text-primary h-7",
									children: "View Full Gallery →"
								})]
							}), caseRecord.evidence.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground italic",
								children: "No evidence exhibits attached yet."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3",
								children: caseRecord.evidence.slice(0, 4).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border/70 p-3 bg-card/60 text-xs space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold",
											children: e.id
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[0.65rem] uppercase text-muted-foreground",
											children: e.type
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground line-clamp-1",
										children: e.description
									})]
								}, e.id))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "people",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface p-6 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold",
									children: "People Involved & Witnesses"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Main accused student, reporting invigilators, eyewitnesses, and accomplices."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setShowAddPerson(true),
									className: "text-xs gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-3.5" }), " + Add Person"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonCard, {
									main: true,
									person: {
										id: "accused-main",
										name: caseRecord.accusedStudent,
										role: `${caseRecord.yearOfStudy} (Main Accused)`,
										department: caseRecord.department,
										rollNumber: caseRecord.rollNumber
									}
								}), caseRecord.involvedPersons.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonCard, {
									person: p,
									onRemove: () => handleRemovePerson(p.id)
								}, p.id))]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "evidence",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceGallery, {
							caseId,
							evidence: caseRecord.evidence,
							onAddEvidence: (e) => {
								const newEv = addEvidence(caseId, e);
								addTimeline(caseId, {
									event: `${e.type.toUpperCase()} evidence added`,
									kind: e.type === "photo" ? "photo" : e.type === "video" ? "video" : "note",
									evidenceRef: `Evidence #${String(newEv.number).padStart(2, "0")}`,
									description: e.description
								});
							},
							onUpdateEvidence: (evId, patch, custodyAction) => {
								updateEvidence(caseId, evId, patch, custodyAction);
							},
							onRemoveEvidence: (evId) => removeEvidence(caseId, evId)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "transcript",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranscriptViewer, {
							transcript: caseRecord.transcript ?? [],
							caseId,
							caseName: caseRecord.caseName,
							studentName: caseRecord.accusedStudent,
							audioEvidenceId: caseRecord.transcriptAudioEvidenceId,
							transcriptStatus: caseRecord.transcriptStatus || (caseRecord.transcript && caseRecord.transcript.length > 0 ? "Completed" : "Not Generated"),
							onRegenerateTranscript: () => {
								if (caseRecord.transcript) setTranscript(caseId, [...caseRecord.transcript]);
							},
							onUpdateEntry: (entryId, patch) => updateTranscriptEntry(caseId, entryId, patch),
							onVerifyTranscript: () => verifyTranscript(caseId),
							onGenerateAiSynopsis: () => setActiveTab("synopsis")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "synopsis",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SynopsisEditor, {
							initialSynopsis: caseRecord.synopsis ?? "",
							onSaveSynopsis: (syn) => {
								updateCase(caseId, { synopsis: syn });
								addTimeline(caseId, {
									event: "Synopsis verified and updated",
									kind: "synopsis"
								});
							},
							caseName: caseRecord.caseName,
							studentName: caseRecord.accusedStudent
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "notes",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvestigationNotesView, {
							caseId,
							notes: caseRecord.investigationNotes ?? [],
							onAddNote: (content) => addInvestigationNote(caseId, content),
							onUpdateNote: (noteId, content) => updateInvestigationNote(caseId, noteId, content),
							onDeleteNote: (noteId) => deleteInvestigationNote(caseId, noteId)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "decision",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalDecisionSection, {
							caseRecord,
							onSaveDecision: handleSaveDecision
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "suspension",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface p-6 space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-bold text-foreground",
									children: "Suspension & Readmission Management"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Monitor suspension parameters, reschedule return dates, and confirm student readmission."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-2",
									children: caseRecord.returnDate && caseRecord.status !== "Returned" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => setShowRescheduleModal(true),
										className: "text-xs",
										children: "Reschedule Return"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										onClick: () => setShowReturnModal(true),
										className: "text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-3.5" }), " Mark Returned"]
									})] })
								})]
							}), caseRecord.disciplinaryAction === "Suspension" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-card p-4 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground uppercase text-[0.68rem] font-mono",
											children: "Suspension Start Date"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-sm font-bold text-foreground block",
											children: caseRecord.suspensionStartDate || "Not Set"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-signal/30 bg-signal/5 p-4 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-signal uppercase text-[0.68rem] font-mono font-bold",
											children: "Scheduled Return Date"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-sm font-bold text-foreground block",
											children: caseRecord.returnDate || "Not Set"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-card p-4 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground uppercase text-[0.68rem] font-mono",
											children: "Readmission Status"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-sm block",
											children: caseRecord.status === "Returned" || caseRecord.returned ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-emerald-600 flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " Returned & Cleared"]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-amber-600",
												children: "Awaiting Return Date"
											})
										})]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground bg-muted/20",
								children: "No active suspension assigned to this case. Manage rulings in the Final Decision tab."
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "timeline",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvestigationTimeline, {
							caseId,
							timeline: caseRecord.timeline,
							onAddNote: (note) => {
								addTimeline(caseId, {
									event: "Investigator note recorded",
									kind: "note",
									description: note
								});
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "audit",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditLogView, {
							auditLog: caseRecord.auditLog,
							caseId
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddPersonModal, {
				open: showAddPerson,
				onOpenChange: setShowAddPerson,
				onAdd: handleAddPerson
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditCaseModal, {
				caseRecord,
				open: showEditModal,
				onOpenChange: setShowEditModal,
				onSave: (patch) => {
					updateCase(caseId, patch);
					addTimeline(caseId, {
						event: "Case details modified",
						kind: "note",
						description: "Particulars updated by Committee Head."
					});
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportCaseModal, {
				caseRecord,
				open: showExportModal,
				onOpenChange: setShowExportModal
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseCaseModal, {
				caseRecord,
				open: showCloseModal,
				onOpenChange: setShowCloseModal,
				onCloseCase: handleCloseCase
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkReturnedModal, {
				caseRecord,
				open: showReturnModal,
				onOpenChange: setShowReturnModal,
				onConfirm: handleMarkReturned
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RescheduleModal, {
				caseRecord,
				open: showRescheduleModal,
				onOpenChange: setShowRescheduleModal,
				onReschedule: handleReschedule
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: showDeleteConfirm,
				onOpenChange: setShowDeleteConfirm,
				title: `Delete Case ${caseRecord.id}?`,
				description: "Are you sure you want to permanently delete this disciplinary case, all audio recordings, and attached evidence records? This action is irreversible.",
				destructive: true,
				confirmLabel: "Permanently Delete",
				onConfirm: handleDeleteCase
			})
		]
	}) });
}
//#endregion
export { CaseDetail as component };
