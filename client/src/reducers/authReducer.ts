import {
  AuthAction,
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions/types';
import { UserWithToken } from '../actions/types';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean | null;
  loading: boolean;
  user: UserWithToken | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action: AuthAction) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
