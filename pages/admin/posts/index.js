import { useEffect, useContext } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, List, Row, Tooltip } from 'antd';
import AdminLayout from 'components/admin/layout/AdminLayout';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import axios from 'axios';
import { PostContext } from 'context/post';
import PostsList from 'components/posts/PostsList';

const Posts = () => {
  const router = useRouter();

  const { posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const { data } = await axios.get('/posts');
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setPosts(data?.posts);
        localStorage.setItem('posts', JSON.stringify(data?.posts));
      }
    } catch (error) {
      console.log(error);
      toast.error('Error fetching posts');
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const { data } = await axios.delete(`/posts/${postId}`);
        if (data?.error) {
          toast.error(data?.error);
        } else {
          toast.success('Post deleted successfully');
          setPosts(posts.filter((post) => post._id !== postId));
          localStorage.setItem(
            'posts',
            JSON.stringify(posts.filter((post) => post._id !== postId))
          );
        }
      } catch (error) {
        console.log(error);
        toast.error('Error deleting post');
      }
    }
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={22} offset={1}>
          <Button
            type="primary"
            style={{ margin: '10px 0px 10px 0px' }}
            onClick={() => router.push('/admin/posts/new')}
          >
            <PlusOutlined />
            Add New
          </Button>
          <h1 style={{ marginTop: '15px' }}>{posts?.length} Posts:</h1>
          <div className="line"></div>
          <PostsList posts={posts} handleDeletePost={handleDeletePost} />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Posts;
