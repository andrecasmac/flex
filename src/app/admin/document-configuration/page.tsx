"use client";
import React from "react";
import { PageTitle } from "@/components/page-title";
import DocConfig from "./conf-doc";
import exampleJson from "./doc-test.json";
import { getEDIdocumentsById } from "@/da/EDI-Documents/edi-document-da";

export default function Page({
  searchParams,
}: {
  searchParams: { EDI_Id: string };
}) {
  const EDI_Id = searchParams.EDI_Id
  const [allSegment, setAllSegments] = React.useState<any[] | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const fetchSegments = async () => {
      try {
        const segmentData = await getEDIdocumentsById(EDI_Id);

        if (segmentData && segmentData.structure) {
          const transformedSegments = segmentData.structure.map((seg: any) => {
            const {  ...filteredSegment } =
              seg;
            return filteredSegment;
          });

          setAllSegments(transformedSegments);
        } else {
          setError(new Error("No structure found in segment data"));
        }
      } catch (err) {
        console.error("Error reading segment:", err);
      }
    };

    fetchSegments();
  }, [EDI_Id]);

  if (error) {
    return <div>Error: {error.message}</div>; // Error state
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <PageTitle title="Document Configuration" />

      {allSegment ? (
        <>
          <DocConfig EDI_Id={EDI_Id} initialConfig={allSegment} />
          {/* <pre className="pt-10 text-xs flex justify-center">
            {JSON.stringify(allSegment, null, 2)}
          </pre> */}
        </>
      ) : (
        <>
          <p>Loading document data...</p>
        </>
      )}
    </div>
  );
}
