"use client";
import React, { useEffect, useState } from "react";
import { PageTitle } from "@/components/page-title";
import SegmentEdit from "./edit-segment";

import examplejson from "./exmaple-segment.json";
import { readSegmentById } from "@/da/Segments/segment-da";
import { SegmentData } from "../../../../types/segmentTypes";

function filterKeys(data: any) {
  const { EDI_DocumentId, parentLoopId, ...filteredData } = data;
  return filteredData;
}

export default function Page({
  searchParams,
}: {
  searchParams: { segmentId: string };
}) {
  const segmentId = searchParams.segmentId;

  const [data, setData] = useState<SegmentData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const segmentData = await readSegmentById(segmentId);
        const filteredData = filterKeys(segmentData);

        // Explicit null check before setting data
        if (filteredData) {
          setData(filteredData as SegmentData); // Type assertion after null check
        } else {
          // Handle the case where filteredData is null (e.g., show an error message)
          console.error("Error: Segment data not found.");
        }
      } catch (error) {
        console.error(error);
      }
    }
    // console.log(data)

    fetchData();
  }, [segmentId]);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <PageTitle title="Edit Segment" />

      <div className="flex w-screen justify-center pb-20">
        {data ? (
          <SegmentEdit initialSegmentData={data} segmentId={segmentId} />
        ) : (
          <p>Loading segment data...</p> // Or an error message if data is null
        )}
      </div>
    </div>
  );
}
