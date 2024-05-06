import { DataTable } from "./data-table";
import { columns } from "./colums";

// hook
import { getTable } from "@/hooks/dataTable";

export default async function Table() {
  const data = await getTable();

  return (
    <div className="w-[85%]">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
