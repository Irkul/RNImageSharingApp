import React, { createContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import moment from 'moment';

const db = firestore();

const AuthContext = createContext();

const AuthContextProvider = props => {
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentUser = () => {
    return auth().currentUser;
  }

  const createUser = async (user) => {
    try {
      await auth().createUserWithEmailAndPassword(user.email, user.password);

      const uid = Firebase.getCurrentUser().uid;

      let profilePhotoUrl = 'default';

      await db.collection('users').doc(uid).set({
        username: user.username,
        email: user.email,
        profilePhotoUrl,
      });

      if (user.profilePhoto) {
        profilePhotoUrl = await Firebase.uploadProfilePhoto(user.profilePhoto);
      }

      delete user.password;

      return {...user, profilePhotoUrl, uid};
    } catch (error) {
      console.log('Error @createUser: ', error.message);
    }
  }

  const uploadProfilePhoto = async (uri) => {
    const uid = Firebase.getCurrentUser().uid;

    try {
      const photo = await Firebase.getBlob(uri);

      const imageRef = storage().ref('profilePhotos').child(uid);

      await imageRef.put(photo);

      const url = await imageRef.getDownloadURL();

      await db.collection('users').doc(uid).update({
        profilePhotoUrl: url,
      });

      return url;
    } catch (error) {
      console.log('Error @uploadProfilePhoto: ', error);
    }
  }

  const uploadPost = async (post) => {
    const uid = Firebase.getCurrentUser().uid;

    const date = moment(Date()).format('MMMM Do YYYY, h:mm:ss a');
    console.log('date: ', date);

    try {
      const photo = await Firebase.getBlob(post.photo);

      const imageRef = storage().ref(`posts/${uid}`).child(`${date}.jpeg`);

      await imageRef.put(photo);

      const url = await imageRef.getDownloadURL();

      await db.collection('users').doc(uid).collection('posts').doc(date).set({
        text: post.text,
        photoUrl: url,
      });
    } catch (error) {
      console.log('Error @uploadPost: ', error);
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
        .collection('users')
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
    return auth().signInWithEmailAndPassword(email, password);
  }

  
  const providerValue = {
    getCurrentUser,
    createUser,
    uploadProfilePhoto,
    uploadPost,
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
