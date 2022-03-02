import {
  SET_USER,
  SET_LOGGED_IN,
  SET_SELECTED_SIDE_MENU_INDEX,
} from '../../constants/actionTypeEnum';
import { DASHBOARD } from '../../constants/sidebarIndexEnum';

const initateState = {
  user: { username: '', password: '' },
  loggedIn: false,
  selectedSidebarIndex: DASHBOARD,
  restApiBaseUrl: 'https://jsonplaceholder.typicode.com',
};

const appStore = (state = initateState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.data };
    case SET_LOGGED_IN:
      return { ...state, loggedIn: action.data };
    case SET_SELECTED_SIDE_MENU_INDEX:
      return { ...state, selectedSidebarIndex: action.data };
    default:
      return state;
  }
};

export default appStore;
