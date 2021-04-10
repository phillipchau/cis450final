import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import FindFriends from './FindFriends';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							exact
							path="/dashboard"
							render={() => (
								<Dashboard />
							)}
						/>
						{/* ---- Part 2 (FindFriends) ---- */}
            <Route
							exact
							path="/FindFriends"
							render={() => (
								<FindFriends />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}