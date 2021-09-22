import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = ({ date }) => {
	const noteDate = moment(date);

	const dispatch = useDispatch();

	const { active } = useSelector((state) => state.notes);

	const handleSave = () => {
		dispatch(startSaveNote(active));
	};

	const handlePicture = () => {
		document.querySelector('#fileSelector').click();
	};

	const handleFile = (e) => {
		const file = e.target.files[0];
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
