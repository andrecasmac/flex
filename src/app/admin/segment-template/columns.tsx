import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil,MinusCircle } from "lucide-react";
import { Segment } from "@/types/DbTypes";
import Link from "next/link";

export const columnsSegmentTemplate: ColumnDef<Segment>[] = [
    {
      accessorKey: "name",/*Key*/
      header: "Segment name",/*Label*/
      cell: ({ row }) => {
        const segmentName:string = (row.getValue("name"))/*Variable that stores the value of name*/
        return <div className="text-center font-medium">{segmentName}</div>
      },
    },
    {
      accessorKey: "max",/*Key*/
      header: "Max Use",/*Label*/
      cell: ({ row }) => {
        const maxUse:number = parseInt(row.getValue("max"))/*Variable that stores the value of maxUse*/
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
  