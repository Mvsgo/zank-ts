import axios from 'axios';

const URL = 'http://localhost:5630';

const api = () => {
  return axios.create({
    baseURL: URL,
    headers: { 'content-types': 'application/json' },
  });
};

export default api;
