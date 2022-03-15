import React from 'react';
import { EditorComponent, inputs } from './types';

export type CardProps = {
	text?: string;
};

export const Card: EditorComponent<CardProps> = ({ text, ...props }) => {
	return (
		<div
			style={{
				border: '1px dashed gray',
				padding: '0.5rem 1rem',
				marginBottom: '0.5rem',
				backgroundColor: 'white',
			}}
			{...props}
		>
			{text}
		</div>
	);
};

Card.editor = {
	name: 'Card',
	props: [inputs.text('Text', 'Hello, world!')],
};
