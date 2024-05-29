import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import { json } from 'react-router-dom';

const Home = () => {
	return <Dashboard />;
};

export default Home;

export async function loader() {
	const response = await fetch('http://localhost:5500/orders');
	if (!response.ok) {
		throw json(
			{ message: 'Failed to fetch orders or not authenticated by admin' },
			{ status: 401 }
		);
	}
	return response;
}
