import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AccountLayout from './components/AccountLayout/AccountLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import SchedulePage from './pages/Schedule/SchedulePage';
import LoginForm from './pages/Account/LoginForm';
import RegisterForm from './pages/Account/RegisterForm';
import FindIdForm from './pages/Account/FindIdForm';
import FindPwForm from './pages/Account/FindPwForm';

const Router = () => {
  const isLoggedIn = false;
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: isLoggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/account/login" replace />
          ),
        },
        {
          path: '/account',
          element: <AccountLayout />,
          children: [
            {
              path: 'login',
              element: <LoginForm />,
            },
            {
              path: 'register',
              element: <RegisterForm />,
            },
            {
              path: 'find_id',
              element: <FindIdForm />,
            },
            {
              path: 'find_pw',
              element: <FindPwForm />,
            },
          ],
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/:channel/schedule',
          element: <SchedulePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
