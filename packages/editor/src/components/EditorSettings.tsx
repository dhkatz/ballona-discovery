import React, { useMemo } from 'react';
import { useEditor } from '../hooks';

export const EditorSettings = () => {
	const { selected, find, items } = useEditor();

	const item = useMemo(() => {
		if (selected === null) {
			return null;
		}

		const index = find(selected);

		if (index === -1) {
			return null;
		}

		return items[index];
	}, [selected, find]);

	const inputs = useMemo(() => {
		if (item === null) {
			return [];
		}

		return item.component.editor.inputs;
	}, [item]);

	return <div>EditorSettings</div>;
};
