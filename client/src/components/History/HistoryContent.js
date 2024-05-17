import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

import BannerNaigation from '../../components/Banner/BannerNavigation';
import './HistoryContent.css';

const HistoryContent = () => {
	const { userId } = useParams();
	const {
		loading,
		result: orders,
		error,
		fetchHandler,
	} = useFetch(`http://localhost:5500/orders/${userId}`);

	useEffect(() => {
		fetchHandler();
	}, []);

	return (
		<div>
			<BannerNaigation title='HISTORY' navigation='HISTORY' />
			<table>
				<thead>
					<tr>
						<th>ID ORDER</th>
						<th>ID USER</th>
						<th>NAME</th>
						<th>PHONE</th>
						<th>ADDRESS</th>
						<th>TOTAL</th>
						<th>DELIVERY</th>
						<th>STATUS</th>
						<th>DETAIL</th>
					</tr>
				</thead>
				<tbody>
					{!loading &&
						!error &&
						orders?.map((order) => {
							return (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.userId}</td>
									<td>{order.contact.fullname}</td>
									<td>{order.contact.phoneNumber}</td>
									<td>{order.contact.address}</td>
									<td>{order.items.total}</td>
									<td>Waiting for progressing</td>
									<td>Waiting for pay</td>
									<td>
										<button>Detail</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export default HistoryContent;
