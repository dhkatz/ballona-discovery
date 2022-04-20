import React, { useState } from 'react';
import { Table, DropdownButton, Dropdown } from 'react-bootstrap';

import { useCollection } from '../../hooks';
import { User } from '../../types';

import './UserManagement.css';

export const UserManagement = () => {
	const [users, { error, loading, update }] = useCollection<User>('users');
	const [query, setQuery] = useState('');
	const [filterName, setFilterName] = useState('First Name');
	const [searchFilter, setSearchFilter] = useState<keyof User>('firstName');

	if (error) {
		console.log(error);
	}

	async function editPermissions(role: string | null, uid: string) {
		if (role) {
			await update(uid, { role });
		}
	}

	function handleFilter(filterType: string | null) {
		if (filterType) {
			setFilterName(filterType);
		}
		switch (filterType) {
			case 'First Name':
				setSearchFilter('firstName');
				break;
			case 'Last Name':
				setSearchFilter('lastName');
				break;
			case 'User ID':
				setSearchFilter('id');
				break;
			case 'Email':
				setSearchFilter('email');
				break;
			case 'Role':
				setSearchFilter('role');
				break;
		}
	}

	return (
		<div>
			<h1>User Management</h1>
			{loading ? (
				<p>loading...</p>
			) : (
				<>
					<div className="search-bar">
						<input
							type="text"
							placeholder="Search..."
							onChange={(e) => setQuery(e.target.value)}
							style={{ marginRight: 20 }}
						/>
						<p style={{ marginRight: 10 }}>Filter by:</p>
						<DropdownButton
							id="dropdown-basic-button"
							title={filterName}
							onSelect={(e) => handleFilter(e)}
						>
							<Dropdown.Item eventKey="First Name">First Name</Dropdown.Item>
							<Dropdown.Item eventKey="Last Name">Last Name</Dropdown.Item>
							<Dropdown.Item eventKey="User ID">User ID</Dropdown.Item>
							<Dropdown.Item eventKey="Email">Email</Dropdown.Item>
							<Dropdown.Item eventKey="Role">Role</Dropdown.Item>
						</DropdownButton>
					</div>
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
							{users
								?.filter((user) => {
									if (query == '') {
										return user;
									} else if (
										user[searchFilter]
											?.toLowerCase()
											.includes(query.toLowerCase())
									) {
										return user;
									}
								})
								.map((user) => {
									return (
										<tr>
											<td>{user.id}</td>
											<td>{user.firstName}</td>
											<td>{user.lastName}</td>
											<td>{user.email}</td>
											<td>{user.role}</td>
											<td>
												<DropdownButton
													id="dropdown-basic-button"
													title="Edit"
													onSelect={(e) => editPermissions(e, user.id)}
												>
													<Dropdown.Item eventKey="Admin">
														Admin
													</Dropdown.Item>
													<Dropdown.Item eventKey="Contributor">
														Contributor
													</Dropdown.Item>
													<Dropdown.Item eventKey="Reader">
														Reader
													</Dropdown.Item>
													<Dropdown.Item eventKey="User">
														User
													</Dropdown.Item>
												</DropdownButton>
											</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
					<p>User Count: {users?.length}</p>
				</>
			)}
		</div>
	);
};
