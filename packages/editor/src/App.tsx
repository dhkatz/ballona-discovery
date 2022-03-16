import React from 'react';
import { Editor } from './components';
import { Card } from './Card';

export const App = () => {
	return (
		<Editor components={[Card]}>
			<Editor.Toolbox />
			<h1>Canvas 1</h1>
			<Editor.Canvas />
			<h1>Canvas 2</h1>
			<Editor.Canvas />
			<Editor.Settings />
		</Editor>
	);
};
