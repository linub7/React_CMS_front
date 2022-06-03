import { useState } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import AdminLayout from 'components/admin/layout/AdminLayout';
import { EditOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import axios from 'axios';

const Categories = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleAddCategory = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/add-category', values);
      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success('Category added successfully');
        form.resetFields();
      }
      setLoading(false);
    } catch (error) {
      toast.error(
        error.response?.data?.error?.toString() ===
          `E11000 duplicate key error collection: ReactCms.categories index: slug_1 dup key: { slug: "${values.name.toLowerCase()}" }`
          ? `Category: ${values.name} already exists`
          : error.response?.data?.error || 'Something went wrong'
      );
      setLoading(false);
    }
  };
  return (
    <AdminLayout>
      <Row>
        {/* first column */}
        <Col span={12} style={{ padding: '10px' }}>
          <h1>Categories</h1>
          <p>Add new category</p>
          <Form
            name="normal_login"
            className="login-form"
            form={form}
            initialValues={{
              remember: true,
            }}
            onFinish={handleAddCategory}
          >
            {/* Category */}
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Category!',
                },
              ]}
            >
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                placeholder="Give it a name"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                Add Category
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {/* second column */}
        <Col>
          <p>show categories list</p>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Categories;
