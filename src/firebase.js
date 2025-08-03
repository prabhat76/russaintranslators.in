import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAru4IFHn19f2RQB3z8LFiGHr4PYynUkd8",
  authDomain: "russiantranslator-aa708.firebaseapp.com",
  databaseURL: "https://russiantranslator-aa708-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "russiantranslator-aa708",
  storageBucket: "russiantranslator-aa708.firebasestorage.app",
  messagingSenderId: "631900278460",
  appId: "1:631900278460:web:ac2ed8da7da1b856fc8ab9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const rtdb = getDatabase(app);
export const mockFirebaseOps = false;