import { PageTitle } from "@/components/page-title";

import SegmentGenerator from "./create-segment";
export default function Page() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <PageTitle title="Create Segment" />

      <div className="flex w-screen justify-center pb-20">
        <SegmentGenerator />
      </div>
    </div>
  );
}
