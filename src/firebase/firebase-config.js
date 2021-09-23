import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Data from firebase
const firebaseConfig = {
  apiKey: "AIzaSyCpL_N2V7WUgwLcb7iSTBCzMUmSKYpsBLc",
  authDomain: "react-app-81060.firebaseapp.com",
  projectId: "react-app-81060",
  storageBucket: "react-app-81060.appspot.com",
  messagingSenderId: "929635286635",
  appId: "1:929635286635:web:63ac71500f5938b17f3b2e",
  measurementId: "G-L291MM70B8",
};

// Initialize the App with our configuration data
firebase.initializeApp( firebaseConfig );

// Link our app with database
const db = firebase.firestore();
// Provider to Google auth login
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}