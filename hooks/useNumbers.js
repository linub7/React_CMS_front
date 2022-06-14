import axios from 'axios';
import { useState, useEffect } from 'react';

const useNumbers = () => {
  const [usersCounts, setUsersCounts] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);

  useEffect(() => {
    const getCounts = async () => {
      try {
        const { data } = await axios.get(`/statistics`);
        setUsersCounts(data?.usersCount);
        setPostsCount(data?.postsCount);
        setCommentsCount(data?.commentsCount);
        setCategoriesCount(data?.categoriesCount);
      } catch (error) {
        console.log(error);
      }
    };
    getCounts();
  }, []);

  return {
    usersCounts,
    postsCount,
    commentsCount,
    categoriesCount,
  };
};

export default useNumbers;
