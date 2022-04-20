import React, { FunctionComponent, useMemo } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';

import { capitalCase } from 'case-anything';

import { User } from '../../types';
import { useCollection } from '../../hooks';

export interface UserTableProps {
	keys: Array<keyof User>;
	filter?: (user: User) => boolean;
}

export const UserTable: FunctionComponent<UserTableProps> = ({ filter, keys }) => {
	const [users, { update }] = useCollection<User>('users');

	async function setRole(role: string | null, uid: string) {
		if (role) await update(uid, { role });
	}

	const rows = useMemo(
		() =>
			users?.filter(filter ?? (() => true)).map((user) => (
				<tr key={user.id}>
					{keys.map((key) => (
						<td key={key}>{user[key] ?? 'N/A'}</td>
					))}
					<td>
						<DropdownButton
							id="dropdown-basic-button"
							title="Edit"
							onSelect={(role) => setRole(role, user.id)}
							variant="secondary"
						>
							<Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
							<Dropdown.Item eventKey="contributor">Contributor</Dropdown.Item>
							<Dropdown.Item eventKey="reader">Reader</Dropdown.Item>
							<Dropdown.Item eventKey="user">User</Dropdown.Item>
						</DropdownButton>
					</td>
				</tr>
			)),
		[users, filter]
	);

	return (
		<Table striped bordered hover variant="light">
			<thead>
				<tr>
					{keys.map((key) => (
						<th key={key}>{capitalCase(key)}</th>
					))}
					<th>Permissions</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
};
