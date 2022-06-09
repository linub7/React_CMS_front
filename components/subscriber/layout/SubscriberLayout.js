import { useEffect, useContext, useState } from 'react';
import { Layout } from 'antd';
import { AuthContext } from 'context/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toCapitalize } from 'utils';
import SubscriberNav from '../nav/SubscriberNav';

const { Content } = Layout;

const SubscriberLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  let {
    pathname,
    query: { slug },
  } = router;
  pathname =
    pathname.split('/').pop() === 'subscriber'
      ? 'Dashboard'
      : pathname.split('/').pop();
  const title = slug ? slug : toCapitalize(pathname);

  // secure admin pages
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    !auth?.token && router.push('/');
    auth?.token && getCurrentSubscriber();

    return () => {
      setLoading(false);
    };
  }, [auth?.token]);

  const getCurrentSubscriber = async () => {
    try {
      const { data } = await axios.get('/current-subscriber');
      console.log(data);
      if (!data?.ok) {
        router.push('/');
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      router.push('/');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingOutlined
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '48px',
        }}
      />
    );
  }

  return (
    <Layout>
      <Head>
        <title>Subscriber - {title}</title>
      </Head>
      <SubscriberNav />
      <Layout>
        <Content style={{ padding: '10px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default SubscriberLayout;
