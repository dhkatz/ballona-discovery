import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import { UserManagement } from './UserManagement';
import { RoleManagement } from './RoleManagement';
import { Container, Nav, Navbar } from 'react-bootstrap';

export const Dashboard = () => {
	return (
		<Container fluid={true}>
			<Navbar collapseOnSelect expand={'lg'} bg={'secondary'} variant={'dark'}>
				<Navbar.Brand as={NavLink} to={''} className={'text-primary'}>
					Dashboard
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-cms" />
				<Navbar.Collapse id="responsive-navbar-cms">
					<Nav>
						<Nav.Item>
							<Nav.Link className="text-primary" as={NavLink} to={'users'}>
								Users
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link className="text-primary" as={NavLink} to={'roles'}>
								Roles
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link className="text-primary" as={NavLink} to={'tours'}>
								Tours
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link className="text-primary" as={NavLink} to={'panels'}>
								Panels
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Routes>
				<Route path="/" element={<h1>Hello!</h1>} />
				<Route path="/users" element={<UserManagement />} />
				<Route path="/roles" element={<RoleManagement />} />
			</Routes>
		</Container>
	);
};
