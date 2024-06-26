'use client';
import ModalContext from "./modalContext";
import React, {PropsWithChildren, useState} from "react";

const ModalContextProvider: React.FC<PropsWithChildren> = ({ children }:any) => {
    //Variable where we store the boolean that opens a modal
    const [isThisOpen, setisThisOpen]=useState(false)
    
    return(
        <ModalContext.Provider value={{isThisOpen, setisThisOpen}}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContextProvider;