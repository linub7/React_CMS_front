import ClientLayout from 'components/client/layout/ClientLayout';
import axios from 'axios';
import { Col, Row, Card, Avatar } from 'antd';
import Link from 'next/link';
import Head from 'next/head';

const { Meta } = Card;

const Posts = ({ posts }) => {
  return (
    <ClientLayout>
      <Head>
        <title>Posts</title>
        <meta description="Blog posts about web development, programming & etc" />
      </Head>
      <Row gutter={12}>
        {posts?.map((post) => (
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
    </ClientLayout>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.BACKEND_URL}/posts`);

  return {
    props: {
      posts: data?.posts,
    },
  };
}

export default Posts;
