import axios from 'axios';
import {
  GET_ISSUES,
  ISSUES_LOADING,
  GET_CLOSED,
  UPDATE_ISSUE,
  ADD_ISSUE,
  DELETE_ISSUE,
  SET_PROJECT,
  Issues,
  Issue,
  GetIssuesAction,
  GetClosedAction,
  UpdateIssueAction,
  AddIssueAction,
  DeleteIssueAction,
  SetProjectAction,
  IssuesLoadingAction,
} from './types';
import { Dispatch } from 'redux';

export const getIssues = (team: string) => async (dispatch: Dispatch) => {
  dispatch<IssuesLoadingAction>({ type: ISSUES_LOADING });
  try {
    const res = await axios.get<Issues>(`/issues?team=${team}`);

    dispatch<GetIssuesAction>({
      type: GET_ISSUES,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getRecentClosed = (team: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get<Issues>(
      `/issues?team=${team}&limit=5&status=Closed&sort=-updatedAt`
    );

    dispatch<GetClosedAction>({
      type: GET_CLOSED,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateIssue = (
  id: string,
  issue: object,
  history: object
) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put<Issue>(`/issues/${id}`, issue);

    // @ts-ignore
    setTimeout(() => history.push('/home'), 1000);

    dispatch<UpdateIssueAction>({
      type: UPDATE_ISSUE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addIssue = (newIssue: object, history: object) => async (
  dispatch: Dispatch
) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  try {
    const res = await axios.post<Issue>('/issues', newIssue, config);

    // @ts-ignore
    setTimeout(() => history.push('/home'), 1000);

    dispatch<AddIssueAction>({
      type: ADD_ISSUE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteIssue = (id: string, history: object) => async (
  dispatch: Dispatch
) => {
  try {
    await axios.delete(`/issues/${id}`);

    // @ts-ignore
    setTimeout(() => history.push('/home'), 1000);

    dispatch<DeleteIssueAction>({
      type: DELETE_ISSUE,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setProject = (project: string): SetProjectAction => {
  return {
    type: SET_PROJECT,
    payload: project,
  };
};
