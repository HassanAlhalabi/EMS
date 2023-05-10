import axios from "axios";
import { getCookie } from "../util";

export const baseURL = 'http://alimakhlouf-002-site4.btempurl.com/api';

let HTTPclient = axios.create({
  baseURL,
  headers: {
      'Authorization' : getCookie("EMSUser") && `Bearer ${getCookie("EMSUser").token}`,
      'Accept-Language': getCookie("EMSSystemLang") ? getCookie("EMSSystemLang") : 'EN'
    }
});

// // Request interceptor
axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `Bearer ${getCookie("EMSUser").token}`;
    config.headers['Accept-Language'] = getCookie("EMSSystemLang") ? getCookie("EMSSystemLang") : 'EN';
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Response interceptor
HTTPclient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export const { get, post, put, delete: deleteReq } = HTTPclient;