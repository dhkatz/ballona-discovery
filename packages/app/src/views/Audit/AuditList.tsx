import React, { useMemo, useState } from 'react';
import Form from 'react-bootstrap/Form';

import { capitalCase } from 'case-anything';

import { useCollection } from '../../hooks';
import { User } from '../../types';

import { AuditTable } from './AuditTable';
import { TailSpin } from 'react-loader-spinner';

const keys = ['firstName', 'lastName', 'id', 'email', 'role'] as Array<keyof User>;

export const AuditList = () => {
	const [audits, { loading }] = useCollection<User>('audits');
	const [query, setQuery] = useState('');
	const [field, setField] = useState<keyof User>('firstName');
	const filter = useMemo(
		() =>
			query !== ''
				? (user: User) => `${user[field]}`.toLowerCase().includes(query.toLowerCase())
				: undefined,
		[query, field]
	);

	if (loading) {
		return (
			<div className="d-flex justify-content-center">
				<TailSpin color={'#192A6BFF'} />
			</div>
		);
	}

	const filters = keys.map((key) => {
		return (
			<option key={key} value={key}>
				{capitalCase(key)}
			</option>
		);
	});

	return (
		<div className="d-flex flex-column">
			<Form.Group className="d-flex align-self-end w-25 py-3">
				<Form.Control
					type="text"
					placeholder="Search..."
					onChange={(e) => setQuery(e.target.value)}
				/>
				<Form.Select onChange={(e) => setField(e.target.value as keyof User)}>
					{filters}
				</Form.Select>
			</Form.Group>
			<AuditTable keys={keys} filter={filter} />
			<span>User Count: {audits?.length}</span>
		</div>
	);
};
