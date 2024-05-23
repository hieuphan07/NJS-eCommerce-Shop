import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';

import './List.css';

const List = () => {
	const products = useRouteLoaderData('products');
	return (
		<div className='products-container'>
			<h1 className='product-title'>Products</h1>
			<input className='product-search' placeholder='Enter Search!' />
			{products && (
				<table className='products-table'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Price</th>
							<th>Image</th>
							<th>Category</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
						{products?.map((product, ind) => {
							return (
								<tr key={product._id}>
									<td className='productId'>{product._id}</td>
									<td className='productName'>{product.name}</td>
									<td className='productPrice'>
										{Number(product.price).toLocaleString('en')}
									</td>
									<td className='productImage'>
										<img src={product.photos?.[0]} alt={product.name} />
									</td>
									<td className='productCategory'>{product.category}</td>
									<td className='productActions'>
										<button className='btn--update' button='button'>
											Update
										</button>
										<button className='btn--delete' button='button'>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default List;

// products loader
export async function loader() {
	const response = await fetch('http://localhost:5500/products');
	if (!response.ok) return console.log('Something went wrong');
	return response;
}
