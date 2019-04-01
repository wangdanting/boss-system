import request from '@/utils/request';
import * as types from '@/constants';

export const setVoiceSwitchStatus = voiceStatus => ({
  type: types.CM_SET_VOICE_SWITCH,
  voiceStatus
});

export const getVoiceSwitchStatus = () => dispatch => {
  request('/merch-config').then(({ merchNewIsNotify: voiceStatus = false }) => {
    dispatch(setVoiceSwitchStatus(voiceStatus));
  });
};

export const handleChangeVoiceSwitch = checked => dispatch => {
  request('/merch-config/update', {
    params: { merchNewIsNotify: checked }
  }).then(() => {});
  dispatch(setVoiceSwitchStatus(checked));
};
