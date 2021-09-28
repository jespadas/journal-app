import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

// It is a mock store for testing Redux async action creators and middlewares
import configureStore from 'redux-mock-store';
// React middleware for Redux.
import thunk from 'redux-thunk';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

// Adding middlewares (thunk)
const middlewares = [thunk];
// Creating the mockStore with middlewares
const mockStore = configureStore(middlewares);
const initState = {};
// Store
let store = mockStore(initState);
// mocking store dispatch
store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 12,
    title: "Test title",
    body: "Test body",
    url: "https://test.com/test.png"
}

const wrapper = mount(
	<Provider store={store}>
		<JournalEntry {...note}/>
	</Provider>
);

describe('Tests in <JournalEntry />', () => {
	
    test('should be displayed correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should activate the note', () => {
        wrapper.find('.journal__entry').prop('onClick')();

        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(activeNote(note.id, {...note}));

    })
    

});
