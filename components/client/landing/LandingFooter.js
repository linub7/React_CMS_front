import {
  ApiOutlined,
  CopyrightOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import ParallaxImage from './ParallaxImage';

const LandingFooter = () => {
  return (
    <div>
      <ParallaxImage url="/images/rahman.jpg">
        <Row>
          <Col span={8} style={{ textAlign: 'center' }}>
            <UsergroupAddOutlined
              style={{ fontSize: '80px', color: '#D9D8DC' }}
            />
            <br />
            <h3 style={{ fontSize: '20px', color: '#D9D8DC' }}>
              The Ultimate Blogging Platform
            </h3>
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <ApiOutlined style={{ fontSize: '80px', color: '#D9D8DC' }} />
            <br />
            <h3 style={{ fontSize: '20px', color: '#D9D8DC' }}>
              Build Using MERN Stack (MongoDB, Express, React, Node)
            </h3>
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <CopyrightOutlined style={{ fontSize: '80px', color: '#D9D8DC' }} />
            <br />
            <h3 style={{ fontSize: '20px', color: '#D9D8DC' }}>
              Copyright {new Date().getFullYear()} &copy; All rights reserved
            </h3>
          </Col>
        </Row>
      </ParallaxImage>
    </div>
  );
};

export default LandingFooter;
