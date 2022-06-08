import { useContext } from 'react';
import { Card, Col, Row, Typography } from 'antd';
import axios from 'axios';
import ClientLayout from 'components/client/layout/ClientLayout';
import dayjs from 'dayjs';
import Head from 'next/head';
import Link from 'next/link';
import Editor from 'rich-markdown-editor';
import { ThemeContext } from 'context/theme';

const { Title } = Typography;

const SinglePost = ({ post }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <ClientLayout>
      <Head>
        <title>{post?.title}</title>
        <meta description={post?.content.substring(0, 160)} />
      </Head>
      <Row gutter={12}>
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

            <div className="editor-scroll">
              <Editor
                readOnly
                dark={theme === 'dark' ? true : false}
                defaultValue={post?.content}
              />
            </div>
          </Card>
        </Col>
        <Col sm={24} lg={8}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
          unde similique illo eius veniam illum, dicta amet aliquid dolor
          tempore deleniti non explicabo, neque totam consectetur pariatur!
          Vitae, autem quas. Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Aspernatur unde similique illo eius veniam illum, dicta amet
          aliquid dolor tempore deleniti non explicabo, neque totam consectetur
          pariatur! Vitae, autem quas. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Aspernatur unde similique illo eius veniam illum,
          dicta amet aliquid dolor tempore deleniti non explicabo, neque totam
          consectetur pariatur! Vitae, autem quas. Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Aspernatur unde similique illo eius
          veniam illum, dicta amet aliquid dolor tempore deleniti non explicabo,
          neque totam consectetur pariatur! Vitae, autem quas. Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Aspernatur unde similique
          illo eius veniam illum, dicta amet aliquid dolor tempore deleniti non
          explicabo, neque totam consectetur pariatur! Vitae, autem quas. Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur unde
          similique illo eius veniam illum, dicta amet aliquid dolor tempore
          deleniti non explicabo, neque totam consectetur pariatur! Vitae, autem
          quas. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Aspernatur unde similique illo eius veniam illum, dicta amet aliquid
          dolor tempore deleniti non explicabo, neque totam consectetur
          pariatur! Vitae, autem quas. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Aspernatur unde similique illo eius veniam illum,
          dicta amet aliquid dolor tempore deleniti non explicabo, neque totam
          consectetur pariatur! Vitae, autem quas. Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Aspernatur unde similique illo eius
          veniam illum, dicta amet aliquid dolor tempore deleniti non explicabo,
          neque totam consectetur pariatur! Vitae, autem quas. Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Aspernatur unde similique
          illo eius veniam illum, dicta amet aliquid dolor tempore deleniti non
          explicabo, neque totam consectetur pariatur! Vitae, autem quas.
        </Col>
      </Row>
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
