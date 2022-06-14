import { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  List,
  Row,
  Skeleton,
  Tooltip,
  Typography,
} from 'antd';
import axios from 'axios';
import ClientLayout from 'components/client/layout/ClientLayout';
import dayjs from 'dayjs';
import Head from 'next/head';
import Link from 'next/link';
import Editor from 'rich-markdown-editor';
import { ThemeContext } from 'context/theme';
import CommentForm from 'components/comments/CommentForm';
import toast from 'react-hot-toast';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { AuthContext } from 'context/auth';
import { ShareSocial } from 'react-share-social';
import relativeTime from 'dayjs/plugin/relativeTime';
import EditCommentModal from 'components/comments/EditCommentModal';
import useCategory from 'hooks/useCategory';
import useLatestPosts from 'hooks/useLatestPosts';

dayjs.extend(relativeTime);

const { Title } = Typography;

const SinglePost = ({ post }) => {
  const { theme } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);
  const [loadedComments, setLoadedComments] = useState([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState('');
  const [selectedComment, setSelectedComment] = useState({});
  const [editButtonLoading, setEditButtonLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  // hooks
  const { categories } = useCategory();
  const { latestPosts } = useLatestPosts();

  useEffect(() => {
    getPostComments();

    return () => {
      setLoadedComments([]);
    };
  }, [post._id]);

  const getPostComments = async () => {
    setCommentLoading(true);
    try {
      const { data } = await axios.get(`/comments/${post._id}`);
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setLoadedComments(data?.comments);
      }
      setCommentLoading(false);
    } catch (error) {
      console.log(error);
      setCommentLoading(false);
    }
  };

  const handleSendComment = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`/comments/${post._id}`, {
        content: comment,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        setLoadedComments([data?.comment, ...loadedComments]);
        setComment('');
        toast.success('Comment sent successfully');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const { data } = await axios.delete(
          `/comments/${post._id}/${commentId}`
        );
        if (data?.error) {
          toast.error(data.error);
        } else {
          setLoadedComments(
            loadedComments.filter(
              (comment) => comment._id !== data?.comment?._id
            )
          );
          toast.success('Comment deleted successfully');
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    }
  };

  const handleEditOperations = (comment) => {
    setOpenModal(true);
    setContent(comment.content);
    setSelectedComment(comment);
  };

  const handleEditComment = async () => {
    setEditButtonLoading(true);
    try {
      const { data } = await axios.put(
        `comments/${post._id}/${selectedComment._id}`,
        {
          content,
        }
      );
      if (data?.error) {
        toast.error(data.error);
      } else {
        let arr = loadedComments;
        const idx = arr.findIndex(
          (element) => element._id === selectedComment._id
        );
        arr[idx].content = data?.comment?.content;
        setLoadedComments(arr);
        setOpenModal(false);
      }
      setEditButtonLoading(false);
    } catch (error) {
      console.log(error);
      setEditButtonLoading(false);
      toast.error('Something went wrong');
    }
  };

  return (
    <ClientLayout>
      <Head>
        <title>{post?.title}</title>
        <meta description={post?.content.substring(0, 160)} />
      </Head>
      <Row>
        <Col sm={24} lg={16}>
          <Card
            cover={
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post?.featuredImage?.url || '/images/def-pic.jpg'}
                alt={post?.title}
              />
            }
          >
            <Title>{post?.title}</Title>
            <p>
              {dayjs(post?.createAt).format('MMMM D, YYYY h:mm A')} / 0 comments
              / in{' '}
              {post?.categories?.map((category) => (
                <span key={category._id}>
                  <Link href={`/categories/${category.slug}`} passHref>
                    <a>{category.name} </a>
                  </Link>
                </span>
              ))}{' '}
              /by {post.postedBy.name}
            </p>

            {/* social share */}
            <div style={{ marginTop: '15px', marginBottom: '15px' }}>
              <ShareSocial
                style={{
                  background:
                    'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                  borderRadius: 3,
                  border: 0,
                  color: 'white',
                  padding: '0 30px',
                  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                }}
                url={typeof window !== 'undefined' && window.location.href}
                socialTypes={['facebook', 'twitter', 'linkedin', 'reddit']}
              />
            </div>

            <div className="editor-scroll">
              <Editor
                readOnly
                dark={theme === 'dark' ? true : false}
                defaultValue={post?.content}
              />
            </div>

            <CommentForm
              comment={comment}
              setComment={setComment}
              loading={loading}
              handleSendComment={handleSendComment}
            />

            <div style={{ marginBottom: '50px' }}></div>

            {commentLoading ? (
              <Skeleton
                avatar
                paragraph={{
                  rows: 4,
                }}
              />
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={loadedComments}
                renderItem={(comment) => (
                  <List.Item
                    id={comment?._id}
                    key={comment?._id}
                    actions={
                      comment?.postedBy?._id === auth?.user?._id && [
                        <Tooltip
                          placement="left"
                          key={comment?._id}
                          title="Edit"
                          color={'#f1c40f'}
                        >
                          <EditOutlined
                            style={{ color: '#f1c40f' }}
                            onClick={() => handleEditOperations(comment)}
                          />
                        </Tooltip>,
                        <Tooltip
                          placement="top"
                          key={comment?._id + 'delete'}
                          title="Delete"
                          color={'#e74c3c'}
                        >
                          <DeleteOutlined
                            style={{ color: '#e74c3c' }}
                            onClick={() => handleDeleteComment(comment?._id)}
                          />
                        </Tooltip>,
                      ]
                    }
                  >
                    <List.Item.Meta
                      avatar={
                        comment?.postedBy?._id === auth?.user?._id ? (
                          <Avatar
                            src={
                              auth?.user?.image?.url || '/images/def-user.jpg'
                            }
                          />
                        ) : comment?.postedBy?.image ? (
                          <Avatar
                            src={
                              comment?.postedBy?.image?.url ||
                              comment?.postedBy?.name?.charAt(0) ||
                              '/images/def-user.jpg'
                            }
                          />
                        ) : (
                          <Avatar src={'/images/def-user.jpg'} />
                        )
                      }
                      title={comment?.postedBy?.name}
                      description={`${comment?.content} - ${dayjs(
                        comment?.createdAt
                      ).fromNow()}`}
                    />
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>
        <Col sm={24} lg={8}>
          <Divider>Categories</Divider>
          {categories?.map((category) => (
            <Link
              href={`/categories/${category.slug}`}
              passHref
              key={category._id}
            >
              <a>
                <Button style={{ margin: '2px', margin: '5px' }}>
                  {category.name}
                </Button>
              </a>
            </Link>
          ))}
          <Divider>Recent Posts</Divider>
          {latestPosts?.map((post) => (
            <Link href={`/posts/${post.slug}`} passHref key={post._id}>
              <a
                style={{
                  padding: '5px 10px',
                  margin: '5px',
                  border: '1px solid #eee',
                  display: 'inline-block',
                }}
              >
                {post.title}
              </a>
            </Link>
          ))}
        </Col>
      </Row>
      {openModal && (
        <EditCommentModal
          content={content}
          setContent={setContent}
          handleCloseModal={() => setOpenModal(false)}
          handleEditComment={handleEditComment}
          openModal={openModal}
          loading={editButtonLoading}
          auth={auth}
        />
      )}
    </ClientLayout>
  );
};

export async function getServerSideProps({ params, query: { slug } }) {
  const { data } = await axios.get(`${process.env.BACKEND_URL}/posts/${slug}`);
  //   const { data } = await axios.get(`${process.env.BACKEND_URL}/posts/${params.slug}`); // or by this endpoint

  return {
    props: {
      post: data?.post,
    },
  };
}

export default SinglePost;
