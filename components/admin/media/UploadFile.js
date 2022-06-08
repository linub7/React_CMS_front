import { useContext } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { AuthContext } from 'context/auth';
import { MediaContext } from 'context/media';
import { useRouter } from 'next/router';

const UploadFile = ({ redirectToLibrary = false }) => {
  const router = useRouter();
  const { auth } = useContext(AuthContext);
  const { media, setMedia } = useContext(MediaContext);
  const props = {
    name: 'file',
    action: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload-image-file`,
    headers: {
      Authorization: `Bearer ${auth?.token}`,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        setMedia({
          ...media,
          images: [...media.images, info.file.response],
          selected: info.file.response,
          showMediaModal: false,
        });
        localStorage.setItem(
          'media',
          JSON.stringify({
            ...media,
            images: [...media.images, info.file.response],
            selected: info.file.response,
            showMediaModal: false,
          })
        );
        redirectToLibrary && router.push('/admin/media/library');
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Upload {...props} maxCount={1} accept="image/*">
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default UploadFile;
