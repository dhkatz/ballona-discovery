import React, {
	ComponentProps,
	memo,
	NamedExoticComponent,
	useCallback,
	useMemo,
	useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import update from 'immutability-helper';

import { EditorContext } from '../context';
import { EditorItem } from './EditorItem';
import { EditorSettings } from './EditorSettings';
import { EditorToolbox } from './EditorToolbox';
import { EditorComponent, EditorObject } from '../types';
import { Card } from '../Card';

export type EditorProps = {
	components: EditorComponent<any>[];
};

type Editor = NamedExoticComponent<EditorProps> & {
	Item: typeof EditorItem;
	Settings: typeof EditorSettings;
	Toolbox: typeof EditorToolbox;
};

export const Editor: Editor = memo(({ components }) => {
	const [selected, setSelected] = useState<string | null>(null);
	const [history, setHistory] = useState<EditorObject[][]>([]);
	const [items, setItems] = useState<EditorObject[]>([
		{ id: '1', props: { text: '1' }, component: Card },
		{ id: '2', props: { text: '2' }, component: Card },
		{ id: '3', props: { text: '3' }, component: Card },
		{ id: '4', props: { text: '4' }, component: Card },
	]);

	const find = useCallback(
		(id: string) => {
			const item = items.find((item) => item.id === id);

			return item ? items.indexOf(item) : -1;
		},
		[items]
	);

	const undo = useCallback(() => {
		setItems(history.pop() ?? []);
		setHistory((h) => h.slice(0, -1));
	}, [history]);

	const select = useCallback((id: string) => {
		setSelected(id);
	}, []);

	const move = useCallback(
		(id: string, target: number) => {
			setSelected(id);

			const index = find(id);
			const item = items[index];

			setItems(
				update(items, {
					$splice: [
						[index, 1],
						[target, 0, item],
					],
				})
			);
		},
		[items, selected, find]
	);

	const add = useCallback(
		(index: number, type: string) => {
			const component = components.find(
				(c) => c.editor.name.toLowerCase() === type.toLowerCase()
			);

			if (!component)
				throw new Error(`Editor could not resolve component for type '${type}'`);

			const props: ComponentProps<any> = {};

			for (const prop of component.editor.props) {
				props[prop.name] = prop.fallback;
			}

			const item: EditorObject = {
				id: `${Date.now()}-${Math.random()}`,
				props,
				component,
			};

			setItems(
				update(items, {
					$splice: [[index, 0, item]],
				})
			);

			setSelected(item.id);
		},
		[history, items, components]
	);

	const remove = useCallback(
		(id: string) => {
			if (id === selected) {
				setSelected(null);
			}

			setHistory(
				update(history, {
					$push: [items],
				})
			);

			const index = find(id);

			setItems(
				update(items, {
					$splice: [[index, 1]],
				})
			);
		},
		[history, items, selected]
	);

	const editor = useMemo(
		() => ({
			components,
			items,
			selected,
			history,
			select,
			move,
			add,
			remove,
			undo,
			find,
		}),
		[components, items, selected, history, select, move, add, remove, undo, find]
	);

	return (
		<div>
			<DndProvider backend={HTML5Backend}>
				<EditorContext.Provider value={editor}>
					{items.map(({ id, component, props }) => (
						<EditorItem key={id} id={id} component={component} {...props} />
					))}
				</EditorContext.Provider>
			</DndProvider>
		</div>
	);
}) as Editor;

Editor.Item = EditorItem;
Editor.Settings = EditorSettings;
Editor.Toolbox = EditorToolbox;
