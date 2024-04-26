import { Outlet, useLocation } from 'react-router-dom';
import './layout.scss';
import AccountNavbar from '../AccountNavbar/AccountNavbar';
import Navbar from '../Navbar/Navbar';
import LeftNavbar from '../LeftNavbar/LeftNavbar';
const Layout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith('/account') ? (
        <div className="layout">
          <AccountNavbar />
          <div className="auth-content">
            <Outlet />
          </div>
          <div />
        </div>
      ) : (
        <div className="layout active">
          <Navbar />
          <div className="wrapper">
            <LeftNavbar />
            <div className="content">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
