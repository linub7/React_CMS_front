import { useContext } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { AuthContext } from 'context/auth';
const { Dragger } = Upload;

const MediaLibrary = () => {
  const { auth } = useContext(AuthContext);
  const props = {
    name: 'file',
    multiple: true,
    action: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload-image-file`,
    headers: {
      Authorization: `Bearer ${auth?.token}`,
    },

    onChange(info) {
      const { status } = info.file;

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <div>
      <Dragger {...props} accept="image/*">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
    </div>
  );
};

export default MediaLibrary;
