import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { useEditor } from '../hooks';

export interface EditorSettingsProps {
	className?: string;
}

export const EditorSettings: FunctionComponent<EditorSettingsProps> = ({ className }) => {
	const { selected } = useEditor();

	useEffect(() => {
		console.log(`Selecting ${selected}`);
	}, [selected]);

	const inputs = useMemo(() => {
		if (selected === null) {
			return [];
		}

		return selected.component.editor.props;
	}, [selected]);

	return (
		<div className={className}>
			<h1>Settings</h1>
			Selected component: {selected?.component.name}
			<br />
			Component has {inputs.length} inputs
			<br />
			<ul>
				{inputs.map((input) => (
					<li key={input.name}>
						{input.name}: {input.type}
					</li>
				))}
			</ul>
		</div>
	);
};
