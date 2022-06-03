import { useState, useContext } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from 'context/auth';
import Cookies from 'js-cookie';

const Signin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/signin', values);
      if (data?.error) {
        toast.error(data?.error);
      } else {
        // save in context
        setAuth({
          user: data?.user,
          token: data?.token,
        });
        // save in cookies
        Cookies.set('auth', JSON.stringify(data));
        toast.success('Successfully logged in');
        setTimeout(() => {
          data?.user?.role === 'admin'
            ? router.push('/admin')
            : data?.user?.role === 'author'
            ? router.push('/author')
            : router.push('/subscriber');
        }, 1000);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, try again later');
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Signin</title>
      </Head>
      <Row>
        <Col span={8} offset={8}>
          <h1 style={{ paddingTop: '100px' }}>Login</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
              email: 'linub7@gmail.com',
              password: '123456',
            }}
            onFinish={onFinish}
          >
            {/* email */}
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            {/* password */}
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Link href={'/forgot-password'}>
              <a>Forgot password</a>
            </Link>
            <br />
            <br />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                Login
              </Button>
              <div className="line"></div>
              Or{' '}
              <Link href={'/signup'}>
                <a>Register</a>
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Signin;
