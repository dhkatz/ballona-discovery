import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Dashboard, Login, Layout } from './views';
import { Home } from './views/Home';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="dashboard/*" element={<Dashboard />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
