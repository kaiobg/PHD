import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';

import { app } from './firebase-app';

import { firebaseService, notification } from '../../services';

const auth = getAuth(app);

export const getCurrentUser = async () => {
  return await auth.currentUser;
};

export const signUp = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return user;
  } catch (error) {
    console.error(error);
    notification.error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return user;
  } catch (error) {
    switch(error.code) {
      case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
        notification.error('Email ou senha inválidos');
        break;
      default:
        console.error(error);
        break;
    }
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);

    firebaseService.user.logoutUser();
  } catch (error) {
    console.error(error);
    notification.error(error);
  }
};

export const checkAuthState = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log('user is signed in');

      if (document.body.hasAttribute('data-redirect-if-logged-in')) {
        window.location = `${BASE_URL}`;
        return;
      }

      if (!firebaseService.user.hasUserData()) {
        await firebaseService.user.loginUser(user.uid);
      }

      return;
    }

    console.log('user is not signed in');

    if (document.body.hasAttribute('data-redirect-if-not-logged-in')) {
      window.location = `${BASE_URL}`;
      return;
    }
  });
};

export const addAuthStateListener = (listener) => {
  onAuthStateChanged(auth, listener);
};
