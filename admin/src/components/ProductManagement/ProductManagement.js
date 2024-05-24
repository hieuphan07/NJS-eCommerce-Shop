import React from 'react';
import { Form, useActionData } from 'react-router-dom';

import './ProductManagement.css';

const ProductManagement = () => {
	const data = useActionData();
	console.log(data);

	// const [selectedFiles, setSelectedFiles] = useState([]);
	// const selectFilesHandler = (event) => {
	// 	setSelectedFiles(event.target.files);
	// };

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
				<label htmlFor='short_desc'>Short Description</label>
				<textarea
					rows={4}
					id='short_desc'
					name='short_desc'
					type='string'
					placeholder='Enter Short Description'
					defaultValue='iPhone 15 128GB được trang bị màn hình Dynamic Island kích thước 6.1 inch với công nghệ hiển thị Super Retina XDR'
				/>
				<label htmlFor='long_desc'>Long Description</label>
				<textarea
					rows={7}
					id='long_desc'
					name='long_desc'
					type='string'
					placeholder='Enter Long Description'
					defaultValue='iPhone 15 128GB được trang bị màn hình Dynamic Island kích thước 6.1 inch với công nghệ hiển thị Super Retina XDR'
				/>
				<label htmlFor='photos'>Upload image (5 images)</label>
				<input
					id='photos'
					name='photos'
					type='file'
					multiple
					onChange={(e) => {
						console.log(e.target.files);
					}}
				/>
				<button>Submit</button>
			</Form>
		</div>
	);
};

export default ProductManagement;

export async function action({ request, params }) {
	const formData = await request.formData();
	const object = Object.fromEntries(formData);
	console.log('object', object);

	const photos = formData.get('photos');
	console.log('photos', photos);
	const product = {
		name: formData.get('name'),
		category: formData.get('category'),
		price: Number(formData.get('price')),
		short_desc: formData.get('short_desc'),
		long_desc: formData.get('long_desc'),
		photos: formData.get('photos'),
	};
	return product;
}
