import { GET_ISSUES, GET_CLOSED } from '../actions/types';
import axios from 'axios';

export const getIssues = () => async (dispatch, getState) => {
  try {
    const res = await axios.get('/issue');

    dispatch({
      type: GET_ISSUES,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: ISSUE_ERROR,
    //   payload: err.response.msg,
    // });
  }
};

export const getRecentClosed = () => async (dispatch, getState) => {
  try {
    const res = await axios.get('/issue?limit=5&status=Closed&sort=-updatedAt');
    dispatch({
      type: GET_CLOSED,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: ISSUE_ERROR,
    //   payload: err.response.msg,
    // });
  }
};
