'use client'
import { ComboboxDropdown } from "@/components/ui/combobox";
import { IComboboxContent } from "../../../../types/ComboboxContent";
import * as React from "react"

export default function Page() {
    // We can save the state of the combobox if the object has an id and label
    const [selectedStatus, setSelectedStatus] = React.useState<IComboboxContent | null>(null)

    // This function is passed to the component to change the state in this page
    function changeStatus(status : IComboboxContent): void {
        setSelectedStatus(status)
    }

    // These are example options, both are string, so we can save ids, or function names in the id field
    const options: IComboboxContent[] = [
        {
            id: "12345",
            label: "Backlog",
        },
        {
            id: "67890",
            label: "Todo",
        },
        {
            id: "inProgress",
            label: "In Progress",
        },
        {
            id: "done",
            label: "Done",
        },
        {
            id: "cancelled",
            label: "Cancelled",
        },
        {
            id: "test",
            label: "Test",
        },
        {
            id: "incredible",
            label: "Incredible",
        },
    ]

    return (
        <main>
            {/* We need to pass the content, the handle function, and */}
            <ComboboxDropdown  content={options} handleSelect={changeStatus} selected={selectedStatus}/>
            <div>
                Selected id: {selectedStatus ? <>{selectedStatus.id}</> : <>Has not selected</>}
                <br />
                Selected label: {selectedStatus ? <>{selectedStatus.label}</> : <>Has not selected</>}
            </div>
        </main>
    )
}