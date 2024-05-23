
import React from "react";
import { Switch, Thumb } from '@radix-ui/react-switch';

// Define the props for the Toggle component
interface toggleSwitchprop {
    actionToggle: boolean;
    onChange: (checked: boolean) => void;
}

// Function component to for the Toggle
// This will allow me to use React.useState in the Table Cell
const Toggle: React.FC<toggleSwitchprop> = ({ actionToggle, onChange }) => {
    // Use state to manage the switch/toggle state
    const [switchToggle, setSwitchToggle] = React.useState(actionToggle);

    // Handle the toggle action
    const handleToggle = (checked: boolean) => {
        setSwitchToggle(checked); // Update local state
        onChange(checked); // Incase for Callback function
    };

    return(
        <Switch 
            checked={switchToggle} // Set the checked state of the toggle
            onCheckedChange={handleToggle} // Handle state change
            className="flex items-center w-12 h-6  rounded-full border border-primary bg-white px-[2.5px] data-[state=checked]:bg-primary"
        >
            <Thumb className="w-[19px] h-[19px] rounded-full bg-primary duration-150 data-[state=checked]:ms-[22px] data-[state=checked]:bg-white"/>
        </Switch>
    );
};


export default Toggle;