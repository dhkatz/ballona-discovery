import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PanelList } from './PanelList';

export const PanelManagement: FunctionComponent = () => {
	return (
		<>
			<h1 className="py-4">Panel Management</h1>
			<Routes>
				<Route index element={<PanelList />} />
				<Route path=":panelId" element={<h1>Panel</h1>} />
				<Route path=":panelId/edit" element={<h1>Edit Panel</h1>} />
			</Routes>
		</>
	);
};
