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

import { Button } from "@/components/ui/button";

interface ModalTestProps {
  isOpen: boolean | undefined;
  setIsOpen: (open: boolean) => void;
  ButtonContent: string;
}

export function ModalTest({
  isOpen,
  setIsOpen,
  ButtonContent,
}: ModalTestProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{ButtonContent} </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <div className="flex items-center justify-center pt-10"> ... </div>

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
