import React from 'react';
import { useRouteError } from 'react-router-dom';
import MainNavigation from '../../MainNavigation/MainNavigation';

import './ErrorContent.css';

const ErrorContent = () => {
	const { data } = useRouteError();

	return (
		<>
			<MainNavigation />
			<div className='error-container'>
				<h1 className='error-message'>{data.message}</h1>
			</div>
		</>
	);
};

export default ErrorContent;
