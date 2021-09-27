import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

export const LoginScreen = () => {
	// Set dispatch to use it
	const dispatch = useDispatch();

	// Get the loading state data from state.ui.loading
	const { loading } = useSelector((state) => state.ui);

	// Custom hook to manage the form
	const [formValues, handleInputChange] = useForm({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	// Destructuring the data in formValues to obtain
	// email and password
	const { email, password } = formValues;

	// Handles the login action on submit
	const handleLogin = (e) => {
		// Prevents the browser refresh
		e.preventDefault();
		// Dispatch the action with user credentials
		dispatch(startLoginEmailPassword(email, password));
	};

	// Handles the login action with Google credentials
	const handleGoogleLogin = () => {
		// Dispatch the Google login action
		dispatch(startGoogleLogin());
	};

	return (
		<>
			<h1 className='auth__title'>Login</h1>
			<form onSubmit={handleLogin}>
				<input
					type='text'
					placeholder='Email'
					name='email'
					className='auth__input'
					autoComplete='off'
					value={email}
					onChange={handleInputChange}
				/>

				<input
					type='password'
					placeholder='Password'
					name='password'
					className='auth__input'
					autoComplete='off'
					value={password}
					onChange={handleInputChange}
				/>
				<button
					type='submit'
					className='btn btn-primary btn-block'
					disabled={loading}
				>
					Login
				</button>

				<hr />

				<div className='auth__social-networks'>
					<p>Login with social networks</p>

					<div className='google-btn' onClick={handleGoogleLogin}>
						<div className='google-icon-wrapper'>
							<img
								className='google-icon'
								src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
								alt='google button'
							/>
						</div>

						<p className='btn-text'>
							<b>Sign in with Google</b>
						</p>
					</div>
				</div>

				<Link to='/auth/register' className='link'>
					Create new account
				</Link>
			</form>
		</>
	);
};
