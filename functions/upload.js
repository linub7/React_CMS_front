import axios from 'axios';
import Resizer from 'react-image-file-resizer';

const handleResizeFile = (file) => {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      720,
      400,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64'
    );
  });
};

export const handleUploadImage = async (file) => {
  try {
    const image = await handleResizeFile(file);
    const { data } = await axios.post('/upload-image', { image });
    return data?.url;
  } catch (error) {
    console.log(error);
  }
};
