import React from 'react';
import {useDropzone} from 'react-dropzone';
import { UploadIcon } from "@radix-ui/react-icons";

const DropZone = () => {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

    const files = acceptedFiles.map(file => (
        <li key={file.name}>
            {file.name}
        </li>
    ))
    

    return(
        <div {...getRootProps({className:"dropzone"})} className="bg-ligthBlue rounded-md h-full w-full cursor-pointer text-center flex flex-col items-center justify-center">
            <input {...getInputProps()} />
            <UploadIcon color="Gray" width="80" height="80"/>
            <p className="text-gray-500 mt-2">Upload your document</p>
            <ul className="text-gray-500 underline pt-4">{files}</ul>
        </div>
    );
};

export default DropZone;