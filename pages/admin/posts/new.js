import { useContext, useState, useEffect } from 'react';
import AdminLayout from 'components/admin/layout/AdminLayout';
import { ThemeContext } from 'context/theme';
import Editor from 'rich-markdown-editor';
import { Col, Input, Row, Select } from 'antd';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';

const { Option } = Select;

const NewPosts = () => {
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
  const [content, setContent] = useState(savedContent());
  const [title, setTitle] = useState(savedTitle());
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const { theme } = useContext(ThemeContext);
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

  const handleUploadImage = async (file) => {
    console.log(file);
    try {
      const image = await handleResizeFile(file);
      console.log('Image Base 64: ', image);
      return;
      const { data } = await axios.post('/upload-image', { image });
      console.log('upload file response', data);
      return data?.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
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
          <Editor
            defaultValue={content}
            dark={theme === 'dark' ? true : false}
            onChange={handleContentChange}
            uploadImage={handleUploadImage}
          />
        </Col>
        <Col xs={22} sm={22} lg={8} offset={1}>
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
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default NewPosts;
