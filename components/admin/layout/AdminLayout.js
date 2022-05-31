import { Layout } from 'antd';
import React from 'react';
import AdminNav from '../nav/AdminNav';

const { Content } = Layout;

const AdminLayout = ({ children }) => {
  return (
    <Layout>
      <AdminNav />
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
