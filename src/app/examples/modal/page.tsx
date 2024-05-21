import Modals from ".";

import { PageTitle } from "@/components/page-title";

export default function Page() {
  return (
    <div className="space-y-5 flex flex-col items-center ">
      <Modals modalPartner={true} />
      <Modals modalTest={true} />
      <Modals modalErrorList={true} />
    </div>
  );
}
