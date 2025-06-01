import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfrDQ-UA8Fm1n3eGchAcTNsA-CxQYKw78",
  authDomain: "roomieboard-d7139.firebaseapp.com",
  projectId: "roomieboard-d7139",
  storageBucket: "roomieboard-d7139.firebasestorage.app",
  messagingSenderId: "282275778878",
  appId: "1:282275778878:web:17ccab8e5f81d35ec01c6f",
  measurementId: "G-5NZTPYHEW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

export { auth, db, storage, messaging };