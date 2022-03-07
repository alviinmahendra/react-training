import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import TextField from '../components/TextField';
import Button from '../components/Button';
import availableUser from '../constants/availableUsers';
import sideBarItems from '../constants/sidebarItems';
import * as appAction from '../stores/actions/appAction';
import './Login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = () => {
    const user = availableUser.find((e) => e.username === username);

    if (!user || password !== 'a') {
      return;
    }

    dispatch(appAction.setLoggedIn(true));
    dispatch(appAction.setUser(user));

    const sidebarItemTargetIndex = sideBarItems.findIndex((e) => e.route === location.pathname);

    if (sidebarItemTargetIndex < 0) {
      dispatch(appAction.setSelectedSidebarIndex(0));
      navigate(sideBarItems[0].route);

      return;
    }

    dispatch(appAction.setSelectedSidebarIndex(sidebarItemTargetIndex));
    navigate(location.pathname);
  };

  return (
    <div className="login-form">
      <h3>Login Form</h3>
      <h4>Username</h4>
      <TextField type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <h4>Password</h4>
      <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <Button label="Login" onClick={loginHandler} />
    </div>
  );
};

export default Login;
