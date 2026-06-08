import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:5001';

const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;