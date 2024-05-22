import { DataTable } from "@/app/examples/tables/table/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageTitle } from "@/components/page-title";
import { columnsSegmentTemplate } from "@/app/examples/tables/table/colums";
import { SegmentTemplatesContent } from "../../../../types/TableTypes";
const data:SegmentTemplatesContent[]=[
    {
        id:"DTM",
        name:"Date/Time Reference",
        nElements:2,
        usage:0,
        maxUse:1
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


    return (
        <div className="flex flex-col w-full justify-center items-center">
            <PageTitle title="Segment Templates"/>
            <main>
                <div className="flex justify-end w-11/12 pr-6">
                    <Button>Create Segment<Plus strokeWidth={1.5} /> </Button>
                </div>
                <div className="flex w-screen justify-center items-center pt-5">
                    <DataTable columns={columnsSegmentTemplate} data={data}/>
                </div>
            </main>
        </div>
    )
}