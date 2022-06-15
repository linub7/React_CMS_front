import { Avatar, Button, Card, Col, Divider, Row, Typography } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Head from 'next/head';
import Link from 'next/link';
import { toCapitalize } from 'utils';
import useCategory from 'hooks/useCategory';
import useLatestPosts from 'hooks/useLatestPosts';

dayjs.extend(relativeTime);

const SingleCategory = ({ posts, category }) => {
  // hooks
  const { categories } = useCategory();
  const { latestPosts } = useLatestPosts();

  return (
    <>
      <Head>
        <title>{category.name}</title>
        <meta
          name="description"
          content={`Read latest posts on ${category.name}`}
        />
      </Head>
      <div style={{ marginTop: '60px' }}></div>
      <Row>
        <Col sm={24} lg={16} style={{ marginBottom: '12px' }}>
          <h1 style={{ textAlign: 'center' }}>
            Posts in {toCapitalize(category.name)}
          </h1>

          {/* posts list */}
          {posts?.map((post) => (
            <Card key={post._id}>
              <div style={{ display: 'flex' }}>
                <Avatar
                  shape="circle"
                  size={60}
                  style={{ marginRight: '15px' }}
                  src={
                    post?.featuredImage
                      ? post?.featuredImage?.url
                      : '/images/def-pic.jpg'
                  }
                  alt={post?.title}
                />
                <div>
                  <Link href={`/posts/${post?.slug}`} passHref>
                    <a>
                      <Typography.Title level={3}>
                        {post?.title}
                      </Typography.Title>
                    </a>
                  </Link>
                  <p>
                    {dayjs(post?.createdAt).format('MMMM D, YYYY h:m A')} /{' '}
                    {post?.postedBy?.name}{' '}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </Col>
        <Col sm={24} lg={8} style={{ marginTop: '30px', textAlign: 'center' }}>
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
    </>
  );
};

export async function getServerSideProps({ query: { slug } }) {
  const { data } = await axios.get(
    `${process.env.BACKEND_URL}/posts-by-category/${slug}`
  );

  return {
    props: {
      posts: data?.posts,
      category: data?.category,
    },
  };
}

export default SingleCategory;
