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
  appId: "1:929635286635:web:88d71337bc90aa237f3b2e"
};

const firebaseConfigTesting = {
	apiKey: 'AIzaSyAE6WrsX6hyLlfuanSzCyCsOQO9sbZiQX4',
	authDomain: 'test-env-68902.firebaseapp.com',
	databaseURL: 'https://test-env-68902-default-rtdb.firebaseio.com',
	projectId: 'test-env-68902',
	storageBucket: 'test-env-68902.appspot.com',
	messagingSenderId: '855718962730',
	appId: '1:855718962730:web:ec58d28605b5668a65c553',
};

// Setting env access to db
if (process.env.NODE_ENV === 'test') {
	// testing
  firebase.initializeApp(firebaseConfigTesting);
} else {
  // dev / prod
  // Initialize the App with our configuration data
  firebase.initializeApp(firebaseConfig);
}


// Link our app with database
const db = firebase.firestore();
// Provider to Google auth login
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
