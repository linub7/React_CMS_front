/* eslint-disable @next/next/no-img-element */
import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';

const HeroSection = ({ auth }) => {
  const router = useRouter();
  return (
    <>
      <img
        src={`/images/jr-korpa.jpg`}
        alt="CMS"
        style={{
          width: '100%',
          height: '500px',
          overflow: 'hidden',
          objectFit: 'cover',
        }}
      />

      <div
        style={{
          color: '#fff',
          textAlign: 'center',
          marginTop: '-420px',
          fontSize: '75px',
          textShadow: '2px 2px 4px #000000',
        }}
      >
        <h1 style={{ color: '#fff' }}>CMS</h1>
        <p style={{ fontSize: '35px', marginTop: '-75px' }}>
          Content Management System
        </p>
        <Button
          type="primary"
          icon={<SendOutlined spin />}
          size="large"
          onClick={() => router.push(auth?.token ? `/subscriber` : `/signin`)}
        >
          Explore
        </Button>
      </div>
    </>
  );
};

export default HeroSection;
