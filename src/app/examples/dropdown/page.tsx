'use client'
import { ComboboxDropdown } from "@/components/ui/combobox";
import { IComboboxContent } from "../../../../types/ComboboxContent";
import * as React from "react"

export default function Page() {

    const [selectedStatus, setSelectedStatus] = React.useState<IComboboxContent | null>(
        null
    )

    function changeStatus(status: IComboboxContent): void {
        setSelectedStatus(status)
    }


    const statuses: IComboboxContent[] = [
        {
            value: "backlog",
            label: "Backlog",
        },
        {
            value: "todo",
            label: "Todo",
        },
        {
            value: "in progress",
            label: "In Progress",
        },
        {
            value: "done",
            label: "Done",
        },
        {
            value: "canceled",
            label: "Canceled",
        },
        {
            value: "test",
            label: "Test",
        },
        {
            value: "increible",
            label: "Increible",
        },

    ]
    return (
        <main>
            <ComboboxDropdown responses={statuses} handleState={changeStatus} />
            <div>
                {selectedStatus ? <span>{selectedStatus.label}</span> : null}
            </div>
        </main>
    )
}