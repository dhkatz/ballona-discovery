import { useDrag, useDrop } from 'react-dnd';
import React, { memo, NamedExoticComponent, useMemo, useState } from 'react';

import { useCanvas, useEditor } from '../hooks';
import { createPortal } from 'react-dom';

export type EditorItemProps = {
	id: string;
	component: React.ComponentType;
};

export const EditorItem: NamedExoticComponent<EditorItemProps> = memo(
	({ id, component, ...props }) => {
		const { select, selected } = useEditor();
		const { find, move } = useCanvas();
		const [hovered, setHovered] = useState(false);

		const index = useMemo(() => find(id)[1], [find, id]);

		const [, drop] = useDrop(
			() => ({
				accept: 'item',
				hover: (item: { id: string }) => {
					if (item.id === id) return;

					console.log(`hovering ${item.id} over ${id}`);

					const [, index] = find(id);

					move(item.id, index);
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
				onClick={() => select(find(id)[0])}
			>
				{(hovered || selected?.id === id) && createPortal(<div>{id}</div>, document.body)}
				<Component {...props} />
			</div>
		);
	}
);
