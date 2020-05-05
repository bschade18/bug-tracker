import { SET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  msg: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ERRORS:
      return {
        msg: payload,
      };
    case CLEAR_ERRORS:
      return {
        msg: '',
      };
    default:
      return state;
  }
}
