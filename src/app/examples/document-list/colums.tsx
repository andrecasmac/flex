"use client";

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

export type ProductsT = {
  id: string;
  name: string;
  toggle: boolean;
};

export const columns: ColumnDef<ProductsT>[] = [
  {
    accessorKey: "name",
    header: "Documents",
  },
  {
    id: "configure",
    header: () => {
      return (
        <div className="flex justify-center">
          <p>Configure</p>
        </div>
      );
    },
    cell() {
      return (
        <div className="flex justify-center">
          <Button className="w-auto h-auto p-0 border-0 bg-inherit text-primary hover:bg-inherit hover:text-primary">
            <FaGear className="w-8 h-8"/>
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "toggle",
    header: () => {
      return (
        <div className="flex justify-center">
          <p>Mandatory</p>
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
          <Toggle actionToggle={row.original.toggle} onChange={handleToggleCell}/>
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
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
