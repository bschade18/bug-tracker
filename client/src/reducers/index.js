import { combineReducers } from 'redux';
import issueReducer from './issueReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  issues: issueReducer,
  auth: authReducer,
  error: errorReducer,
});
