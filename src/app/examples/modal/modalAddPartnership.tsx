"use client";
import { useContext } from "react";
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
import { columnsModal } from "@/app/client/columns";
import ModalContext from "@/app/context/modalContext";
import { PartnerShipsClientContent } from "../../../../types/TableTypes";

interface ModalAddPartnerships {
  ButtonContent: string;
  data: PartnerShipsClientContent[];
}

export function ModalAddPartnerships({
  ButtonContent,
  data
}: ModalAddPartnerships) {
  //Variable that is shared with Modal View Documents
  const { isThisOpen, setisThisOpen } = useContext(ModalContext)
  return (
    <Dialog open={isThisOpen} onOpenChange={setisThisOpen}>
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
          {/*This is where we display the Table with the Partnerships*/}
          <DataTable columns={columnsModal} data={data} />
        </div>

        <DialogFooter className="felx items-center justify-center">
          <DialogClose asChild>
            {/*Button that closes this Modal*/}
            <Button size="lg" className="h-10">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
