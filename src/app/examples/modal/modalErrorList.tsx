"use client";
import { useContext, useState, useEffect } from "react";
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
import ErrorContext from "@/app/context/errorContext";
import {getPartnershipById} from "@/da/Partnerships/partnerships-da";

interface ModalErrorProps {
  isOpen?: boolean;
  setIsOpen: (open: boolean) => void;
  ButtonContent: string;
  partnershipId: string;
  ediType: string;
}

export function ModalErrorList({
  isOpen,
  setIsOpen,
  ButtonContent,
  partnershipId,
  ediType
}: ModalErrorProps) {

  /*Variable where we store the error data*/

  let [ errorList, setErrorList ] = useState(null)

  const {isErrorsOpen, setErrorsOpen}= useContext(ErrorContext)

	useEffect(() => {

		getPartnershipById(partnershipId)
		.then((value) => {
			const partnershipDocs = value.uploaded_documents;
			
			partnershipDocs.forEach((doc: any) => {
				if (doc.type == ediType) {
					setErrorList(doc.errors);
				}

			});

		});

	}, [isErrorsOpen])

  function handleButtonCancel(){
    setErrorsOpen(false);
  }
  return (
    <Dialog open={isErrorsOpen} onOpenChange={setErrorsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">{ButtonContent} </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[85%] sm:max-h-[100%] flex flex-col items-center">
        <div className="flex items-center sm:max-w-[90%] pt-10">
          {/* This is the table component that receives that columns structure in 'columns' and the data in 'data'*/}
			{errorList && <DataTable columns={columnsErrorList} data={errorList} />}
        </div>
        <DialogFooter className="sm:max-w-[100%]">
          <DialogClose asChild>
            <Button size="lg" className="h-10 w-[100%]" onClick={handleButtonCancel}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ModalErrorList;
