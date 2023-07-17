import axios from "axios";
import { getCookie, removeCookie } from "../../util";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { useLocation, useNavigate } from "react-router-dom";
import i18n from "../../i18n";

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

export const httpClient = axios.create({
  baseURL,
  headers: {
      'Accept': '*/*',
      "Content-Type": 'application/json',
      'Accept-Language': i18n.resolvedLanguage,
    },
  proxy: {
    protocol: 'https',
    host: 'alimakhlouf-002-site4.btempurl.com',
    port: 8080
}
});

const useHTTP = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { access, setAccess } = useContext(AuthContext);

  const updateHTTPClient = (authToken?: string | null) => { 

    httpClient.defaults.headers['Authorization'] = authToken ? `Bearer ${authToken}` : '';
    httpClient.defaults.headers['Accept-Language'] = i18n.resolvedLanguage as string;
  
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
          console.log(error.config.headers)
          error.config.headers['Authorization'] = `Bearer ${refreshToken}`;
          setAccess(refreshToken)
          return await httpClient.request(error.config);
        }
        // Refresh Token Expired
        setAccess(null);
        removeCookie('EMSUser');
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
    if(!access && !getCookie('EMSUser') && location.pathname !== '/sign-in') {
      navigate('/sign-in', {
        replace: true,
        state: {
          from: location.pathname
        }
      });
    }
  },[access, getCookie('EMSUser')])

  const { get, post, put, delete: deleteReq  } = httpClient;

  return { get, post, put, deleteReq } ;

}

export { useHTTP }