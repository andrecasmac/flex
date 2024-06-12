import { PageTitle } from "@/components/page-title";

import SegmentGenerator from "./create-segment";
export default function PagePage({searchParams/*Parameters we receive from Partnerhsips Page*/}:{
  searchParams :{
    EDI_Id:string
  }
}) {

  const EDI_Id = searchParams.EDI_Id
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <PageTitle title="Create Segment" />

      <div className="flex w-screen justify-center pb-20">
        <SegmentGenerator EDI_Id={EDI_Id} />
      </div>
    </div>
  );
}
