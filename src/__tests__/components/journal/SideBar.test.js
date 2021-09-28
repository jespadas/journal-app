import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

// It is a mock store for testing Redux async action creators and middlewares
import configureStore from 'redux-mock-store';
// React middleware for Redux.
import thunk from 'redux-thunk';

import { startLogout } from '../../../actions/auth';
import { Sidebar } from '../../../components/journal/Sidebar';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
	startLogout: jest.fn(),
}));

jest.mock('../../../actions/notes', () => ({
	startNewNote: jest.fn(),
}));

// Adding middlewares (thunk)
const middlewares = [thunk];
// Creating the mockStore with middlewares
const mockStore = configureStore(middlewares);
const initState = {
	auth: {
		uid: '1',
		name: 'Julio',
	},
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

const wrapper = mount(
	<Provider store={store}>
		<Sidebar />
	</Provider>
);

describe('Tests in <SideBar />', () => {
	test('should be displayed correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('should call logout', async () => {
		wrapper.find('button').prop('onClick')();

		expect(startLogout).toHaveBeenCalled();
	});

	test('should call startNewNote', () => {
		wrapper.find('.journal__new-entry').prop('onClick')();
        
		expect(startNewNote).toHaveBeenCalled();
	});
});
