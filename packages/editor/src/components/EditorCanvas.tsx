import React, { ComponentProps, memo, useCallback, useEffect, useMemo, useState } from 'react';
import update from 'immutability-helper';

import { CanvasContext } from '../context';
import { useEditor } from '../hooks';
import { CanvasState, EditorObject } from '../types';

import { Card } from '../Card';
import { EditorItem } from './EditorItem';
import { Droppable } from 'react-beautiful-dnd';

export interface EditorCanvasProps {
	id?: string;
	className?: string;
}

export const EditorCanvas = memo<EditorCanvasProps>(({ className, id: canvasId }) => {
	const id = useMemo(() => canvasId || `canvas-${Date.now()}-${Math.random()}`, [canvasId]);
	const { components, select, selected, register, unregister } = useEditor();

	const [items, setItems] = useState<EditorObject[]>(() => [
		{ id: `${Date.now()}-${Math.random()}`, props: { text: '1' }, component: Card },
		{ id: `${Date.now()}-${Math.random()}`, props: { text: '2' }, component: Card },
		{ id: `${Date.now()}-${Math.random()}`, props: { text: '3' }, component: Card },
		{ id: `${Date.now()}-${Math.random()}`, props: { text: '4' }, component: Card },
	]);

	const find = useCallback<(id: string) => [EditorObject | null, number]>(
		(id: string) => {
			const index = items.findIndex((item) => item.id === id);

			return index !== -1 ? [items[index], index] : [null, -1];
		},
		[items]
	);

	const move = useCallback(
		(source: number, target: number) => {
			const item = items[source];

			if (item) {
				select(item);

				setItems(
					update(items, {
						$splice: [
							[source, 1],
							[target, 0, item],
						],
					})
				);
			}
		},
		[items]
	);

	const add = useCallback(
		(type: EditorObject | string, index = 0) => {
			let item: EditorObject;
			if (typeof type === 'string') {
				const component = components.find((c) => c.editor.name === type);

				if (!component) {
					return;
				}

				const props: ComponentProps<any> = {};

				for (const prop of component.editor.props) {
					props[prop.name] = prop.fallback;
				}

				item = {
					id: `${type}-${Date.now()}`,
					component,
					props,
				};
			} else {
				item = type;
			}

			select(item);

			setItems(
				update(items, {
					$splice: [[index, 0, item]],
				})
			);
		},
		[components, items]
	);

	const remove = useCallback(
		(id: string | number) => {
			const [item, index] = typeof id === 'number' ? [items[id], id] : find(id);

			if (item && index !== -1) {
				if (selected === item) {
					select(null);
				}

				setItems(
					update(items, {
						$splice: [[index, 1]],
					})
				);
			} else {
				throw new Error(`Tried to remove item from canvas that doesn't exist: ${id}`);
			}

			return item;
		},
		[items, find]
	);

	const canvas = useMemo<CanvasState>(() => {
		return { id, items, find, move, add, remove };
	}, [id, items, find, move, add, remove]);

	useEffect(() => {
		register(canvas);

		return () => unregister(canvas);
	}, [register, unregister, canvas]);

	return (
		<CanvasContext.Provider value={canvas}>
			<Droppable droppableId={`${id}`}>
				{(provided) => (
					<div className={className} ref={provided.innerRef} {...provided.droppableProps}>
						{items.map((item, index) => (
							<EditorItem key={item.id} index={index} item={item} />
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</CanvasContext.Provider>
	);
});
