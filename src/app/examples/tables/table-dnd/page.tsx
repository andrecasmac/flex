import { DataTable } from "./data-table-dnd";
import { ProductsT, columns } from "./colums";
import { PageTitle } from "@/components/page-title";

// hook
import { getTable } from "@/hooks/dataTable";

export default async function Table() {
  const data: ProductsT[] = await getTable();

  return (
    <>
      <PageTitle title="Tabla de datos DnD" />

      <div className="w-[80%]">
        <p className=" text-center opacity-70 pb-1">
          NOTA: La tabla esta llenada con un api de ejemplo
        </p>
        <DataTable columns={columns} dataT={data} />
      </div>
    </>
  );
}
