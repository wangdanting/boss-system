import * as types from '@/constants/login';
import { combineReducers } from 'redux';

export const submitting = (state = false, action) => {
  switch (action.type) {
    case types.SET_SUBMITTING:
      return action.loading;
    default:
      return state;
  }
};

const login = combineReducers({
  submitting
});

export default login;
