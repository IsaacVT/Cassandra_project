import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple/SimpleLayout';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import ProductsPage from './pages/ProductsPage';
import ShoppingPage from './pages/ShoppingPage';

// ----------------------------------------------------------------------

export default function Router() {

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/products" />, index: true },
        // { path: 'app', element: <DashboardAppPage /> },
        // { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'cart', element: <CartPage /> },
        { path: 'order', element: <OrderPage /> },
        { path: 'shopping', element: <ShoppingPage /> },
      ],
    },
    // {
    //   path: '/login',
    //   element: <LoginPage />,
    // },
    // {
    //   path: 'register',
    //   element: <RegisterPage />,
    // },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        // { path: '404', element: <Page404 /> },
        // { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}
