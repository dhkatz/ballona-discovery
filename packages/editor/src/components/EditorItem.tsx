import React, { memo, NamedExoticComponent, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { useEditor } from '../hooks';
import { EditorObject } from '../types';

export type EditorItemProps = {
	item: EditorObject;
	index: number;
};

export const EditorItem: NamedExoticComponent<EditorItemProps> = memo(
	({ item, index, ...props }) => {
		const { select } = useEditor();
		const [hovered, setHovered] = useState(false);

		const Component = item.component;

		if (!Component) {
			return null;
		}

		return (
			<Draggable draggableId={item.id} index={index}>
				{(provided, snapshot) => (
					<div
						onClick={() => select(item)}
						onMouseEnter={() => setHovered(true)}
						onMouseLeave={() => setHovered(false)}
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						style={{
							...provided.draggableProps.style,
							opacity: snapshot.isDragging || hovered ? 0.5 : 1,
						}}
					>
						<Component {...item.props} />
					</div>
				)}
			</Draggable>
		);
	}
);
