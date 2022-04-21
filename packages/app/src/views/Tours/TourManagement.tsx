import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';

import { TourList } from './TourList';
import { TourEditor } from './TourEditor';
import { TourView } from './TourView';

export const TourManagement: FunctionComponent = () => {
	return (
		<>
			<h1 className="py-4">Tour Management</h1>
			<Routes>
				<Route index element={<TourList />} />
				<Route path=":tourId" element={<TourView />} />
				<Route path=":tourId/edit" element={<TourEditor />} />
			</Routes>
		</>
	);
};
