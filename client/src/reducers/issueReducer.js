import {
  GET_ISSUES,
  GET_CLOSED,
  SET_PROJECT,
  ISSUES_LOADING,
  UPDATE_ISSUE,
  ADD_ISSUE,
  DELETE_ISSUE,
} from '../actions/types';

const initialState = {
  issues: [],
  closed: [],
  loading: false,
  currentProject: '',
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ISSUES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_ISSUE:
      return {
        ...state,
        issues: [...state.issues, payload],
      };
    case GET_ISSUES:
      return {
        ...state,
        loading: false,
        issues: payload,
      };
    case UPDATE_ISSUE:
      return {
        ...state,
        issues: state.issues.map((issue) =>
          issue._id === payload._id
            ? { ...issue, issueLog: payload.issueLog }
            : issue
        ),
      };
    case GET_CLOSED:
      return {
        ...state,
        closed: payload,
      };
    case DELETE_ISSUE:
      return {
        ...state,
        issues: state.issues.filter((issue) => issue._id !== payload.id),
      };
    case SET_PROJECT:
      return {
        ...state,
        currentProject: payload,
      };
    default:
      return state;
  }
};
