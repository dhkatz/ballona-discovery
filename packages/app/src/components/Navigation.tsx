import { Nav, Navbar } from 'react-bootstrap';

import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
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
				<Nav className={'mr-auto'}>
					<Nav.Link>Tours</Nav.Link>
				</Nav>
				<Nav className={'ml-auto float-lg-right'}>
					<Nav.Link as={NavLink} to={'/dashboard'}>
						Dashboard
					</Nav.Link>
					<Nav.Link as={NavLink} to={'/login'}>
						Login
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
