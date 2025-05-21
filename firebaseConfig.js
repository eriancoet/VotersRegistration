// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {

  apiKey: "AIzaSyDX-r8IEDwjLKAz8Lw76kA7u2emHbHPMXQ",

  authDomain: "politcal-party-registration.firebaseapp.com",

  projectId: "politcal-party-registration",

  storageBucket: "politcal-party-registration.firebasestorage.app",

  messagingSenderId: "184786708700",

  appId: "1:184786708700:web:8f5ea025940e734b0cec19",

  measurementId: "G-J08KTK8ERD"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);