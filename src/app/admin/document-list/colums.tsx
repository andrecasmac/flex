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
import { EDI_Document } from "@/types/DbTypes";
import { ModalDeleteDocument } from "@/app/examples/modal/modalDeleteDocument";
import Modals from "@/app/examples/modal";

export const columns: ColumnDef<EDI_Document>[] = [
  {
    accessorKey: "type",
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
    cell({ row }) {
      return (
        <div className="flex justify-center">
          <Link
            href={{
              pathname: "/admin/document-configuration",
              query: {
                EDI_Id: row.original.id,
                // name: row.original.type
              },
            }}
          >
            <Button
              className="w-auto h-auto p-0 border-0 bg-inherit text-primary hover:bg-inherit hover:text-primary"
              onClick={() => {
                console.log(row.original.id);
              }}
            >
              <FaGear className="w-8 h-8" />
            </Button>
          </Link>
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
      };

      // Allows to visualize the Toggle of each row
      return (
        <div className="flex justify-center">
          <Toggle
            actionToggle={row.original.mandatory}
            onChange={handleToggleCell}
          />
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
      const edi_document = row.original;

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
              <Link
                href={{
                  pathname: "/admin/document-configuration",
                  query: {
                    id: edi_document.id,
                    name: edi_document.type,
                  },
                }}
              >
                <DropdownMenuItem>View</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Modals
                modalDeleteDocument={true}
                selectedItemName={edi_document.type}
                selectedItemId={edi_document.id}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
