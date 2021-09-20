import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCpL_N2V7WUgwLcb7iSTBCzMUmSKYpsBLc",
  authDomain: "react-app-81060.firebaseapp.com",
  projectId: "react-app-81060",
  storageBucket: "react-app-81060.appspot.com",
  messagingSenderId: "929635286635",
  appId: "1:929635286635:web:63ac71500f5938b17f3b2e",
  measurementId: "G-L291MM70B8",
};

firebase.initializeApp( firebaseConfig );

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}