import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const RouteProtect = ({ children }) => {
	const LOGIN_URL = 'http://localhost:5500/auth/login';
	const { loading, result: user, fetchHandler } = useFetch(LOGIN_URL);

	useEffect(() => {
		fetchHandler();
	}, []);

	if (!loading && !user) {
		return <Navigate to='/login' />;
	}
	return children;
};

export default RouteProtect;
