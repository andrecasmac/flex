import { PageTitle } from "@/components/page-title";
import { promises as fs } from 'fs';
import { Button } from "@/components/ui/button";
import { columns } from "./colums";
import { DataTable } from "./data-table-doc-list";
import Modals from "@/app/examples/modal";

export default async function Page() {
    const file = await fs.readFile(process.cwd() + '/src/app/admin/document-list/doc-list-data.json', 'utf8');
    const data = JSON.parse(file);
    return(
        <div className="flex flex-col w-full justify-center items-center">
            <PageTitle title="Amazon Documents" />
            <div className="w-[80%]">
                <div className="flex flex-row-reverse mb-5 ">
                    <Modals modalAddDoc={true} />
                </div>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
}