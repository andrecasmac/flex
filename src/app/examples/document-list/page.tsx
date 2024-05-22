import { PageTitle } from "@/components/page-title";
import { promises as fs } from 'fs';
import { Button } from "@/components/ui/button";
import { columns } from "./colums";
import { DataTable } from "./data-table-doc-list";

export default async function Page() {
    const file = await fs.readFile(process.cwd() + '/src/app/examples/document-list/doc-list-data.json', 'utf8');
    const data = JSON.parse(file);
    return(
        <>
            <PageTitle title="Amazon Documents" />
            <div className="w-[80%]">
                <div className="flex flex-col mb-5">
                    <Button variant="default" size="lg" className="rounded-2xl ms-auto">Add Document +</Button>
                </div>
                <DataTable columns={columns} data={data} />
            </div>
        </>
    );
}