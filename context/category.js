import { createContext, useState, useEffect } from 'react';

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('categories')) {
      setCategories(JSON.parse(localStorage.getItem('categories')));
    }
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryContext, CategoryProvider };
