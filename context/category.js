import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './auth';

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
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
  //   if (localStorage.getItem('categories')) {
  //     setCategories(JSON.parse(localStorage.getItem('categories')));
  //   }
  // }, []);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryContext, CategoryProvider };
