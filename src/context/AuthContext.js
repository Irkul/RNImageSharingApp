import React, { createContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import moment from 'moment';
import uuid from 'react-native-uuid';

const db = firestore();

const AuthContext = createContext();

const AuthContextProvider = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState();
  const myUUID = uuid.v1();

  const getCurrentUser = async () => {
    const user = await auth().currentUser;
    return user;
  }

  const createUser = async (user) => {
    const {name, email, password, profilePhoto} = user;
    setIsLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      const date = moment().format('yyyy-MM-DDThh:mm:ss');
      const authUser = await getCurrentUser();
      const uid = authUser.uid;

      let profilePhotoUrl = 'default';
      if (profilePhoto) {
        profilePhotoUrl = await uploadProfilePhoto(profilePhoto);
      }
      await db.collection('Users').doc(uid).set({
        email: email,
        name: name,
        profilePhotoUrl: profilePhotoUrl,
        createdAt: date,
        modifiedAt: date,
      });
      
      setIsLoading(false);

      // delete user.password;

      setUserData({
        ...user,
        profilePhotoUrl,
        uid,
      });

      return {
        ...user,
        profilePhotoUrl,
        uid,
      }
    } catch (error) {
      setIsLoading(false);
      console.log('Error @createUser: ', error.message);
      return {"error": error.message}
    }
  }

  const uploadProfilePhoto = async (uri) => {
    const user = await getCurrentUser()
    const uid = user.uid;
    const date = moment().format('yyyy-MM-DDThh:mm:ss');

    try {
      const photo = await getBlob(uri);
      const imageRef = storage().ref(`Users/${uid}`).child(`${date}.jpeg`);
      const awaitRes = await imageRef.put(photo);
      const url = await imageRef.getDownloadURL();
      // const awaitResp = await db.collection('Users').doc(uid).update({
      //   profilePhotoUrl: url,
      // });
      return url;
    } catch (error) {
      console.log('Error @uploadProfilePhoto: ', error);
    }
  }

  const getBlob = async (uri) => {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = () => {
        reject(new TypeError('Network request failed.'));
      };

      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  }

  const getUserInfo = async (uid) => {
    try {
      let user = await db
        .collection('Users')
        .doc(uid)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            console.log(
              '@Firebase.getUserInfo documentSnapshot: ',
              documentSnapshot.data(),
            );

            return documentSnapshot.data();
          }
        });

      console.log('@Firebase.getUserInfo user: ', user);
      return user;
    } catch (error) {
      console.log('Error @getUserInfo: ', error);
    }
  }

  const signOut = async () => {
    try {
      auth().signOut();
      return true;
    } catch (error) {
      console.log('Error @signOut: ', error);
    }

    return false;
  }

  const signIn = async (email, password) => {
    try {
      const res = await auth().signInWithEmailAndPassword(email, password);
      return res;
    } catch (error) {
      return {"error": error.message};
    }

  }

  
  const providerValue = {
    getCurrentUser,
    createUser,
    uploadProfilePhoto,
    getBlob,
    getUserInfo,
    signIn,
    signOut,
    isLoading,
    setIsLoading,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthContextProvider, AuthConsumer };
