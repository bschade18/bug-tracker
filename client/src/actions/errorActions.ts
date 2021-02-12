import { SET_ERRORS, CLEAR_ERRORS } from './types';
import { Dispatch } from 'redux';
import { Error, SetErrorsAction, ClearErrorsAction } from './types';

export const setErrors = (errors: Error[]) => (dispatch: Dispatch) => {
  dispatch<SetErrorsAction>({
    type: SET_ERRORS,
    payload: errors,
  });
};

export const clearErrors = () => (dispatch: Dispatch) => {
  dispatch<ClearErrorsAction>({
    type: CLEAR_ERRORS,
  });
};
