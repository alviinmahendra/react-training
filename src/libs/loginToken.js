const getLoginToken = () => window.localStorage.getItem('_rt_tkn_');

const saveLoginToken = (username) => {
  window.localStorage.setItem('_rt_tkn_', username);
};

const removeLoginToken = () => {
  window.localStorage.removeItem('_rt_tkn_');
};

const isLoginTokenValid = () => {
  const loginToken = getLoginToken();

  if (!loginToken) {
    return null;
  }

  return loginToken;
};

export { saveLoginToken, removeLoginToken, isLoginTokenValid };
