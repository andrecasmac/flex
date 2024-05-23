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
    isOpen?: boolean;
    setIsOpen: (open: boolean) => void;
    ButtonContent: string;
}

export function ModalUpload ({
    isOpen,
    setIsOpen,
    ButtonContent,
}:ModalUploadProps) {

    // State to store the selected file
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // State to store the content of the selected .txt file
    const [txtFileContent, setTxtFileContent] = useState<string | null>(null);

    // State to send error when pressing the validate button with no file in the Dropzone
    const [errorValidate, setErrorValidate] = useState<string | null>(null);

    // Callback function to handle file drop event
    const onDrop = useCallback((acceptedFiles: File[]) => {

        // Only process the first file, assuming single file upload
        const file = acceptedFiles[0];
        setUploadedFile(file);
        console.log("Uploaded File: ", file)

        // For reading the .txt file content
        const textReader = new FileReader();
        textReader.onload = () => {
            
            // Store the file content in the state once reading is complete
            const content = textReader.result as string;
            setTxtFileContent(content);
        };

        // Will read the file as string
        textReader.readAsText(file);

        // Clear error if file selected
        setErrorValidate(null)
    }, []);

    // Create a get root and input props from useDropzone
    const { getRootProps, getInputProps} = useDropzone({ onDrop, maxFiles: 1 });

    // Function to handle the Valitate Button
    const handleValidate = () => {

        // If Dropzone doesn't have a file
        if (!uploadedFile) {
            // An error text will appear when no file is found
            setErrorValidate("*Please upload a file before validating");
            console.log("No File to Validated");
            return;
        }

        // Will validate the file and close the Dropzone
        else{
            console.log("Validated File: ", uploadedFile);
            setIsOpen(false);
        }
    };

    return (
        // Render the Modal for Uploading Documents with Dropzone
        <Dialog open={isOpen} onOpenChange={setIsOpen}>

            {/* Button to open Modal */}
            <DialogTrigger asChild>
                <Button variant="default">{ButtonContent} </Button>
            </DialogTrigger>

            <DialogPortal>
                <DialogContent className="sm:max-w-[800px] p-10">

                    {/* Dropzone area */}
                    <div className="flex items-center justify-center p-2 h-72">
                        <div {...getRootProps()} className="bg-ligthBlue rounded-md h-full w-full cursor-pointer text-center flex flex-col items-center justify-center" >
                            {/* Input element for file selection */}
                            <input {...getInputProps()} />
                            <UploadIcon color="Gray" width="80" height="80"/>
                            <p className="text-gray-500 mt-2">Upload your document</p>

                            {/* The name of the File selected */}
                            {uploadedFile && <p className="text-gray-500 underline pt-4">{uploadedFile.name}</p>}

                            {/* If .txt, it will show the contents of the file */}
                            {txtFileContent && <pre className="text-gray-500 pt-4 text-left">{txtFileContent}</pre>}
                        </div>
                    </div>

                    {/* Error message */}
                    {errorValidate && <p className="text-red-700 ms-9">{errorValidate}</p>}

                    <div className="flex justify-around w-full">

                        {/* Button to close the Modal */}
                        <DialogClose asChild>
                            <Button size="sm" type="button" className="h-8 w-[40%]">
                                Cancel
                            </Button>
                        </DialogClose>

                        {/* Validate Button */}
                        <Button size="sm" type="submit" onClick={handleValidate} className="h-8 w-[40%]">
                            Validate
                        </Button>

                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}

export default ModalUpload;