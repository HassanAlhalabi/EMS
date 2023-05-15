import axios from "axios";
import { getCookie } from "../../util";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";

export const baseURL = 'https://alimakhlouf-002-site4.btempurl.com/api';

const createHTTPClient = () => axios.create({
  baseURL,
  headers: {
      'Authorization' : getCookie("EMSUser") && `Bearer ${getCookie("EMSUser").token}`,
      'Accept-Language': getCookie("EMSSystemLang") ? getCookie("EMSSystemLang") : 'EN'
    }
});

let HTTPclient = createHTTPClient();

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

const useHTTP = () => {
    useContext(AuthContext);
    const HTTP = createHTTPClient();
    const { get, post, put, delete: deleteReq  } = HTTP;
    return { get, post, put, deleteReq };
}

export { useHTTP }