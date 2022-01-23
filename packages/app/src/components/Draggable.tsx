import React, {FunctionComponent} from 'react';
import {useDrag} from 'react-dnd';

export type DraggableProps = { type: string };

export const Draggable: FunctionComponent<DraggableProps> = ({children, type}) => {
	const [{dragging}, drag, preview] = useDrag({
		type,
		collect: (monitor) => ({
			dragging: monitor.isDragging(),
		}),
	});

	return (
		<div ref={preview} style={{opacity: dragging ? 0.5 : 1}}>
			{children}
		</div>
	);
};
