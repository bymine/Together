import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import AccountLayout from './components/Layout/AccountLayout/AccountLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import SchedulePage from './pages/Schedule/SchedulePage';
import LoginForm from './pages/Account/LoginForm';
import RegisterForm from './pages/Account/RegisterForm';
import FindIdForm from './pages/Account/FindIdForm';
import FindPwForm from './pages/Account/FindPwForm';
import AccountSetting from './pages/Setting/AccountSetting';
import MainLayout from './components/Layout/MainLayout/MainLayout';

const Router = () => {
  const isLogin = localStorage.getItem('refreshToken') !== null ? true : false;

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: (
            <Navigate to={isLogin ? '/dashboard' : '/account/login'} replace />
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
        {
          path: '/users/:setting',
          element: <AccountSetting />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
