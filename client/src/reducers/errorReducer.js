import { SET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  errors: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: [...payload],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: [],
      };
    default:
      return state;
  }
}
