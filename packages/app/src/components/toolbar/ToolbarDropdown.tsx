import React, { FunctionComponent } from 'react';
import { Form } from 'react-bootstrap';

export type ToolbarDropdownProps = {
	title?: string;
	value: string;
	onChange: (value: string) => void;
};

export const ToolbarDropdown: FunctionComponent<ToolbarDropdownProps> = ({
	title,
	value,
	onChange,
	children,
}) => {
	return (
		<Form.Group>
			<Form.Label>{title}</Form.Label>
			<Form.Select value={value} onChange={(e) => onChange(e.target.value)}>
				{children}
			</Form.Select>
		</Form.Group>
	);
};
