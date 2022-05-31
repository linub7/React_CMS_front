import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import ToggleTheme from 'components/ToggleTheme';
import { ThemeContext } from 'context/theme';
import { useContext } from 'react';
import { useRouter } from 'next/router';

const TopNav = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const router = useRouter();

  const items = [
    {
      label: 'CMS',
      key: 'cms',
      icon: <MailOutlined />,
      onClick: () => {
        router.push('/');
        setCurrent('cms');
      },
    },
    {
      label: 'Signup',
      key: 'signup',
      icon: <AppstoreOutlined />,
      onClick: () => {
        router.push('/signup');
        setCurrent();
      },
    },
    {
      label: 'Signin',
      key: 'signin',
      icon: <AppstoreOutlined />,
      onClick: () => {
        router.push('/signin');
        setCurrent('');
      },
    },
    {
      label: 'Dashboard',
      key: 'dashboard',
      icon: <SettingOutlined />,
      style: {
        marginLeft: 'auto',
      },
      children: [
        {
          type: 'group',
          label: 'Management',
          children: [
            {
              label: 'Admin',
              key: 'admin',
              icon: <AppstoreOutlined />,
              onClick: () => {
                router.push('/admin');
                setCurrent('admin');
              },
            },
          ],
        },
        // {
        //   type: 'group',
        //   label: 'Item 2',
        //   children: [
        //     {
        //       label: 'Option 3',
        //       key: 'setting:3',
        //     },
        //     {
        //       label: 'Option 4',
        //       key: 'setting:4',
        //     },
        //   ],
        // },
      ],
    },
    {
      // label: '',
      // key: 'theme',
      icon: <ToggleTheme />,
      onClick: toggleTheme,
    },
  ];
  const [current, setCurrent] = useState('cms');

  return <Menu selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default TopNav;
