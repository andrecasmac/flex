"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Badge from "@/components/badge";
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
import { PartnerShipClientTableContent } from "../../../../types/TableTypes";

export const columns: ColumnDef<PartnerShipClientTableContent>[] = [
  {
    accessorKey: "document_name",
    header: "Documents",
  },
  {
    accessorKey: "mandatory",
    header: () => <div className="flex w-[100%]"></div>,
    cell: ({ row }) => {
      //Variable where we store the status value
      const rowMandatory = row.original.mandatory

      return (
          <div className="flex justify-center">
              {/*Badge that reflects the status of the Partnership*/}
              {rowMandatory}
          </div>
      )
  }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      //Variable where we store the status value
      const rowStatus = row.original.status

      return (
          <div className="flex justify-center">
              {/*Badge that reflects the status of the Partnership*/}
              <Badge label={rowStatus} />
          </div>
      )
  }
  },
  {
    accessorKey: "validated",
    header: "Action",
    cell: ({ row }) => {
      //Variable where we store the status value
      const rowValidated = row.original.validated

      return (
          <div className="flex justify-center">
              {/*Badge that reflects the status of the Partnership*/}
              {rowValidated?<></> : <><Button>Validate</Button></>}
          </div>
      )
  }
  },
  {
    accessorKey: "file",
    header: "Download",
    cell: ({ row }) => {
      //Variable where we store the status value
      const rowStatus = row.original.status

      return (
          <div className="flex justify-center">
              {/*Badge that reflects the status of the Partnership*/}
              <Button>Upload</Button>
          </div>
      )
  }
  },
];
