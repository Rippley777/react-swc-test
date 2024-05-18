import { combineReducers } from 'redux';
import user from './users';
import chat from './chat';

const rootReducer = combineReducers({
  user,
  chat,
});

export default rootReducer as any;
