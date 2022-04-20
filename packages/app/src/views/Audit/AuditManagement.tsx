import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AuditList } from './AuditList';

export const AuditManagement: FunctionComponent = () => {
	return (
		<>
			<h1 className="py-4">Audit Logs</h1>
			<Routes>
				<Route index element={<AuditList />} />
			</Routes>
		</>
	);
};
