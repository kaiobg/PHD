import {doc,setDoc,getFirestore} from "firebase/firestore";

import { app } from "./firebase-app";

import {signUp} from "./auth";

const db = getFirestore(app);

export const addUser = async (data) => {
    const {password,...userData} = data;

    try {
        const loginInfo = await signUp (userData.email,password);
        await setDoc (
            doc(db,"users",loginInfo.uid),
            userData
            
        )
    } catch (error) {
        console.error (error)
    }

} 