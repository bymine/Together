import { Outlet, useLocation } from 'react-router-dom';
import './mainLayout.scss';
import Navbar from '../../Navbar/MainNavbar/MainNavbar';
import SettingSidebar from '../../Lnb/SettingLnb/SettingLnb';
import ChannelLnb from '../../Lnb/ChannelLnb/ChannelLnb';
import AccountNavbar from '../../Navbar/AccountNavbar/AccountNavbar';
const MainLayout = () => {
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
            {location.pathname.startsWith('/users') ? (
              <SettingSidebar />
            ) : (
              <ChannelLnb />
            )}

            <div className="content">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainLayout;
