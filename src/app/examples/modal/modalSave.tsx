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

import { CheckCircleIcon, XCircleIcon } from "lucide-react";

interface ModalSaveProps {
  setIsOpen: (open: boolean) => void | undefined;
  ButtonContent: string;
  onSave: () => void; // Added onSave prop
  showSuccess?: boolean; // Added prop for success state
  showError?: boolean; // Added prop for
  ErrorData?: Error | null; // added error data
}

export function ModalSave({
  setIsOpen,
  ButtonContent,
  onSave,
  showSuccess,
  showError,
  ErrorData,
}: ModalSaveProps) {
  return (
    <Dialog onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={onSave}>
        <Button variant="default">{ButtonContent}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        {showSuccess && (
          <div className="flex items-center flex-col w-full justify-center ">
            <DialogHeader className="w-full text-white sm:text-center font-semibold mb-8">
              GUARDADO EXITOSAMENTE
            </DialogHeader>
            <CheckCircleIcon className="w-32 h-32 text-green-400 dark:text-green-600" />
          </div>
        )}
        {showError && (
          <div className="flex items-center flex-col w-full justify-center ">
            <DialogHeader className="w-full text-white sm:text-center font-semibold mb-4">
              ERROR AL GUARDAR
            </DialogHeader>
            <XCircleIcon className="w-32 h-32 text-red-400 dark:text-red-600" />
            <div className="pt-5">Message: {ErrorData?.message}</div>
          </div>
        )}
        <DialogFooter className="flex items-center justify-center">
          <DialogClose asChild>
            <Button size="sm" className="h-8 w-[40%]">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
