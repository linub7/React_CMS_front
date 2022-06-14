import { useEffect, useContext, useState } from 'react';
import { Layout } from 'antd';
import { AuthContext } from 'context/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toCapitalize } from 'utils';
import AuthorNav from '../nav/AuthorNav';
import LoadingToRedirect from 'components/shared/LoadingToRedirect';

const { Content } = Layout;

const AuthorLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  let {
    pathname,
    query: { slug },
  } = router;
  pathname =
    pathname.split('/').pop() === 'author'
      ? 'Dashboard'
      : pathname.split('/').pop();
  const title = slug ? slug : toCapitalize(pathname);

  // secure admin pages
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    !auth?.token && router.push('/');
    auth?.token && getCurrentAuthor();

    return () => {
      setLoading(false);
    };
  }, [auth?.token]);

  const getCurrentAuthor = async () => {
    try {
      const { data } = await axios.get('/current-author');
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      router.push('/');
    }
  };

  if (loading) {
    return <LoadingToRedirect />;
  }

  return (
    <Layout>
      <Head>
        <title>Author - {title}</title>
      </Head>
      <AuthorNav />
      <Layout>
        <Content style={{ padding: '10px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AuthorLayout;
