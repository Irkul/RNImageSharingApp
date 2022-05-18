import React, { createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { AxiosContext } from './AxiosContext';

const consoleLog = true;
const consoleEventColor = 'color: blue; font-weight: bold;';
const consoleResponseColor = 'color: green; font-weight: bold;';

const KioskContext = createContext();

const KioskContextProvider = () => {
  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);

  /*
  const getAnalyticsEventTypes = async (eventID: string) => {
    axiosContext?.setIsLoading(true);

    let url = '';

    return axiosContext
      ?.axiosInstance({
        method: 'GET',
        url: url,
      })
      .then(async (response) => {
        axiosContext?.setIsLoading(false);
        if (response.status == 200) {
          return {
            status: true,
            data: response.data,
          };
        } else {
          return {
            status: false,
            data: 'Failed',
          };
        }
      })
      .catch((error) => {
        console.log('## error', error.toString());

        axiosContext?.setIsLoading(false);
        return {
          status: false,
          data: 'Failed',
        };
      });
  };
  */

  /**
   * Auth
   */
  const deleteUser = async (userID) => { };

  /// check if a user exists for a given email
  const checkUser = async () => { };

  const loginUser = async () => { };

  const whoami = async () => { };

  const sendPasswordResetEmail = async (email) => { };

  const setPassword = async () => {};

  /**
   * GET VERSION
   */
  const getVersion = () => { };
 
  const providerValue = {
   
  };

  return (
    <AppContext.Provider value={providerValue}>
      {props.children}
    </AppContext.Provider>
  );
};

const AppConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppConsumer };
