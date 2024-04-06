import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AuthPage from './pages/Auth/AuthPage';
import Dashboard from './pages/Dashboard/Dashboard';
import SchedulePage from './pages/Schedule/SchedulePage';

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Navigate to="/auth" replace />,
        },
        {
          path: '/auth',
          element: <AuthPage />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/schedule',
          element: <SchedulePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
