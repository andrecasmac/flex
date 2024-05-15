
import * as React from 'react';
import { Switch, Thumb } from '@radix-ui/react-switch';


interface toggleSwitchprop {
    checked: boolean;
    onChange: (checked: boolean) => void;
  }

  
const Toggle: React.FC<toggleSwitchprop> = ({ checked, onChange }) => {
    return(
        <div>
            <Switch checked={checked} onCheckedChange={(newChecked) => onChange(newChecked)} className="flex items-center w-12 h-6 my-2 rounded-full border border-primary bg-white py-[1px] px-[2px] data-[state=checked]:bg-primary">
                <Thumb className="w-5 h-5 rounded-full bg-primary translate-x-[2px] duration-150 data-[state=checked]:translate-x-full data-[state=checked]:bg-white"/>
            </Switch>
        </div>
    );
};


export default Toggle;