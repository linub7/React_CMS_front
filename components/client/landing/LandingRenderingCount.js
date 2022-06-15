import { Col, Row } from 'antd';
import RenderProgress from 'components/shared/RenderProgress';

const LandingRenderingCount = ({
  postsCount,
  categoriesCount,
  commentsCount,
  usersCounts,
}) => {
  return (
    <Row>
      <Col
        span={6}
        style={{ marginTop: '70px', textAlign: 'center', fontSize: '20px' }}
      >
        <RenderProgress count={postsCount} name="Posts" />
      </Col>
      <Col
        span={6}
        style={{ marginTop: '70px', textAlign: 'center', fontSize: '20px' }}
      >
        <RenderProgress count={categoriesCount} name="Categories" />
      </Col>
      <Col
        span={6}
        style={{ marginTop: '70px', textAlign: 'center', fontSize: '20px' }}
      >
        <RenderProgress count={commentsCount} name="Comments" />
      </Col>
      <Col
        span={6}
        style={{ marginTop: '70px', textAlign: 'center', fontSize: '20px' }}
      >
        <RenderProgress count={usersCounts} name="Users" />
      </Col>
    </Row>
  );
};

export default LandingRenderingCount;
