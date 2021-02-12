// Auth
export const USER_LOADING = 'USER_LOADING';
export const USER_LOADED = 'USER_LOADED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCESS';

export interface UserLoadingAction {
  type: typeof USER_LOADING;
}

export interface UserLoadedAction {
  type: typeof USER_LOADED;
  payload: User;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: UserWithToken;
}

export interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: UserWithToken;
}

export interface RegisterFailAction {
  type: typeof REGISTER_FAIL;
}

export interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

export interface GetUsersAction {
  type: string;
  payload: User[];
}

export interface UserWithToken {
  token: string;
  user: {
    email: string;
    id: string;
    name: string;
    team: string;
  };
}

export interface User {
  createdAt: string;
  email: string;
  name: string;
  team: string;
  updatedAt: string;
  _id: string;
}

export type AuthAction =
  | UserLoadingAction
  | UserLoadedAction
  | LoginSuccessAction
  | RegisterSuccessAction
  | RegisterFailAction
  | LogoutSuccessAction;

// Issue
export const GET_ISSUES = 'GET_ISSUES';
export const GET_CLOSED = 'GET_CLOSED';
export const ISSUES_LOADING = 'ISSUES_LOADING';
export const ADD_ISSUE = 'ADD_ISSUE';
export const UPDATE_ISSUE = 'UPDATE_ISSUE';
export const DELETE_ISSUE = 'DELETE_ISSUE';
export const SET_PROJECT = 'SET_PROJECT';

export interface GetIssuesAction {
  type: typeof GET_ISSUES;
  payload: Issue[];
}

export interface IssuesLoadingAction {
  type: typeof ISSUES_LOADING;
}

export interface GetClosedAction {
  type: typeof GET_CLOSED;
  payload: Issue[];
}

export interface UpdateIssueAction {
  type: typeof UPDATE_ISSUE;
  payload: Issue;
}

export interface AddIssueAction {
  type: typeof ADD_ISSUE;
  payload: Issue;
}

export interface DeleteIssueAction {
  type: typeof DELETE_ISSUE;
  payload: string;
}
export interface SetProjectAction {
  type: typeof SET_PROJECT;
  payload: string;
}

export type IssueAction =
  | GetIssuesAction
  | GetClosedAction
  | IssuesLoadingAction
  | AddIssueAction
  | UpdateIssueAction
  | DeleteIssueAction
  | SetProjectAction;

export interface Issues {
  count: number;
  data: Issue[];
  pagination: {};
  success: boolean;
  total: number;
  totalPages: number;
}

export interface Issue {
  assignedTo: string;
  createdAt: string;
  date: string;
  issueLog: {
    date: string;
    desc: string;
    name: string;
    _id: string;
  }[];
  issueTitle: string;
  name: string;
  number: number;
  projectTitle: string;
  status: string;
  team: string;
  updatedAt: string;
  _id: string;
}

// Error
export const SET_ERRORS = 'SET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export interface SetErrorsAction {
  type: typeof SET_ERRORS;
  payload: Error[];
}

export interface ClearErrorsAction {
  type: typeof CLEAR_ERRORS;
}

export interface Error {
  msg: string;
  param: string;
  location?: string;
  value?: string;
}

export type ErrorAction = SetErrorsAction | ClearErrorsAction;

// User
export const GET_USERS = 'GET_USERS';
