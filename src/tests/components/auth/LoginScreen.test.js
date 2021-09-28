import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';

// It is a mock store for testing Redyx async action creators and middlewares
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
// React middleware for Redux.

import { LoginScreen } from '../../../components/auth/LoginScreen';
import {
	startGoogleLogin,
	startLoginEmailPassword,
} from '../../../actions/auth';

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
};
// Store
let store = mockStore(initState);
// mocking store dispatch
store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		{/* It simulates the router */}
		<MemoryRouter>
			<LoginScreen />
		</MemoryRouter>
	</Provider>
);

jest.mock('../../../actions/auth', () => ({
	startGoogleLogin: jest.fn(),
	startLoginEmailPassword: jest.fn(),
}));

describe('Tests in <LoginScreen />', () => {
	beforeEach(() => {
		store = mockStore(initState);
		jest.clearAllMocks();
	});

	test('should be displayed correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('should invoque startGoogleLogin action', () => {
		wrapper.find('.google-btn').prop('onClick')();

		expect(startGoogleLogin).toHaveBeenCalled();
	});

	test('should invoque startLogin with default args', () => {
		wrapper.find('form').prop('onSubmit')({ preventDefault() {} });
		expect(startLoginEmailPassword).toHaveBeenCalledWith('','');
	});
});
