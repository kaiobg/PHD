import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut as firebaseSignOut,
  } from 'firebase/auth';
  
  import { app } from './firebase-app';
  
  const auth = getAuth(app);
  
  export const signUp = async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
  
      console.log(user);
      return user;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const signIn = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
  
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };
  
  export const checkAuthState = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user is signed in');
      } else {
        console.log('user is signed out');
      }
    });
  };
  
  export const redirectAnonymousUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location = '/';
      }
    });
  };
  
  export const redirectLoggedUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location = '/';
      }
    });
  };
  
  export const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      console.log('user signed out');
    } catch (error) {
      console.error(error);
    }
  };