import {
  IssueAction,
  ISSUES_LOADING,
  ADD_ISSUE,
  GET_ISSUES,
  UPDATE_ISSUE,
  GET_CLOSED,
  DELETE_ISSUE,
  SET_PROJECT,
} from '../actions/types';
import { Issue } from '../actions/types';

interface IssueState {
  issues: Issue[];
  closed: Issue[];
  loading: boolean;
  currentProject: string;
}

const initialState: IssueState = {
  issues: [],
  closed: [],
  loading: false,
  currentProject: '',
};

export default (state = initialState, action: IssueAction) => {
  switch (action.type) {
    case ISSUES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_ISSUE:
      return {
        ...state,
        issues: [...state.issues, action.payload],
      };
    case GET_ISSUES:
      return {
        ...state,
        loading: false,
        issues: action.payload,
      };
    case UPDATE_ISSUE:
      return {
        ...state,
        issues: state.issues.map((issue: Issue) =>
          issue._id === action.payload._id
            ? { ...issue, issueLog: action.payload.issueLog }
            : issue
        ),
      };
    case GET_CLOSED:
      return {
        ...state,
        closed: action.payload,
      };
    case DELETE_ISSUE:
      return {
        ...state,
        issues: state.issues.filter(
          (issue: Issue) => issue._id !== action.payload
        ),
      };
    case SET_PROJECT:
      return {
        ...state,
        currentProject: action.payload,
      };
    default:
      return state;
  }
};
