import React, { FunctionComponent } from 'react';
import { useCollection } from '../../hooks';
import { Card, Col, Row } from 'react-bootstrap';

/**
 * Displays a list of the created tour panels.
 */
export const PanelList: FunctionComponent = () => {
	const [panels, { loading }] = useCollection('panels');

	const cards = panels?.map((panel, i) => {
		return (
			<Col key={i}>
				<Card>
					<Card.Body>
						<Card.Title>{panel.title}</Card.Title>
						<Card.Text>{panel.description}</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		);
	});

	return (
		<Row cols={1} md={3}>
			{loading ? <h1>Loading...</h1> : cards}
		</Row>
	);
};
