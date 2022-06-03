import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  });

  // config axios
  if (typeof window !== 'undefined') {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    axios.defaults.headers.common['Authorization'] =
      auth?.token && `Bearer ${auth?.token}`;
  } else {
    axios.defaults.baseURL = process.env.BACKEND_URL;
    axios.defaults.headers.common['Authorization'] =
      auth?.token && `Bearer ${auth?.token}`;
  }

  useEffect(() => {
    if (Cookies.get('auth')) {
      setAuth(JSON.parse(Cookies.get('auth')));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
