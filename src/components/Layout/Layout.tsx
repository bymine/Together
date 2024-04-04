import { Outlet, useLocation } from 'react-router-dom';
import './layout.css';
import AuthNavbar from '../AuthNavbar/AuthNavbar';
import Navbar from '../Navbar/Navbar';
import LeftNavbar from '../LeftNavbar/LeftNavbar';
const Layout = () => {
  const location = useLocation();
  return (
    <div className="layout">
      {location.pathname.startsWith('/auth') ? (
        <>
          <AuthNavbar />
          <Outlet />
        </>
      ) : (
        <>
          <Navbar />
          <div className="wrapper">
            <LeftNavbar />
            <div className="content">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
