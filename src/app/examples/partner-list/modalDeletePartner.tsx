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

interface ModalDeletePartnerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  ButtonContent: string;
}

export function ModalDeletePartner({
    isOpen,
    setIsOpen,
    ButtonContent,
  }: ModalDeletePartnerProps) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="rounded-xl">{ButtonContent} </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="text-white sm:text-center font-semibold">
              CONFIRM DELETE
            </DialogTitle>
          </DialogHeader>

          <div className="px-10 pt-10">
            <div className="flex items-center justify-center p-4 mx-7 border border-primary rounded-lg">
              <p className="text-primary text-2xl font-bold">Partner 1</p>
            </div>
  
            <DialogFooter className="pt-10">
              <DialogClose asChild>
                <Button size="sm" type="button" className="h-8 w-[40%]">
                  Cancel
                </Button>
              </DialogClose>
              {}
              <Button size="sm" type="submit" className="h-8 w-[40%]">
                Delete
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    );
  }