import axios from 'axios';

const { useState, useEffect } = require('react');

const useLatestPosts = () => {
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const getLatestPosts = async () => {
      try {
        const { data } = await axios.get('/all-posts?page=1');
        setLatestPosts(data?.posts);
      } catch (error) {
        console.log(error);
      }
    };
    getLatestPosts();
  }, []);

  return {
    latestPosts,
  };
};

export default useLatestPosts;
