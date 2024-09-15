import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAZIcqNqsE4xf5R3eBfmCxP8EkJs82j1_M",
  authDomain: "portfolio-a520e.firebaseapp.com",
  projectId: "portfolio-a520e",
  storageBucket: "portfolio-a520e.appspot.com",
  messagingSenderId: "221530299640",
  appId: "1:221530299640:web:4de283d726047588002f0d",
  measurementId: "G-WCJCL67RB7"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };