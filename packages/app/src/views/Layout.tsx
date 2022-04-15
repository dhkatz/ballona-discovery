import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import { Navigation } from '../components';

export const Layout = () => {
	return (
		<Container>
			<header>
				<Navigation />
			</header>
			<main>
				<Outlet />
			</main>
			<footer>Footer</footer>
		</Container>
	);
};
