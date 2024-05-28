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

interface ModalAddPartnerships {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  ButtonContent: string;
}

export function ModalAddPartnerships({
  isOpen,
  setIsOpen,
  ButtonContent,
}: ModalAddPartnerships) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{ButtonContent} <Plus strokeWidth={1.5} /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <div className="flex items-center justify-center pt-10">
          Table
        </div>

        <DialogFooter className="felx items-center justify-center">
          <DialogClose asChild>
            <Button size="sm" className="h-8 w-[40%]">
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
