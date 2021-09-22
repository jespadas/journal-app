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
	const dispatch = useDispatch();

	const [checking, setChecking] = useState(true);
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName));
				setIsLogged(true);
				dispatch(startLoadingNotes(user.uid));
			} else {
				setIsLogged(false);
			}

			setChecking(false);
		});
	}, [dispatch, setChecking, setIsLogged]);

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
