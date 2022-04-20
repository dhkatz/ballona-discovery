import React, { ElementType, FunctionComponent } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useCollection } from '../../hooks';

const NavLink = Link as unknown as ElementType & 'a'; // Hack to make Link work with Button

/**
 * Displays a list of the created tour.
 */
export const TourList: FunctionComponent = () => {
	const [tours, { loading }] = useCollection('tours');

	if (loading) {
		return (
			<div className="d-flex justify-content-center">
				<TailSpin color={'#192A6BFF'} />
			</div>
		);
	}

	const cards = tours?.map((tour, i) => {
		return (
			<Col key={i}>
				<Card className="h-100">
					<Card.Body>
						<Card.Title>{tour.title ?? 'Untitled Tour'}</Card.Title>
						<Card.Text>{tour.description ?? 'No Description'}</Card.Text>
						<Card.Text>{`${tour.panels?.length ?? 0} Panels`}</Card.Text>
						<ButtonGroup>
							<Button as={NavLink} to={`${tour.id}`} variant="secondary">
								View
							</Button>
							<Button as={NavLink} to={`${tour.id}/edit`} variant="secondary">
								Edit
							</Button>
						</ButtonGroup>
					</Card.Body>
				</Card>
			</Col>
		);
	});

	return (
		<Row cols={1} md={4} className="gy-4">
			{cards}
		</Row>
	);
};
