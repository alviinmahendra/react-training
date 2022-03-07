import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import sideBarItems from '../constants/sidebarItems';
import { setUser, setLoggedIn, setSelectedSidebarIndex } from '../stores/actions/appAction';
import Dashboard from './Dashboard';
import Login from './Login';
import Posts from './Posts';
import './MasterPage.scss';

const MasterPage = () => {
  const { user, loggedIn, selectedSidebarIndex } = useSelector((state) => state.appStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSideBarChange = (index) => {
    dispatch(setSelectedSidebarIndex(index));
    navigate(sideBarItems[index].route);
  };

  const onLogout = () => {
    dispatch(setUser({ username: '', password: '' }));
    dispatch(setLoggedIn(false));
    // navigate('/');
  };

  return (
    <div className="master-page">
      {loggedIn ? (
        <>
          <Sidebar
            items={sideBarItems.map((e) => e.label)}
            onChange={onSideBarChange}
            selectedIndex={selectedSidebarIndex}
          />
          <div className="main-content-wrapper">
            <Header
              title={sideBarItems[selectedSidebarIndex].label}
              name={user.name}
              onLogout={onLogout}
            />
            <div className="main-content">
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="posts" element={<Posts />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default MasterPage;
