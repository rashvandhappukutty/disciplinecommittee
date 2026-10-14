import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as Button } from "./button-C7ZpzBGx.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Kt as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { A as fmtDate } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { t as StatusBadge } from "./StatusBadge-CQBA8eKM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CaseTable-Bo8clG8J.js
var import_jsx_runtime = require_jsx_runtime();
function CaseTable({ cases, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hidden overflow-x-auto md:block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
				className: "border-b border-border text-left",
				children: [
					"Case ID",
					"Case Name",
					"Student",
					"Department",
					"Status",
					"Created",
					"Last Updated",
					""
				].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "eyebrow whitespace-nowrap px-4 py-3 font-normal",
					children: h
				}, h))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: cases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border/70 transition-colors last:border-0 hover:bg-muted/60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: `whitespace-nowrap px-4 font-mono text-xs ${compact ? "py-2" : "py-3.5"}`,
						children: c.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 font-medium",
						children: c.caseName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "whitespace-nowrap px-4",
						children: c.accusedStudent
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "whitespace-nowrap px-4 text-muted-foreground",
						children: c.department
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "whitespace-nowrap px-4 text-muted-foreground",
						children: fmtDate(c.createdAt)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "whitespace-nowrap px-4 text-muted-foreground",
						children: fmtDate(c.updatedAt)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cases/$caseId",
								params: { caseId: c.id },
								children: ["Open ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
							})
						})
					})
				]
			}, c.id)) })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 p-3 md:hidden",
		children: cases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseCard, { c }, c.id))
	})] });
}
function CaseCard({ c }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/cases/$caseId",
		params: { caseId: c.id },
		className: "surface group block p-4 transition-shadow hover:shadow-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs text-muted-foreground",
					children: c.id
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-semibold",
				children: c.caseName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-0.5 text-sm text-muted-foreground",
				children: [
					c.accusedStudent,
					" · ",
					c.department
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					c.academicYear,
					" · Updated ",
					fmtDate(c.updatedAt)
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 font-medium text-foreground group-hover:underline",
					children: ["Open Case ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
				})]
			})
		]
	});
}
//#endregion
export { CaseTable as n, CaseCard as t };
