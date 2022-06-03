import { Layout } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import AdminNav from '../nav/AdminNav';

const { Content } = Layout;

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const title =
    pathname.split('/').pop().charAt(0).toUpperCase() +
    pathname.split('/').pop().slice(1);
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
