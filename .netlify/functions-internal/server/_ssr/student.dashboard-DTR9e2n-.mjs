import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as cn } from "./button-C7ZpzBGx.mjs";
import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.dashboard-DTR9e2n-.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./student.dashboard-MRcM9xuW.mjs");
var Route = createFileRoute("/student/dashboard")({
	head: () => ({ meta: [
		{ title: "Student Dashboard — DSIM" },
		{
			name: "description",
			content: "Submit and track disciplinary complaints securely."
		},
		{
			property: "og:title",
			content: "Student Dashboard — DSIM"
		},
		{
			property: "og:description",
			content: "Submit and track disciplinary complaints securely."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
function ComplaintStatusBadge({ status }) {
	const styles = {
		Submitted: {
			bg: "bg-blue-500/10 border-blue-500/20",
			text: "text-blue-600 dark:text-blue-400",
			dot: "bg-blue-500"
		},
		"Under Review": {
			bg: "bg-amber-500/10 border-amber-500/20",
			text: "text-amber-600 dark:text-amber-400",
			dot: "bg-amber-500"
		},
		"Additional Information Requested": {
			bg: "bg-orange-500/10 border-orange-500/30 animate-pulse",
			text: "text-orange-600 dark:text-orange-400 font-bold",
			dot: "bg-orange-500"
		},
		Accepted: {
			bg: "bg-emerald-500/10 border-emerald-500/20",
			text: "text-emerald-600 dark:text-emerald-400",
			dot: "bg-emerald-500"
		},
		"Investigation in Progress": {
			bg: "bg-indigo-500/10 border-indigo-500/20",
			text: "text-indigo-600 dark:text-indigo-400",
			dot: "bg-indigo-500"
		},
		"Converted to Case": {
			bg: "bg-purple-500/10 border-purple-500/20",
			text: "text-purple-600 dark:text-purple-400",
			dot: "bg-purple-500"
		},
		"Decision Made": {
			bg: "bg-teal-500/10 border-teal-500/20",
			text: "text-teal-600 dark:text-teal-400",
			dot: "bg-teal-500"
		},
		Resolved: {
			bg: "bg-emerald-500/15 border-emerald-500/30",
			text: "text-emerald-700 dark:text-emerald-300 font-semibold",
			dot: "bg-emerald-500"
		},
		Closed: {
			bg: "bg-slate-500/10 border-slate-500/20",
			text: "text-slate-600 dark:text-slate-400",
			dot: "bg-slate-500"
		},
		Rejected: {
			bg: "bg-rose-500/10 border-rose-500/20",
			text: "text-rose-600 dark:text-rose-400",
			dot: "bg-rose-500"
		}
	};
	const cur = styles[status] || styles.Submitted;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.68rem] font-medium whitespace-nowrap", cur.bg, cur.text),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", cur.dot) }), status]
	});
}
//#endregion
export { Route as n, ComplaintStatusBadge as t };
