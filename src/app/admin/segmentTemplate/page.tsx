import { DataTable } from "@/app/examples/tables/table/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageTitle } from "@/components/page-title";

export default function Page() {
    return (
        <div className="flex flex-col w-9/12">
            <PageTitle title="Segment Templates"/>
            <main>
                <div className="flex justify-end w-9/12">
                    <Button>Create Segment<Plus strokeWidth={1.5} /> </Button>
                </div>
                <div>
                    Tabla
                </div>
            </main>
        </div>
    )
}