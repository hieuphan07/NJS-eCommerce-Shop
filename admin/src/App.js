import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Error from './pages/Error';
import RootLayout from './pages/RootLayout/Root';
// import Home from './pages/Home';
// import Products from './pages/Products';
// import AddProduct from './pages/AddProduct';
// import EditProduct from './pages/EditProduct';
// import Login from './pages/Login';

// import { loader as ordersLoader } from './pages/Home';
// import { loader as productsLoader } from './components/List/List';
// import { loader as productLoader } from './components/ProductManagement/ProductManagement';
import {
	loader as loginLoader,
	action as logoutAction,
} from './MainNavigation/MainNavigation';
import { action as manipulateProduct } from './components/ProductManagement/ProductManagement';
import { action as loginAction } from './components/Login/LoginContent';

// Add lazy loading page
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const AddProduct = lazy(() => import('./pages/AddProduct'));
const EditProduct = lazy(() => import('./pages/EditProduct'));
const Login = lazy(() => import('./pages/Login'));

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
					<Suspense
						fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}
					>
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					</Suspense>
				),
				loader: () => import('./pages/Home').then((module) => module.loader()),
			},
			{
				path: 'auth/login',
				element: (
					<Suspense
						fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}
					>
						<Login />
					</Suspense>
				),
				action: loginAction,
			},
			{
				path: 'products',
				id: 'products',
				loader: () =>
					import('./components/List/List').then((module) => module.loader()),
				children: [
					{
						index: true,
						element: (
							<Suspense
								fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}
							>
								<Products />
							</Suspense>
						),
					},
					{
						path: 'edit/:productId',
						element: (
							<Suspense
								fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}
							>
								<EditProduct />
							</Suspense>
						),
						loader: () =>
							import('./components/ProductManagement/ProductManagement').then(
								(module) => module.loader()
							),
						action: manipulateProduct,
					},
				],
			},
			{
				path: 'create-product',
				element: (
					<Suspense
						fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}
					>
						<AddProduct />
					</Suspense>
				),
				action: manipulateProduct,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
