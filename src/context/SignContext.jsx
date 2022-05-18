import React, {createContext, useContext} from 'react';
import {AxiosContext} from './AxiosContext';
import {AuthContext} from './AuthContext';

const SignContext = createContext<SignContextInterface | null>(null);

const SignContextProvider = () => {
  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);

  const userLogin = (password) => {

    axiosContext?.setIsLoading(true);
    return axiosContext?.axiosInstance({
        
      })
      .then((response) => {
        axiosContext?.setIsLoading(false);
        if (response.status == 200) {
          // ... save response data
          authContext?.saveUserEvents(response.data); // user events
          // saveUserToken();

          return {
            status: true,
            data: response.data,
          };
        }
      })
      .catch((error) => {
        axiosContext?.setIsLoading(false);
        return {
          status: false,
          data: 'Failed',
        };
      });
  };
  
  const logOut = () => {
    authContext?.removeToken();
    // ... signout action
  };

  const providerValue = {
    userLogin,
    logOut,
  };

  return (
    <SignContext.Provider value={providerValue}>
      {props.children}
    </SignContext.Provider>
  );
};

const SignConsumer = SignContext.Consumer;

export {SignContext, SignContextProvider, SignConsumer};
