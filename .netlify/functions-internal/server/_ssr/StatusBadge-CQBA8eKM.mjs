import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as cn } from "./button-C7ZpzBGx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatusBadge-CQBA8eKM.js
var import_jsx_runtime = require_jsx_runtime();
var statusStyles = {
	Draft: "bg-st-draft/10 text-st-draft ring-st-draft/25",
	"Under Investigation": "bg-st-investigation/10 text-st-investigation ring-st-investigation/25",
	"Decision Pending": "bg-st-pending/12 text-st-pending ring-st-pending/30",
	Suspended: "bg-st-suspended/10 text-st-suspended ring-st-suspended/25",
	"Awaiting Return": "bg-st-awaiting/10 text-st-awaiting ring-st-awaiting/25",
	Returned: "bg-st-returned/10 text-st-returned ring-st-returned/25",
	Closed: "bg-st-closed/10 text-st-closed ring-st-closed/25"
};
var dotStyles = {
	Draft: "bg-st-draft",
	"Under Investigation": "bg-st-investigation",
	"Decision Pending": "bg-st-pending",
	Suspended: "bg-st-suspended",
	"Awaiting Return": "bg-st-awaiting",
	Returned: "bg-st-returned",
	Closed: "bg-st-closed"
};
function StatusBadge({ status, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset", statusStyles[status], className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", dotStyles[status]) }), status]
	});
}
//#endregion
export { StatusBadge as t };
