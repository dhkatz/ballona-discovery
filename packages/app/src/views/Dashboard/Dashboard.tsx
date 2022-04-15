import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const Dashboard = () => {
	return (
		<div>
			<h1>Dashboard</h1>
			<Routes>
				<Route path="/" element={<h1>Hello!</h1>} />
			</Routes>
		</div>
	);
};
