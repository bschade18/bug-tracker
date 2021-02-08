import { SET_ERRORS, CLEAR_ERRORS } from './types';
import { Dispatch } from 'redux';
import { Errors, SetErrorsAction } from './interfaces';

export const setErrors = (errors: Errors) => (dispatch: Dispatch) => {
  console.log(errors);
  dispatch<SetErrorsAction>({
    type: SET_ERRORS,
    payload: errors,
  });
};

export const clearErrors = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
