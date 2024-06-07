'use client'
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DataTable } from "@/app/examples/tables/table/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageTitle } from "@/components/page-title";
import { columnsSegmentTemplate } from "@/app/examples/tables/table/colums";
import { SegmentTemplatesContent } from "../../../types/TableTypes";

/*List where the data for Segment Templates is stored*/
const data: SegmentTemplatesContent[] = [
    {
        id: "DTM",
        name: "Date/Time Reference",
        nElements: 2,
        usage: 0,
        maxUse: 1
    },
    {
        id: "ORG",
        name: "Organization Name",
        nElements: 1,
        usage: 0,
        maxUse: 1
    }
]
export default function Page() {

    const router = useRouter();
    return (
        <div className="flex flex-col w-full justify-center items-center">
            <PageTitle title="Segment Templates" />
            <div className="flex flex-col w-9/12">
                <div className="flex justify-end w-full ">
                    {/*Button to create a new segment*/}
                    <Link href={"./segment-create"}>
                        <Button>Create Segment<Plus strokeWidth={1.5} /> </Button>
                    </Link>
                </div>
                <div className="flex justify-center items-center pt-5">
                    {/*Table where the Segment Templates are displayed*/}
                    <DataTable columns={columnsSegmentTemplate} data={data} />
                </div>
            </div>
        </div>
    )
}