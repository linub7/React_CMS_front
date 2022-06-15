import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LoadingToRedirect = ({ path = '/' }) => {
  const router = useRouter();

  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <p style={{ fontSize: '25px' }}>
        Redirecting in {count} seconds{' '}
        {/* {count === 3 ? '...' : count === 2 ? '..' : count === 1 ? '.' : ''}{' '} */}
        {count === 3 ? '😐' : count === 2 ? '🙂' : count === 1 ? '😊' : '😍'}{' '}
        &nbsp; <LoadingOutlined />
      </p>
    </div>
  );
};

export default LoadingToRedirect;
