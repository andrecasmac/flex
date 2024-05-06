import { DataTable } from "./data-table-dnd";
import { ProductsT, columns } from "./colums";
// hook
import { getTable } from "@/hooks/dataTable";

export default async function Table() {
  const data: ProductsT[] = await getTable();

  return (
    <div className="w-[85%]">
      <DataTable columns={columns} dataT={data} />
    </div>
  );
}
