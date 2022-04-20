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
 * Displays a list of the created tour panels.
 */
export const PanelList: FunctionComponent = () => {
	const [panels, { loading }] = useCollection('panels');

	if (loading) {
		return (
			<div className="d-flex justify-content-center">
				<TailSpin color={'#192A6BFF'} />
			</div>
		);
	}

	const cards = panels?.map((panel, i) => {
		return (
			<Col key={i}>
				<Card className="h-100">
					<Card.Body>
						<Card.Title>{panel.title ?? 'Untitled Panel'}</Card.Title>
						<Card.Text>{panel.description ?? 'No Description'}</Card.Text>
						<ButtonGroup>
							<Button as={NavLink} to={`${panel.id}`} variant="secondary">
								View
							</Button>
							<Button as={NavLink} to={`${panel.id}/edit`} variant="secondary">
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
