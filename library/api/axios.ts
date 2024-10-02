import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dashboard.trykeyprotocol.com/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU5MzU0MjQzLCJpYXQiOjE3Mjc4MTgyNDMsImp0aSI6IjNlMzlmNzZiNmU4MzRjOWZiM2EwZTRiYjY3MzY1YzhiIiwidXNlcl9pZCI6MTF9.2MvwMMpNzRdBL57v-KfbArZLo2NBuBFSNOIdmpwoomU";

export const axiosAuth = axios.create({
  baseURL: 'https://dashboard.trykeyprotocol.com/api',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'multipart/form-data',
  }
});


// Request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // You can add auth token here if needed
//     // const token = localStorage.getItem('token');
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors here (e.g., redirect to login if unauthorized)
//     if (error.response && error.response.status === 401) {
//       // Redirect to login or refresh token
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;