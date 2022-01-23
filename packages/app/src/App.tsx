import React from 'react';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Container} from 'react-bootstrap';

import {Navigation} from './components/Navigation';
import {Login} from './views';

function App() {
	return (
		<Router>
			<Container>
				<header>
					<Navigation/>
				</header>
				<main>
					<Routes>
						<Route path={'/login'} element={<Login/>}/>
					</Routes>
				</main>
				<footer>Footer</footer>
			</Container>
		</Router>
	);
}

export default App;
