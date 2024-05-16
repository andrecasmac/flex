import { DataTable } from "./data-table";
import { columns } from "./colums";

// hook
import { getTable } from "@/hooks/dataTable";
import { PageTitle } from "@/components/page-title";

export default async function Table() {
  const data = await getTable();

  return (
    <>
      <PageTitle title="Tabla de datos" />
      <div className="w-[80%]">
        <p className=" text-center opacity-70 pb-1">
          NOTA: La tabla esta llenada con un api de ejemplo
        </p>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
