import { DataTable } from "./data-table";
import { columns } from "./colums";

import { PageTitle } from "@/components/page-title";
import { promises as fs } from 'fs';

export default async function Table() {
  // Data should be fetched from DB instead, this is just to map data
  const file = await fs.readFile(process.cwd() + '/src/app/examples/tables/example-data.json', 'utf8');
  const data = JSON.parse(file);

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
