import { useState, useContext, useEffect } from 'react';
import { CloseCircleOutlined, InboxOutlined } from '@ant-design/icons';
import { message, Upload, Image, Badge } from 'antd';
import { AuthContext } from 'context/auth';
import { MediaContext } from 'context/media';
import axios from 'axios';
import toast from 'react-hot-toast';
const { Dragger } = Upload;

const MediaLibrary = ({ author = false }) => {
  const [showPreview, setShowPreview] = useState(false);
  const { auth } = useContext(AuthContext);
  const { media, setMedia } = useContext(MediaContext);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data } = await axios.get(author ? `/author-media` : `/media`);
        setMedia({ ...media, images: data });
        localStorage.setItem(
          'media',
          JSON.stringify({ ...media, images: data })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchMedia();
  }, []);

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
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const handleChooseFeaturedImage = (image) => {
    setMedia({ ...media, selected: image, showMediaModal: false });
    localStorage.setItem(
      'media',
      JSON.stringify({ ...media, selected: image, showMediaModal: false })
    );
  };

  const handleDeleteFeaturedImage = async (image) => {
    try {
      const { data } = await axios.delete(`/media/${image._id}`);
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setMedia({
          ...media,
          selected: media.selected._id === image._id ? '' : media.selected,
          images: media.images.filter((i) => i._id !== image._id),
        });
        localStorage.setItem(
          'media',
          JSON.stringify({
            ...media,
            selected: media.selected._id === image._id ? '' : media.selected,
            images: media.images.filter((i) => i._id !== image._id),
          })
        );
        toast.success('Image deleted successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error);
    }
  };

  return (
    <>
      <Dragger {...props} accept="image/*">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
      <div style={{ textAlign: 'center' }}>
        {media?.images?.map((image) => (
          <Badge key={image._id}>
            <Image
              preview={showPreview}
              key={image._id}
              alt={image._id}
              src={image.url}
              onClick={() => handleChooseFeaturedImage(image)}
              style={{
                paddingTop: '5px',
                paddingRight: '10px',
                marginBottom: '5px',
                height: '100px',
                width: '100px',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
            />
            <br />
            <CloseCircleOutlined
              className="close-circle"
              onClick={() => handleDeleteFeaturedImage(image)}
            />
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MediaLibrary;
