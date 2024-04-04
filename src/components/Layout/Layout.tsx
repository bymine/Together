import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './layout.css';
const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
