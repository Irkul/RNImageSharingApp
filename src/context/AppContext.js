import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

const consoleLog = true;
const consoleEventColor = 'color: blue; font-weight: bold;';
const consoleResponseColor = 'color: green; font-weight: bold;';

const AppContext = createContext();

const AppContextProvider = props => {
  const authContext = useContext(AuthContext);

  /**
   * GET VERSION
   */
  const getVersion = () => {return "1.0.0"};
 
  const providerValue = {
    getVersion,
  };

  return (
    <AppContext.Provider value={providerValue}>
      {props.children}
    </AppContext.Provider>
  );
};

const AppConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppConsumer };
