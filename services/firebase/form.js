import { doc, setDoc, getFirestore, collection, addDoc, getDoc, getDocs, writeBatch, deleteField, updateDoc, query, orderBy, limit } from 'firebase/firestore';

import { app } from './firebase-app';

import { firebaseService } from './index';
import { CONVERT_DATABASE_KEY_TO_FORM, CONVERT_TEMP_KEY_TO_PERMANENT_KEY_MAPPER, DATABASE_KEYS, FORM_MAPPER, TEMP_FORM_MAPPER } from './constants';
import { QUESTIONNAIRES_CATEGORIES } from '../../scripts/constants';

const db = getFirestore(app);

export const getUserCurrentFormStep = async () => {
  try {
    const { uid } = await firebaseService.auth.getCurrentUser();

    const collectionRef = collection(db, DATABASE_KEYS.USERS, uid, DATABASE_KEYS.ANSWER);
    const docsSnap = await getDocs(collectionRef);

    return docsSnap.docs.length;
  } catch(error) {
    console.error(error);
  }

  return 0;
};

export const getFormFromUser = async (currentForm) => {
  const form = FORM_MAPPER[currentForm];

  try {
    const { uid } = await firebaseService.auth.getCurrentUser();

    const docRef = doc(db, DATABASE_KEYS.USERS, uid, DATABASE_KEYS.ANSWER, form);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      const formData = docSnap.data();

      return formData.data;
    }
  } catch(error) {
    console.error(error);
  }

  return null;
};

export const saveTempFormForUser = async (currentForm, data) => {
  const form = TEMP_FORM_MAPPER[currentForm];

  try {
    const { uid } = await firebaseService.auth.getCurrentUser();

    await setDoc(
      doc(db, DATABASE_KEYS.USERS, uid),
      {
        [form]: data,
      },
      {
        merge: true,
      }
    );

    return true;
  } catch(error) {
    console.error(error);
  }

  return false;
};

export const saveAllForms = async (currentForm, data) => {
  const form = FORM_MAPPER[currentForm];

  try {
    const { uid } = await firebaseService.auth.getCurrentUser();

    const docRef = doc(db, DATABASE_KEYS.USERS, uid);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      // Save all data
      const userData = await docSnap.data();

      const updatedUserData = Object.keys(userData).reduce((acc, cur) => {
        const permanentKey = CONVERT_TEMP_KEY_TO_PERMANENT_KEY_MAPPER[cur];

        if(!permanentKey) {
          return acc;
        }

        return {
          ...acc,
          [permanentKey]: userData[cur],
        };
      }, {
        [form]: data,
      });

      Object.keys(updatedUserData).forEach(async key => {
        await addDoc(
          collection(db, DATABASE_KEYS.USERS, uid, key), 
          updatedUserData[key],
        );

        saveGeneralForm(CONVERT_DATABASE_KEY_TO_FORM[key], updatedUserData[key]);
      });

      // Delete temp data
      await updateDoc(docRef, {
        [DATABASE_KEYS.TEMP_ATTITUDE]: deleteField(),
        [DATABASE_KEYS.TEMP_INTERPERSONAL_RELATIONSHIP]: deleteField(),
        [DATABASE_KEYS.TEMP_EMOTIONAL_REGULATION]: deleteField(),
      });

      const batch = writeBatch(db);

      const answersRef = collection(db, DATABASE_KEYS.USERS, uid, DATABASE_KEYS.ANSWER);
      const answersSnapshot = await getDocs(answersRef);

      answersSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      firebaseService.user.setUserData('hasAnswerForAllForms', true);

      return true;
    }
  } catch(error) {
    console.error(error);
  }

  return false;
};

export const saveFormForUser = async (currentForm, data) => {
  const form = FORM_MAPPER[currentForm];

  try {
    const { uid } = await firebaseService.auth.getCurrentUser();

    await addDoc(
      collection(db, DATABASE_KEYS.USERS, uid, form), 
      data
    );

    return true;
  } catch(error) {
    console.error(error);
  }

  return false;
};

export const saveAnswersForUser = async (currentForm, data) => {
  const form = FORM_MAPPER[currentForm];

  try {
    const { uid } = await firebaseService.auth.getCurrentUser();

    await setDoc(
      doc(db, DATABASE_KEYS.USERS, uid, DATABASE_KEYS.ANSWER, form),
      {
        data: data,
      },
    );

    return true;
  } catch(error) {
    console.error(error);
  }

  return false;
};

export const saveGeneralForm = async (currentForm, data) => {
  const form = FORM_MAPPER[currentForm];

  try {
    await addDoc(collection(db, form), data);

    return true;
  } catch(error) {
    console.error(error);
  }

  return false;
};

export const getGeneralFormCategoriesAverage = async (form) => {
  try {
    const collectionRef = collection(db, form);
    const docsSnap = await getDocs(collectionRef);

    const avg = docsSnap.docs.reduce((acc, doc) => {
      const docData = doc.data();
      const keys = Object.keys(docData);
      const categories = keys.reduce((accKeys, curKey) => {
        if(![...Object.values(QUESTIONNAIRES_CATEGORIES), 'general'].includes(curKey)) {
          return accKeys;
        }

        const totalSum = (acc[curKey]?.sum || 0) + docData[curKey];
        const totalCount = (acc[curKey]?.count || 0) + 1;
        
        return {
          ...accKeys,
          [curKey]: {
            sum: totalSum,
            count: totalCount,
            avg: totalSum / totalCount,
          },
        };
      }, {});

      return {
        ...acc,
        ...categories,
      };
    }, {});

    return avg;
  } catch(error) {
    console.error(error);
  }

  return null;
};

export const getUserLatestResult = async (form) => {
  try {
    const { uid } = await firebaseService.auth.getCurrentUser();

    const collectionRef = collection(db, DATABASE_KEYS.USERS, uid, form);
    const q = query(collectionRef, orderBy('created_at', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0];
    }
  } catch(error) {
    console.error(error);
  }

  return null;
};
