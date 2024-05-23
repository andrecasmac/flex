// context/MyContextProvider.tsx

'use client';

import ErrorContext from './errorContext';
import React, { PropsWithChildren, ReactElement, useState } from 'react';
import { ErrorList } from '../examples/tables/table/colums';

const ErrorContextProvider: React.FC<PropsWithChildren> = ({ children }:any) => {
    const [errorlistShareData, setErrorListShareData] = useState<ErrorList[]>([]);

  return (
    <ErrorContext.Provider value={{ errorlistShareData, setErrorListShareData}}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContextProvider;
