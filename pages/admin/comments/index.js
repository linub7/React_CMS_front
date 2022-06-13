import { Button, Col, Input, Row } from 'antd';
import axios from 'axios';
import AdminLayout from 'components/admin/layout/AdminLayout';
import CommentsList from 'components/comments/CommentsList';
import { AuthContext } from 'context/auth';
import { useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AdminComments = () => {
  const [total, setTotal] = useState(0);
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState(comments);
  const [loading, setLoading] = useState(false);

  const { auth } = useContext(AuthContext);

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    getTotalComments();
  }, []);

  useEffect(() => {
    auth?.token && getComments();
  }, []);

  const getTotalComments = async () => {
    try {
      const { data } = await axios.get('/admin/comments-count');
      setTotal(data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/admin/comments`);
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setComments(data?.comments);
        // setAllComments([...data?.comments, ...allComments]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Error fetching comments');
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const { data } = await axios.delete(`/admin/comments/${commentId}`);
        if (data?.error) {
          toast.error(data?.error);
        } else {
          toast.success('Post deleted successfully');
          setComments(comments.filter((comment) => comment._id !== commentId));
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
          <h1 style={{ marginTop: '15px' }}>{comments?.length} Comments:</h1>
          <Input
            placeholder="Search Comment"
            value={keyword}
            type="search"
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />
          <CommentsList
            comments={
              keyword
                ? comments?.filter(
                    (comment) =>
                      comment.content.toLowerCase().includes(keyword) ||
                      comment.postedBy.name.toLowerCase().includes(keyword) ||
                      comment.post.title.toLowerCase().includes(keyword)
                  )
                : comments
            }
            handleDeleteComment={handleDeleteComment}
          />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AdminComments;
