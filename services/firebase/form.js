import { doc, setDoc, getFirestore, collection, addDoc, getDoc } from 'firebase/firestore';

import { app } from './firebase-app';

import { firebaseService } from './index';
import { DATABASE_KEYS } from './constants';

const db = getFirestore(app);

// TODO functions related to user inside USER key, should be handled in user service

const getFormFromUser = async (form) => {
  try {
    const { uid } = await firebaseService.auth.getCurrentUser();

    const docRef = doc(db, DATABASE_KEYS.USERS, uid, DATABASE_KEYS.FORMS, form);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      const formData = docSnap.data();

      console.log(formData);
    }
  } catch(error) {
    console.error(error);
  }

  return null;
};

export const getFormFromUserAttitude = async () => {
  return await getFormFromUser(DATABASE_KEYS.ATTITUDE);
};

export const getFormFromUserInterpersonalRelationship = async () => {
  return await getFormFromUser(DATABASE_KEYS.INTERPERSONAL_RELATIONSHIP);
};

export const getFormFromUserEmotionalRegulation = async () => {
  return await getFormFromUser(DATABASE_KEYS.EMOTIONAL_REGULATION);
};

const saveFormForUser = async (form, data) => {
  try {
    const { uid } = await firebaseService.auth.getCurrentUser();

    await setDoc(
      doc(db, DATABASE_KEYS.USERS, uid, DATABASE_KEYS.FORMS, form),
      data,
    );

    return true;
  } catch(error) {
    console.error(error);
  }

  return false;
};

export const saveFormForUserAttitude = async (data) => {
  return await saveFormForUser(DATABASE_KEYS.ATTITUDE, data);
};

export const saveFormForUserInterpersonalRelationship = async (data) => {
  return await saveFormForUser(DATABASE_KEYS.INTERPERSONAL_RELATIONSHIP, data);
};

export const saveFormForUserEmotionalRegulation = async (data) => {
  return await saveFormForUser(DATABASE_KEYS.EMOTIONAL_REGULATION, data);
};

const saveAnswersForUser = async (form, data) => {
  try {
    const { uid } = await firebaseService.auth.getCurrentUser();

    await setDoc(
      doc(db, DATABASE_KEYS.USERS, uid, DATABASE_KEYS.ANSWER, form),
      data,
    );

    return true;
  } catch(error) {
    console.error(error);
  }

  return false;
};

export const saveAnswersForUserAttitude = async (data) => {
  return await saveAnswersForUser(DATABASE_KEYS.ATTITUDE, data);
};

export const saveAnswersForUserInterpersonalRelationship = async (data) => {
  return await saveAnswersForUser(DATABASE_KEYS.INTERPERSONAL_RELATIONSHIP, data);
};

export const saveAnswersForUserEmotionalRegulation = async (data) => {
  return await saveAnswersForUser(DATABASE_KEYS.EMOTIONAL_REGULATION, data);
};

const saveFormForAverage = async (form, data) => {
  try {
    await addDoc(collection(db, form), data);

    return true;
  } catch(error) {
    console.error(error);
  }

  return false;
};

export const saveFormForAverageAttitude = async (data) => {
  return await saveFormForAverage(DATABASE_KEYS.FORM_ATTITUDE, data);
};

export const saveFormForAverageInterpersonalRelationship = async (data) => {
  return await saveFormForAverage(DATABASE_KEYS.FORM_INTERPERSONAL_RELATIONSHIP, data);
};

export const saveFormForAverageEmotionalRegulation = async (data) => {
  return await saveFormForAverage(DATABASE_KEYS.FORM_EMOTIONAL_REGULATION, data);
};
