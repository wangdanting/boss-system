import * as types from '@/constants';
import { combineReducers } from 'redux';

export const voiceStatus = (state = false, action) => {
  switch (action.type) {
    case types.CM_SET_VOICE_SWITCH:
      return action.voiceStatus;
    default:
      return state;
  }
};

const common = combineReducers({
  voiceStatus
});

export default common;
