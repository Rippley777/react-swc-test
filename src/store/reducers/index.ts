import { combineReducers } from 'redux';
import user from './users';
import chat from './chat';
import player from './player';
import character from './character';

const rootReducer = combineReducers({
  user,
  chat,
  player,
  character,
});

export default rootReducer as any;
