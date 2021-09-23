import { firebase } from '../firebase/firebase-config';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoutes';
import { PrivateRoute } from './PrivateRoutes';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
	// Dispatch instance
	const dispatch = useDispatch();

	// States
	const [checking, setChecking] = useState(true);
	const [isLogged, setIsLogged] = useState(false);

	// Effect if user credentials has changed
	useEffect(() => {
		// Connection to firebase
		firebase.auth().onAuthStateChanged(async (user) => {
			// If there is an user it get its id
			if (user?.uid) {
				// Dispatch the new user credentials
				dispatch(login(user.uid, user.displayName));
				// Set logged as true
				setIsLogged(true);
				// Dispatch the action to get the user notes
				dispatch(startLoadingNotes(user.uid));
				// If not it sets logged as false
			} else {
				setIsLogged(false);
			}
			// Set checking state as false to stop loading spinner gif
			setChecking(false);
		});
	}, [dispatch, setChecking, setIsLogged]);

	// If checking it shows the loading spinner gif
	if (checking) {
		return (
			<img
				src='https://c.tenor.com/0iK9a1WkT40AAAAC/loading-white.gif'
				style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
				alt=''
			/>
		);
	}

	return (
		<Router>
			<div>
				<Switch>
					<PublicRoute
						isAuthenticated={isLogged}
						path='/auth'
						component={AuthRouter}
					/>

					<PrivateRoute
						isAuthenticated={isLogged}
						exact
						path='/'
						component={JournalScreen}
					/>

					<Redirect to='/auth/login' />

					<AuthRouter />
				</Switch>
			</div>
		</Router>
	);
};
