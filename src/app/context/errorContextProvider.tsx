'use client';

import ErrorContext from './errorContext';
import React, { PropsWithChildren, ReactElement, useState } from 'react';
import { ErrorList } from '../examples/tables/table/colums';

const ErrorContextProvider: React.FC<PropsWithChildren> = ({ children }:any) => {
    const [errorlistShareData, setErrorListShareData] = useState<ErrorList[]>([]);
    const [isErrorsOpen, setErrorsOpen] = useState(false);
    const [isSuccessfulOpen, setIsSuccessfulOpen] = useState(false);

  return (
    <ErrorContext.Provider value={{ errorlistShareData, setErrorListShareData, isErrorsOpen, setErrorsOpen, isSuccessfulOpen, setIsSuccessfulOpen}}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContextProvider;
