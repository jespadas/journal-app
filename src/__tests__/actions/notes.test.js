// It is a mock store for testing Redyx async action creators and middlewares
import configureStore from 'redux-mock-store';
// React middleware for Redux.
import thunk from 'redux-thunk';

import {
	startLoadingNotes,
	startNewNote,
	startSaveNote,
	startUploading,
} from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';

// Mocking the fileUpload promise inside startUploading
jest.mock('../../helpers/fileUpload.js', () => ({
	fileUpload: jest.fn(() => {
		return Promise.resolve('https://test.com/file.png');
	}),
}));

// Adding middlewares (thunk)
const middlewares = [thunk];
// Creating the mockStore with middlewares
const mockStore = configureStore(middlewares);
// Initial State
const initState = {
	auth: {
		uid: 'abc123',
	},
	notes: {
		active: {
			id: 'Hkxd2BXk1vSyZwnvQG7Y',
			title: 'Test title',
			body: 'Test body',
		},
	},
};
// Store
let store = mockStore(initState);

describe('Test in notes actions', () => {
	beforeEach(() => {
		store = mockStore(initState);
	});

	test('should add a new note', async () => {
		const payload = {
			id: expect.any(String),
			title: '',
			body: '',
			date: expect.any(Number),
		};
		// Dispatch the action startNewNote in order
		// To create a new note
		await store.dispatch(startNewNote());
		// Get the actions values
		const actions = store.getActions();
		// Verify if first action is setting the active note
		expect(actions[0]).toEqual({
			type: types.notesActive,
			payload: payload,
		});
		// Verify if second action is adding a new note
		expect(actions[1]).toEqual({
			type: types.notesAddNew,
			payload: payload,
		});
		// Set note id from actions
		const docId = actions[1].payload.id;
		// Delete action after tests
		await db.doc(`abc123/journal/notes/${docId}`).delete();
	});

	test('startLoadingNotes should load all the notes', async () => {
		await store.dispatch(startLoadingNotes('abc123'));

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.notesLoad,
			payload: expect.any(Array),
		});
		// Set the expected object
		// It can be as specific as we want
		const expected = {
			// It can be a given id
			id: expect.any(String),
			title: expect.any(String),
			body: expect.any(String),
			date: expect.any(Number),
		};
		// Check if payload is as we expected
		expect(actions[0].payload[0]).toMatchObject(expected);
	});

	test('startSaveNote should update the note ', async () => {
		const note = {
			id: 'Hkxd2BXk1vSyZwnvQG7Y',
			title: 'Test title',
			body: 'Test body',
		};

		await store.dispatch(startSaveNote(note));

		const actions = store.getActions();
		// Checks if the action type are the same
		expect(actions[0].type).toBe(types.notesUpdated);
		// Checks if the title has changed
		const docRef = await db.doc(`abc123/journal/notes/${note.id}`).get();
		expect(docRef.data().title).toBe(note.title);
	});

	test('startUploading should update the entry url', async () => {
		const file = new File([], 'foto.png');

		await store.dispatch(startUploading(file));

		const docRef = await db
			.doc('/abc123/journal/notes/Hkxd2BXk1vSyZwnvQG7Y')
			.get();

		expect(docRef.data().url).toBe('https://test.com/file.png');
	});
});
