import axios from "axios";
import { getCookie, removeCookie } from "../../util";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { useLocation, useNavigate } from "react-router-dom";

export const baseURL = '/api';

const getRefreshToken = async () => {
        
  try {
      const tokenReq = await axios.post(`${baseURL}/Authenticate/RefreshToken`,null, {
        withCredentials: true
      });
      
      return tokenReq.data.token

    } catch(error) {
      return null;
    }
}

const httpClient = axios.create({
  baseURL,
  headers: {
      'Accept': '*/*',
      'Accept-Language': getCookie("EMSSystemLang") ? getCookie("EMSSystemLang") : 'EN',
      'Content-Type': "application/json",
    },
});

const useHTTP = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { access, setAccess } = useContext(AuthContext);

  const updateHTTPClient = (authToken?: string | null) => { 

    httpClient.defaults.headers['Authorization'] = authToken ? `Bearer ${authToken}` : '';
    httpClient.defaults.headers['Accept-Language'] = getCookie("EMSSystemLang") ? getCookie("EMSSystemLang") : 'EN';
  
    // Request interceptor
    httpClient.interceptors.request.use(function (config) {
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
  
    // Response interceptor
    httpClient.interceptors.response.use(function (response) {
      return response;
    }, async function (error) {
  
      if(error.response.status === 401 && !error.config.sent) {
        error.config.sent = true;
        const refreshToken = await getRefreshToken();
        // Refresh Token Not Expired
        if(refreshToken) {
          error.config.headers['Authorization'] = `Bearer ${refreshToken}`;
          setAccess(refreshToken)
          return await httpClient.request(error.config);
        }
        // Refresh Token Expired
        setAccess(null);
        removeCookie('EMSUser');
        sessionStorage.removeItem('EMSUser');
      }
  
      return Promise.reject(error);
  
    });
  
    return httpClient;
  
  }

  useEffect(() => {
    updateHTTPClient(access);
    if(access) {
      setAccess(access);
    }
    if(!access && !getCookie('EMSUser') && !sessionStorage.getItem('EMSUser') && location.pathname !== '/sign-in') {
      navigate('/sign-in', {
        replace: true,
        state: {
          from: location.pathname
        }
      });
    }
  },[access, getCookie('EMSUser'),sessionStorage.getItem('EMSUser')])

  const { get, post, put, delete: deleteReq  } = httpClient;

  return { get, post, put, deleteReq } ;

}

export { useHTTP }