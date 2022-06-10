import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './auth';
import axios from 'axios';

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
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

  // useEffect(() => {
  //   if (localStorage.getItem('posts')) {
  //     setPosts(JSON.parse(localStorage.getItem('posts')));
  //   }
  // }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
