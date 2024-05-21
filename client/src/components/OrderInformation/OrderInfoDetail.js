import React from 'react';

import classes from './OrderInfoDetail.module.css';

const OrderInfoDetail = () => {
	return (
		<div className={classes.orderInfo}>
			<h1>INFORMATION ORDER</h1>
			<p>ID User:</p>
			<p>Full Name:</p>
			<p>Phone:</p>
			<p>Address:</p>
			<p>Total:</p>
			<table>
				<thead>
					<tr>
						<th>ID PRODUCT</th>
						<th>IMAGE</th>
						<th>NAME</th>
						<th>PRICE</th>
						<th>COUNT</th>
					</tr>
				</thead>
			</table>
		</div>
	);
};

export default OrderInfoDetail;
