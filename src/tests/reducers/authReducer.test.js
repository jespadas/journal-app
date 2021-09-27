import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Test in authReducer', () => {
	test('should make login ', () => {
		// Init state
		const initialState = {};
		// Def action
		const action = {
			// Types import
			type: types.login,
			// Def payload
			payload: {
				uid: 'abc',
				displayName: 'Julio',
			},
		};
		// Def state with authReducer
		const state = authReducer(initialState, action);

		// Test with toEqual because it compares two objects
		expect(state).toEqual({
			uid: 'abc',
			name: 'Julio',
		});
	});

	test('should make logout ', () => {
		// Init state
		const initialState = {
			uid: 'abc',
			name: 'Julio',
		};
		// Def action
		const action = {
			// Types import
			type: types.logout,
		};
		// Def state with authReducer
		const state = authReducer(initialState, action);

		// Test with toEqual because it compares two objects 
		expect(state).toEqual({});
	});

    test('should not change the state ', () => {
		// Init state
		const initialState = {
			uid: 'abc',
			name: 'Julio',
		};
		// Def action
		const action = {
			// Types import
			type: 'nothing to change...',
		};
		// Def state with authReducer
		const state = authReducer(initialState, action);

		// Test with toEqual because it compares two objects 
		expect(state).toEqual(initialState);
	});

});
