import axios from 'axios';

const api = axios.create({
  baseURL: 'http://162.214.54.8:2999',
});

export default api;