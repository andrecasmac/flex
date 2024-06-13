"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DataTable } from "@/app/examples/tables/table/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageTitle } from "@/components/page-title";
import { columnsSegmentTemplate } from "./columns";
import { SegmentTemplatesContent } from "../../../types/TableTypes";
import { useEffect, useState } from "react";
import { getAllSegmentsTemplates } from "@/da/Segments/segment-da";

import { Segment } from "@/types/DbTypes";

export default function PagePage({
  searchParams,
}: {
  searchParams: {
    EDI_Id: string;
  };
}) {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const EDI_Id = searchParams.EDI_Id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllSegmentsTemplates(true);
        setSegments(data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateData = (id: string) => {
    setSegments((prevSegments) =>
      prevSegments.filter((segment) => segment.id !== id)
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <PageTitle title="Segment Templates" />
      <div className="flex flex-col w-[80%]">
        <div className="flex justify-end w-full ">
          <Link
            href={{ pathname: "./segment-create", query: { EDI_Id: EDI_Id } }}
          >
            <Button>
              Create Segment
              <Plus strokeWidth={1.5} />{" "}
            </Button>
          </Link>
        </div>
        <div className="flex justify-center items-center pt-5">
          <DataTable
            columns={columnsSegmentTemplate(updateData)}
            data={segments}
          />
        </div>
      </div>
    </div>
  );
}
