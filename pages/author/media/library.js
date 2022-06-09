import { Col, Row } from 'antd';
import MediaLibrary from 'components/admin/media/MediaLibrary';
import AuthorLayout from 'components/author/layout/AuthorLayout';

const AuthorMediaLibrary = () => {
  return (
    <AuthorLayout>
      <Row>
        <Col span={24}>
          <MediaLibrary author={true} />
        </Col>
      </Row>
    </AuthorLayout>
  );
};

export default AuthorMediaLibrary;
