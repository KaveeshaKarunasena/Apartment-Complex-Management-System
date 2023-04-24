import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

const Initialvalue = {
  life: 0,
  token: null,
  init: null,
  client: null,
};
export const AuthContext = React.createContext(Initialvalue);

export function AuthProviderComponent({ children }) {
  const [loading, setLoading] = useState(false);
  const [authPayload, setAuthPayload] = useState(Initialvalue);

  const init = useCallback(async () => {
    try {
      console.log("here")
      setLoading(true);
      const fromStorage = await localStorage.getItem('token');
      console.log(fromStorage)
      if (fromStorage) {
        const data = JSON.parse(fromStorage);
        console.log(data.token)
        const axiosClient = axios.create({
          baseURL: 'http://localhost:5000',
          headers: {
            Authorization: 'Bearer ' + data.token,
          },
        });
        axios.interceptors.response.use(
          function (response) {
            
            return response;
            
          },
          function (error) {
            if (
              error?.response?.data?.err &&
              error?.response?.data?.err === 'Forbinded Resources'
            ) {
              localStorage.removeItem('token');
              window.location.href = 'http://localhost:3000/login';
            }

            return Promise.reject(error);
          }
        );
        console.log(data)
        setAuthPayload({ ...data, client: axiosClient });
        
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  if (loading) return React.createElement('div', null, 'Loading....');

  return React.createElement(AuthContext.Provider, { value: { ...authPayload, init } }, children);
}
