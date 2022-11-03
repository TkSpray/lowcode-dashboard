import axios from 'axios';

export const axiosInstance = axios.create({
  timeout: 1000 * 10,
  baseURL: 'http://localhost:3002',
});

axiosInstance.interceptors.response.use((res) => res.data);
