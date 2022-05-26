import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import moment from 'moment';
import uuid from 'react-native-uuid';

import { AuthContext } from './AuthContext';

const db = firestore();

const AppContext = createContext();

const AppContextProvider = props => {
  const authContext = useContext(AuthContext);

  // const [selectors, setSelectors] = useState([]);

  const userCollection = db.collection("Users");
  const selectorCollection = db.collection("Selector1-Fields");
  // const postCollection = db.collection("Posts");
  const date = moment().format('yyyy-MM-DDThh:mm:ss');
  const myUUID =  uuid.v1();

  /**
   * GET VERSION
   */
  const getVersion = () => {return "1.0.0"};

  const getTypeList = async () => {
    const data = await selectorCollection.get();
    const docs = data.docs;
    var res = [];
    for (let doc of docs) {
      res.push(doc.data());
    }
    // setSelectors(res);
    return res;
  };

const uploadPost = async (post) => {
    const user = await authContext.getCurrentUser();
    const uid = user.uid;

    const date = moment().format('yyyy-MM-DDThh:mm:ss');

    try {
      const photo = await authContext.getBlob(post.photo);
      const imageRef = storage().ref(`Posts/${uid}`).child(`${date}.jpeg`);
      await imageRef.put(photo);
      const url = await imageRef.getDownloadURL();
      await db.collection('Users').doc(uid).collection('Posts').doc(myUUID).set({
        type: post.type,
        photoUrl: url,
        number: post.number,
        date: date,
      });
    } catch (error) {
      console.log('Error @uploadPost: ', error);
    }
  }
 
  const providerValue = {
    getVersion,
    getTypeList,
    uploadPost,
  };

  return (
    <AppContext.Provider value={providerValue}>
      {props.children}
    </AppContext.Provider>
  );
};

const AppConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppConsumer };
