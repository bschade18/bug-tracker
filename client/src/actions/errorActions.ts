import { SET_ERRORS, CLEAR_ERRORS } from './types';
import { Error, SetErrorsAction, ClearErrorsAction } from './types';

export const setErrors = (errors: Error[]): SetErrorsAction => {
  return {
    type: SET_ERRORS,
    payload: errors,
  };
};

export const clearErrors = (): ClearErrorsAction => {
  return {
    type: CLEAR_ERRORS,
  };
};
