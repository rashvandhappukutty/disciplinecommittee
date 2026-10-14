import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as useDsim } from "./button-C7ZpzBGx.mjs";
import { v as PageHeader } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { t as Protected } from "./Protected-DW_nWC7p.mjs";
import { n as CaseTable } from "./CaseTable-Bo8clG8J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/investigations-BEHv8GKx.js
var import_jsx_runtime = require_jsx_runtime();
function CaseListPage({ title, subtitle, statuses }) {
	const { cases } = useDsim();
	const list = statuses ? cases.filter((c) => statuses.includes(c.status)) : cases;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Protected, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title,
		subtitle
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "surface overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseTable, { cases: list })
	})] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseListPage, {
	title: "Active Investigations",
	subtitle: "Cases currently under investigation.",
	statuses: ["Under Investigation"]
});
//#endregion
export { SplitComponent as component };
