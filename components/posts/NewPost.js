import { useEffect, useState, useContext } from 'react';
import { Button, Col, Image, Input, Modal, Row, Select } from 'antd';
import { handleUploadImage } from 'functions/upload';
import { ThemeContext } from 'context/theme';
import Editor from 'rich-markdown-editor';
import { EyeOutlined, UploadOutlined } from '@ant-design/icons';
import { MediaContext } from 'context/media';
import axios from 'axios';
import MediaTabs from 'components/admin/media/MediaTabs';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const { Option } = Select;

const NewPostComponent = () => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const { media, setMedia } = useContext(MediaContext);
  const savedTitle = () => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('post-title')) {
        return JSON.parse(localStorage.getItem('post-title'));
      }
    }
  };
  const savedContent = () => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('post-content')) {
        return JSON.parse(localStorage.getItem('post-content'));
      }
    }
  };

  const [title, setTitle] = useState(savedTitle());
  const [content, setContent] = useState(savedContent());
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setTitle(e.target.value);
    localStorage?.setItem('post-title', JSON.stringify(e.target.value));
  };

  const handleContentChange = (value) => {
    setContent(value());
    localStorage.setItem('post-content', JSON.stringify(value()));
  };

  useEffect(() => {
    getCategories();

    return () => {
      setLoadedCategories([]);
    };
  }, []);

  const getCategories = async () => {
    try {
      const { data } = await axios.get('/categories');
      setLoadedCategories(data?.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('/create-post', {
        title,
        content,
        categories,
        featuredImage: media?.selected?._id,
      });
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        console.log(data);
        toast.success('Post created successfully');
        localStorage.removeItem('post-title');
        localStorage.removeItem('post-content');
        setCategories([]);
        setMedia({ ...media, selected: null });
        localStorage.setItem(
          'media',
          JSON.stringify({ ...media, selected: null })
        );
        setLoading(false);
        router.push('/admin/posts');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, try again later.');
      setLoading(false);
    }
  };
  return (
    <Row>
      <Col xs={22} sm={22} lg={14} offset={1}>
        <h1>Create new post</h1>
        <Input
          placeholder="Give your post a title"
          size="large"
          value={title}
          onChange={handleInputChange}
        />

        <div className="line"></div>
        <div className="editor-scroll">
          <Editor
            defaultValue={content}
            dark={theme === 'dark' ? true : false}
            onChange={handleContentChange}
            uploadImage={handleUploadImage}
          />
        </div>
      </Col>
      <Col xs={22} sm={22} lg={8} offset={1}>
        <Button
          onClick={() => setIsVisibleModal(true)}
          style={{ margin: '10px 0 10px 0', width: '100%' }}
        >
          <EyeOutlined />
          Preview
        </Button>
        <Button
          onClick={() => setMedia({ ...media, showMediaModal: true })}
          style={{ margin: '10px 0 10px 0', width: '100%' }}
        >
          <UploadOutlined />
          Featured Image
        </Button>

        <h4>Categories</h4>
        <Select
          mode="multiple"
          allowClear={true}
          placeholder="Select Categories"
          style={{ width: '100%' }}
          onChange={(value) => setCategories(value)}
        >
          {loadedCategories?.map((category) => (
            <Option key={category.name}>{category.name}</Option>
          ))}
        </Select>

        {media?.selected && (
          <div style={{ marginTop: '15px' }}>
            <Image
              width="100%"
              src={media?.selected?.url}
              alt={media?.selected?._id}
            />
          </div>
        )}

        <Button
          type="primary"
          onClick={handlePublish}
          style={{ margin: '10px 0 10px 0', width: '100%' }}
          loading={loading}
        >
          Publish
        </Button>
      </Col>
      <Modal
        title="Preview"
        centered
        visible={isVisibleModal}
        onOk={() => setIsVisibleModal(false)}
        onCancel={() => setIsVisibleModal(false)}
        footer={null}
        width={720}
      >
        <h1>{title}</h1>
        <div className="editor-scroll">
          <Editor
            defaultValue={content}
            dark={theme === 'dark' ? true : false}
            readOnly
          />
        </div>
      </Modal>
      <Modal
        title="Media"
        visible={media?.showMediaModal}
        onOk={() => setMedia({ ...media, showMediaModal: false })}
        onCancel={() => setMedia({ ...media, showMediaModal: false })}
        footer={null}
        width={720}
      >
        <MediaTabs />
      </Modal>
    </Row>
  );
};

export default NewPostComponent;
