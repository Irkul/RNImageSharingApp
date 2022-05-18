import React, { createContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

const AuthContextProvider = () => {
 
  const [token, setToken] = useState('');
 
  
  
  const providerValue = {
    token,
    getUserToken,

    removeToken,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthContextProvider, AuthConsumer };
