import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import sideBarItems from '../constants/sidebarItems';
import * as sidebarIndexEnum from '../constants/sidebarIndexEnum';
import { setUser, setLoggedIn, setSelectedSidebarIndex } from '../stores/actions/appAction';
import Dashboard from './Dashboard';
import Login from './Login';
import './MasterPage.scss';
import Posts from './Posts';

const MasterPage = () => {
  const { user, loggedIn, selectedSidebarIndex } = useSelector((state) => state.appStore);
  const dispatch = useDispatch();

  console.log(user);

  const onSideBarChange = (index) => {
    dispatch(setSelectedSidebarIndex(index));
  };

  const onLogout = () => {
    dispatch(setUser({ username: '', password: '' }));
    dispatch(setLoggedIn(false));
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
              {selectedSidebarIndex === sidebarIndexEnum.DASHBOARD && <Dashboard user={user} />}
              {selectedSidebarIndex === sidebarIndexEnum.POSTS && <Posts />}
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
