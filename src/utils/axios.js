/**
 * axios setup to use mock service
 */

import axios from 'axios';

const axiosServices = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3010/', withCredentials: true });

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default axiosServices;
