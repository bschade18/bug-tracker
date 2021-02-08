// Issue Actions

export interface Issues {
  count: number;
  data: {
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
  }[];
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

export interface GetIssuesAction {
  type: string;
  payload: Issue[];
}

export interface GetRecentClosedAction {
  type: string;
  payload: Issue[];
}

export interface UpdateIssueAction {
  type: string;
  payload: Issue;
}

export interface AddIssueAction {
  type: string;
  payload: Issue;
}

export interface DeleteIssueAction {
  type: string;
  payload: string;
}
export interface SetProjectAction {
  type: string;
  payload: string;
}

// Auth Actions

export interface RegisterProps {
  name: string;
  email: string;
  team: string;
  password: string;
  password2: string;
  }
  
  export interface LoginProps {
    email: string;
    password: string;
    }
  
  export interface User {
    createdAt: string;
  email: string;
  name: string;
  team: string;
  updatedAt: string;
  _id: string;
  }

  
  
  export interface UserWithToken {
    token: string;
    user: {
      email: string;
  id: string;
  name: string;
  team: string;
    }
  }
  
  export interface RegisterAction {
    type: string;
    payload: UserWithToken
  }
  
  export interface UserLoadedAction {
    type: string;
    payload: User;
  }
  
  export interface LoginAction {
    type: string;
    payload: UserWithToken;
  }

  export interface GetUsersAction {
    type: string;
    payload: User[]
  }

  // Error Actions

  export interface Errors {
    errors: {
      msg: string;
      param: string;
    }[];
  }
  
  export interface SetErrorsAction {
    type: string;
    payload: Errors;
    location?: string;
    value?: string;
  }