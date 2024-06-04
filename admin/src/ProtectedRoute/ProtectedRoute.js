import { Navigate, useRouteLoaderData } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
	const data = useRouteLoaderData('root');
	console.log(data);

	if (data?.message === 'Login first') {
		return <Navigate to='/auth/login' replace={true} />;
	}
	return children;
};

export default ProtectedRoute;
