import React, { FunctionComponent, useEffect, useState } from 'react';

export type ToolbarInputProps = {
	prefix?: string;
	label?: string;
	type: string;
	onChange?: (value: any) => void;
	value?: any;
};
export const ToolbarInput: FunctionComponent<ToolbarInputProps> = ({
	onChange,
	value,
	prefix,
	label,
	type,
	...props
}) => {
	const [internalValue, setInternalValue] = useState(value);
	const [active, setActive] = useState(false);

	useEffect(() => {
		let val = value;
		if (type === 'color' || type === 'bg') val = `rgba(${Object.values(value)})`;
		setInternalValue(val);
	}, [value, type]);

	return (
		<div
			style={{ width: '100%', position: 'relative' }}
			onClick={() => {
				setActive(true);
			}}
		/>
	);
};
