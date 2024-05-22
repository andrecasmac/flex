"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { IComboboxContent } from "../../../types/ComboboxContent";

// Interface to define the props structure
interface Response {
  content: IComboboxContent[];
  handleSelect: Function;
  selected?: IComboboxContent | null;
}

export function ComboboxDropdown(props: Response) {
  const { content, handleSelect, selected } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex w-full justify-between mt-2 text-slate-400 border-darkBlueMarine"
        >
          {selected ? (
            <>
              {selected.label} <ChevronDown color="#051f42" />
            </>
          ) : (
            <>
              Search here <ChevronDown color="#051f42" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 border-darkBlueMarine" align="start">
        <Command>
          <CommandInput placeholder="Search segment" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {/* The options are mapped*/}
              {content.map((option) => (
                <CommandItem
                  // Key has to be unique for mapping components
                  key={option.id}
                  // Value is what is saved when the user clicks on an option
                  value={option.label}
                  onSelect={(Value: string) => {
                    // Since we are dealing with an array, we need to find the selected option
                    // If not found, null is assigned
                    handleSelect(
                      content.find((priority) => priority.label === Value) ||
                        null
                    );
                    // We close the dropdown after selecting one
                    setOpen(false);
                  }}
                >
                  {/* The label is the text that appears in the options */}
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
