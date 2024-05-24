import Modals from ".";

import { PageTitle } from "@/components/page-title";
import ErrorContextProvider from "@/app/context/errorContextProvider";

export default function Page() {
  return (
    <>
      <PageTitle title="Modales" />
      <div className="space-y-5 flex flex-col items-center ">
        <Modals modalPartner={true} />
        <Modals modalTest={true} />
        <ErrorContextProvider>
          <Modals modalUpload={true} />
          <Modals modalErrorList={true} />
          <Modals modalSuccess={true}/>
        </ErrorContextProvider>
      </div>
    </>
  );
}
