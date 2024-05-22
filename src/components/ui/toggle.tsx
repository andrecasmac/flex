
import * as React from 'react';
import { Switch, Thumb } from '@radix-ui/react-switch';


interface toggleSwitchprop {
    checked: boolean;
    onChange: (checked: boolean) => void;
  }

  
const Toggle: React.FC<toggleSwitchprop> = ({ checked, onChange }) => {
    return(
        <div>
            <Switch checked={checked} onCheckedChange={(newChecked) => onChange(newChecked)} className="flex items-center w-12 h-6 my-2 pt-[2px] rounded-full border border-primary bg-white py-[1px] px-[2px] data-[state=checked]:bg-primary">
                <Thumb className="w-[19px] h-[19px] ms-[0.5px] rounded-full bg-primary duration-150 data-[state=checked]:ms-[22px] data-[state=checked]:bg-white"/>
            </Switch>
        </div>
    );
};


export default Toggle;