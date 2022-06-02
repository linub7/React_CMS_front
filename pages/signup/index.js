import { useState, useContext } from 'react';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Row, Col, Form, Button, Input, Checkbox } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { AuthContext } from 'context/auth';

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/signup', values);
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
        toast.success('Successfully registered');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
      setLoading(false);
    } catch (error) {
      toast.error('Something went wrong, try again later');
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <Row>
        <Col span={8} offset={8}>
          <h1 style={{ paddingTop: '100px' }}>Sign Up</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
          >
            {/* name */}
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
              />
            </Form.Item>
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

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>
            {/* password */}
            {/* <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item> */}
            {/* check password */}
            {/* <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your Confirm Password!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item> */}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                Register
              </Button>
              <div className="line"></div>
              Or{' '}
              <Link href={'/signin'}>
                <a>Log in</a>
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Signup;
