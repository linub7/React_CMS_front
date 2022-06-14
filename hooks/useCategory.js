import axios from 'axios';
import { useState, useEffect } from 'react';

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get('/categories');
        setCategories(data?.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  return {
    categories,
  };
};

export default useCategory;
