import { useEditor } from '@ballona-discovery/editor';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import Form from 'react-bootstrap/Form';

export interface PanelSettingsProps {
	className?: string;
}

export const PanelSettings: FunctionComponent<PanelSettingsProps> = ({ className }) => {
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

	const updateProp = (prop: string, value: any) => {
		if (selected) {
			selected.props[prop] = value;
		}
	};

	const buildInput = (prop: string, type: string) => {
		return <Form.Control type={type} onChange={(e) => updateProp(prop, e.target.value)} />;
	};

	return (
		<div className={className}>
			<h1>Settings</h1>
			Selected component: {selected?.component.name}
			<br />
			Component has {inputs.length} inputs
			<br />
			<Form>
				{inputs.map((input) => (
					<Form.Group key={input.name}>
						<Form.Label>{input.name}</Form.Label>
						{buildInput(input.name.toLowerCase(), input.type)}
					</Form.Group>
				))}
			</Form>
		</div>
	);
};
