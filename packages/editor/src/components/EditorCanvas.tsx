import React, { ComponentProps, memo, useCallback, useEffect, useMemo, useState } from 'react';
import update from 'immutability-helper';

import { CanvasContext } from '../context';
import { useEditor } from '../hooks';
import { EditorObject } from '../types';

import { Card } from '../Card';
import { EditorItem } from './EditorItem';

export const EditorCanvas = memo(() => {
	const { components, select, selected, register, unregister } = useEditor();

	const [items, setItems] = useState<EditorObject[]>([
		{ id: '1', props: { text: '1' }, component: Card },
		{ id: '2', props: { text: '2' }, component: Card },
		{ id: '3', props: { text: '3' }, component: Card },
		{ id: '4', props: { text: '4' }, component: Card },
	]);

	const find = useCallback<(id: string) => [EditorObject | null, number]>(
		(id: string) => {
			const index = items.findIndex((item) => item.id === id);

			return index !== -1 ? [items[index], index] : [null, -1];
		},
		[items]
	);

	const move = useCallback(
		(id: string, target: number) => {
			const [item, index] = find(id);

			if (item && index !== -1) {
				select(item);

				setItems(
					update(items, {
						$splice: [
							[index, 1],
							[target, 0, item],
						],
					})
				);
			}
		},
		[items, find]
	);

	const add = useCallback(
		(type: string, index = 0) => {
			const component = components.find((c) => c.editor.name === type);

			if (!component) {
				return;
			}

			const props: ComponentProps<any> = {};

			for (const prop of component.editor.props) {
				props[prop.name] = prop.fallback;
			}

			const item: EditorObject = {
				id: `${type}-${Date.now()}`,
				component,
				props,
			};

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
		(id: string) => {
			const [item, index] = find(id);

			if (item && index !== -1) {
				if (selected === item) {
					select(null);
				}

				setItems(
					update(items, {
						$splice: [[index, 1]],
					})
				);
			}
		},
		[items, find]
	);

	const canvas = useMemo(() => {
		return { items, find, move, add, remove };
	}, [items]);

	useEffect(() => {
		register(canvas);

		return () => unregister(canvas);
	}, [register, unregister, canvas]);

	return (
		<CanvasContext.Provider value={canvas}>
			{items.map(({ id, component, props }) => (
				<EditorItem key={id} id={id} component={component} {...props} />
			))}
		</CanvasContext.Provider>
	);
});
