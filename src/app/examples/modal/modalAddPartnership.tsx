"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../tables/table/data-table";
import { columnsModal } from "@/app/client/partnerships/columns";
import { PartnerShipsClientContent } from "../../../../types/TableTypes";

interface ModalAddPartnerships {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  ButtonContent: string;
  data:PartnerShipsClientContent[];
  handleIsOpen:()=>void;
}

export function ModalAddPartnerships({
  isOpen,
  setIsOpen,
  ButtonContent,
  data,
  handleIsOpen,
}: ModalAddPartnerships) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">{ButtonContent} <Plus strokeWidth={1.5} /></Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col sm:items-center sm:justify-center sm:max-w-[75%]">
        <DialogHeader className="flex sm:w-full sm:justify-center sm:items-center sm:text-center sm:text-white font-semibold">
          <DialogTitle className="">
            Add Partnership
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center pt-5 w-[85%]">
          <DataTable columns={columnsModal} data={data} />
        </div>

        <DialogFooter className="felx items-center justify-center">
          <DialogClose asChild>
            <Button size="lg" className="h-10">
              Cancel
            </Button>
          </DialogClose>

          {/* <Button size="sm" type="submit" className="h-8 w-[40%]">
            Save
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
