import { DataTable } from "@/app/examples/tables/table/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Page() {
    return (
        <div>
            <header>
                <h1> Segment Templates</h1>
            </header>
            <hr/>
            <main>
                <div>
                    <Button>Create Segment<Plus strokeWidth={1.5}/> </Button>
                </div>
                <div>
                    Tabla
                </div>
            </main>
        </div>
    )
}