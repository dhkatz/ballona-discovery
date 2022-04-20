import { Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { Role } from '../types';

export const RoleForm = () => {
	const [name, setName] = useState('');
	const [permissions, setPermissions] = useState({
		editTours: false,
		editPanels: false,
		editRoles: false,
		manageUsers: false,
	});
	const [role, setRole] = useState<Role | null>(null);

	// function handleChange(input: string) {
	// 	if (permissions !== null) {
	// 		const newPermissions = [...permissions, input];
	// 		if (permissions.includes(input)) {
	// 			const reducedPermissions = newPermissions.filter((item) => item !== input);
	// 			setPermissions(reducedPermissions);
	// 		} else {
	// 			setPermissions(newPermissions);
	// 		}
	// 	}
	// }
	function handleChange(input: string) {
		if (permissions[input]) {
			const p = { ...permissions };
			p[input] = false;
			setPermissions(p);
		} else {
			const p = { ...permissions };
			p[input] = false;
			setPermissions(p);
		}
	}

	function submit(e: React.SyntheticEvent) {
		e.preventDefault();
		if (name !== '') {
			setRole({ name, ...rolePermissions });
			//then update database
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
			</Form>
		</>
	);
};
