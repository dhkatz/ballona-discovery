import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import { UserManagement } from './UserManagement';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { PanelManagement } from '../Panels/PanelManagement';

export const Dashboard = () => {
	return (
		<div>
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
			<Container>
				<Routes>
					<Route path="/" element={<h1>Hello!</h1>} />
					<Route path="/users" element={<UserManagement />} />
					<Route path="/panels/*" element={<PanelManagement />} />
				</Routes>
			</Container>
		</div>
	);
};
