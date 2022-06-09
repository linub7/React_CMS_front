import { useState, useEffect } from 'react';
import { Menu, Layout } from 'antd';
import {
  SettingOutlined,
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

const SubscriberNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('');

  const activeName = (name) => `${current === name ? 'active' : ''}`;

  const items = [
    getItem(
      <Link href={'/subscriber'} passHref>
        <a className={activeName('/subscriber')}>Dashboard</a>
      </Link>,
      '1',
      <SettingOutlined />
    ),
    getItem(
      <Link href={'/subscriber/comments'} passHref>
        <a className={activeName('/subscriber/comments')}>Comments</a>
      </Link>,
      '7',
      <CommentOutlined />
    ),
    getItem(
      <Link href={'/subscriber/users/1'} passHref>
        <a className={activeName('/subscriber/users/1')}>Profile</a>
      </Link>,
      '9',
      <UserOutlined />
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

export default SubscriberNav;
