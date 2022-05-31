import React, { useState } from 'react';
import { Menu, Layout } from 'antd';
import {
  PushpinOutlined,
  CameraOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  BgColorsOutlined,
  UserOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const AdminNav = () => {
  const items = [
    getItem(
      <Link href={'/admin'} passHref>
        <a>Dashboard</a>
      </Link>,
      '1',
      <SettingOutlined />
    ),
    getItem('Posts', 'sub1', <PushpinOutlined />, [
      getItem(
        <Link href={'/admin/posts'} passHref>
          <a>All Posts</a>
        </Link>,
        '2'
      ),
      getItem(
        <Link href={'/admin/posts/new'} passHref>
          <a>Add New Post</a>
        </Link>,
        '3'
      ),
      getItem(
        <Link href={'/admin/categories'} passHref>
          <a>Categories</a>
        </Link>,
        '4'
      ),
    ]),
    // -- media -- //
    getItem('Media', 'sub2', <CameraOutlined />, [
      getItem(
        <Link href={'/admin/media/library'} passHref>
          <a>Library</a>
        </Link>,
        '5'
      ),
      getItem(
        <Link href={'/admin/media/new'} passHref>
          <a>Add New</a>
        </Link>,
        '6'
      ),
    ]),
    getItem(
      <Link href={'/admin/comments'} passHref>
        <a>Comments</a>
      </Link>,
      '7',
      <CommentOutlined />
    ),
    getItem('Users', 'sub3', <UserSwitchOutlined />, [
      getItem(
        <Link href={'/admin/users'} passHref>
          <a>All Users</a>
        </Link>,
        '8'
      ),
      getItem(
        <Link href={'/admin/users/new'} passHref>
          <a>Add New</a>
        </Link>,
        '12'
      ),
    ]),
    getItem(
      <Link href={'/admin/userid'} passHref>
        <a>Profile</a>
      </Link>,
      '9',
      <UserOutlined />
    ),
    getItem(
      <Link href={'/admin/customize'} passHref>
        <a>Customized</a>
      </Link>,
      '10',
      <BgColorsOutlined />
    ),
  ];
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        mode="inline"
        items={items}
        style={{ minHeight: '100vh' }}
      />
    </Sider>
  );
};

export default AdminNav;
