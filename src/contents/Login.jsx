import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '../components/TextField';
import Button from '../components/Button';
import availableUser from '../constants/availableUsers';
import * as appAction from '../stores/actions/appAction';
import './Login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = () => {
    const user = availableUser.find((e) => e.username === username);
    if (!username || password !== 'a') {
      return;
    }
    dispatch(appAction.setUser(user));
    dispatch(appAction.setLoggedIn(true));
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
