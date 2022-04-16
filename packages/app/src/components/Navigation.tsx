import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import logo from '../images/logo.png';
import { useAuth } from '../hooks';

export const Navigation = () => {
	const [auth] = useAuth();

	const rightNav = auth ? (
		<Nav>
			<Nav.Link as={NavLink} to={'/dashboard'}>
				Dashboard
			</Nav.Link>
			<Nav.Link as={NavLink} to="/logout">
				Logout
			</Nav.Link>
		</Nav>
	) : (
		<Nav>
			<Nav.Link as={NavLink} to="/login">
				Login
			</Nav.Link>
		</Nav>
	);

	return (
		<Navbar variant={'light'}>
			<Navbar.Brand>
				<img
					alt={'Ballona Wetlands logo'}
					src={logo}
					style={{ maxWidth: '180px' }}
					className={'d-inline-block align-top'}
				/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls={'navigation'} />
			<Navbar.Collapse id={'navigation'}>
				<Nav className={'me-auto'}>
					<Nav.Link>Tours</Nav.Link>
				</Nav>
				{rightNav}
			</Navbar.Collapse>
		</Navbar>
	);
};
