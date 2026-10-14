import { createFileRoute } from "@tanstack/react-router";
import { CaseListPage } from "@/components/dsim/CaseListPage";

export const Route = createFileRoute("/investigations")({
  head: () => ({ meta: [{ title: "Active Investigations — DSIM" }, { name: "description", content: "Cases under investigation." }, { property: "og:title", content: "Active Investigations — DSIM" }, { property: "og:description", content: "Cases under investigation." }] }),
  component: () => <CaseListPage title="Active Investigations" subtitle="Cases currently under investigation." statuses={["Under Investigation"]} />,
});
