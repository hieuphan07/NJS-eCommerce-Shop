import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout/Root';
import Home from './pages/Home';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

import { loader as productsLoader } from './components/List/List';
import { action as manipulateProduct } from './components/ProductManagement/ProductManagement';
import { loader as productLoader } from './components/ProductManagement/ProductManagement';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'products',
				id: 'products',
				loader: productsLoader,
				children: [
					{
						index: true,
						element: <Products />,
					},
					{
						path: 'edit/:productId',
						element: <EditProduct />,
						loader: productLoader,
						action: manipulateProduct,
					},
				],
			},
			{
				path: 'create-product',
				element: <AddProduct />,
				action: manipulateProduct,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
