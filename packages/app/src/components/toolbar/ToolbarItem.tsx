import React from 'react';
import { Form } from 'react-bootstrap';
import { useNode } from '@craftjs/core';

import { ToolbarDropdown } from './ToolbarDropdown';

export type ToolbarItemProps = {
	prefix?: string;
	label?: string;
	full?: boolean;
	propKey?: string;
	index?: number;
	children?: React.ReactNode;
	type: string;
	onChange?: (value: any) => any;
};

export const ToolbarItem = ({
	full = false,
	propKey,
	type,
	onChange,
	index,
	...props
}: ToolbarItemProps) => {
	const {
		actions: { setProp },
		propValue,
	} = useNode((node) => ({
		propValue: node.data.props[propKey],
	}));
	const value = Array.isArray(propValue) ? propValue[index] : propValue;

	return (
		<Grid item xs={full ? 12 : 6}>
			<div className="mb-2">
				{['text', 'color', 'bg', 'number'].includes(type) ? (
					<ToolbarTextInput
						{...props}
						type={type}
						value={value}
						onChange={(value: unknown) => {
							setProp((props: any) => {
								if (Array.isArray(propValue)) {
									props[propKey][index] = onChange ? onChange(value) : value;
								} else {
									props[propKey] = onChange ? onChange(value) : value;
								}
							}, 500);
						}}
					/>
				) : type === 'slider' ? (
					<>
						{props.label ? (
							<h4 className="text-sm text-light-gray-2">{props.label}</h4>
						) : null}
						<Form.Range
							value={parseInt(value) || 0}
							onChange={
								((_, value: number) => {
									setProp((props: any) => {
										if (Array.isArray(propValue)) {
											props[propKey][index] = onChange
												? onChange(value)
												: value;
										} else {
											props[propKey] = onChange ? onChange(value) : value;
										}
									}, 1000);
								}) as any
							}
						/>
					</>
				) : type === 'radio' ? (
					<>
						{props.label ? (
							<h4 className="text-sm text-light-gray-2">{props.label}</h4>
						) : null}
						<RadioGroup
							value={value || 0}
							onChange={(e) => {
								const value = e.target.value;
								setProp((props: any) => {
									props[propKey] = onChange ? onChange(value) : value;
								});
							}}
						>
							{props.children}
						</RadioGroup>
					</>
				) : type === 'select' ? (
					<ToolbarDropdown
						value={value || ''}
						onChange={(value) =>
							setProp(
								(props: any) =>
									(props[propKey] = onChange ? onChange(value) : value)
							)
						}
						{...props}
					/>
				) : null}
			</div>
		</Grid>
	);
};
