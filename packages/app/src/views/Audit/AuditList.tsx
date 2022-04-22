import React from 'react';

import { useCollection } from '../../hooks';
import { TailSpin } from 'react-loader-spinner';

import { Table } from '../../components/Table';

const columns = [
	{
		key: 'id',
		name: 'ID',
	},
	{
		key: 'metadata.path',
		name: 'Path',
	},
];

export const AuditList = () => {
	const [audits, { loading }] = useCollection<any>('audits');

	if (loading) {
		return (
			<div className="d-flex justify-content-center">
				<TailSpin color={'#192A6BFF'} />
			</div>
		);
	}

	return <Table rows={audits} columns={columns} search />;
};
