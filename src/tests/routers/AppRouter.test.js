import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';

// It is a mock store for testing Redux async action creators and middlewares
import configureStore from 'redux-mock-store';
// React middleware for Redux.
import thunk from 'redux-thunk';

import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { firebase } from '../../firebase/firebase-config';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
	fire: jest.fn(),
}));

jest.mock('../../actions/auth', () => ({
	login: jest.fn(),
}));

// Adding middlewares (thunk)
const middlewares = [thunk];
// Creating the mockStore with middlewares
const mockStore = configureStore(middlewares);
const initState = {
	auth: {},
	ui: {
		loading: false,
		msgError: null,
	},
	notes: {
		active: {
			id: '121321',
		},
		notes: [],
	},
};
// Store
let store = mockStore(initState);
// mocking store dispatch
store.dispatch = jest.fn();

describe('Tests in <AppRouter />', () => {
	test('should call login if authenticated', async () => {
		let user;

		await act(async () => {
			const userCred = await firebase
				.auth()
				.signInWithEmailAndPassword('test@test.com', '123456');
			user = userCred.user;

			const wrapper = mount(
				<Provider store={store}>
					<MemoryRouter>
						<AppRouter />
					</MemoryRouter>
				</Provider>
			);
		});

		expect(login).toHaveBeenCalled();
		expect(login).toHaveBeenCalledWith("QZKRPs8EyOgG4gqj3LqtJz9bmRx2", null);

	});
});
