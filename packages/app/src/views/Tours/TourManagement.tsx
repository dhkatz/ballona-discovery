import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';

import { TourList } from './TourList';

export const TourManagement: FunctionComponent = () => {
	return (
		<>
			<h1 className="py-4">Tour Management</h1>
			<Routes>
				<Route index element={<TourList />} />
				<Route path=":tourId" element={<h1>Tour</h1>} />
				<Route path=":tourId/edit" element={<h1>Edit Tour</h1>} />
			</Routes>
		</>
	);
};
