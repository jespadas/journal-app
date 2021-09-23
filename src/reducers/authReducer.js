import { types } from '../types/types';

const initialState = {};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		// Return the new user credentials values
		case types.login:
			return {
				// Set the state value with credentials received
				uid: action.payload.uid,
				name: action.payload.displayName,
			};
		// Return an empty object 
		case types.logout:
			// Flush the user credentials
			return {};
		// Default type
		default:
			return state;
	}
};
