import {
  SET_USER,
  SET_LOGGED_IN,
  SET_SELECTED_SIDE_MENU_INDEX,
} from '../../constants/actionTypeEnum';

const setUser = (data) => ({
  type: SET_USER,
  data,
});

const setLoggedIn = (data) => ({
  type: SET_LOGGED_IN,
  data,
});

const setSelectedSidebarIndex = (data) => ({
  type: SET_SELECTED_SIDE_MENU_INDEX,
  data,
});

export { setUser, setLoggedIn, setSelectedSidebarIndex };
