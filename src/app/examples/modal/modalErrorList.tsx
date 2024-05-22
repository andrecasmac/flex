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

import errors from "./modalErrorData.json"

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
  const [data, setData]= useState<ErrorList[]>(errors);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{ButtonContent} </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[85%] sm:max-h-[100%] flex flex-col items-center">
        <div className="flex items-center sm:max-w-[90%] pt-10">
          {/* This is the table component that receives that columns structure in 'columns' and the data in 'data'*/}
          <DataTable columns={columnsErrorList} data={data} />
        </div>
        <DialogFooter className="sm:max-w-[100%]">
          <DialogClose asChild>
            <Button size="lg" className="h-10 w-[100%]">
              Cancel
            </Button>
          </DialogClose>
          <Button size="lg" className="h-10 w-[100%]">
            Try Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ModalErrorList;