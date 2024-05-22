import { PageTitle } from "@/components/page-title";



import { Segments } from "./testSeg";
import { SegmentsTest } from "./test2";

export default function Page() {
  return (
    <>
      <PageTitle title="Create Segment" />

      <div className="flex w-screen justify-center pb-20">
        {/* <Segments /> */}
        <SegmentsTest />

      </div>
    </>
  );
}
