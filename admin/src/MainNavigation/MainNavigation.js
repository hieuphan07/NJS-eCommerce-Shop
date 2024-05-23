import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.css';

const MainNavigation = () => {
	return (
		<div className='main-navigation'>
			<ul>
				<li>
					<NavLink
						className={({ isActive }) => {
							return isActive ? 'active' : '';
						}}
						to='/'
					>
						Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink
						className={({ isActive }) => {
							return isActive ? 'active' : '';
						}}
						to='/products'
					>
						Products
					</NavLink>
				</li>
				<li>
					<NavLink
						className={({ isActive }) => {
							return isActive ? 'active' : '';
						}}
						to='/create-product'
					>
						Add New Product
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default MainNavigation;
