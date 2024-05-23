import React from 'react';
import { Form, useActionData } from 'react-router-dom';

import './ProductManagement.css';

const ProductManagement = () => {
	const data = useActionData();
	console.log(data);

	return (
		<div className='product-form__container'>
			<Form className='product-form' method='post'>
				<label htmlFor='name'>Product Name</label>
				<input
					id='name'
					name='name'
					type='string'
					placeholder='Enter Product Name'
					defaultValue='iPhone 15'
				/>
				<label htmlFor='category'>Category</label>
				<input
					id='category'
					name='category'
					type='string'
					placeholder='Enter Category'
					defaultValue='iphone'
				/>
				<label htmlFor='price'>Price</label>
				<input
					id='price'
					name='price'
					type='number'
					placeholder='Enter Price'
					defaultValue='20000000'
				/>
				<label htmlFor='short-desc'>Short Description</label>
				<textarea
					rows={4}
					id='short-desc'
					name='short-desc'
					type='string'
					placeholder='Enter Short Description'
					defaultValue='iPhone 15 128GB được trang bị màn hình Dynamic Island kích thước 6.1 inch với công nghệ hiển thị Super Retina XDR'
				/>
				<label htmlFor='long-desc'>Long Description</label>
				<textarea
					rows={7}
					id='long-desc'
					name='long-desc'
					type='string'
					placeholder='Enter Long Description'
					defaultValue='iPhone 15 128GB được trang bị màn hình Dynamic Island kích thước 6.1 inch với công nghệ hiển thị Super Retina XDR'
				/>
				<label htmlFor='photos'>Upload image (5 images)</label>
				<input id='photos' name='photos' type='file' multiple />
				<button>Submit</button>
			</Form>
		</div>
	);
};

export default ProductManagement;

export async function action({ request, params }) {
	const formData = await request.formData();
	const name = formData.get('name');
	const category = formData.get('category');
	const price = formData.get('price');
	const shortDesc = formData.get('short-desc');
	const longDesc = formData.get('long-desc');
	const product = {
		name: name,
		category: category,
		price: Number(price),
		short_desc: shortDesc,
		long_desc: longDesc,
	};
	return product;
}
