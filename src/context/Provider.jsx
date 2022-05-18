import React from 'react';
import {AxiosContextProvider} from './AxiosContext';
import {AuthContextProvider} from './AuthContext';
import {SignContextProvider} from './SignContext';
import {KioskContextProvider} from './AppContext';
import {BoothProvider} from './BoothContext';

const Provider = () => {
  return (
    <AuthContextProvider>
      <AxiosContextProvider>
        <SignContextProvider>
          <KioskContextProvider>
            <BoothProvider>{props.children}</BoothProvider>
          </KioskContextProvider>
        </SignContextProvider>
      </AxiosContextProvider>
    </AuthContextProvider>
  );
};

export default Provider;
