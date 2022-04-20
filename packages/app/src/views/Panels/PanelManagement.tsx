import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PanelList } from './PanelList';
import { PanelView } from './PanelView';
import { PanelEditor } from './PanelEditor';

export const PanelManagement: FunctionComponent = () => {
	return (
		<>
			<Routes>
				<Route index element={<PanelList />} />
				<Route path=":panelId" element={<PanelView />} />
				<Route path=":panelId/edit" element={<PanelEditor />} />
			</Routes>
		</>
	);
};
