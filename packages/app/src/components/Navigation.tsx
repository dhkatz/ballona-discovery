import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { signOut } from 'firebase/auth';

import logo from '../images/logo.png';
import { useAuth, useFirebase } from '../hooks';

/**
 * Main navigation bar
 * @constructor
 */
export const Navigation: FunctionComponent = () => {
	const { auth } = useFirebase();
	const [user] = useAuth();

	const rightNav = user ? (
		<Nav>
			<Nav.Link as={NavLink} to={'/dashboard'}>
				Dashboard
			</Nav.Link>
			<Nav.Link onClick={() => signOut(auth)}>Logout</Nav.Link>
		</Nav>
	) : (
		<Nav>
			<Nav.Link as={NavLink} to="/login">
				Login
			</Nav.Link>
		</Nav>
	);

	return (
		<Navbar
			variant={'light'}
			style={{ maxWidth: '1150px' }}
			className={'mx-auto px-4 px-xl-0'}
			collapseOnSelect
			expand={'lg'}
		>
			<Navbar.Brand as={NavLink} to={'/'} className={'d-none d-lg-block'}>
				<img
					alt={'Ballona Wetlands logo'}
					src={logo}
					style={{ maxWidth: '180px' }}
					className={'d-inline-block align-top'}
				/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls={'navigation'} />
			<Navbar.Collapse id={'navigation'}>
				<Nav className={'me-lg-auto'}>
					<Nav.Link as={NavLink} to="/tours">
						Tours
					</Nav.Link>
				</Nav>
				{rightNav}
			</Navbar.Collapse>
		</Navbar>
	);
};
