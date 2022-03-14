import { useDrag, useDrop } from 'react-dnd';
import React, { memo, NamedExoticComponent, useMemo, useState } from 'react';

import { useEditor } from '../hooks';
import { createPortal } from 'react-dom';

export type EditorItemProps = {
	id: string;
	component: React.ComponentType;
};

export const EditorItem: NamedExoticComponent<EditorItemProps> = memo(
	({ id, component, ...props }) => {
		const { move, find, select, selected } = useEditor();
		const [hovered, setHovered] = useState(false);

		const index = useMemo(() => find(id), [find, id]);

		const [, drop] = useDrop(
			() => ({
				accept: 'item',
				hover: (item: { id: string }) => {
					if (item.id === id) return;

					console.log(`hovering ${item.id} over ${id}`);

					move(item.id, find(id));
				},
			}),
			[id, find, move]
		);

		const [{ active }, drag] = useDrag(
			() => ({
				type: 'item',
				item: { id, index },
				collect: (monitor) => ({
					active: monitor.isDragging(),
				}),
				end: (item, monitor) => {
					if (monitor.didDrop()) return;

					move(item.id, item.index);
				},
			}),
			[id, index, move]
		);

		const opacity = active ? 0.4 : 1;

		const Component = component;

		return (
			<div
				ref={(node) => drag(drop(node))}
				style={{ opacity }}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onClick={() => select(id)}
			>
				{(hovered || selected === id) && createPortal(<div>{id}</div>, document.body)}
				<Component {...props} />
			</div>
		);
	}
);
