import { json } from 'react-router-dom';

import ProductList from '../components/Shop/ProductList';

const ShopPage = () => {
	return (
		<>
			<ProductList />
		</>
	);
};

export default ShopPage;

// Fetch loader
export async function loader() {
	const response = await fetch('http://localhost:5500/products', {
		credentials: 'include',
	});

	if (!response.ok) {
		throw json({ message: 'Could not fetch data.' }, { status: 500 });
	} else {
		return response;
	}
}
