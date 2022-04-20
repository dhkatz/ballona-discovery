import React, { FunctionComponent } from 'react';
import { useCollection } from '../../hooks';
import { Button, Card, Col, Row } from 'react-bootstrap';

/**
 * Displays a list of the created tour panels.
 */
export const PanelList: FunctionComponent = () => {
	const [panels, { loading, error }] = useCollection('panels');

	const cards = panels?.map((panel, i) => {
		return (
			<Col key={i}>
				<Card className="h-100">
					<Card.Body>
						<Card.Title>{panel.title ?? 'Untitled Panel'}</Card.Title>
						<Card.Text>{panel.description ?? 'No Description'}</Card.Text>
						<Button variant="primary">Edit</Button>
					</Card.Body>
				</Card>
			</Col>
		);
	});

	console.log(panels, error);

	return (
		<Row cols={1} md={4}>
			{loading ? <h1>Loading...</h1> : cards}
		</Row>
	);
};
