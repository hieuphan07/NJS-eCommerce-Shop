import React from 'react';
import { Link } from 'react-router-dom';

import './MainNavigation.css';

const MainNavigation = () => {
	return (
		<div>
			<ul>
				<li>
					<Link to='/'>Dashboard</Link>
				</li>
				<li>
					<Link to='/products'>Products</Link>
				</li>
				<li>
					<Link to='/chat'>Chat</Link>
				</li>
			</ul>
		</div>
	);
};

export default MainNavigation;
