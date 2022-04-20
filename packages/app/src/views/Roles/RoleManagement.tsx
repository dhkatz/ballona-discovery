import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { TailSpin } from 'react-loader-spinner';
import { PlusCircle } from 'react-bootstrap-icons';
import { useCollection } from '../../hooks';
import { Role, PermissionsMap } from '../../types';

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

	async function updateRole(id: string, name: string, permissions: PermissionsMap) {
		await update(id, { name, permissions }).then(() => {
			setDisplayForm(false);
			setRoleID(null);
		});
	}

	async function addRole(name: string, permissions: PermissionsMap) {
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
			<div className={'d-flex flex-column gap-4'}>
				<div>
					<Button
						onClick={() => setDisplayForm(true)}
						className="py-3"
						variant="secondary"
						style={{ paddingBottom: '10px' }}
					>
						Create <PlusCircle />
					</Button>
				</div>
				<Table striped bordered hover variant="light">
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
									{role.permissions ? (
										<td>
											{Object.entries(role.permissions)
												.filter(([key, val]) => val !== false)
												.join(', ')
												.replace(/,true/g, '')}
										</td>
									) : (
										// .map(([key, val], i, array) => {
										// 	return (
										// 		<td>{array.join(',').replace(',true', '')}</td>
										// 	);
										// })
										<td>'No permissions defined'</td>
									)}
									<td>
										<Button
											variant="secondary"
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
			</div>
		</>
	);
};
