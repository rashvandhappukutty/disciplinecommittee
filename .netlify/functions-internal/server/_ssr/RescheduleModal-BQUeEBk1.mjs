import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button } from "./button-C7ZpzBGx.mjs";
import { Ht as Calendar, O as RotateCcw, Pt as CircleCheck, c as UserCheck } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BB0Q0GUL.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { t as Label } from "./label-Di2QZFiw.mjs";
import { t as Textarea } from "./textarea-DmMEYLpm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RescheduleModal-BQUeEBk1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MarkReturnedModal({ caseRecord, open, onOpenChange, onConfirm }) {
	const [clearanceNotes, setClearanceNotes] = (0, import_react.useState)("");
	const [returnDate, setReturnDate] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	if (!caseRecord) return null;
	const handleConfirm = () => {
		onConfirm(caseRecord.id, clearanceNotes);
		onOpenChange(false);
		toast.success(`Marked ${caseRecord.accusedStudent} as returned from suspension.`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Mark Student as Returned" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Reinstate student to active status after suspension term completion." })] })]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-muted/30 p-3 text-xs space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-foreground",
									children: caseRecord.accusedStudent
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-muted-foreground",
									children: [
										caseRecord.department,
										" · ",
										caseRecord.rollNumber
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-muted-foreground",
									children: [
										"Case: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono",
											children: caseRecord.id
										}),
										" — ",
										caseRecord.caseName
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "ret-date",
								className: "text-xs",
								children: "Actual Return Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "ret-date",
								type: "date",
								value: returnDate,
								onChange: (e) => setReturnDate(e.target.value),
								className: "text-xs font-mono"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "ret-notes",
								className: "text-xs",
								children: "Clearance & Readmission Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "ret-notes",
								placeholder: "E.g., Parent undertaking received, student acknowledged committee guidelines...",
								value: clearanceNotes,
								onChange: (e) => setClearanceNotes(e.target.value),
								rows: 3,
								className: "text-xs"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => onOpenChange(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: handleConfirm,
						className: "bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), " Confirm Readmission"]
					})]
				})
			]
		})
	});
}
function RescheduleModal({ caseRecord, open, onOpenChange, onReschedule }) {
	const [newDate, setNewDate] = (0, import_react.useState)(caseRecord?.returnDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [reason, setReason] = (0, import_react.useState)("");
	if (!caseRecord) return null;
	const handleConfirm = () => {
		if (!newDate) return;
		onReschedule(caseRecord.id, newDate, reason);
		onOpenChange(false);
		toast.success(`Updated return date for ${caseRecord.accusedStudent} to ${newDate}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 place-items-center rounded-lg bg-secondary text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Reschedule Return Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: ["Modify expected return date for Case ", caseRecord.id] })] })]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-muted/30 p-3 text-xs space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-foreground",
								children: caseRecord.accusedStudent
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-muted-foreground",
								children: ["Current Return Date: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: caseRecord.returnDate || "Not set"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "resched-date",
								className: "text-xs",
								children: "New Expected Return Date *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "resched-date",
								type: "date",
								value: newDate,
								onChange: (e) => setNewDate(e.target.value),
								required: true,
								className: "text-xs font-mono"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "resched-reason",
								className: "text-xs",
								children: "Reason for Extension / Adjustment"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "resched-reason",
								placeholder: "E.g., Medical certificate submitted, pending committee review...",
								value: reason,
								onChange: (e) => setReason(e.target.value),
								rows: 3,
								className: "text-xs"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => onOpenChange(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: handleConfirm,
						className: "gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), " Save New Date"]
					})]
				})
			]
		})
	});
}
//#endregion
export { RescheduleModal as n, MarkReturnedModal as t };
