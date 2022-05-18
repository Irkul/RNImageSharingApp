import React, {createContext, useContext, useState} from 'react';
import axios, {Axios} from 'axios';
import {AuthContext} from './AuthContext';

const AxiosContext = createContext();

const AxiosContextProvider = () => {
  const authContext = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    // baseURL: Constants.BASE_URL,
    // headers: {
    //     authorization: "Bearer ".concat(authContext?.token),
    // }
    // accept: 'application/json, text/plain, */*', content-type: 'application/json'
  });

  const setIsLoading = (loading) => {
    setLoading(loading);
  };

  const providerValue = {
    axiosInstance,
    isLoading,
    setIsLoading,
  };

  return (
    <AxiosContext.Provider value={providerValue}>
      {props.children}
    </AxiosContext.Provider>
  );
};

const AxiosConsumer = AxiosContext.Consumer;

export {AxiosContext, AxiosContextProvider, AxiosConsumer};
