import React, { createContext, useState } from 'react';

interface IModalShareData{
    isThisOpen: boolean;
    setisThisOpen: (newValue: boolean) => void;
}

const ModalContext=createContext<IModalShareData>({isThisOpen:false, setisThisOpen: () => {},})

export default ModalContext