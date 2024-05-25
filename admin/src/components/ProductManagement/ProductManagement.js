import React from 'react';
import {
	Form,
	redirect,
	useLoaderData,
	useParams,
	json,
} from 'react-router-dom';

import './ProductManagement.css';

const ProductManagement = () => {
	const product = useLoaderData();
	const { productId } = useParams();
	return (
		<div className='product-form__container'>
			<h1>{productId ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}</h1>
			<Form
				className='product-form'
				method={productId ? 'patch' : 'post'}
				encType='multipart/form-data'
			>
				<label htmlFor='name'>Product Name</label>
				<input
					id='name'
					name='name'
					type='string'
					placeholder='Enter Product Name'
					defaultValue={product?.name ?? ''}
				/>
				<label htmlFor='category'>Category</label>
				<input
					id='category'
					name='category'
					type='string'
					placeholder='Enter Category'
					defaultValue={product?.category ?? ''}
				/>
				<label htmlFor='price'>Price</label>
				<input
					id='price'
					name='price'
					type='number'
					placeholder='Enter Price'
					defaultValue={product?.price ?? ''}
				/>
				<label htmlFor='short_desc'>Short Description</label>
				<textarea
					rows={4}
					id='short_desc'
					name='short_desc'
					type='string'
					placeholder='Enter Short Description'
					defaultValue={product?.['short_desc'] ?? ''}
				/>
				<label htmlFor='long_desc'>Long Description</label>
				<textarea
					rows={20}
					id='long_desc'
					name='long_desc'
					type='string'
					placeholder='Enter Long Description'
					defaultValue={product?.['long_desc'] ?? '\n• \n• \n• '}
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
	const { productId } = params;
	const formData = await request.formData();
	const photoFiles = formData.getAll('photos');
	const urlPhotos = photoFiles.map((curr) => curr.name);
	const product = {
		name: formData.get('name'),
		category: formData.get('category'),
		price: Number(formData.get('price')),
		short_desc: formData.get('short_desc'),
		long_desc: formData.get('long_desc'),
		photos: urlPhotos,
	};

	const ADD_PRODUCT_URL = 'http://localhost:5500/products/create-product';
	const EDIT_PRODUCT_URL = `http://localhost:5500/products/${productId}/edit`;
	const { method } = request;
	const response = await fetch(
		method === 'POST' ? ADD_PRODUCT_URL : EDIT_PRODUCT_URL,
		{
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(product),
		}
	);
	if (!response.ok) {
		throw json({ message: 'Something went wrong' }, { status: 404 });
	}

	return response;
}

export async function loader({ request, params }) {
	const { productId } = params;
	const response = await fetch(`http://localhost:5500/products/${productId}`);
	if (!response.ok) {
		throw json({ message: 'Not found!' }, { status: 404 });
	}
	return response;
}
