// It is a mock store for testing Redyx async action creators and middlewares
import configureStore from 'redux-mock-store';
// React middleware for Redux.
import thunk from 'redux-thunk';

import { startNewNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

// Adding middlewares (thunk)
const middlewares = [thunk];
// Creating the mockStore with middlewares
const mockStore = configureStore(middlewares);
// Store
const store = mockStore({
	auth: {
		uid: 'abc123',
	},
});

describe('Test in notes actions', () => {

	test('should add a new note', async () => {
        const payload = {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number),
        }
		// Dispatch the action startNewNote in order
		// To create a new note
		await store.dispatch(startNewNote());
		// Get the actions values
		const actions = store.getActions();
		// Verify if first action is setting the active note
		expect(actions[0]).toEqual({
			type: types.notesActive,
			payload: payload
		});
        // Verify if second action is adding a new note
        expect(actions[1]).toEqual({
			type: types.notesAddNew,
			payload: payload
		});
        // Set note id from actions
        const docId = actions[1].payload.id;
        // Delete action after tests 
        await db.doc(`abc123/journal/notes/${docId}`).delete();

	});

    

});
