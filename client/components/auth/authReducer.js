import * as types from '../../actions/actionTypes';
import initialState from '../../reducers/initialState';

export default function authReducer(state = initialState.isAuthenticated, action) {
  console.log("authReducer Called: " + action.type + " state: " + state);
  switch(action.type) {
    case types.LOGOUT_SUCCESS:
      return false;

    case types.LOGIN_SUCCESS:
      return true;

    default:
      return state;
  }
}