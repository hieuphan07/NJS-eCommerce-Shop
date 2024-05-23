import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout/Root';
import Home from './pages/Home';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

import { loader as productLoader } from './components/List/List';
import { action as manipulateProduct } from './components/ProductManagement/ProductManagement';

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
				loader: productLoader,
				children: [
					{
						index: true,
						element: <Products />,
					},
					{
						path: ':productId',
						element: <EditProduct />,
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
