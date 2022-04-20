import React, { memo, NamedExoticComponent, useCallback, useMemo, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import update from 'immutability-helper';

import { EditorContext } from '../context';
import { CanvasState, EditorComponent, EditorObject, EditorState } from '../types';

import { EditorItem } from './EditorItem';
import { EditorSettings } from './EditorSettings';
import { EditorToolbox } from './EditorToolbox';
import { EditorCanvas } from './EditorCanvas';

export type EditorProps = {
	components: EditorComponent[];
	children?: React.ReactNode;
	className?: string;
};

type Editor = NamedExoticComponent<EditorProps> & {
	Item: typeof EditorItem;
	Settings: typeof EditorSettings;
	Toolbox: typeof EditorToolbox;
	Canvas: typeof EditorCanvas;
};

export const Editor: Editor = memo(({ className, components, children }) => {
	const [selected, setSelected] = useState<EditorObject | null>(null);
	const [canvases, setCanvases] = useState<CanvasState[]>([]);

	const drag = (result: DropResult) => {
		const { source, destination } = result;

		if (!destination) {
			return;
		}

		if (source.droppableId === destination.droppableId) {
			// If dragged within the same canvas
			const canvas = canvases.find((c) => c.id === source.droppableId);

			if (!canvas) {
				throw new Error(`Tried to drop on canvas with no state: ${source.droppableId}`);
			}

			canvas.move(source.index, destination.index);
		} else {
			// If dragged between canvases
			const sourceCanvas = canvases.find((c) => c.id === source.droppableId);
			const destinationCanvas = canvases.find((c) => c.id === destination.droppableId);

			if (!sourceCanvas || !destinationCanvas) {
				throw new Error(
					`Tried to drop on canvas with no state: ${source.droppableId} -> ${destination.droppableId}`
				);
			}

			destinationCanvas.add(sourceCanvas.remove(source.index), destination.index);
		}
	};

	const select = useCallback((object: EditorObject | null) => {
		setSelected(object);
	}, []);

	const register = useCallback((canvas: CanvasState) => {
		setCanvases((c) => update(c, { $push: [canvas] }));
	}, []);

	const unregister = useCallback((canvas: CanvasState) => {
		setCanvases((c) => update(c, { $splice: [[c.indexOf(canvas), 1]] }));
	}, []);

	const editor = useMemo<EditorState>(
		() => ({
			components,
			canvases,
			selected,
			select,
			register,
			unregister,
		}),
		[components, canvases, selected, select, register, unregister]
	);

	return (
		<div className={className}>
			<DragDropContext onDragEnd={drag}>
				<EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
			</DragDropContext>
		</div>
	);
}) as Editor;

Editor.Item = EditorItem;
Editor.Settings = EditorSettings;
Editor.Toolbox = EditorToolbox;
Editor.Canvas = EditorCanvas;
