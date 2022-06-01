import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import Head from 'next/head';
import Link from 'next/link';

const Signin = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
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
              remember: false,
            }}
            onFinish={onFinish}
          >
            {/* name */}
            {/* <Form.Item
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
          </Form.Item> */}
            {/* email */}
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Please input your Name!',
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
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Link href={'/signup'}>
              <a>Forgot password</a>
            </Link>
            <br />
            <br />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
              <br />
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
