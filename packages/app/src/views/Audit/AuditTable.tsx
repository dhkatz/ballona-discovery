import React, { FunctionComponent, useMemo } from 'react';
import Table from 'react-bootstrap/Table';

import { capitalCase } from 'case-anything';

import { useCollection } from '../../hooks';

export interface AuditTableProps {
	keys: string[];
	filter?: (metadata: any) => boolean;
}

export const AuditTable: FunctionComponent<AuditTableProps> = ({ filter, keys }) => {
	const [audits] = useCollection<any>('audits');

	const metadata = useMemo(() => audits?.map((audit) => audit.metadata ?? {}), [audits]);

	const rows = useMemo(
		() =>
			metadata?.filter(filter ?? (() => true)).map((audit, i) => (
				<tr key={i}>
					{keys.map((key) => (
						<td key={key}>{`${audit[key]}` ?? 'N/A'}</td>
					))}
				</tr>
			)),
		[metadata, filter]
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
