import { Table, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { RoleForm } from './RoleForm';
import { useState } from 'react';
import { useCollection, useDocument } from '../../hooks';
import { Role } from '../../types';

export const RoleManagement = () => {
	const [displayForm, setDisplayForm] = useState(false);
	const [roles, { error, loading, update, add }] = useCollection<Role>('roles');

	function modifyRole(id: string) {
		setDisplayForm(true);
	}

	function addRole(name: string, permissions: string[]) {
		add({ name, permissions });
		setDisplayForm(false);
	}

	return (
		<div>
			{displayForm ? (
				<RoleForm addRole={addRole} />
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
											<Button onClick={() => modifyRole(role.id)}>
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
