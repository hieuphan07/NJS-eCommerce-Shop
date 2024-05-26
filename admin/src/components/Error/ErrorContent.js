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
				<h1 className='error-title'>Something went wrong!</h1>
				<p className='error-message'>{data.message}</p>
			</div>
		</>
	);
};

export default ErrorContent;
