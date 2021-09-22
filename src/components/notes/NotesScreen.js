import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NotesScreen = () => {
	return (
		<div className='notes__main-content'>
			<NotesAppBar />
			<div className='notes__content'>
				<input
					type='text'
					placeholder='Entry your title'
					className='notes__input-title'
					autoFocus={true}
				/>
				<textarea
					placeholder='Entry content'
					className='notes__textarea'
				></textarea>

				<div className='notes__image'>
					<img
						src='https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753_960_720.jpg'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};
