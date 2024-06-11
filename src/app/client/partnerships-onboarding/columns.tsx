"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Badge from "@/components/badge";
import React from "react";
import ModalContextProvider from "@/app/context/modalContextProvider";
import {ModalUpload} from "@/app/examples/modal/modalUpload"
import { PartnerShipClientTableContent } from "../../../types/TableTypes";
import Modals from "@/app/examples/modal";
import ErrorContextProvider from "@/app/context/errorContextProvider";

export const columns: ColumnDef<PartnerShipClientTableContent>[] = [
  {
    accessorKey: "document_name",
    header: "Documents",
    cell: ({ row }) => {
      return(
        <div className="flex">
          {row.original.type}
        </div>
      )
    }
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
      const rowValidated = row.original.status;
      var validated = false;
      rowValidated === "Validated" ? validated = true : validated = false

      return (
          <div className="flex justify-center">
            {!validated ? <ModalContextProvider>
              <ErrorContextProvider>
                <Modals modalUpload={true} />
                <Modals modalErrorList={true} />
                <Modals modalSuccess={true}/>
              </ErrorContextProvider>
            </ModalContextProvider> : (<></>)}
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
              <Button>Download</Button>
          </div>
      )
  }
  },
];
