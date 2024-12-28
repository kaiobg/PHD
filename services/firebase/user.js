import { doc, setDoc, getFirestore, getDoc, collection, getDocs } from 'firebase/firestore';

import { notification } from '../notification';

import { app } from './firebase-app';

import { firebaseService } from './index';
import { DATABASE_KEYS, FORMS_QTY } from './constants';

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
    
  } catch(error) {
    notification.error(e);
  }
};

export const hasAnswerForAllForms = async (uid) => {
  const collectionRef = collection(db, DATABASE_KEYS.USERS, uid, DATABASE_KEYS.FORMS);
  const docsSnap = await getDocs(collectionRef);

  return docsSnap.docs.length == FORMS_QTY;
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

export const logoutUser = async () => {
  sessionStorage.removeItem(USER_SESSION_KEY);
};

export const hasUserData = () => {
  return !!sessionStorage.getItem('user');
};

export const getUserData = (key) => {
  const userData = JSON.parse(sessionStorage.getItem(USER_SESSION_KEY));
  
  return userData[key];
};
