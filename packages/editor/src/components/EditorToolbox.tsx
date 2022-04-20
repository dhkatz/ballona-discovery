import React, { FunctionComponent } from 'react';

import { useEditor } from '../hooks';

export interface EditorToolboxProps {
	className?: string;
}

/**
 * A list of available components that can be dragged and dropped into one or more canvases.
 */
export const EditorToolbox: FunctionComponent<EditorToolboxProps> = ({ className }) => {
	const { components } = useEditor();

	return (
		<div className={className}>
			<h1>Toolbox</h1>
			There are {components.length} components available.
			<br />
			{components.map((component) => (
				<div key={component.name}>
					<h2>{component.name}</h2>
				</div>
			))}
		</div>
	);
};
