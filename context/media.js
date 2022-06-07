import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './auth';
import axios from 'axios';

const MediaContext = createContext();

const MediaProvider = ({ children }) => {
  const [media, setMedia] = useState({
    images: [],
    selected: '',
    showMediaModal: false,
  });

  const { auth } = useContext(AuthContext);

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
    if (localStorage.getItem('media')) {
      setMedia(JSON.parse(localStorage.getItem('media')));
    }
  }, []);

  return (
    <MediaContext.Provider value={{ media, setMedia }}>
      {children}
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaProvider };
