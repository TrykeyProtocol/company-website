import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://dashboard.trykeyprotocol.com/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYwMDY0NzY1LCJpYXQiOjE3Mjg1Mjg3NjUsImp0aSI6IjFiMWY2ZWExMmQ3MzRhMjM5OWQyYzYwMDQyMjJlYjY5IiwidXNlcl9pZCI6MX0.p8XsvM_EuFlTqaEGwdGB9wWUDKI17lZvyCj8-TfDdLs";

// export const axiosAuth = axios.create({
//   baseURL: 'https://dashboard.trykeyprotocol.com/api',
//   headers: {
//     'Authorization': `Bearer ${TOKEN}`,
//     'Content-Type': 'application/json',
//   }
// });



export const axiosAuth = axios.create({
  baseURL: 'https://dashboard.trykeyprotocol.com/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add an interceptor to dynamically set the Authorization header
axiosAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


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

