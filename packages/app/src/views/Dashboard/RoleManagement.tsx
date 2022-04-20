import { Table, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { RoleForm } from '../../components/RoleForm';
import { useState } from 'react';

export const RoleManagement = () => {
	const [displayForm, setDisplayForm] = useState(false);

	return (
		<div>
			{displayForm ? (
				<RoleForm />
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
						<tbody></tbody>
					</Table>
				</>
			)}
		</div>
	);
};
