import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegistrerScreen = () => {
	// Set dispatch to use it
	const dispatch = useDispatch();

	// Get the msgError state data from state.ui.msgError
	const { msgError } = useSelector((state) => state.ui);

	// Custom hook to manage the form
	const [formValues, handleInputChange] = useForm({
		name: '',
		email: '',
		password: '',
		confirmPass: '',
	});

	// Destructuring the data in formValues to obtain
	// email and password, name and password confirmation
	const { name, email, password, confirmPass } = formValues;

	// Handles the register submit
	const handleRegister = (e) => {
		// Prevents the browser refresh
		e.preventDefault();
		// Checks if form is valid
		if (isFormValid()) {
			// If ok it dispatch the action to login with the
			// form submited data
			dispatch(startRegisterWithEmailPasswordName(email, password, name));
		}
	};

	// Verifys it data in form is ok, it returns false if not and true if is ok
	const isFormValid = () => {
		// If there is no name it shows an Error message
		if (name.trim().length === 0) {
			dispatch(setError('Name is required'));
			return false;
			// If there is no email correct sintax it shows and
			// Error message
		} else if (!validator.isEmail(email)) {
			dispatch(setError('Email is not valid'));
			return false;
			// If the password and its confirmation are not equals or
			// dont have at least 5 characters shows an Error message
		} else if (password !== confirmPass || password.length < 5) {
			dispatch(
				setError(
					'Password should be at least 6 characters and should match each other'
				)
			);
			return false;
		}
		// Dispatch action to remove the Error message
		dispatch(removeError());
		return true;
	};

	return (
		<>
			<h1 className='auth__title'>Register</h1>

			<form onSubmit={handleRegister}>
				{msgError && <div className='auth__alert-error'>{msgError}</div>}
				<input
					type='text'
					placeholder='Name'
					name='name'
					className='auth__input'
					autoComplete='off'
					onChange={handleInputChange}
					value={name}
				/>
				<input
					type='text'
					placeholder='Email'
					name='email'
					className='auth__input'
					autoComplete='off'
					onChange={handleInputChange}
					value={email}
				/>

				<input
					type='password'
					placeholder='Password'
					name='password'
					className='auth__input'
					onChange={handleInputChange}
					autoComplete='off'
					value={password}
				/>

				<input
					type='password'
					placeholder='Confirm password'
					name='confirmPass'
					className='auth__input'
					onChange={handleInputChange}
					autoComplete='off'
					value={confirmPass}
				/>

				<button type='submit' className='btn btn-primary btn-block mb-5'>
					Register
				</button>

				<Link to='/auth/login' className='link'>
					Already registered ?
				</Link>
			</form>
		</>
	);
};
