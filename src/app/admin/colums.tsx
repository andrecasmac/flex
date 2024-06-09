"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Toggle from "@/components/ui/toggle";
import { HiDotsVertical } from "react-icons/hi";
import { Partner } from "@/types/DbTypes";
import ModalsPartners from "@/app/examples/modal/index";

export const columns: ColumnDef<Partner>[] = [
  {
    accessorKey: "name",
    header: "Partner",
  },
  {
    accessorKey: "delimiters",
    header: "Delimeter",
  },
  {
    accessorKey: "edi_version",
    header: "EDI Versions",
  },
  {
    accessorKey: "EOL",
    header: "EOL",
  },
  {
    accessorKey: "type_of_connection",
    header: "Connection Type",
  },
  {
    accessorKey: "hidden",
    header: () => {
      return (
        <div className="flex justify-center">
          <p>Visible</p>
        </div>
      );
    },

    // The function for the state of the Toggle selected
    cell: ({ row }) => {

      // Define the handler for the toggle action selected
      const handleToggleCell = (checked: boolean) => {
        // For now, it only works on the console log of the page
        console.log(`Row ${row.original.id} has changed to: ${checked}`);
      }

      // Allows to visualize the Toggle of each row
      return (
        <div className="flex justify-center">
          <Toggle actionToggle={row.original.hidden} onChange={handleToggleCell}/>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => {
      return (
        <div className="flex justify-center">
          <p>Actions</p>
        </div>
      );
    },
    cell: ({ row }) => {
      const partner = row.original;

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <HiDotsVertical className="h-8 w-8 text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-primary" align="start">
            <DropdownMenuSeparator />
              <Link href={{pathname:"admin/document-list", query:{
                id:partner.id
              }}}>
                <DropdownMenuItem>View</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <ModalsPartners modalDeletePartner={true} selectedItemName={partner.name} selectedItemId={partner.id} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
