import { Col, Row } from 'antd';
import UploadFile from 'components/admin/media/UploadFile';
import AuthorLayout from 'components/author/layout/AuthorLayout';

const NewAuthorMedia = () => {
  return (
    <AuthorLayout>
      <Row>
        <Col span={24}>
          <div style={{ padding: 100, textAlign: 'center' }}>
            <UploadFile author={true} />
          </div>
        </Col>
      </Row>
    </AuthorLayout>
  );
};

export default NewAuthorMedia;
