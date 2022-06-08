import { Col, Row } from 'antd';
import AdminLayout from 'components/admin/layout/AdminLayout';
import MediaLibrary from 'components/admin/media/MediaLibrary';

const AdminMediaLibrary = () => {
  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <MediaLibrary />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AdminMediaLibrary;
