import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import sideBarItems from '../constants/sidebarItems';
import { setUser, setLoggedIn, setSelectedSidebarIndex } from '../stores/actions/appAction';
import Dashboard from './Dashboard';
import Login from './Login';
import Posts from './Posts';
import availableUsers from '../constants/availableUsers';
import { removeLoginToken, isLoginTokenValid } from '../libs/loginToken';
import * as appAction from '../stores/actions/appAction';
import './MasterPage.scss';

const MasterPage = () => {
  const { user, loggedIn, selectedSidebarIndex } = useSelector((state) => state.appStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loginToken = isLoginTokenValid();

    if (!loginToken) {
      return;
    }

    const tokenUser = availableUsers.find((e) => e.username === loginToken);

    if (!tokenUser) {
      return;
    }

    dispatch(appAction.setUser(tokenUser));
    dispatch(appAction.setLoggedIn(true));

    const sidebarItemTargetIndex = sideBarItems.findIndex((e) => e.route === location.pathname);

    if (sidebarItemTargetIndex < 0) {
      dispatch(appAction.setSelectedSidebarIndex(0));
      navigate(sideBarItems[0].route);

      return;
    }

    dispatch(appAction.setSelectedSidebarIndex(sidebarItemTargetIndex));
    navigate(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSideBarChange = (index) => {
    dispatch(setSelectedSidebarIndex(index));
    navigate(sideBarItems[index].route);
  };

  const onLogout = () => {
    dispatch(setUser({ username: '', password: '' }));
    dispatch(setLoggedIn(false));
    removeLoginToken();
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
