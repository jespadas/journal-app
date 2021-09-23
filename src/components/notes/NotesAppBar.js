import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = ({ date }) => {
	// Formatting the date
	const noteDate = moment(date);

	// Set dispatch to use it
	const dispatch = useDispatch();

	// Get the active state data from state.notes.active
	const { active } = useSelector((state) => state.notes);

	// Handles saving the note onClick action
	const handleSave = () => {
		// Dispatch the start of saving a note action with
		// The active note info
		dispatch(startSaveNote(active));
	};

	// Handles the selection window to pick a file
	const handlePicture = () => {
		document.querySelector('#fileSelector').click();
	};

	// Handles the selected file action
	const handleFile = (e) => {
		// Get the file data
		const file = e.target.files[0];
		// If there is a file it dispatch it to the
		// Start uploading action with the file data
		if (file) {
			dispatch(startUploading(file));
		}
	};

	return (
		<div className='notes__appbar'>
			<span>{noteDate.format('MMM / D / YYYY')}</span>
			<input
				id='fileSelector'
				type='file'
				name='file'
				style={{ display: 'none' }}
				onChange={handleFile}
			/>
			<div>
				<button className='btn' onClick={handlePicture}>
					Picture
				</button>
				<button className='btn' onClick={handleSave}>
					Save
				</button>
			</div>
		</div>
	);
};
