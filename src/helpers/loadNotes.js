import { db } from '../firebase/firebase-config';

export const loadNotes = async (uid) => {
	// Get the notes from the passed user id
	const notesSnap = await db.collection(`${uid}/journal/notes`).get();
	// Initialize an empty array
	const notes = [];
	// It push each element in notesSnap to notes Array
	notesSnap.forEach((snapChildren) => {
		notes.push({
			id: snapChildren.id,
			...snapChildren.data(),
		});
	});
	// Returns the Array with new values
	return notes;
};
