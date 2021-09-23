import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NotesScreen = () => {
	// Set dispatch to use it
	const dispatch = useDispatch();

	// Get the active state data from state.notes.active
	const { active: note } = useSelector((state) => state.notes);

	// Custom hook to handle the form entries, it set the
	// Initial state with the notes data
	const [formValues, handleInputChange, reset] = useForm(note);

	// Get the title, body and it destructured
	const { title, body, id } = formValues;

	// We save mutable variable value to compare if it changes
	const activeId = useRef(note.id);

	// Effect to check if the active note are not the same with 
	// The selected note to delete
	useEffect(() => {
		// If there are not the same if reset the active note
		if (note.id !== activeId.current) {
			reset(note);
			// Set the note id in variable
			activeId.current = note.id;
		}
	}, [note, reset]);

	// Effect to update the state if formValues data has changed
	useEffect(() => {
		// If has changed it dispatch the new values to the active note
		dispatch(activeNote(formValues.id, { ...formValues }));
	}, [formValues, dispatch]);

	// Handles the delete action
	const handleDelete = () => {
		// Dispatch the start of deleting action with the note id to delete
		dispatch(startDeleting(id));
	};

	return (
		<div className='notes__main-content'>
			<NotesAppBar date={formValues.date} />
			<div className='notes__content'>
				<input
					autoFocus={true}
					className='notes__input-title'
					name='title'
					onChange={handleInputChange}
					placeholder='Entry your title'
					type='text'
					value={title}
				/>
				<textarea
					className='notes__textarea'
					name='body'
					onChange={(e) => handleInputChange(e)}
					placeholder='Entry content'
					value={body}
				></textarea>

				{note.url && (
					<div className='notes__image'>
						<img src={note.url} alt='' />
					</div>
				)}
			</div>

			<button className='btn btn-danger' onClick={handleDelete}>
				Delete
			</button>
		</div>
	);
};
