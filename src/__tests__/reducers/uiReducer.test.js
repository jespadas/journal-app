import { uiReducer } from '../../reducers/uiReducer';
import { types } from '../../types/types';

describe('Test in uiReducer', () => {
	test('should make set the error message ', () => {
		// Init state
		const initialState = { msgError: 'Error' };
		// Def action
		const action = {
			// Types import
			type: types.uiSetError,
			// Def payload
			payload: {
				msgError: 'Error',
			},
		};
		// Def state with authReducer
		const state = uiReducer(initialState, action.payload);

		// Test with toEqual because it compares two objects
		expect(state).toEqual({
			msgError: 'Error',
		});
	});

	test('should remove the error message ', () => {
		// Init state
		const initialState = {
			msgError: 'Error',
		};
		// Def action
		const action = {
			// Types import
			type: types.uiRemoveError,
			msgError: null,
		};
		// Def state with authReducer
		const state = uiReducer(initialState, action);

		// Test with toEqual because it compares two objects
		expect(state).toEqual({ msgError: null });
	});

	test('should start the loader spinner ', () => {
		// Init state
		const initialState = {
			loading: false,
		};
		// Def action
		const action = {
			// Types import
			type: types.uiStartLoading,
			loading: true,
		};
		// Def state with authReducer
		const state = uiReducer(initialState, action);

		// Test with toEqual because it compares two objects
		expect(state).toEqual({ loading: true });
	});

	test('should remove the loader spinner ', () => {
		// Init state
		const initialState = {
			loading: true,
		};
		// Def action
		const action = {
			// Types import
			type: types.uiFinishLoading,
			loading: false,
		};
		// Def state with authReducer
		const state = uiReducer(initialState, action);

		// Test with toEqual because it compares two objects
		expect(state).toEqual({ loading: false });
	});
});
