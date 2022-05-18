import React from 'react';
import {AuthContextProvider} from './AuthContext';
import {AppContextProvider} from './AppContext';

const Provider = () => {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        {props.children}
      </AppContextProvider>
    </AuthContextProvider>
  );
};

export default Provider;
