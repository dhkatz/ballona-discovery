import React from 'react';
import { TailSpin } from 'react-loader-spinner';

import { useCollection } from '../../hooks';
import { User } from '../../types';

import { Table } from '../../components/Table';

const columns = [
	{
		key: 'id',
		name: 'ID',
	},
	{
		key: 'firstName',
		name: 'First Name',
	},
	{
		key: 'lastName',
		name: 'Last Name',
	},
	{
		key: 'email',
		name: 'Email',
	},
	{
		key: 'role',
		name: 'Role',
	},
];

export const UserManagement = () => {
	const [users, { loading }] = useCollection<User>('users');

	if (loading) {
		return (
			<>
				<h1 className="py-4">User Management</h1>
				<div className="d-flex justify-content-center">
					<TailSpin color={'#192A6BFF'} />
				</div>
			</>
		);
	}

	return (
		<>
			<h1 className="py-4">User Management</h1>

			<Table columns={columns} rows={users} search edit create />
		</>
	);
};
