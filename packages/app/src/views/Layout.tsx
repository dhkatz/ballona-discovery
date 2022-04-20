import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import { Navigation } from '../components';

export const Layout = () => {
	return (
		<div className="d-flex flex-column h-100">
			<header className="flex-grow-0 flex-shrink-1">
				<Navigation />
			</header>
			<main className="flex-fill">
				<Outlet />
			</main>
			<footer className="flex-grow-0 flex-shrink-1">
				<Container>
					<Row>
						<Col sm="4">
							<div className="text-center">
								<p>PO Box 5159 Playa del Rey, CA 90296</p>
							</div>
						</Col>
						<Col sm="3">
							<div className="text-center">
								<p>(310) 306-5994</p>
							</div>
						</Col>
						<Col sm="2">
							<div className="text-center">
								<p>Contact Us﻿</p>
							</div>
						</Col>
						<Col sm="3">
							<div className="text-center">
								<p>Photography Credits</p>
							</div>
						</Col>
					</Row>
				</Container>
			</footer>
		</div>
	);
};
