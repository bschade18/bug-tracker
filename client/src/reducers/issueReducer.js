import { GET_ISSUES, GET_CLOSED } from '../actions/types';

const initialState = {
  issues: [],
  closed: [],
  loading: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ISSUES:
      return {
        ...state,
        issues: payload,
      };
    case GET_CLOSED:
      return {
        ...state,
        closed: payload,
      };
    default:
      return state;
  }
};
