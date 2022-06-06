import { createContext, useState, useEffect } from 'react';

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('posts')) {
      setPosts(JSON.parse(localStorage.getItem('posts')));
    }
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
