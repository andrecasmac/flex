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

import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "@radix-ui/react-icons";


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
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [txtFileContent, setTxtFileContent] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setUploadedFile(file);
        console.log("Uploaded File: ", file)

        const textReader = new FileReader();
        textReader.onload = () => {
            const content = textReader.result as string;
            setTxtFileContent(content);
        };
        textReader.readAsText(file);
    }, []);

    const { getRootProps, getInputProps} = useDropzone({ onDrop, maxFiles: 1 });

    const handleSubmit = () => {
        if (!uploadedFile) {
            console.log("No File Validated");
        }
        else{
            console.log("Validated File: ", uploadedFile);
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default">{ButtonContent} </Button>
            </DialogTrigger>

            <DialogPortal>
                <DialogContent className="sm:max-w-[800px] p-10">

                    <div className="flex items-center justify-center p-2 h-72">
                        <div {...getRootProps()} className="bg-ligthBlue rounded-md h-full w-full cursor-pointer text-center flex flex-col items-center justify-center">
                            <input {...getInputProps()} />
                            <UploadIcon color="Gray" width="80" height="80"/>
                            <p className="text-gray-500 mt-2">Upload your document</p>
                            {uploadedFile && <p className="text-gray-500 underline pt-4">{uploadedFile.name}</p>}
                            {txtFileContent && <p className="text-gray-500 pt-4">{txtFileContent}</p>}
                        </div>
                    </div>

                    <div className="flex justify-around w-full">

                        <DialogClose asChild>
                            <Button size="sm" type="button" className="h-8 w-[40%]">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button size="sm" type="submit" onClick={handleSubmit} className="h-8 w-[40%]">
                            Validate
                        </Button>

                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}

export default ModalUpload;