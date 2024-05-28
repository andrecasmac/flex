"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge as BadgeIcon, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PartnerShipsClienContent } from "../../../../types/TableTypes";
import Badge from "@/components/badge";

export const columns: ColumnDef<PartnerShipsClienContent>[] = [
  {
    accessorKey: "name",
    header:()=> <div className="flex w-[100%]">Partnerships</div>,
  }
  ,{
    accessorKey: "empty",
    header:()=> <div className="flex w-[100%] pr-40"></div>,
  },
  {
    accessorKey: "status",
    header: ()=> <div className="flex justify-end mr-6">Status</div>,
    cell:({row})=>{
        //Variable where we store the status value
        const rowStatus=row.original.status

        return(
            <div className="flex justify-end">
            <Badge label={rowStatus}/>
            </div>
        )
    }
  },
  {
    id: "actions",
    header: ()=> <div className="flex justify-end mr-3">Action</div>,
    cell: ({ row }) => {
      const produtct = row.original;

      return (
        <div className="flex justify-end">
            <Button>View</Button>
        </div>
      );
    },
  },
];