import { DataTable } from "./data-table-dnd";
import { ProductsT, columns } from "./colums";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { RowDragHandleCell } from "./colums";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

// hook
import { getTable } from "@/hooks/dataTable";
import { ColumnDef } from "@tanstack/react-table";

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
