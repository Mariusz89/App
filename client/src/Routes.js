import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import Private from './core/Private';
import PrivateRoute from './auth/PrivateRoute';


const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={App} />
			<Route path="/signup" exact component={Signup} />
			<Route path="/signin" exact component={Signin} />
			<Route path="/auth/activate/:token" exact component={Activate} />
			<PrivateRoute path="/private" exact component={Private} />
		</Switch>
	</BrowserRouter>
);

export default Routes;