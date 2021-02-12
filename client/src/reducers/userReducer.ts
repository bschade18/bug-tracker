import { GET_USERS } from '../actions/types';
import { User, GetUsersAction } from '../actions/types';

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export default function (state = initialState, action: GetUsersAction) {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: [...payload.map((user) => user.name)],
      };
    default:
      return state;
  }
}
