import { Table, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { useCollection } from '../../hooks';
import { User } from '../../types';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';

// const users = [
// 	{
// 		uid: 'xxxxxxxxx',
// 		firstName: 'richard',
// 		lastName: 'incognito',
// 		email: 'richard@example.com',
// 		role: 'admin',
// 	},
// 	{
// 		uid: 'yyyyyyyyy',
// 		firstName: 'john',
// 		lastName: 'incognito',
// 		email: 'john@example.com',
// 		role: 'editor',
// 	},
// 	{
// 		uid: 'zzzzzzzzz',
// 		firstName: 'jack',
// 		lastName: 'incognito',
// 		email: 'jack@example.com',
// 		role: 'editor',
// 	},
// ];

export const UserManagement = () => {
	const [users, loading, error] = useCollection<User>('users');

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
			{loading && <p>loading</p>}
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
					{users &&
						users.map((user) => {
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
							</tr>;
						})}
				</tbody>
			</Table>
		</div>
	);
};
