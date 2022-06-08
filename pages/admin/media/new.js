import { Col, Row } from 'antd';
import AdminLayout from 'components/admin/layout/AdminLayout';
import UploadFile from 'components/admin/media/UploadFile';

const NewMedia = () => {
  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <div style={{ padding: 100, textAlign: 'center' }}>
            <UploadFile redirectToLibrary={true} />
          </div>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default NewMedia;
