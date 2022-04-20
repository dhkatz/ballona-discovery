import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { TailSpin } from 'react-loader-spinner';
import { PlusCircle } from 'react-bootstrap-icons';
import { useCollection } from '../../hooks';
import { Role } from '../../types';

import { RoleForm } from './RoleForm';

export const RoleManagement = () => {
	const [displayForm, setDisplayForm] = useState(false);
	const [roleID, setRoleID] = useState<string | null>(null);
	const [roles, { loading, update, add }] = useCollection<Role>('roles');

	if (loading) {
		return (
			<>
				<h1 className="py-4">Role Management</h1>
				<div className="d-flex justify-content-center">
					<TailSpin color={'#192A6BFF'} />
				</div>
			</>
		);
	}

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

	if (displayForm) {
		return (
			<RoleForm
				addRole={addRole}
				updateRole={updateRole}
				roleID={roleID}
				discard={() => setDisplayForm(false)}
			/>
		);
	}

	return (
		<>
			<h1 className="py-4">Role Management</h1>
			<Button onClick={() => setDisplayForm(true)}>
				Create <PlusCircle />
			</Button>
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
	);
};
