import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';

import classes from './OrderInfoDetail.module.css';

const OrderInfoDetail = () => {
	const { userId, orderId } = useParams();
	const {
		loading,
		result: order,
		error,
		fetchHandler,
	} = useFetch(`http://localhost:5500/orders/${userId}/${orderId}`);

	useEffect(() => {
		fetchHandler();
	}, []);

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
				{!loading && !error && order && (
					<tbody>
						{order?.items.map((item) => {
							return (
								<tr key={item.productId._id}>
									<td>{item.productId._id}</td>
									<td>
										<img
											style={{ width: '100px' }}
											src={item.productId.photos[0]}
											alt={item.productId.name}
										/>
									</td>
									<td>{item.productId.name}</td>
									<td>{item.productId.price}</td>
									<td>{item.quantity}</td>
								</tr>
							);
						})}
					</tbody>
				)}
			</table>
		</div>
	);
};

export default OrderInfoDetail;
