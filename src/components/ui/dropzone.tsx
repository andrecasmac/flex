import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "@radix-ui/react-icons";

const DropZone: React.FC= () => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setUploadedFile(acceptedFiles[0]);
        console.log("Uploaded FIle: ", uploadedFile)
    }, []);

    const { getRootProps, getInputProps} = useDropzone({ onDrop, maxFiles: 1 });

    return(
        <div {...getRootProps()} className="bg-ligthBlue rounded-md h-full w-full cursor-pointer text-center flex flex-col items-center justify-center">
            <input {...getInputProps()} />
            <UploadIcon color="Gray" width="80" height="80"/>
            <p className="text-gray-500 mt-2">Upload your document</p>
            {uploadedFile && <p className="text-gray-500 underline pt-4">{uploadedFile.name}</p>}
        </div>
    );
};

export default DropZone;