import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PanelList } from './PanelList';

export const PanelManagement: FunctionComponent = () => {
	return (
		<>
			<h1 className="py-4">Panel Management</h1>
			<Routes>
				<Route path="/" element={<PanelList />} />
			</Routes>
		</>
	);
};
