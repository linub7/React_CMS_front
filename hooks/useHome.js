import axios from 'axios';
import { useState, useEffect } from 'react';

const useHome = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [fullWidthImage, setFullWidthImage] = useState('');

  useEffect(() => {
    const getPage = async () => {
      try {
        const { data } = await axios.get('/page?page=home');
        setTitle(data?.found?.title);
        setSubtitle(data?.found?.subtitle);
        setFullWidthImage(data?.found?.fullWidthImage);
      } catch (error) {
        console.log(error);
      }
    };
    getPage();
  }, []);

  return {
    title,
    setTitle,
    subtitle,
    setSubtitle,
    fullWidthImage,
    setFullWidthImage,
  };
};

export default useHome;
