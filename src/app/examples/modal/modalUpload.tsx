"use client";

import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogTrigger,
    Dialog,
    DialogPortal,
} from "@/components/ui/dialog";

import React from "react";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/ui/dropzone";


interface ModalUploadProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    ButtonContent: string;
}

export function ModalUpload ({
    isOpen,
    setIsOpen,
    ButtonContent,
}:ModalUploadProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">{ButtonContent} </Button>
            </DialogTrigger>

            <DialogPortal>
                <DialogContent className="sm:max-w-[800px] p-10">

                    <div className="flex items-center justify-center p-2 h-72">
                        <Dropzone />
                    </div>

                    <div className="flex justify-around w-full">

                        <DialogClose asChild>
                            <Button size="sm" type="button" className="h-8 w-[40%]">
                                Cancel
                            </Button>
                        </DialogClose>

                        <DialogClose asChild>
                            <Button size="sm" type="button" className="h-8 w-[40%]">
                                Validate
                            </Button>
                        </DialogClose>

                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}

export default ModalUpload;