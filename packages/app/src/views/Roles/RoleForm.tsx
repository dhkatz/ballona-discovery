import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

type RoleFormProp = {
	addRole: (name: string, permissions: string[]) => void;
	updateRole: (id: string, name: string, permissions: string[]) => void;
	roleID: string | null;
	discard: () => void;
};

export const RoleForm = ({ addRole, updateRole, roleID, discard }: RoleFormProp) => {
	const [name, setName] = useState('');
	const [permissions, setPermissions] = useState<string[] | null>(null);

	function handleChange(input: string) {
		if (permissions !== null) {
			const newPermissions = [...permissions, input];
			if (permissions.includes(input)) {
				const filtered = permissions.filter((item) => item !== input);
				setPermissions(filtered);
			} else {
				setPermissions(newPermissions);
			}
		} else {
			setPermissions([input]);
		}
	}

	function submit(e: React.SyntheticEvent) {
		e.preventDefault();
		if (name !== '' && permissions !== null) {
			if (roleID !== null) {
				updateRole(roleID, name, permissions);
			} else {
				addRole(name, permissions);
			}
		}
	}

	return (
		<>
			<h1>Add Role</h1>
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
						onChange={(e) => handleChange(e.target.id)}
					/>
					<Form.Check
						inline
						label="Edit panels"
						name="permissions"
						type="checkbox"
						id="editPanels"
						onChange={(e) => handleChange(e.target.id)}
					/>
					<Form.Check
						inline
						label="Edit roles"
						name="permissions"
						type="checkbox"
						id="editRoles"
						onChange={(e) => handleChange(e.target.id)}
					/>
					<Form.Check
						inline
						label="Manage users"
						name="permissions"
						type="checkbox"
						id="manageUsers"
						onChange={(e) => handleChange(e.target.id)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
				<Button variant="primary" onClick={discard}>
					Discard
				</Button>
			</Form>
		</>
	);
};
