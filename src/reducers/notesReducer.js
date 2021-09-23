import { types } from '../types/types';

const initialState = {
	notes: [],
	active: null,
};

export const notesReducer = (state = initialState, action) => {
	switch (action.type) {
		// It changes the state value in active with the payload
		case types.notesActive:
			return {
				// It return the state itself
				...state,
				active: {
					...action.payload,
				},
			};
		// It add the new note into state
		case types.notesAddNew:
			return {
				...state,
				notes: [action.payload, ...state.notes],
			};
		// It changes the state value in notes with the payload data
		case types.notesLoad:
			return {
				...state,
				notes: [...action.payload],
			};
		// It returns the note updated
		case types.notesUpdated:
			return {
				...state,
				notes: state.notes.map((note) =>
					note.id === action.payload.id ? action.payload.note : note
				),
			};
		// Return all the notes but not the deleted note
		case types.notesDelete:
			return {
				...state,
				// It purges the active note
				active: null,
				notes: state.notes.filter((note) => note.id !== action.payload),
			};
		// Flush the notes and the active note
		case types.notesLogoutCleaning:
			return {
				...state,
				notes: [],
				active: null,
			};
		// Default type
		default:
			return state;
	}
};
