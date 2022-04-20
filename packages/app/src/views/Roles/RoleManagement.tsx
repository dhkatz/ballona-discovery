import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { useCollection } from '../../hooks';
import { Role } from '../../types';

import { RoleForm } from './RoleForm';

export const RoleManagement = () => {
	const [displayForm, setDisplayForm] = useState(false);
	const [roleID, setRoleID] = useState<string | null>(null);
	const [roles, { error, loading, update, add }] = useCollection<Role>('roles');

	async function updateRole(id: string, name: string, permissions: string[]) {
		await update(id, { name, permissions }).then(() => {
			setDisplayForm(false);
			setRoleID(null);
		});
	}

	async function addRole(name: string, permissions: string[]) {
		await add({ name, permissions }).then(() => {
			setDisplayForm(false);
		});
	}

	return (
		<div>
			{displayForm ? (
				<RoleForm
					addRole={addRole}
					updateRole={updateRole}
					roleID={roleID}
					discard={() => setDisplayForm(false)}
				/>
			) : (
				<>
					<h1>Role Management</h1>
					<Button onClick={() => setDisplayForm(true)}>Create</Button>
					<Table striped bordered hover variant="dark">
						<thead>
							<tr>
								<th>Role Name</th>
								<th>Permissions</th>
								<th>Modify</th>
							</tr>
						</thead>
						<tbody>
							{roles?.map((role) => {
								return (
									<tr>
										<td>{role.name}</td>
										<td>{role.permissions.join(',')}</td>
										<td>
											<Button
												onClick={() => {
													setRoleID(role.id);
													setDisplayForm(true);
												}}
											>
												Edit
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</>
			)}
		</div>
	);
};
