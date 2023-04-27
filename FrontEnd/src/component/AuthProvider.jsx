import axios from 'axios';
// import React, { useCallback, useEffect, useState } from 'react';
import React,{useCallback, useEffect, useState} from 'react'

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
      setLoading(true);
      const fromStorage = await localStorage.getItem('token');
      if (fromStorage) {
        const data = JSON.parse(fromStorage);
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

        setAuthPayload({ ...data, client: axiosClient });
        console.log(authPayload)
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [  ]);

  useEffect(() => {
    init();
  }, [init]);

  if (loading) return React.createElement('div', null, 'Loading....');
  //console.log("authpayload",{ ...authPayload, init })
return <AuthContext.Provider value = {{ ...authPayload, init }}>{children}</AuthContext.Provider>
  // return React.createElement(AuthContext.Provider, { value: { ...authPayload, init } }, children);
}
