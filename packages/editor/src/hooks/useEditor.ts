import { useContext } from 'react';

import { EditorContext } from '../context';

export const useEditor = () => {
	const editor = useContext(EditorContext);

	if (!editor) {
		throw new Error('useEditor() cannot be used outside of the Editor component.');
	}

	return editor;
};
