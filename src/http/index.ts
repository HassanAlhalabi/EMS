import axios from "axios";

export const baseURL = 'http://alimakhlouf222-001-site1.btempurl.com/api';

const HTTPclient = axios.create({
  baseURL,
});

// // Request interceptor
// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

// // Response interceptor
// axios.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     console.log('Handle Success');
//     return response;
//   }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     console.log('Handle Response Error');
//     return Promise.reject(error);
//   });

export const { get, post, put } = HTTPclient;