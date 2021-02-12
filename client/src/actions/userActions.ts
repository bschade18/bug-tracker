import axios from 'axios';
import { GET_USERS } from './types';
import { Dispatch } from 'redux';
import { User, GetUsersAction } from './types';

export const getUsers = (team: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get<User[]>(`/users?team=${team}`);

    dispatch<GetUsersAction>({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
