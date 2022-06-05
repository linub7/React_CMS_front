import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import AdminLayout from 'components/admin/layout/AdminLayout';
import { useRouter } from 'next/router';

const Posts = () => {
  const router = useRouter();
  return (
    <AdminLayout>
      <Row>
        <Col span={22} offset={1}>
          <Button
            type="primary"
            style={{ margin: '10px 0px 10px 0px' }}
            onClick={() => router.push('/admin/posts/new')}
          >
            <PlusOutlined />
            Add New
          </Button>
          <h1>Posts</h1>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Posts;
