import { useEffect, useState } from 'react';
import ClientLayout from 'components/client/layout/ClientLayout';
import axios from 'axios';
import { Col, Row, Card, Avatar, Button } from 'antd';
import Link from 'next/link';
import Head from 'next/head';

const { Meta } = Card;

const Posts = ({ posts }) => {
  const [allPosts, setAllPosts] = useState(posts);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMorePosts();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get('/posts-count');
      setTotal(data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMorePosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/all-posts?page=${page}`);
      setAllPosts([...allPosts, ...data?.posts]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <ClientLayout>
      <Head>
        <title>Posts</title>
        <meta description="Blog posts about web development, programming & etc" />
      </Head>
      <Row gutter={12}>
        {allPosts?.map((post) => (
          <Col
            xs={24}
            md={12}
            lg={8}
            key={post._id}
            style={{ marginBottom: '8px' }}
          >
            <Link href={`/posts/${post.slug}`} passHref>
              <Card
                key={post._id}
                hoverable
                cover={
                  <Avatar
                    shape="square"
                    style={{ height: '200px', width: '100%' }}
                    src={post.featuredImage?.url || '/images/def-pic.jpg'}
                    alt={post.title}
                  />
                }
              >
                <Meta title={post.title} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <Row>
        <Col span={24} style={{ textAlign: 'center', padding: '20px' }}>
          {total !== allPosts.length && (
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
    </ClientLayout>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.BACKEND_URL}/all-posts`);

  return {
    props: {
      posts: data?.posts,
    },
  };
}

export default Posts;
