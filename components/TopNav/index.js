import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  LogoutOutlined,
  LoginOutlined,
  AntCloudOutlined,
} from '@ant-design/icons';
import ToggleTheme from 'components/ToggleTheme';
import { ThemeContext } from 'context/theme';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { AuthContext } from 'context/auth';
import { MediaContext } from 'context/media';
import { PostContext } from 'context/post';
import { CategoryContext } from 'context/category';

const TopNav = () => {
  const router = useRouter();
  const { setAuth, auth } = useContext(AuthContext);
  const { setMedia } = useContext(MediaContext);
  const { setPosts } = useContext(PostContext);
  const { setCategories } = useContext(CategoryContext);

  const { toggleTheme } = useContext(ThemeContext);
  const [current, setCurrent] = useState(router.pathname.split('/')[1]);

  const handleLogout = () => {
    Cookies.remove('auth');
    setAuth({
      user: null,
      token: '',
    });
    setMedia({
      images: [],
      selected: '',
      showMediaModal: false,
    });
    localStorage.removeItem('media');
    setPosts([]);
    localStorage.removeItem('posts');
    setCategories([]);
    localStorage.removeItem('categories');
    router.push('/signin');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.pathname === '/'
        ? setCurrent('cms')
        : setCurrent(router.pathname.split('/')[1]);
    }
  }, [router.pathname]);

  const items = [
    {
      label: 'CMS',
      key: 'cms',
      icon: <AntCloudOutlined />,
      onClick: () => {
        router.push('/');
        setCurrent('cms');
      },
    },
    {
      icon: <ToggleTheme />,
      onClick: toggleTheme,
      style: {
        marginLeft: 'auto',
      },
    },
    !auth?.token && {
      label: 'Signup',
      key: 'signup',
      icon: <UserAddOutlined />,
      onClick: () => {
        router.push('/signup');
        setCurrent();
      },
    },
    !auth?.token && {
      label: 'Signin',
      key: 'signin',
      icon: <LoginOutlined />,
      onClick: () => {
        router.push('/signin');
        setCurrent('');
      },
    },
    auth?.token && {
      label: `Hi ${auth?.user?.role === 'admin' ? 'Admin' : auth?.user?.name}`,
      key: 'dashboard',
      icon: <SettingOutlined />,

      children: [
        {
          type: 'group',
          label: 'Management',
          children: [
            auth?.user?.role === 'admin'
              ? {
                  label: 'Dashboard',
                  key: 'admin',
                  icon: <AppstoreOutlined />,
                  onClick: () => {
                    router.push('/admin');
                    setCurrent('admin');
                  },
                }
              : auth?.user?.role === 'author'
              ? {
                  label: 'Dashboard',
                  key: 'author',
                  icon: <AppstoreOutlined />,
                  onClick: () => {
                    router.push('/author');
                    setCurrent('author');
                  },
                }
              : {
                  label: 'Dashboard',
                  key: 'subscriber',
                  icon: <AppstoreOutlined />,
                  onClick: () => {
                    router.push('/subscriber');
                    setCurrent('subscriber');
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
    auth?.token && {
      label: 'Signout',
      key: 'signout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  const handleCurrent = (e) => {
    router.pathname === '/' ? setCurrent('cms') : setCurrent(e.key);
  };

  return (
    <Menu
      onClick={handleCurrent}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      theme="dark"
    />
  );
};

export default TopNav;
