import { useContext, useState, useEffect } from 'react';
import AdminLayout from 'components/admin/layout/AdminLayout';
import { ThemeContext } from 'context/theme';
import Editor from 'rich-markdown-editor';
import { Button, Col, Image, Input, Modal, Row, Select } from 'antd';
import axios from 'axios';
import { handleUploadImage } from 'functions/upload';
import {
  EyeOutlined,
  LoadingOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import MediaTabs from 'components/admin/media/MediaTabs';
import { MediaContext } from 'context/media';

const { Option } = Select;

const EditPost = () => {
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const [post, setPost] = useState({});

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [categories, setCategories] = useState([]); // post's existing categories
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [featuredImage, setFeaturedImage] = useState({});
  const [id, setId] = useState('');
  const [getPostLoading, setGetPostLoading] = useState(true);

  const { theme } = useContext(ThemeContext);
  const { media, setMedia } = useContext(MediaContext);

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value());
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    getCategories();
    return () => {
      setLoadedCategories([]);
    };
  }, []);

  const getPost = async () => {
    try {
      const { data } = await axios.get(`/posts/${slug}`);
      console.log(data);
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setPost(data?.post);
        setTitle(data?.post?.title);
        setContent(data?.post?.content);
        setFeaturedImage(data?.post?.featuredImage);
        setId(data?.post?._id);
        // push category names
        let arr = [];
        data?.post?.categories?.map((category) => arr.push(category.name));
        setCategories(arr);
        setGetPostLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error fetching post');
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get('/categories');
      setLoadedCategories(data?.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(`/posts/${post._id}`, {
        title,
        content,
        categories,
        featuredImage: media?.selected?._id
          ? media?.selected?._id
          : featuredImage?._id
          ? featuredImage?._id
          : undefined,
      });
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        toast.success('Post Edited successfully');
        setCategories([]);
        setMedia({ ...media, selected: null });
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
    <AdminLayout>
      <Row>
        <Col xs={22} sm={22} lg={14} offset={1}>
          <h1>Edit post</h1>
          <Input
            placeholder="Give your post a title"
            size="large"
            value={title}
            onChange={handleInputChange}
          />

          <div className="line"></div>
          {getPostLoading ? (
            <LoadingOutlined style={{ fontSize: '24px' }} />
          ) : (
            <div className="editor-scroll">
              <Editor
                defaultValue={content}
                dark={theme === 'dark' ? true : false}
                onChange={handleContentChange}
                uploadImage={handleUploadImage}
              />
            </div>
          )}
        </Col>
        <Col xs={22} sm={22} lg={8} offset={1} style={{ marginTop: '25px' }}>
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
            value={[...categories]}
            onChange={(value) => setCategories(value)}
          >
            {loadedCategories?.map((category) => (
              <Option key={category.name}>{category.name}</Option>
            ))}
          </Select>

          {media?.selected ? (
            <div style={{ marginTop: '15px' }}>
              <Image
                width="100%"
                src={media?.selected?.url}
                alt={media?.selected?._id}
              />
            </div>
          ) : featuredImage?.url ? (
            <div style={{ marginTop: '15px' }}>
              <Image
                width="100%"
                src={featuredImage?.url}
                alt={featuredImage?.url}
              />
            </div>
          ) : (
            ''
          )}

          <Button
            type="primary"
            onClick={handleEditPost}
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
    </AdminLayout>
  );
};

export default EditPost;
