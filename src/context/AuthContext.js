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
  const [userData, setUserData] = useState();

  const getCurrentUser = async () => {
    const user = await auth().currentUser;
    return user;
  }

  const createUser = async (user) => {
    const {name, email, password, profilePhoto} = user;
    setIsLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);

      const user = await getCurrentUser();
      const uid = user.uid;

      let profilePhotoUrl = 'default';
      if (user.profilePhoto) {
        profilePhotoUrl = await uploadProfilePhoto(profilePhoto);
      }
      await db.collection('Users').doc(uid).set({
        email: email,
        name: name,
        profilePhotoUrl: profilePhotoUrl,
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
      // return {...user, profilePhotoUrl, uid};
    } catch (error) {
      setIsLoading(false);
      console.log('Error @createUser: ', error.message);
      return {"error": error.message}
    }
  }

  const uploadProfilePhoto = async (uri) => {
    const user = await getCurrentUser()
    const uid = user.uid;
    try {
      const photo = await getBlob(uri);
      const imageRef = storage().ref('profilePhotos').child(uid);
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

  const uploadPost = async (post) => {
    const user = await getCurrentUser();
    const uid = user.uid;

    const date = moment(Date()).format('MMMM Do YYYY, h:mm:ss a');
    console.log('date: ', date);

    try {
      const photo = await getBlob(post.photo);

      const imageRef = storage().ref(`Posts/${uid}`).child(`${date}.jpeg`);

      await imageRef.put(photo);

      const url = await imageRef.getDownloadURL();

      await db.collection('Users').doc(uid).collection('Posts').doc(date).set({
        text: post.text,
        photoUrl: url,
      });
    } catch (error) {
      console.log('Error @uploadPost: ', error);
    }
  }

  const uploadImage = async (uri) => {
    const user = await getCurrentUser()
    const uid = user.uid;
    setIsLoading(true);

    try {
      const imageRef = storage().ref('Post').child(uid);
      const awaitRes = await imageRef.putFile(uri);
      const url = await imageRef.getDownloadURL();
      setIsLoading(false);
      return url;
    } catch (error) {
      console.log('Error @UploadImage: ', error);
      setIsLoading(false);
      return {"error": error.message}
    }
    /**
      const [transferred, setTransferred] = useState(0);
      const task = storage()
        .ref(filename)
        .putFile(uploadUri);
      // set progress state
      task.on('state_changed', snapshot => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        );
      });
      try {
        await task;
      } catch (e) {
        console.error(e);
      }
    */
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
    uploadPost,
    uploadImage,
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
