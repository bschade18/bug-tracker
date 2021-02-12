import { SET_ERRORS, CLEAR_ERRORS, ErrorAction } from '../actions/types';
import { Error } from '../actions/types';

interface ErrorState {
  errors: Error[];
}
const initialState: ErrorState = {
  errors: [],
};

export default function (state = initialState, action: ErrorAction) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: [...action.payload],
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
