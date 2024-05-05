import { DataTable } from "./data-table";
import { columns } from "./colums";
import { Button } from "@/components/ui/button";

// hook
import { getTable } from "@/hooks/dataTable";

export default async function Table() {
  const data = await getTable();

  return (
    <main className="flex align-middle justify-center">
      <div className="pt-32 w-[80%] block items-center">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
