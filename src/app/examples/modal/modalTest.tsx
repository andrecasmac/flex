"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ModalTest() {
  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle className="text-white sm:text-center font-semibold">
          PARTNER
        </DialogTitle>
      </DialogHeader>

      <div className="flex items-center justify-center">si</div>

      <DialogFooter>
        <DialogClose asChild>
          <Button size="sm" className="h-8 w-[40%]">
            Cancel
          </Button>
        </DialogClose>

        <Button size="sm" type="submit" className="h-8 w-[40%]">
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
