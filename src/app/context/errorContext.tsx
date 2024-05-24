import React, { createContext, useState } from 'react';
import { ErrorList } from '../examples/tables/table/colums';

interface SharedErrorDataType {
    errorlistShareData: ErrorList[];
    setErrorListShareData: (newList: ErrorList[]) => void;
    isOtherOpen: boolean;
    setOtherIsOpen: (newValue: boolean) => void;
}

const ErrorContext = createContext<SharedErrorDataType>({
    errorlistShareData:[],
    setErrorListShareData: () => {}, // Placeholder, will be replaced in the Provider
    isOtherOpen: false,
    setOtherIsOpen: () => {},
});

export default ErrorContext;
