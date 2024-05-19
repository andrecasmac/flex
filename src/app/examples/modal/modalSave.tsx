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

import { CheckCircleIcon } from "lucide-react";

interface ModalSaveProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  ButtonContent: string;
  onSave: () => void; // Added onSave prop
}

export function ModalSave({
  isOpen,
  setIsOpen,
  ButtonContent,
  onSave,
}: ModalSaveProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{ButtonContent} </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <div className="flex items-center justify-center p-10">
          <CheckCircleIcon className="w-32 h-32 text-green-200" />
        </div>

        <DialogFooter className="felx items-center justify-center">
          <DialogClose asChild>
            <Button size="sm" className="h-8 w-[40%]" onClick={onSave}>
              Save
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
