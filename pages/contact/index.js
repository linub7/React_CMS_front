import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import axios from 'axios';
import ClientLayout from 'components/client/layout/ClientLayout';
import Head from 'next/head';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/contact', values);

      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success('Your message has been sent successfully');
        form.resetFields();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, try again later');
      setLoading(false);
    }
  };
  return (
    <ClientLayout>
      <Head>
        <title>Contact</title>
      </Head>
      <Row style={{ paddingTop: '100px' }}>
        <Col span={8} offset={8}>
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            {/* email */}
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Your Name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            {/* password */}
            <Form.Item
              name="message"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
                {
                  max: 500,
                  message: 'Password must be less than 500 characters',
                },
              ]}
              hasFeedback
            >
              <Input.TextArea placeholder="Write your message here" rows={4} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </ClientLayout>
  );
};

export default Contact;
