import { Table, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { useCollection } from '../../hooks';
import { User } from '../../types';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';

export const UserManagement = () => {
	const [users, loading, error] = useCollection<User>('users');
	console.log(users);

	if (error) {
		console.log(error);
	}

	async function editPermissions(role: string | null, uid: string) {
		if (role) {
			const userRef = doc(firestore, 'users', uid);
			await updateDoc(userRef, { role });
		}
	}

	return (
		<div>
			<h1>User Management</h1>
			{loading ? (
				<p>loading...</p>
			) : (
				<Table striped bordered hover variant="dark">
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
					<tbody>
						{users?.map((user) => {
							return (
								<tr>
									<td>{user.uid}</td>
									<td>{user.firstName}</td>
									<td>{user.lastName}</td>
									<td>{user.email}</td>
									<td>{user.role}</td>
									<td>
										{/* <Button variant="primary" onClick={() => editPermissions(user)}>
										Edit
									</Button> */}
										<DropdownButton
											id="dropdown-basic-button"
											title="Edit"
											onSelect={(e) => editPermissions(e, user.uid)}
										>
											<Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
											<Dropdown.Item eventKey="Contributor">
												Contributor
											</Dropdown.Item>
											<Dropdown.Item eventKey="Reader">Reader</Dropdown.Item>
										</DropdownButton>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			)}
		</div>
	);
};
