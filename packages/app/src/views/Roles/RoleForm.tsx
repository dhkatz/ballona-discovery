import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Trash, ChevronRight } from 'react-bootstrap-icons';
import { PermissionsMap } from '../../types';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

type RoleFormProp = {
	addRole: (name: string, permissions: PermissionsMap) => void;
	updateRole: (id: string, name: string, permissions: PermissionsMap) => void;
	roleID: string | null;
	discard: () => void;
};

const permissionOptions: PermissionsMap = {
	editTours: false,
	editPanels: false,
	editRoles: false,
	manageUsers: false,
};

export const RoleForm = ({ addRole, updateRole, roleID, discard }: RoleFormProp) => {
	const [name, setName] = useState('');
	const [permissions, setPermissions] = useState<PermissionsMap>(permissionOptions);

	function handleChange(isChecked: boolean, id: keyof PermissionsMap) {
		if (isChecked) {
			const currentPermissions = permissions;
			currentPermissions[id] = !currentPermissions[id];
			setPermissions(currentPermissions);
		}
	}

	function submit(e: React.SyntheticEvent) {
		e.preventDefault();
		if (name !== '') {
			if (roleID !== null) {
				updateRole(roleID, name, permissions);
			} else {
				addRole(name, permissions);
			}
		}
	}

	return (
		<>
			<h1 className={'mt-4'}>Add Role</h1>
			<Form onSubmit={submit}>
				<Form.Group>
					<Form.Label as="legend">Role Name:</Form.Label>
					<Form.Control
						placeholder="Enter Role Name"
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label as="legend">Permissions:</Form.Label>
					<Form.Check
						inline
						label="Edit tours"
						name="permissions"
						type="checkbox"
						id="editTours"
						onChange={(e) => handleChange(e.target.checked, e.target.id)}
					/>
					<Form.Check
						inline
						label="Edit panels"
						name="permissions"
						type="checkbox"
						id="editPanels"
						onChange={(e) => handleChange(e.target.checked, e.target.id)}
					/>
					<Form.Check
						inline
						label="Edit roles"
						name="permissions"
						type="checkbox"
						id="editRoles"
						onChange={(e) => handleChange(e.target.checked, e.target.id)}
					/>
					<Form.Check
						inline
						label="Manage users"
						name="permissions"
						type="checkbox"
						id="manageUsers"
						onChange={(e) => handleChange(e.target.checked, e.target.id)}
					/>
				</Form.Group>
				<ButtonGroup className={'my-3'}>
					<Button variant="secondary" type="submit">
						Submit
						<ChevronRight />
					</Button>
					<Button variant="secondary" onClick={discard}>
						Discard
						<Trash />
					</Button>
				</ButtonGroup>
			</Form>
		</>
	);
};
