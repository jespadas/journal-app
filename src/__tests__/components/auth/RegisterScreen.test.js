import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';

import { RegistrerScreen } from '../../../components/auth/RegisterScreen';
// It is a mock store for testing Redux async action creators and middlewares
import configureStore from 'redux-mock-store';
// React middleware for Redux.
import thunk from 'redux-thunk';
import { types } from '../../../types/types';
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
//store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		{/* It simulates the router */}
		<MemoryRouter>
			<RegistrerScreen />
		</MemoryRouter>
	</Provider>
);

describe('Tests in <RegisterScreen />', () => {
	test('should be displayer correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('should dispatch the action', () => {
		const emailField = wrapper.find('input[name="email"]');
		const nameField = wrapper.find('input[name="name"]');

		emailField.simulate('change', {
			target: {
				value: 'test.com',
				name: 'email',
			},
		});
		nameField.simulate('change', {
			target: {
				value: 'test.com',
				name: 'name',
			},
		});
		wrapper.find('form').simulate('submit', {
			preventDefault() {},
		});

		const actions = store.getActions();

		//console.log(actions);

		expect(actions[0]).toEqual({
			type: types.uiSetError,
            payload: 'Email is not valid'
		});

	});

    test('should show alert message', () => {
            
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email is not valid',
            },
        };
        // Store
        const store = mockStore(initState);
        // mocking store dispatch
        //store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={store}>
                {/* It simulates the router */}
                <MemoryRouter>
                    <RegistrerScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError);

    });
    
});
