import { useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const ForgotPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [preEmail, setPreEmail] = useState('');

  const handleSendResetCode = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/forgot-password', values);
      setPreEmail(values.email);

      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success(
          `Password reset code sent to ${values.email}.Please check your email`
        );
        setVisible(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, try again later');
      setLoading(false);
    }
  };

  const handleResetPassword = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/reset-password', values);
      console.log(data);

      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        toast.success('Password changed successfully');
        setLoading(false);
        setVisible(false);
        setTimeout(() => {
          router.push('/signin');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, try again later');
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <Row>
        <Col span={8} offset={8}>
          <h1 style={{ paddingTop: '100px' }}>Forgot Password</h1>

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
              email: preEmail ? preEmail : '',
            }}
            onFinish={visible ? handleResetPassword : handleSendResetCode}
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
                readOnly={visible ? true : false}
              />
            </Form.Item>
            {visible && (
              <>
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
                    placeholder="New Password"
                  />
                </Form.Item>
                {/* resetCode */}
                <Form.Item
                  name="resetCode"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Reset Code!',
                    },
                    {
                      min: 5,
                      message: 'Code must be at least 5 characters',
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Reset Code"
                  />
                </Form.Item>
              </>
            )}
            {/* password */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                {visible ? 'Reset Password' : 'Send Reset Code'}
              </Button>
              <div className="line"></div>
              Or{' '}
              <Link href={'/signin'}>
                <a>Login</a>
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
