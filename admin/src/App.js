import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
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
import { loader as ordersLoader } from './pages/Home';
import { action as deleteProduct } from './components/List/List';

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
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				),
				loader: ordersLoader,
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
			{
				path: 'delete/:productId',
				action: deleteProduct,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
