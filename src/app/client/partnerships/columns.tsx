"use client";
import { useState } from "react";
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
import { PartnerShipsClientContent,ModalViewDocumentsContent } from "../../../../types/TableTypes";
import Badge from "@/components/badge";
import { ModalViewDocuments } from "@/app/examples/modal/modalViewDocuments";

export const columns: ColumnDef<PartnerShipsClientContent>[] = [
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
      const rowContent = row.original;
      const [isModalOpen,setIsModalOpen]=useState(false)
      return (
        <div className="flex justify-end">
            <ModalViewDocuments isOpen={isModalOpen} setIsOpen={setIsModalOpen} ButtonContent="View" PartnerShipRowInfo={rowContent}/>
        </div>
      );    
    },
  },
];

export const columnsModal: ColumnDef<PartnerShipsClientContent>[] = [
    {
      accessorKey: "name",
      header:()=> <div className="flex w-[100%]">Partnerships</div>,
    }
    ,{
      accessorKey: "edi",
      header:()=> <div className="flex w-[100%] justify-center"> EDI Version</div>,
      cell:({row})=>{
        const rowEDI=row.original.edi
        return (
            <div className="flex justify-center">
             {rowEDI}   
            </div>
          );
      }
    },
    {
      accessorKey: "connection",
      header: ()=> <div className="flex justify-center">Connection Type</div>,
      cell:({row})=>{
        const rowConnect=row.original.connection
        return (
            <div className="flex justify-center">
             {rowConnect}   
            </div>
          );
      }
    },
    {
      id: "actions",
      header: ()=> <div className="flex justify-center"></div>,
      cell: ({ row }) => {
        const rowContent=row.original
        const [isModalOpen,setIsModalOpen]=useState(false)
        return (
          <div className="flex justify-end">
            <ModalViewDocuments isOpen={isModalOpen} setIsOpen={setIsModalOpen} ButtonContent="View Documents" PartnerShipRowInfo={rowContent} />
          </div>
        );
      },
    },
  ];

  export const columnsViewDocouments:ColumnDef<ModalViewDocumentsContent>[]=[
    {
        accessorKey: "name",
        header:()=> <div className="flex w-[100%]">Name</div>,
      }
      ,{
        accessorKey: "mandatory",
        header:()=> <div className="flex w-[100%] justify-center"></div>,
        cell:({row})=>{
          const rowMandatory=row.original.mandatory
          return (
              <div className="flex justify-center">
               <Badge label={rowMandatory} />  
              </div>
            );
        }
      },
  ]
  
  