import { ThunderboltOutlined } from '@ant-design/icons';
import { Col, Divider, Row } from 'antd';
import useLatestPosts from 'hooks/useLatestPosts';
import Link from 'next/link';
import ParallaxImage from './ParallaxImage';

const LandingLatestPosts = () => {
  const { latestPosts } = useLatestPosts();

  return (
    <Row>
      <Col span={24}>
        <ParallaxImage>
          <h2
            style={{
              textAlign: 'center',
              fontSize: '75px',
              color: '#D9D8DC',
              textShadow: '2px 2px #88408A',
            }}
          >
            BLOG POSTS
          </h2>
          <Divider>
            <ThunderboltOutlined />
          </Divider>
          <div style={{ textAlign: 'center' }}>
            {latestPosts.map((post) => (
              <Link href={`/posts/${post.slug}`} key={post._id}>
                <a>
                  <h3 style={{ fontSize: '20px', color: '#D9D8DC' }}>
                    {post.title}
                  </h3>
                </a>
              </Link>
            ))}
          </div>
        </ParallaxImage>
      </Col>
    </Row>
  );
};

export default LandingLatestPosts;
