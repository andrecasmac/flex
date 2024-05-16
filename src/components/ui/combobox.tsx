"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { List } from "postcss/lib/list"

import { IComboboxContent } from "../../../types/ComboboxContent"

interface Response{
  responses: IComboboxContent[];
  handleState: Function
}

export function ComboboxDropdown(props: Response ) {
  const {responses, handleState} = props;

  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<IComboboxContent | null>(
    null
  )
  
  return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[300px] justify-between text-slate-400 border-darkBlueMarine">
            {selectedStatus ? <>{selectedStatus.label}</> : <>Search here <ChevronDown color="#051f42" /></>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 border-darkBlueMarine" align="start">
          <Command>
            <CommandInput placeholder="Search segment" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {responses.map((response) => (
                  <CommandItem
                    key={response.value}
                    value={response.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        responses.find((priority) => priority.value === value) ||
                          null
                      )
                      handleState(responses.find((priority) => priority.value === value) ||
                      null)
                      setOpen(false)
                    }}
                  >
                    
                    {response.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
  )
}
