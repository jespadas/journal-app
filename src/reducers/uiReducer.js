import { types } from '../types/types';

const initialState = {
	loading: false,
	msgError: null,
};

export const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		// Set the error message data
		case types.uiSetError:
			return {
				...state,
				msgError: action.payload,
			};
		// Remove the error message data
		case types.uiRemoveError:
			return {
				...state,
				msgError: null,
			};
		// Set true the loading spinner
		case types.uiStartLoading:
			return {
				...state,
				loading: true,
			};
		// Remove the loading spinner
		case types.uiFinishLoading:
			return {
				...state,
				loading: false,
			};
		// Default case
		default:
			return state;
	}
};
