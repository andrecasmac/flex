"use client"
import * as React from 'react';
import Toggle from "@/components/ui/toggle"

export default function Page() {
    const [Enabled, setEnabled] = React.useState(false);

    const toggleSwitch = (checked: boolean) =>{
        setEnabled(checked);
    };

    return (
        <div className="flex flex-col items-center justify-between pt-20">
            <p className="my-12">Toggle Example</p>
            <Toggle actionToggle={Enabled} onChange={toggleSwitch}/>
            <p>{Enabled ? 'Toggle Enabled' : 'Toggle Disabled'}</p>
        </div>
    )
}