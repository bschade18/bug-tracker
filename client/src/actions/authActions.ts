import axios from 'axios';
import { setErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UserLoadedAction,
  RegisterSuccessAction,
  UserWithToken,
  LoginSuccessAction,
  UserLoadingAction,
  RegisterFailAction,
  LogoutSuccessAction,
  User,
} from './types';
import { Dispatch } from 'redux';

interface RegisterProps {
  name: string;
  email: string;
  team: string;
  password: string;
  password2: string;
}

interface LoginProps {
  email: string;
  password: string;
}

export const loadUser = () => async (dispatch: Dispatch) => {
  dispatch<UserLoadingAction>({ type: USER_LOADING });

  try {
    const res = await axios.get<User>('/auth/user');

    dispatch<UserLoadedAction>({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const register = ({
  name,
  email,
  team,
  password,
  password2,
}: RegisterProps) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, team, password, password2 });

  try {
    const res = await axios.post<UserWithToken>('/auth/register', body, config);

    dispatch<RegisterSuccessAction>({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    // @ts-ignore
    dispatch(loadUser());
  } catch (err) {
    // @ts-ignore
    dispatch(setErrors(err.response.data.errors));
    dispatch<RegisterFailAction>({
      type: REGISTER_FAIL,
    });
  }
};

export const login = ({ email, password }: LoginProps) => async (
  dispatch: Dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post<UserWithToken>('/auth/login', body, config);

    dispatch<LoginSuccessAction>({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    // @ts-ignore
    dispatch(loadUser());
  } catch (err) {
    // @ts-ignore
    dispatch(setErrors(err.response.data.errors));
  }
};

export const logout = (): LogoutSuccessAction => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
