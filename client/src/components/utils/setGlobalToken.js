import axios from 'axios';

const setGlobalToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
    console.log('token is not available in localStorage');
  }
};

export default setGlobalToken;
