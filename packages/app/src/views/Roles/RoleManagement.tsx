import { TailSpin } from 'react-loader-spinner';
import { useCollection } from '../../hooks';
import { Role, PermissionsMap } from '../../types';

import { Table } from '../../components/Table';

const columns = [
	{
		key: 'name',
		name: 'Name',
	},
];

export const RoleManagement = () => {
	const [roles, { loading }] = useCollection<Role>('roles');

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

	return (
		<>
			<h1 className="py-4">Role Management</h1>
			<Table columns={columns} rows={roles} create search />
		</>
	);
};
