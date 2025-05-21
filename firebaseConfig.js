// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDX-r8IEDwjLKAz8Lw76kA7u2emHbHPMXQ",
  authDomain: "politcal-party-registration.firebaseapp.com",
  projectId: "politcal-party-registration",
  storageBucket: "politcal-party-registration.appspot.com",
  messagingSenderId: "184786708700",
  appId: "1:184786708700:web:8f5ea025940e734b0cec19",
  measurementId: "G-J08KTK8ERD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
