import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqkAgLByfYiWybmAK02wN2FqFPLTMFrAQ",
  authDomain: "papo-do-bom.firebaseapp.com",
  projectId: "papo-do-bom",
  storageBucket: "papo-do-bom.appspot.com",
  messagingSenderId: "32238793224",
  appId: "1:32238793224:web:0f8d260c5e7b91b29c17bd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);