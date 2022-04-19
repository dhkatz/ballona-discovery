import React, { FunctionComponent } from 'react';
import { Carousel, Container } from 'react-bootstrap';

const IMAGES = [
	'https://playavista.com/shared/2016/02/PlayaVista_0923.jpg?x49818',
	'https://playavista.com/shared/2016/02/PlayaVista_0923.jpg?x49818',
	'https://playavista.com/shared/2016/02/PlayaVista_0923.jpg?x49818',
];

export const Home: FunctionComponent = () => {
	return (
		<Container>
			<Carousel interval={3000} fade>
				{IMAGES.map((image, index) => (
					<Carousel.Item key={index}>
						<img
							className="d-block w-100"
							src={image}
							alt="Image of Ballona Wetlands"
						/>
					</Carousel.Item>
				))}
			</Carousel>
		</Container>
	);
};
