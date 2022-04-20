import React, { useMemo, useState } from 'react';
import { Form } from 'react-bootstrap';

import { useCollection } from '../../hooks';
import { User } from '../../types';

import { UserTable } from './UserTable';

const FILTERS = {
	firstName: 'First Name',
	lastName: 'Last Name',
	id: 'ID',
	email: 'Email',
	role: 'Role',
} as Record<string, string>;

export const UserManagement = () => {
	const [users, { loading }] = useCollection<User>('users');
	const [query, setQuery] = useState('');
	const [field, setField] = useState<keyof User>('firstName');
	const filter = useMemo(
		() =>
			query !== ''
				? (user: User) => !!user[field]?.toLowerCase().includes(query.toLowerCase())
				: undefined,
		[query, field]
	);

	if (loading) {
		return <div>Loading...</div>;
	}

	const filters = Object.keys(FILTERS).map((key) => {
		return (
			<option key={key} value={key}>
				{FILTERS[key]}
			</option>
		);
	});

	return (
		<>
			<h1 className="py-4">User Management</h1>

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
				<UserTable filter={filter} />
				<span>User Count: {users?.length}</span>
			</div>
		</>
	);
};
