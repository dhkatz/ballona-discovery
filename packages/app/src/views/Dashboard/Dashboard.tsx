import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { UserManagement } from './UserManagement';

export const Dashboard = () => {
	return (
		<div>
			<h1>Dashboard</h1>
			<Routes>
				<Route path="/" element={<h1>Hello!</h1>} />
				<Route path="/users" element={<UserManagement />} />
			</Routes>
		</div>
	);
};
