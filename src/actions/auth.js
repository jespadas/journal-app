import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { noteLogout } from './notes';
import { finishLoading, startLoading } from './ui';

// Action to login with the Email and Passwoord
export const startLoginEmailPassword = (email, password) => {
	return (dispatch) => {
		// Dispatch the loader spinner
		dispatch(startLoading());
		// Connection into firebase and auth
		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			// If ok it dispatch the login action with user credentials
			.then(async ({ user }) => {
				await dispatch(login(user.uid, user.displayName));
				// Message
				Swal.fire('Success', 'Welcome !', 'success');
				// Dispatch the end of loader spinner
				dispatch(finishLoading());
			})
			// Catch the error, it ends the loader spinner and show
			// the error message
			.catch((e) => {
				dispatch(finishLoading());
				Swal.fire('Error', e.message, 'error');
			});
	};
};

// Action to login with form data
export const startRegisterWithEmailPasswordName = (email, password, name) => {
	return (dispatch) => {
		// Connection into firebase and auth
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			// If ok it dispatch the login action with user credentials
			.then(async ({ user }) => {
				// Await the response from updating user profile action
				// Updates the user display name with the received name
				await user.updateProfile({ displayName: name });
				// Dispatch the new values
				dispatch(login(user.uid, user.displayName));
			})
			// Catch the error and show the message with its info
			.catch((e) => {
				Swal.fire('Error', e.message, 'error');
			});
	};
};

// Action to login with Google credentials
export const startGoogleLogin = () => {
	return (dispatch) => {
		// Connection into firebase and auth and show Popup
		firebase
			.auth()
			.signInWithPopup(googleAuthProvider)
			// If ok it dispatch the received user credentials
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName));
			})
			.catch((e) => {
				Swal.fire('Error', e.message, 'error');
			});
	};
};

// Sends the news values to reducer
export const login = (uid, displayName) => {
	return {
		type: types.login,
		payload: {
			uid,
			displayName,
		},
	};
};

// Action to logout
export const startLogout = () => {
	return async (dispatch) => {
		// Connection into firebase and logout
		await firebase
			.auth()
			.signOut()
			// If ok Dispatch the logout action type to
			// flush user credentials and the notes data
			.then(dispatch(logout()), dispatch(noteLogout()))
			.catch((e) => {
				Swal.fire('Error', e.message, 'error');
			});
		/* dispatch(logout());
		dispatch(noteLogout()); */
	};
};

// Action to logout
export const logout = () => ({
	type: types.logout,
});
