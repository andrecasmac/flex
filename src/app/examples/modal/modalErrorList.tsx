"use client";
import { useState,useEffect } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { DataTable } from "../tables/table/data-table";
import { columnsErrorList, ErrorList } from "../tables/table/colums";
import { getTableError } from "@/hooks/dataTable";

interface ModalErrorProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  ButtonContent: string;
}

export function ModalErrorList({
  isOpen,
  setIsOpen,
  ButtonContent,
}: ModalErrorProps) {

  /*Variable where we store the error data*/
  const [data, setData]= useState<ErrorList[]>([]);

/* Async function in order to fetch the data from the hook*/
  useEffect(()=>{
    const fetchErrorData = async () => {
        const response: ErrorList[]= await getTableError();
        console.log(response)
        setData(response);
    };
    fetchErrorData();
  },[]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{ButtonContent} </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[85%] sm:max-h-[100%]">
        <div className="flex items-center justify-center sm:max-w-[90%] pt-10 pl-20">
          {/* This is the table component that receives that columns structure in 'columns' and the data in 'data'*/}
          <DataTable columns={columnsErrorList} data={data} />
        </div>
        <DialogFooter className="flex items-center justify-center">
          <DialogClose asChild>
            <Button size="sm" className="h-10 w-[20%]">
              Cancel
            </Button>
          </DialogClose>
          <Button size="sm" className="h-10 w-[20%]">
            Try Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ModalErrorList;