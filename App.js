/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import {setCustomText, setCustomTextInput} from 'react-native-global-props';
import FlashMessage from 'react-native-flash-message';
import firebase from '@react-native-firebase/app';

import {Provider} from './src/context';
import RootNavigator from './src/navigator';

const firebaseConfig = {
  apiKey: "AIzaSyBAN7r96LKdUnUwB0865ryAle6D70daNgo",
  authDomain: "reactnative-artem.firebaseapp.com",
  projectId: "reactnative-artem",
  storageBucket: "reactnative-artem.appspot.com",
  messagingSenderId: "520994987462",
  appId: "1:520994987462:web:77784c6bef74df94b026c7",
  databaseURL: "https://reactnative-artem.firebaseio.com",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  // ... offline mode
  // firestore().settings({
  //   persistence: true,
  //   cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED
  // });
}

const App = ()  => {
  return (
    <React.Fragment>
      <Provider>
         <RootNavigator/>
         <FlashMessage/>
      </Provider>
    </React.Fragment>
  ); 
};

export default App;
