import React, { createContext, useState } from 'react';
import { ErrorList } from '../examples/tables/table/colums';

interface SharedErrorDataType {
    errorlistShareData: ErrorList[];
    setErrorListShareData: (newList: ErrorList[]) => void;
    isErrorsOpen: boolean;
    setErrorsOpen: (newValue: boolean) => void;
    isSuccessfulOpen: boolean;
    setIsSuccessfulOpen: (newValue: boolean) => void;
}

const ErrorContext = createContext<SharedErrorDataType>({
    errorlistShareData:[],
    setErrorListShareData: () => {}, // Placeholder, will be replaced in the Provider
    isErrorsOpen: false,
    setErrorsOpen: () => {},
    isSuccessfulOpen: false,
    setIsSuccessfulOpen: () => {},
});

export default ErrorContext;
