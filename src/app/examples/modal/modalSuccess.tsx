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

import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import ErrorContext from "@/app/context/errorContext";


interface ModalSuccess {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  ButtonContent: string;
}

export function ModalSuccess({
  isOpen,
  setIsOpen,
  ButtonContent,
}: ModalSuccess) {

  const {isSuccessfulOpen, setIsSuccessfulOpen}= useContext(ErrorContext)
  
  return (
    <Dialog open={isSuccessfulOpen} onOpenChange={setIsSuccessfulOpen}>
      <DialogTrigger asChild>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <div className="flex flex-col items-center justify-center pt-10">
          <div className="flex flex-row">
            <CircleCheck size={120} color="#0798A5" strokeWidth={1.25} />
          </div>
          <div className="flex flex-row pt-10">
            The file was succesfully validated
          </div>
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
