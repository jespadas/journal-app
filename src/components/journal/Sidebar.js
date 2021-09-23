import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {
	// Get the name from state.auth.name
	const { name } = useSelector((state) => state.auth);

	// Set dispatch to use it
	const dispatch = useDispatch();

	// Handles the logout onCLick
	const handleLogout = () => {
		// Dispatch the start of logout action
		dispatch(startLogout());
	};
	
	// Handles the new entry onClick
	const handleNewEntry = () => {
		// Dispatch the start of adding a new note action
		dispatch(startNewNote());
	};

	return (
		<aside className='journal__sidebar'>
			<div className='journal__sidebar-navbar'>
				<h3 className='mt-5'>
					<i className='far fa-moon'></i>
					<span> {name}</span>
				</h3>
				<button className='btn' onClick={handleLogout}>
					Logout
				</button>
			</div>
			<div className='journal__new-entry' onClick={handleNewEntry}>
				<i className='far fa-calendar-plus fa-5x'></i>
				<p className='mt-5'>New entry</p>
			</div>
			<JournalEntries />
		</aside>
	);
};
