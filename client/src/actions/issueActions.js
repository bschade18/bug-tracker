import {
  GET_ISSUES,
  GET_CLOSED,
  SET_PROJECT,
  ISSUES_LOADING,
  UPDATE_ISSUE,
  ADD_ISSUE,
  DELETE_ISSUE,
} from '../actions/types';
import axios from 'axios';

export const getIssues = (team) => async (dispatch) => {
  dispatch({ type: ISSUES_LOADING });
  try {
    const res = await axios.get(`/issues?team=${team}`);

    dispatch({
      type: GET_ISSUES,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getRecentClosed = (team) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/issues?team=${team}&limit=5&status=Closed&sort=-updatedAt`
    );
    dispatch({
      type: GET_CLOSED,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateIssue = (id, issue, history) => async (dispatch) => {
  try {
    const res = await axios.put(`/issues/${id}`, issue);

    setTimeout(() => history.push('/home'), 1000);

    dispatch({
      type: UPDATE_ISSUE,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addIssue = (newIssue, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/issues', newIssue, config);

    setTimeout(() => history.push('/home'), 1000);

    dispatch({
      type: ADD_ISSUE,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteIssue = (id, history) => async (dispatch) => {
  try {
    await axios.delete(`/issues/${id}`);

    setTimeout(() => history.push('/home'), 1000);

    dispatch({
      type: DELETE_ISSUE,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setProject = (project) => (dispatch) => {
  dispatch({
    type: SET_PROJECT,
    payload: project,
  });
};
