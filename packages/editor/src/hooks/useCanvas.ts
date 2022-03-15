import { useContext } from 'react';

import { CanvasContext } from '../context';

export const useCanvas = () => {
	const canvas = useContext(CanvasContext);

	if (!canvas) {
		throw new Error('useCanvas() cannot be used outside of the EditorCanvas component.');
	}

	return canvas;
};
