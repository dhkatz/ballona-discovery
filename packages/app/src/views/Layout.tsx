import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import { Navigation } from '../components';

export const Layout = () => {
	return (
		<>
			<header>
				<Navigation />
			</header>
			<main>
				<Outlet />
			</main>
			<footer>
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
		</>
	);
};
