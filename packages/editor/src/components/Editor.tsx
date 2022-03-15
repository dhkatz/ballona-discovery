import React, {
	memo,
	NamedExoticComponent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import { EditorContext } from '../context';
import { EditorComponent, EditorObject } from '../types';

import { EditorItem } from './EditorItem';
import { EditorSettings } from './EditorSettings';
import { EditorToolbox } from './EditorToolbox';
import { EditorCanvas } from './EditorCanvas';

export type EditorProps = {
	components: EditorComponent<any>[];
	children?: React.ReactNode;
};

type Editor = NamedExoticComponent<EditorProps> & {
	Item: typeof EditorItem;
	Settings: typeof EditorSettings;
	Toolbox: typeof EditorToolbox;
	Canvas: typeof EditorCanvas;
};

export const Editor: Editor = memo(({ components, children }) => {
	const [selected, setSelected] = useState<EditorObject | null>(null);
	const [canvases, setCanvases] = useState<any[]>([]);

	const select = useCallback((object: EditorObject | null) => {
		setSelected(object);
	}, []);

	const register = useCallback((canvas: any) => {
		setCanvases((c) => update(c, { $push: [canvas] }));
	}, []);

	const unregister = useCallback((canvas: any) => {
		setCanvases((c) => update(c, { $splice: [[c.indexOf(canvas), 1]] }));
	}, []);

	const editor = useMemo(
		() => ({
			components,
			selected,
			select,
			register,
			unregister,
		}),
		[components, selected, select]
	);

	return (
		<div>
			<DndProvider backend={HTML5Backend}>
				<EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
			</DndProvider>
		</div>
	);
}) as Editor;

Editor.Item = EditorItem;
Editor.Settings = EditorSettings;
Editor.Toolbox = EditorToolbox;
Editor.Canvas = EditorCanvas;
