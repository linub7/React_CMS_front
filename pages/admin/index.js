import { Col, Divider, Row } from 'antd';
import AdminLayout from 'components/admin/layout/AdminLayout';
import RenderProgress from 'components/shared/RenderProgress';
import useNumbers from 'hooks/useNumbers';

const Admin = () => {
  const { usersCounts, postsCount, commentsCount, categoriesCount } =
    useNumbers();

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <Divider>
            <h1>Statistics</h1>
          </Divider>
        </Col>
      </Row>
      <Row>
        <Col
          span={12}
          style={{ marginTop: '70px', textAlign: 'center', fontSize: '20px' }}
        >
          <RenderProgress
            count={postsCount}
            path={`/admin/posts`}
            name="Posts"
          />
        </Col>
        <Col
          span={12}
          style={{ marginTop: '70px', textAlign: 'center', fontSize: '20px' }}
        >
          <RenderProgress
            count={categoriesCount}
            path={`/admin/categories`}
            name="Categories"
          />
        </Col>
      </Row>
      <Row>
        <Col
          span={12}
          style={{ marginTop: '70px', textAlign: 'center', fontSize: '20px' }}
        >
          <RenderProgress
            count={commentsCount}
            path={`/admin/comments`}
            name="Comments"
          />
        </Col>
        <Col
          span={12}
          style={{ marginTop: '70px', textAlign: 'center', fontSize: '20px' }}
        >
          <RenderProgress
            count={usersCounts}
            path={`/admin/users`}
            name="Users"
          />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Admin;
