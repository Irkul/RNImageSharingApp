import React from 'react';
import {AuthContextProvider} from './AuthContext';
import {AppContextProvider} from './AppContext';

const Provider = props => {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        {props.children}
      </AppContextProvider>
    </AuthContextProvider>
  );
};

export default Provider;
