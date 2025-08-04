import {combineReducers} from 'redux';
import {userReducer} from './users';
import todoReducer from './todoReducer';

const rootReducer = combineReducers({
  user: userReducer,
  todo: todoReducer,
});
export default rootReducer;
