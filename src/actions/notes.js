import Swal from 'sweetalert2';

import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

// Action to post a new note
export const startNewNote = () => {
	return async (dispatch, getState) => {
		// Get the user id credential
		const { uid } = getState().auth;
		// Set empty values in a new note
		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
		};
		// Post the new note in data base
		const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
		// Dispatch the active note in order to set active value
		dispatch(activeNote(docRef.id, newNote));
		// Dispatch
		dispatch(addNewNote(docRef.id, newNote));
	};
};

// Load the notes and dispatch the data thru the action
export const startLoadingNotes = (uid) => {
	return async (dispatch) => {
		const notes = await loadNotes(uid);
		dispatch(setNotes(notes));
	};
};

// Return the active note
export const activeNote = (id, note) => ({
	type: types.notesActive,
	payload: {
		id,
		...note,
	},
});

// Set the state values from the new note
export const addNewNote = (id, note) => ({
	type: types.notesAddNew,
	payload: {
		id,
		...note,
	},
});

// Set the selected note
export const setNotes = (notes) => ({
	type: types.notesLoad,
	payload: notes,
});

// Start the async action to save the note in data base
export const startSaveNote = (note) => {
	return async (dispatch, getState) => {
		// Get user id credential
		const { uid } = getState().auth;
		// If there is not note url it delete it
		if (!note.url) {
			delete note.url;
		}
		// Save the values in the variable
		const noteToFirestore = { ...note };
		// Deletes the current id
		delete noteToFirestore.id;
		// Updates the note with its id
		await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
		// Dispatch new values
		dispatch(refreshNote(note.id, noteToFirestore));
		// Message
		Swal.fire('Saved', note.title, 'success');
	};
};

// Refresh only the note selected by passing the id
export const refreshNote = (id, note) => ({
	type: types.notesUpdated,
	payload: {
		id,
		// Passing all the note properties
		note: {
			id,
			...note,
		},
	},
});

// Upload the selected file
export const startUploading = (file) => {
	return async (dispatch, getState) => {
		// Get the active note data
		const { active: activeNote } = getState().notes;
		// Message
		Swal.fire({
			title: 'Uploading',
			text: 'Please wait...',
			allowOutsideClick: false,
			onBeforeOpen: () => {
				Swal.showLoading();
			},
		});
		// Save the uploaded file in variable
		const fileUrl = await fileUpload(file);
		// Updates de active note url value with the new one
		activeNote.url = fileUrl;
		// Dispatch the new value
		dispatch(startSaveNote(activeNote));
		// End of message
		Swal.close();
	};
};


// Start deleting action
export const startDeleting = (id) => {
	return async (dispatch, getState) => {
		// Message
		Swal.fire({
			title: 'Deleting',
			text: 'Please wait...',
			allowOutsideClick: false,
			onBeforeOpen: () => {
				Swal.showLoading();
			},
		});
		// Get the user id credential
		const uid = getState().auth.uid;
		// Deletes the note from data base
		await db.doc(`${uid}/journal/notes/${id}`).delete();
		// If everything is ok, delete the note from store
		dispatch(deleteNote(id));
		// End of message
		Swal.close();
	};
};

// It send the id from the note selected to delete
export const deleteNote = (id) => ({
	type: types.notesDelete,
	payload: id,
});

// Action to flush the notes data
export const noteLogout = () => ({
	type: types.notesLogoutCleaning,
});
