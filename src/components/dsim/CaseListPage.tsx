import { Protected } from "./Protected";
import { PageHeader } from "./common";
import { CaseTable } from "./CaseTable";
import { useDsim } from "@/lib/dsim/store";
import type { CaseStatus } from "@/lib/dsim/types";

export function CaseListPage({ title, subtitle, statuses }: { title: string; subtitle: string; statuses?: CaseStatus[] }) {
  const { cases } = useDsim();
  const list = statuses ? cases.filter((c) => statuses.includes(c.status)) : cases;
  return (
    <Protected>
      <PageHeader title={title} subtitle={subtitle} />
      <div className="surface overflow-hidden">
        <CaseTable cases={list} />
      </div>
    </Protected>
  );
}
