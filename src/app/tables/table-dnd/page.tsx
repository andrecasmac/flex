import { DataTable } from "./data-table-dnd";
import { ProductsT, columns } from "./colums";
// hook
import { getTable } from "@/hooks/dataTable";

export default async function Table() {
  const data: ProductsT[] = await getTable();

  return (
    <main className="pt-10 flex align-middle justify-center">
      <div className="w-[80%] block items-center">
        <DataTable columns={columns} dataT={data} />
      </div>
    </main>
  );
}
