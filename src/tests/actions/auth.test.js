// It is a mock store for testing Redyx async action creators and middlewares
import configureStore from 'redux-mock-store';
// React middleware for Redux.
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

// Adding middlewares (thunk)
const middlewares = [thunk];
// Creating the mockStore with middlewares
const mockStore = configureStore(middlewares);
const initState = {};
// Store
let store = mockStore(initState);

describe('Tests in auth actions', () => {

    beforeEach(()=> {
        store = mockStore(initState);
    });

	test('login and logour should create their actions ', async () => {
		const uid = 'abc123';
		const displayName = 'Julio';

		const loginAction = login(uid, displayName);
		const logoutAction = logout();

		expect(loginAction).toEqual({
			type: types.login,
			payload: {
				uid,
				displayName,
			},
		});

		expect(logoutAction).toEqual({
			type: types.logout,
		});
	});

    test('should do startLogout', async () => {
        
        await store.dispatch(startLogout());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.logout
        });

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        });

    });

    test('should init startLoginEmailPassword', async () => {
        
        await store.dispatch(startLoginEmailPassword('test@test.com', '123456'));

        const actions = store.getActions();

        //console.log(actions);

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'QZKRPs8EyOgG4gqj3LqtJz9bmRx2',
                displayName: null
            }
        });

    });
    
});
