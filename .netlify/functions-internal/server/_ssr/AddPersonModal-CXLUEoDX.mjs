import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as Button, r as DEPARTMENTS } from "./button-C7ZpzBGx.mjs";
import { s as UserPlus } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BB0Q0GUL.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Cd1zWcTd.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { t as Label } from "./label-Di2QZFiw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AddPersonModal-CXLUEoDX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AddPersonModal({ open, onOpenChange, onAdd }) {
	const [name, setName] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("Witness");
	const [department, setDepartment] = (0, import_react.useState)(DEPARTMENTS[0] || "");
	const [rollNumber, setRollNumber] = (0, import_react.useState)("");
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name.trim()) return;
		onAdd({
			name: name.trim(),
			role: role.trim(),
			department: department || DEPARTMENTS[0] || "",
			...rollNumber.trim() ? { rollNumber: rollNumber.trim() } : {}
		});
		setName("");
		setRole("Witness");
		setRollNumber("");
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
					className: "grid size-8 place-items-center rounded-lg bg-secondary text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add Involved Person" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Record witness, accomplice, or reporting faculty in case record." })] })]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "p-name",
							className: "text-xs",
							children: "Full Name *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "p-name",
							placeholder: "E.g., Sukesh R",
							value: name,
							onChange: (e) => setName(e.target.value),
							required: true,
							className: "text-xs"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "p-role",
							className: "text-xs",
							children: "Role / Involvement *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "p-role",
							placeholder: "E.g., Present during incident / Eyewitness / Invigilator",
							value: role,
							onChange: (e) => setRole(e.target.value),
							required: true,
							className: "text-xs"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "p-roll",
								className: "text-xs",
								children: "Roll Number (Optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "p-roll",
								placeholder: "E.g., 21CS052",
								value: rollNumber,
								onChange: (e) => setRollNumber(e.target.value),
								className: "text-xs font-mono"
							})]
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
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "sm",
							children: "Add Person"
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { AddPersonModal as t };
