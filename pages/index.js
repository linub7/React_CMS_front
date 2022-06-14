import { Col, Row } from 'antd';
import ClientLayout from 'components/client/layout/ClientLayout';
import HeroSection from 'components/hero/HeroSection';
import RenderProgress from 'components/shared/RenderProgress';
import { AuthContext } from 'context/auth';
import useNumbers from 'hooks/useNumbers';
import Head from 'next/head';
import { useContext } from 'react';

const Home = () => {
  const { auth } = useContext(AuthContext);

  const { usersCounts, postsCount, commentsCount, categoriesCount } =
    useNumbers();

  return (
    <ClientLayout>
      <Head>
        <title>Modern Content Management System</title>
        <meta
          name="description"
          content="Read latest blog posts on web development"
        />
      </Head>
      <HeroSection auth={auth} />
      <Row>
        <Col
          span={6}
          style={{ marginTop: '70px', textAlign: 'center', fontSize: '20px' }}
        >
          <RenderProgress count={postsCount} name="Posts" />
        </Col>
        <Col
          span={6}
          style={{ marginTop: '70px', textAlign: 'center', fontSize: '20px' }}
        >
          <RenderProgress count={categoriesCount} name="Categories" />
        </Col>
        <Col
          span={6}
          style={{ marginTop: '70px', textAlign: 'center', fontSize: '20px' }}
        >
          <RenderProgress count={commentsCount} name="Comments" />
        </Col>
        <Col
          span={6}
          style={{ marginTop: '70px', textAlign: 'center', fontSize: '20px' }}
        >
          <RenderProgress count={usersCounts} name="Users" />
        </Col>
      </Row>
    </ClientLayout>
  );
};

export default Home;
