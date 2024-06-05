"use client";
import { useRouter } from "next/navigation";
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
import Link from "next/link";

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
export interface ErrorList {
  name: string | null;
  description: string | null;
  id: string;
};

/* This is where we declare the key and the label for the columns of the Error Table*/
export const columnsErrorList: ColumnDef<ErrorList>[] = [
  {
    accessorKey: "name",/*Key*/
    header: ()=> <div className="text-start">Error</div>,/*Label*/

  },
  {
    accessorKey: "description",/*Key*/
    header:()=> <div className="text-start">Error Description</div>,/*Label*/
  },
];
/* This is where we declare the key and the label for the columns of the Segment Templates Table*/
export const columnsSegmentTemplate: ColumnDef<SegmentTemplatesContent>[] = [
  {
    accessorKey: "id",/*Key*/
    header: "Segment ID",/*Label*/
    cell: ({ row }) => {
      const segmentID:string =(row.getValue("id"))/*Variable that stores the value of id*/
      return <div className="text-center font-medium">{segmentID}</div>
    },
  },
  {
    accessorKey: "name",/*Key*/
    header: "Segment name",/*Label*/
    cell: ({ row }) => {
      const segmentName:string = (row.getValue("name"))/*Variable that stores the value of name*/
      return <div className="text-center font-medium">{segmentName}</div>
    },
  },
  {
    accessorKey: "nElements",/*Key*/
    header: "N. Elements",/*Label*/
    cell: ({ row }) => {
      const nElements:number = parseInt(row.getValue("nElements"))/*Variable that stores the value of nElements*/
      return <div className="text-center font-medium">{nElements}</div>
    },
  },
  {
    accessorKey: "usage",/*Key*/
    header: "Usage",/*Label*/
    cell: ({ row }) => {
      const usage:number = parseInt(row.getValue("usage"))/*Variable that stores the value of usage*/
      return <div className="text-center font-medium">{usage}</div>
    },
  },
  {
    accessorKey: "maxUse",/*Key*/
    header: "Max Use",/*Label*/
    cell: ({ row }) => {
      const maxUse:number = parseInt(row.getValue("maxUse"))/*Variable that stores the value of maxUse*/
      return <div className="text-center font-medium">{maxUse}</div>
    },
  },
  {
    id: "edit",/*Key*/
    header: "Edit",/*Label*/
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Link href={"./segment-edit"}>
          <Button size="icon" variant={"ghost"}><Pencil className="h-7 w-7 text-black dark:text-white " /></Button>{/*Button for the edit function*/}
          </Link>
        </div>
      );
    },
  },
  {
    id: "delete",/*Key*/
    header: "Delete",/*Label*/
    cell: ({ row }) => {

      return (
        <div className="flex justify-center">
          <Button size="icon" variant={"ghost"}><MinusCircle className="h-7 w-7 text-slate-200 dark:text-slate-900 fill-red-500" /></Button>{/*Button for the delete function*/}
        </div>
      );
    },
  },
];
