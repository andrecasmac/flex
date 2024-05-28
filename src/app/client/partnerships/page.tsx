'use client'
import { useState } from "react";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/app/examples/tables/table/data-table";
import { columns } from "@/app/client/partnerships/columns"
import { ModalAddPartnerships } from "@/app/examples/modal/modalAddPartnership";
const data = [
    {
        id: "1",
        name: "Amazon",
        status: "Complete"
    },
    {
        id: "2",
        name: "Amazon",
        status: "In Process"
    },

]

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <PageTitle title="Partnerships" />
            <div className="flex w-[80%] justify-end pt-5">
                <ModalAddPartnerships isOpen={isOpen} setIsOpen={setIsOpen} ButtonContent="Add Partenrship" />  
            </div>
            <div className="flex w-[75%] justify-center items-center w-full pt-5">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}