import React, { useReducer } from 'react';
import axios from 'axios';
import IssuesContext from './issuesContext';
import IssuesReducer from './issuesReducer';
import { GET_ISSUES } from '../types';

const IssuesState = (props) => {
  const initialState = {
    issues: [],
  };

  const [state, dispatch] = useReducer(IssuesReducer, initialState);

  // Get Issues

  // want to return provider

  return (
    <IssuesContext.Provider
      value={{
        issues: state.issues,
      }}
    >
      {props.children}
    </IssuesContext.Provider>
  );
};

export default IssuesState;
