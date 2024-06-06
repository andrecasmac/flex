"use client";
import { useState } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PartnerShipsClientContent, ModalViewDocumentsContent } from "../../../types/TableTypes";
import Badge from "@/components/badge";
import { ModalViewDocuments } from "@/app/examples/modal/modalViewDocuments";

export const columns: ColumnDef<PartnerShipsClientContent>[] = [
    {
        accessorKey: "name",
        header: () => <div className="flex w-[100%]">Partnerships</div>,
    }
    , {
        accessorKey: "empty",
        header: () => <div className="flex w-[100%] pr-40"></div>,
    },
    {
        accessorKey: "status",
        header: () => <div className="flex justify-end mr-6">Status</div>,
        cell: ({ row }) => {
            //Variable where we store the status value
            const rowStatus = row.original.status

            return (
                <div className="flex justify-end">
                    {/*Badge that reflects the status of the Partnership*/}
                    <Badge label={rowStatus} />
                </div>
            )
        }
    },
    {
        id: "actions",
        header: () => <div className="flex justify-end mr-3">Action</div>,
        cell: ({ row }) => {
            //Variables where we store the content of the row
            const rowID = row.original.id;
            const rowName = row.original.name;
            const rowStatus = row.original.status;
            const rowEDI = row.original.edi;
            const rowConnect = row.original.connection;
            
            return (
                <div className="flex justify-end">
                    <Link href={{pathname:"client/partnerships-onboarding", query:{
                        id:rowID,
                        name:rowName,
                        status:rowStatus,
                        edi:rowEDI,
                        connection: rowConnect,
                    }}}>
                        <Button>View</Button>
                    </Link>
                </div>
            );
        },
    },
];

export const columnsModal: ColumnDef<PartnerShipsClientContent>[] = [
    {
        accessorKey: "name",
        header: () => <div className="flex w-[100%]">Partnerships</div>,
    }
    , {
        accessorKey: "edi",
        header: () => <div className="flex w-[100%] justify-center"> EDI Version</div>,
        cell: ({ row }) => {
            //Variable where we store the EDI of the row
            const rowEDI = row.original.edi
            return (
                <div className="flex justify-center">
                    {rowEDI}
                </div>
            );
        }
    },
    {
        accessorKey: "connection",
        header: () => <div className="flex justify-center">Connection Type</div>,
        cell: ({ row }) => {
            //Variable where we store the connection of the row
            const rowConnect = row.original.connection
            return (
                <div className="flex justify-center">
                    {rowConnect}
                </div>
            );
        }
    },
    {
        id: "actions",
        header: () => <div className="flex justify-center"></div>,
        cell: ({ row }) => {
            //Variable where we store the content of the row
            const rowContent = row.original

            return (
                <div className="flex justify-end">
                    <ModalViewDocuments ButtonContent="View Documents" PartnerShipRowInfo={rowContent} />
                </div>
            );
        },
    },
];

export const columnsViewDocouments: ColumnDef<ModalViewDocumentsContent>[] = [
    {
        accessorKey: "name",
        header: () => <div className="flex w-[100%]">Name</div>,
    }
    , {
        accessorKey: "mandatory",
        header: () => <div className="flex w-[100%] justify-center"></div>,
        cell: ({ row }) => {
            const rowMandatory = row.original.mandatory
            return (
                <div className="flex justify-center">
                    {/*Badge that reflects if the document is mandatory*/}
                    <Badge label={rowMandatory} />
                </div>
            );
        }
    },
]

