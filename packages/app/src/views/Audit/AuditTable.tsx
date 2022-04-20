import React, { FunctionComponent, useMemo } from 'react';
import Table from 'react-bootstrap/Table';

import { capitalCase } from 'case-anything';

import { User } from '../../types';
import { useCollection } from '../../hooks';

export interface AuditTableProps {
	keys: Array<keyof User>;
	filter?: (user: User) => boolean;
}

export const AuditTable: FunctionComponent<AuditTableProps> = ({ filter, keys }) => {
	const [audits] = useCollection<User>('audits');

	const rows = useMemo(
		() =>
			audits?.filter(filter ?? (() => true)).map((audit) => (
				<tr key={audit.id}>
					{keys.map((key) => (
						<td key={key}>{audit[key] ?? 'N/A'}</td>
					))}
				</tr>
			)),
		[audits, filter]
	);

	return (
		<Table striped bordered hover variant="light">
			<thead>
				<tr>
					{keys.map((key) => (
						<th key={key}>{capitalCase(key)}</th>
					))}
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
};
