// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDeCL2hF0kH1enhoI3gk_hvuKkUMh-Vo4",
  authDomain: "ptpt-3ce02.firebaseapp.com",
  projectId: "ptpt-3ce02",
  storageBucket: "ptpt-3ce02.firebasestorage.app",
  messagingSenderId: "128277472240",
  appId: "1:128277472240:web:b21413cfb6c17da546f335"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app}