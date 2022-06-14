import { Col, Divider, Row } from 'antd';
import axios from 'axios';
import AdminLayout from 'components/admin/layout/AdminLayout';
import RenderProgress from 'components/shared/RenderProgress';
import { useState, useEffect } from 'react';

const Admin = () => {
  const [usersCounts, setUsersCounts] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);

  useEffect(() => {
    getCounts();
  }, []);

  const getCounts = async () => {
    try {
      const { data } = await axios.get(`/statistics`);
      setUsersCounts(data?.usersCount);
      setPostsCount(data?.postsCount);
      setCommentsCount(data?.commentsCount);
      setCategoriesCount(data?.categoriesCount);
    } catch (error) {
      console.log(error);
    }
  };

  console.log({ usersCounts, postsCount, commentsCount, categoriesCount });

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
