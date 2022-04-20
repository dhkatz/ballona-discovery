import { Dropdown, DropdownButton, Table } from 'react-bootstrap';
import React, { FunctionComponent, useMemo } from 'react';

import { User } from '../../types';
import { useCollection } from '../../hooks';

export interface UserTableProps {
	filter?: (user: User) => boolean;
}

export const UserTable: FunctionComponent<UserTableProps> = ({ filter }) => {
	const [users, { update }] = useCollection<User>('users');

	async function setRole(role: string | null, uid: string) {
		if (role) await update(uid, { role });
	}

	const rows = useMemo(
		() =>
			users?.filter(filter ?? (() => true)).map((user) => (
				<tr key={user.id}>
					<td>{user.id}</td>
					<td>{user.firstName ?? 'N/A'}</td>
					<td>{user.lastName ?? 'N/A'}</td>
					<td>{user.email}</td>
					<td>{user.role}</td>
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
					<th>User ID</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Role</th>
					<th>Permissions</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
};
