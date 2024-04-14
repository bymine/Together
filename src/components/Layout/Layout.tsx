import { Outlet, useLocation } from 'react-router-dom';
import './layout.scss';
import AuthNavbar from '../AuthNavbar/AuthNavbar';
import Navbar from '../Navbar/Navbar';
import LeftNavbar from '../LeftNavbar/LeftNavbar';
const Layout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith('/auth') ? (
        <div className="layout">
          <AuthNavbar />
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
