import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout/Root';
import Error from './pages/Error';
import Home from './pages/Home';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Login from './pages/Login';

import { loader as productsLoader } from './components/List/List';
import { action as manipulateProduct } from './components/ProductManagement/ProductManagement';
import { loader as productLoader } from './components/ProductManagement/ProductManagement';
import { action as loginAction } from './components/Login/LoginContent';
import {
	loader as loginLoader,
	action as logoutAction,
} from './MainNavigation/MainNavigation';

const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <Error />,
		element: <RootLayout />,
		loader: loginLoader,
		action: logoutAction,
		id: 'root',
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'auth/login',
				element: <Login />,
				action: loginAction,
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
