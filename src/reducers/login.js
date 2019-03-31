import * as types from '@/constants';
import { combineReducers } from 'redux';

export const submitting = (state = false, action) => {
  switch (action.type) {
    case types.LOGIN_SUBMITTING:
      return action.loading;
    default:
      return state;
  }
};

const login = combineReducers({
  submitting
});

export default login;
