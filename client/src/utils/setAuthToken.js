import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    // set global header
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
