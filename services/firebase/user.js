import { doc, setDoc, getFirestore, getDoc, collection, getDocs } from 'firebase/firestore';

import { notification } from '../notification';

import { app } from './firebase-app';

import { firebaseService } from './index';
import { DATABASE_KEYS } from './constants';

const db = getFirestore(app);

const USER_SESSION_KEY = 'user';

export const addUser = async (data) => {
  const { password, ...userData } = data;

  try {
    const loginInfo = await firebaseService.auth.signUp(userData.email, password);

    await setDoc(
      doc(db, 'users', loginInfo.uid), 
      userData,
    );
    
    return true;
  } catch(error) {
    notification.error(e);
  }

  return false;
};

export const hasAnswerForAllForms = async (uid) => {
  const atRef = collection(db, DATABASE_KEYS.USERS, uid, DATABASE_KEYS.ATTITUDE);
  const atDocs = await getDocs(atRef);

  if (atDocs.empty) {
    return false;
  }

  const erRef = collection(db, DATABASE_KEYS.USERS, uid, DATABASE_KEYS.EMOTIONAL_REGULATION);
  const erDocs = await getDocs(erRef);

  if (erDocs.empty) {
    return false;
  }

  const irRef = collection(db, DATABASE_KEYS.USERS, uid, DATABASE_KEYS.INTERPERSONAL_RELATIONSHIP);
  const irDocs = await getDocs(irRef);

  if (irDocs.empty) {
    return false;
  }

  return true;
};

export const loginUser = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
  
    if(docSnap.exists()) {
      const userData = await docSnap.data();

      sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify({
        ...userData,
        hasAnswerForAllForms: await hasAnswerForAllForms(uid),
      }));
    } else {
      throw new Error('User data not found. Contact administrator');
    }
  } catch(e) {
    notification.error(e);
  }
};

export const confirmCopyrightStatus = async () => {
  try {
    const { uid } = await firebaseService.auth.getCurrentUser();

    await setDoc(
      doc(db, 'users', uid),
      { confirmedCopyright: true },
      { merge: true },
    );

    firebaseService.user.setUserData('confirmedCopyright', true);
    
    return true;
  } catch(e) {
    notification.error(e);
  }

  return false;
};

export const logoutUser = async () => {
  sessionStorage.removeItem(USER_SESSION_KEY);
};

export const hasUserData = () => {
  return !!sessionStorage.getItem('user');
};

export const getUserData = (key) => {
  const userData = JSON.parse(sessionStorage.getItem(USER_SESSION_KEY));
  
  return userData ? userData[key] : null;
};

export const setUserData = (key, value) => {
  const userData = JSON.parse(sessionStorage.getItem(USER_SESSION_KEY));

  if(!userData) {
    return;
  }

  userData[key] = value;

  sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(userData));
};
