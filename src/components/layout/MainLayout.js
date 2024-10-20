import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';

const MainLayout = props => {
  return (
    <div className="main-layout">
      <Navbar content={<Outlet />} data={props.data} />
    </div>
  );
};

export default MainLayout;
