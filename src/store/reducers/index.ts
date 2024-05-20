import { combineReducers } from 'redux';
import user from './users';
import chat from './chat';
import player from './player';
import character from './character';
import webrtc from './webrtc';

const rootReducer = combineReducers({
  user,
  chat,
  player,
  character,
  webrtc,
});

export default rootReducer as any;
