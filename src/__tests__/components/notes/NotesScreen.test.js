import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
// It is a mock store for testing Redux async action creators and middlewares
import configureStore from 'redux-mock-store';
// React middleware for Redux.
import thunk from 'redux-thunk';

import { NotesScreen } from '../../../components/notes/NotesScreen';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
	activeNote: jest.fn(),
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
			id: 121321,
			title: 'Test title',
			body: 'Test body',
			date: 12,
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
		<NotesScreen />
	</Provider>
);

describe('Tests in <NotesScreen />', () => {
	test('should be displayed correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('should call activeNote', () => {
		wrapper.find('input[name="title"]').simulate('change', {
			target: {
				name: 'title',
				value: 'Test changed',
			},
		});

		expect(activeNote).toHaveBeenCalled();
		expect(activeNote).toHaveBeenLastCalledWith(121321, {
			id: 121321,
			title: 'Test changed',
			body: 'Test body',
			date: 12,
		});
	});
});
