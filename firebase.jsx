// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { config } from "./src/config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: config.REACT_APP_FIREBASE_API_KEY,
    authDomain: config.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: config.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: config.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: config.REACT_APP_FIREBASE_APP_ID,
    measurementId: config.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
// const analytics = getAnalytics(app);
export { storage, ref, getDownloadURL, uploadBytesResumable };