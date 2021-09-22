import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NotesScreen = () => {
	const dispatch = useDispatch();

	const { active: note } = useSelector((state) => state.notes);

	const [formValues, handleInputChange, reset] = useForm(note);

	const { title, body, id } = formValues;

	// We save mutable variable value to compare if it changes
	const activeId = useRef(note.id);

	useEffect(() => {
		if (note.id !== activeId.current) {
			reset(note);
			activeId.current = note.id;
		}
	}, [note, reset]);

	useEffect(() => {
		dispatch(activeNote(formValues.id, { ...formValues }));
	}, [formValues, dispatch]);

	const handleDelete = () => {
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
