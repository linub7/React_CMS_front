import { Button, Input } from 'antd';
import { AuthContext } from 'context/auth';
import { useContext } from 'react';

const { TextArea } = Input;

const CommentForm = ({ comment, setComment, loading, handleSendComment }) => {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <br />
      <TextArea
        placeholder={
          !auth?.token && auth?.user === null
            ? 'Please login to comment'
            : 'Leave a comment'
        }
        rows="4"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={!auth.token}
        maxLength={200}
      />
      <Button
        loading={loading}
        type="primary"
        onClick={handleSendComment}
        style={{ marginTop: '5px' }}
        disabled={!auth?.token && auth?.user === null}
      >
        Post
      </Button>
    </>
  );
};

export default CommentForm;
