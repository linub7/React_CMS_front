import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button, Col, Input, Row } from 'antd';
import CommentsList from 'components/comments/CommentsList';
import AuthorLayout from 'components/author/layout/AuthorLayout';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState(comments);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTotalUserComments();
  }, [comments.length]);

  useEffect(() => {
    getUserComments();
  }, [page]);

  const getTotalUserComments = async () => {
    try {
      const { data } = await axios.get(`/user-comments-count`);
      setTotal(data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserComments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/user-comments?page=${page}`);
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setComments(data?.comments);
        setAllComments([...data?.comments, ...allComments]);
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
        const { data } = await axios.delete(`/user-comments/${commentId}`);
        if (data?.error) {
          toast.error(data.error);
        } else {
          setAllComments(
            allComments.filter((comment) => comment._id !== data?.comment?._id)
          );
          setTotal(total - 1);
          toast.success('Comment deleted successfully');
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    }
  };
  return (
    <AuthorLayout>
      <Row>
        <Col span={22} offset={1}>
          <h1 style={{ marginTop: '15px' }}>{allComments?.length} Comments:</h1>
          <Input
            placeholder="Search Comment"
            value={keyword}
            type="search"
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />
          <CommentsList
            comments={
              keyword
                ? allComments?.filter((comment) =>
                    comment.content.toLowerCase().includes(keyword)
                  )
                : allComments
            }
            handleDeleteComment={handleDeleteComment}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'center', padding: '20px' }}>
          {total !== allComments.length && (
            <Button
              size="large"
              type="primary"
              loading={loading}
              onClick={() => setPage(page + 1)}
            >
              Load More
            </Button>
          )}
        </Col>
      </Row>
    </AuthorLayout>
  );
};

export default Comments;
