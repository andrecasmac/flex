"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil,MinusCircle } from "lucide-react";
import { SegmentTemplatesContent } from "../../../../../types/TableTypes";

export type ProductsT = {
  id: string;
  name: string;
  description: string;
  price: string;
};

export const columns: ColumnDef<ProductsT>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const produtct = row.original;

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
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
/* This is the type for the columns of the Error Table*/
export type ErrorList = {
  name: string;
  description: string;
  id: string;
};

/* This is where we declare the key and the laberl for the columns of the Error Table*/
export const columnsErrorList: ColumnDef<ErrorList>[] = [
  {
    accessorKey: "name",/*Key*/
    header: "Errors",/*Label*/
  },
  {
    accessorKey: "description",/*Key*/
    header: "Error Description",/*Label*/
  },
];
export const columnsSegmentTemplate: ColumnDef<SegmentTemplatesContent>[] = [
  {
    accessorKey: "id",
    header: "Segment ID",
    cell: ({ row }) => {
      const segmentID:string =(row.getValue("id"))
      return <div className="text-center font-medium">{segmentID}</div>
    },
  },
  {
    accessorKey: "name",
    header: "Segment name",
    cell: ({ row }) => {
      const segmentName:string = (row.getValue("name"))
      return <div className="text-center font-medium">{segmentName}</div>
    },
  },
  {
    accessorKey: "nElements",
    header: "N. Elements",
    cell: ({ row }) => {
      const nElements = parseInt(row.getValue("nElements"))
      return <div className="text-center font-medium">{nElements}</div>
    },
  },
  {
    accessorKey: "usage",
    header: "Usage",
    cell: ({ row }) => {
      const usage = parseInt(row.getValue("usage"))
      return <div className="text-center font-medium">{usage}</div>
    },
  },
  {
    accessorKey: "maxUse",
    header: "Max Use",
    cell: ({ row }) => {
      const maxUse = parseInt(row.getValue("maxUse"))
      return <div className="text-center font-medium">{maxUse}</div>
    },
  },
  {
    id: "edit",
    header: "Edit",
    cell: ({ row }) => {

      return (
        <div className="flex justify-center">
          <Button size="icon" variant={"ghost"}><Pencil className="h-7 w-7 text-black dark:text-white " /></Button>
        </div>
      );
    },
  },
  {
    id: "delete",
    header: "Delete",
    cell: ({ row }) => {

      return (
        <div className="flex justify-center">
          <Button size="icon" variant={"ghost"}><MinusCircle className="h-7 w-7 text-slate-200 dark:text-slate-900 fill-red-500" /></Button>
        </div>
      );
    },
  },
];
