import { SET_ERRORS, CLEAR_ERRORS } from './types';

export const setErrors = (msg, timeout = 4000) => (dispatch) => {
  dispatch({
    type: SET_ERRORS,
    payload: msg,
  });

  setTimeout(() => dispatch({ type: CLEAR_ERRORS }), timeout);
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
