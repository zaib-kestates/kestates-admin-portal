import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

function Layout() {
  return (
    <div className="dv-main d-flex">
      <Sidebar />

      <div className="dv-contents">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
