import { DataTable } from "./data-table-dnd";
import { ProductsT, columns } from "./colums";
// hook
import { getTable } from "@/hooks/dataTable";

export default async function Table() {
  const data: ProductsT[] = await getTable();

  return (
    <main className="flex align-middle justify-center">
      <div className="pt-32 w-[80%] block items-center">
        <DataTable columns={columns} dataT={data} />
      </div>
    </main>
  );
}
