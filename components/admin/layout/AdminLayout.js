import { useEffect, useContext, useState } from 'react';
import { Layout } from 'antd';
import { AuthContext } from 'context/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import AdminNav from '../nav/AdminNav';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Content } = Layout;

const AdminLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { pathname } = router;
  const title =
    pathname.split('/').pop().charAt(0).toUpperCase() +
    pathname.split('/').pop().slice(1);

  // secure admin pages
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    auth?.token ? getCurrentAdmin() : router.push('/');
  }, [auth?.token]);

  const getCurrentAdmin = async () => {
    try {
      const { data } = await axios.get('/current-admin');
      setLoading(false);
    } catch (error) {
      console.log(error);
      router.push('/');
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
        <title>Admin - {title}</title>
      </Head>
      <AdminNav />
      <Layout>
        <Content style={{ padding: '10px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
