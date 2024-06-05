"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Toggle from "@/components/ui/toggle";
import React from "react";
import { FaGear } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import Link from "next/link";

export type ProductsT = {
  id: string;
  name: string;
  delimeter: string;
  ediversions: string;
  eol: string;
  connectiontype: string;
  hidden: boolean;
};

export const columns: ColumnDef<ProductsT>[] = [
  {
    accessorKey: "name",
    header: "Partner",
  },
  {
    accessorKey: "delimeter",
    header: "Delimeter",
  },
  {
    accessorKey: "ediversions",
    header: "EDI Versions",
  },
  {
    accessorKey: "eol",
    header: "EOL",
  },
  {
    accessorKey: "connectiontype",
    header: "Connection Type",
  },
  {
    accessorKey: "hidden",
    header: () => {
      return (
        <div className="flex justify-center">
          <p>Hidden</p>
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
          <Toggle actionToggle={row.original.hidden} onChange={handleToggleCell} />
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
      const produtct = row.original;
      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <HiDotsVertical className="h-8 w-8 text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(String(produtct.id))
                }
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={"admin/document-list"}>
                <DropdownMenuItem>View customer</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
