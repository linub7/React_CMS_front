import { useState, useEffect } from 'react';
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
import { useWindowWidth } from '@react-hook/window-size';

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
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('');

  const activeName = (name) => `${current === name ? 'active' : ''}`;

  const items = [
    getItem(
      <Link href={'/admin'} passHref>
        <a className={activeName('/admin')}>Dashboard</a>
      </Link>,
      '1',
      <SettingOutlined />
    ),
    getItem('Posts', 'sub1', <PushpinOutlined />, [
      getItem(
        <Link href={'/admin/posts'} passHref>
          <a className={activeName('/admin/posts')}>All Posts</a>
        </Link>,
        '2'
      ),
      getItem(
        <Link href={'/admin/posts/new'} passHref>
          <a className={activeName('/admin/posts/new')}>Add New Post</a>
        </Link>,
        '3'
      ),
      getItem(
        <Link href={'/admin/categories'} passHref>
          <a className={activeName('/admin/categories')}>Categories</a>
        </Link>,
        '4'
      ),
    ]),
    // -- media -- //
    getItem('Media', 'sub2', <CameraOutlined />, [
      getItem(
        <Link href={'/admin/media/library'} passHref>
          <a className={activeName('/admin/media/library')}>Library</a>
        </Link>,
        '5'
      ),
      getItem(
        <Link href={'/admin/media/new'} passHref>
          <a className={activeName('/admin/media/new')}>Add New</a>
        </Link>,
        '6'
      ),
    ]),
    getItem(
      <Link href={'/admin/comments'} passHref>
        <a className={activeName('/admin/comments')}>Comments</a>
      </Link>,
      '7',
      <CommentOutlined />
    ),
    getItem('Users', 'sub3', <UserSwitchOutlined />, [
      getItem(
        <Link href={'/admin/users'} passHref>
          <a className={activeName('/admin/users')}>All Users</a>
        </Link>,
        '8'
      ),
      getItem(
        <Link href={'/admin/users/new'} passHref>
          <a className={activeName('/admin/users/new')}>Add New</a>
        </Link>,
        '12'
      ),
    ]),
    getItem(
      <Link href={'/admin/users/1'} passHref>
        <a className={activeName('/admin/users/1')}>Profile</a>
      </Link>,
      '9',
      <UserOutlined />
    ),
    getItem(
      <Link href={'/admin/customize'} passHref>
        <a className={activeName('/admin/customize')}>Customized</a>
      </Link>,
      '10',
      <BgColorsOutlined />
    ),
  ];

  useEffect(() => {
    typeof window !== 'undefined' && setCurrent(window.location.pathname);
  }, [typeof window !== 'undefined' && window.location.pathname]);

  // hooks
  const onlyWidth = useWindowWidth();

  // resize method with hooks
  useEffect(() => {
    onlyWidth < 800 ? setCollapsed(true) : setCollapsed(false);
  }, [onlyWidth < 800]);

  // resize method without hooks
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth > 768) {
  //       setCollapsed(false);
  //     } else {
  //       setCollapsed(true);
  //     }
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  typeof window !== 'undefined' && console.log(window.location.pathname);
  console.log(current);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
      <Menu
        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        mode="inline"
        items={items}
        style={{ minHeight: '100vh' }}
      />
    </Sider>
  );
};

export default AdminNav;
