import Modals from ".";

import { PageTitle } from "@/components/page-title";

export default function Page() {
  return (
    <>
      <PageTitle title="Modales" />
      <div className="space-y-5 flex flex-col items-center ">
        <Modals modalPartner={true} />
        <Modals modalTest={true} />
      </div>
    </>
  );
}
