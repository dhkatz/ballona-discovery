import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, Route, Routes } from 'react-router-dom';

import { UserManagement } from '../Users/UserManagement';
import { RoleManagement } from '../Roles/RoleManagement';
import { PanelManagement } from '../Panels/PanelManagement';
import { TourManagement } from '../Tours/TourManagement';
import {
	Easel2Fill,
	PeopleFill,
	PostcardFill,
	ShieldLockFill,
	Signpost2Fill,
} from 'react-bootstrap-icons';
import { AuditManagement } from '../Audit/AuditManagement';

export const Dashboard = () => {
	return (
		<div>
			<Navbar
				className={'px-4'}
				collapseOnSelect
				expand={'lg'}
				bg={'secondary'}
				variant={'dark'}
			>
				<Navbar.Brand as={NavLink} to={''} className={'text-primary'}>
					Dashboard
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-cms" />
				<Navbar.Collapse id="responsive-navbar-cms">
					<Nav className={'w-100'}>
						<Nav.Item>
							<Nav.Link className="text-primary" as={NavLink} to={'users'}>
								<PeopleFill className={'mx-2 mb-1'} />
								Users
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link className="text-primary" as={NavLink} to={'roles'}>
								<ShieldLockFill className={'mx-2 mb-1'} />
								Roles
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link className="text-primary" as={NavLink} to={'tours'}>
								<Signpost2Fill className={'mx-2 mb-1'} />
								Tours
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link className="text-primary" as={NavLink} to={'panels'}>
								<Easel2Fill className={'mx-2 mb-1'} />
								Panels
							</Nav.Link>
						</Nav.Item>

						<Nav.Item className={'ms-lg-auto'}>
							<Nav.Link className="text-primary" as={NavLink} to={'audit'}>
								<PostcardFill className={'mx-2 mb-1'} />
								Audit Logs
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Container>
				<Routes>
					<Route index element={<h1>Hello!</h1>} />
					<Route path="/users" element={<UserManagement />} />
					<Route path="/roles" element={<RoleManagement />} />
					<Route path={'/tours/*'} element={<TourManagement />} />
					<Route path={'/panels/*'} element={<PanelManagement />} />
					<Route path={'/audit'} element={<AuditManagement />} />
				</Routes>
			</Container>
		</div>
	);
};
